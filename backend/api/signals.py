from .models import User, Doctor, Receptionist, LabTechnician, Pharmacist, Patient, Nurse
from .choices import RoleChoices

from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == RoleChoices.DOCTOR:
            Doctor.objects.create(user=instance)

        elif instance.role == RoleChoices.RECEPTIONIST:
            print('Creating receptionist profile')
            Receptionist.objects.create(user=instance)
            
        elif instance.role == RoleChoices.LAB_TECH:
            LabTechnician.objects.create(user=instance)
            
        elif instance.role == RoleChoices.PHARMACIST:
            Pharmacist.objects.create(user=instance)

        elif instance.role == RoleChoices.NURSE:
            print("Creating nurse profile...")
            Nurse.objects.create(user=instance)

        elif instance.role == RoleChoices.PATIENT:
            Patient.objects.create(user=instance)

