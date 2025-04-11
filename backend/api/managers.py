from django.contrib.auth.models import BaseUserManager
from .choices import RoleChoices, BillChoice
from django.db import models
from django.utils import timezone
from django.db.models import Sum

class HmsAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", RoleChoices.ADMIN)
        return self.create_user(email, password, **extra_fields)


class AppointmentManager(models.Manager):
    """Custom manager for the Appointment model with billing integration."""

    def scheduled(self):
        """Return all appointments with 'scheduled' status."""
        from .choices import AppointmentChoice
        return self.get_queryset().filter(status=AppointmentChoice.STATUS_SCHEDULED)

            
    def today(self):
        """Return appointments scheduled for today."""
        now = timezone.now()
        start_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
        end_of_day = now.replace(hour=23, minute=59, second=59, microsecond=999999)
        return self.get_queryset().filter(
            appointment_date__gte=start_of_day,
            appointment_date__lte=end_of_day
        ).order_by('appointment_date')
    

    def completed(self):
        """Return all appointments with 'completed' status."""
        from .choices import AppointmentChoice
        return self.get_queryset().filter(status=AppointmentChoice.STATUS_COMPLETED)
    

    def with_bills(self):
        """Return appointments that have associated bills."""
        return self.get_queryset().filter(bill__isnull=False)
    

    def without_bills(self):
        """Return completed appointments without bills."""
        from .choices import AppointmentChoice
        return self.get_queryset().filter(
            status=AppointmentChoice.STATUS_COMPLETED,
            bill__isnull=True
        )

    def total_billed_amount(self, doctor=None):
        """Calculate the total billed amount for appointments, optionally filtered by doctor."""
        queryset = self.get_queryset().filter(bill__isnull=False)
        if doctor:
            queryset = queryset.filter(doctor=doctor)
        return queryset.aggregate(total=Sum('bill__amount'))['total'] or 0
    

    def unpaid_bills(self, patient=None):
        """Return appointments with unpaid bills, optionally filtered by patient."""
        queryset = self.get_queryset().filter(
            bill__status=BillChoice.STATUS_UNPAID,
            bill__isnull=False
        )
        if patient:
            queryset = queryset.filter(patient=patient)
        return queryset



