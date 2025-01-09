from .models import CustomUser, Doctor, Receptionist, LabTechnician, Pharmacist

from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == CustomUser.DOCTOR:
            Doctor.objects.create(user=instance, first_name=instance.first_name,
                                  last_name=instance.last_name, email=instance.email)
        elif instance.role == CustomUser.RECEPTIONIST:
            Receptionist.objects.create(
                user=instance, first_name=instance.first_name, last_name=instance.last_name, email=instance.email)
        elif instance.role == CustomUser.LAB_TECH:
            LabTechnician.objects.create(
                user=instance, first_name=instance.first_name, last_name=instance.last_name, email=instance.email)
        elif instance.role == CustomUser.PHARMACIST:
            Pharmacist.objects.create(user=instance, first_name=instance.first_name,
                                      last_name=instance.last_name, email=instance.email)
