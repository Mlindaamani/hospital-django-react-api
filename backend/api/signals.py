from .models import Appointment, Bill, User, Doctor, Receptionist, LabTechnician, Patient
from .choices import AppointmentChoice, BillChoice, RoleChoices
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now
from .utils import bill_amount_by_specialization

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == RoleChoices.DOCTOR:
            Doctor.objects.create(user=instance)

        elif instance.role == RoleChoices.RECEPTIONIST:
            Receptionist.objects.create(user=instance)
            
        elif instance.role == RoleChoices.LAB_TECH:
            LabTechnician.objects.create(user=instance)
            

        elif instance.role == RoleChoices.PATIENT:
            Patient.objects.create(user=instance)


@receiver(post_save, sender=Appointment)
def generate_bill_on_completion(sender, instance, created, **kwargs):
    """Generate a bill when an appointment is marked as completed."""
    if not created and instance.status == AppointmentChoice.STATUS_COMPLETED:
        if not hasattr(instance, 'bills'):
            Bill.objects.create(
                patient=instance.patient,
                doctor=instance.doctor,
                appointment=instance,
                amount= bill_amount_by_specialization(instance.doctor.specialization),
                status=BillChoice.STATUS_PAID,
            )


@receiver(post_save, sender=Patient)
def generate_file_number(sender, instance, created, **kwargs):
    """Generate a file number for the patient when their profile is created."""
    print("Generating file number")

    if created and isinstance(instance, Patient):
        year = now().year
        file_number = f"PHMS-{year}-{instance.id:04d}"
        instance.file_number = file_number
        instance.save()


