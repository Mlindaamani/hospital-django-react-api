from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from .choices import (RoleChoices, BillChoice, PatientGenderChoices, AppointmentChoice, 
LabResultsChoice, PrescriptionChoice)
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import HmsAccountManager
from .choices import SpecializationChoice


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=255)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    phone_number= models.CharField(max_length=15, default="Not provided")
    role = models.CharField(max_length=20, choices=RoleChoices.ROLE_CHOICES, default=RoleChoices.DOCTOR)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = HmsAccountManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return f"{self.first_name}({self.role})".strip()
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        return self.first_name
    
    
    @property
    def patient_profile_url(self):
        if hasattr(self, 'patient') and self.patient.profile_picture:
            return self.patient.profile_picture.url
        return None
        
    @property
    def doctor_profile_url(self):
        if hasattr(self, 'doctor') and self.doctor.profile_picture:
            return self.doctor.profile_picture.url
        return None


class CommonProfileBase(models.Model):
    bio = models.TextField(blank=True, null=True)
    year_of_experience = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


class DoctorProfileBase(CommonProfileBase):
    specialization = models.CharField(max_length=100, choices=SpecializationChoice.SPECIALIZATION_CHOICES, default=SpecializationChoice.GENERAL_MEDICINE)
    license_number = models.CharField(max_length=255, unique=True, blank=True, null=True)

    class Meta:
        abstract = True


    
class Doctor(DoctorProfileBase):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor')
    profile_picture = models.ImageField(upload_to='profiles/', default='doctor/default.jpg')
    
    def __str__(self):
        return f"Dr. {self.user.first_name}"
    
    def delete(self):
        self.profile_picture.delete()
        super().delete()
    
    @property
    def full_name(self):
        return f"{self.user.first_name}-{self.user.last_name}"
    
    @property
    def first_name(self):
        return f"{self.user.first_name}"
    
    @property
    def last_name(self):
        return f"{self.user.last_name}"
    
    
class Receptionist(CommonProfileBase):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receptionist')
    profile_picture = models.ImageField(upload_to='profiles/', default='receptionist/default.jpg')

    def delete(self):
        self.profile_picture.delete()
        super().delete()

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


class LabTechnician(CommonProfileBase):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lab_technician')
    profile_picture = models.ImageField(upload_to='profiles/', default='lab_tech/default.jpg')
    license_number = models.CharField(max_length=255, unique=True, default='Not provided')

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"
    
    def delete(self):
        self.profile_picture.delete()
        super().delete()
   


class Patient(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient')
    gender = models.CharField(
        max_length=1, choices=PatientGenderChoices.GENDER_CHOICES, default=PatientGenderChoices.MALE)
    file_number = models.CharField(max_length=255, default='Not file number yet')
    date_of_birth = models.DateField(blank=True, null=True)
    address = models.TextField(default="Not yet provided")
    has_insurance = models.BooleanField(default=False)
    insurance_number = models.CharField(max_length=255, blank=True, null=True)
    is_discharged = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profiles/', default='patient/default.jpg')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"
    

    def delete(self):
        self.profile_picture.delete()
        super().delete()
   
    
    @property
    def first_name(self):
        return self.user.first_name
    
    @property
    def last_name(self):
        return self.user.last_name
    
class Appointment(models.Model):
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField()
    status = models.CharField(
        max_length=20, choices=AppointmentChoice.STATUS_CHOICES, default=AppointmentChoice.STATUS_SCHEDULED)
    reason = models.TextField(max_length=500)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def patient_file_number(self):
        return self.patient.file_number

    @property
    def patient_name(self):
        return f"{self.patient.user.first_name} {self.patient.user.last_name}"

    @property
    def doctor_name(self):
        return f"{self.doctor.user.first_name} {self.doctor.user.last_name}"

    @property
    def doctor_specialization(self):
        return self.doctor.specialization

    def __str__(self):
        return f"Appointment with Dr. {self.doctor.user.last_name} for {self.patient.user.first_name} {self.patient.user.last_name}"


class Medicine(models.Model):
    name = models.CharField(max_length=255)
    stock = models.IntegerField()
    dosage = models.TextField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Prescription(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='prescriptions')
    doctor = models.ForeignKey(Doctor,  on_delete=models.CASCADE, related_name='prescriptions')
    prescription_date = models.DateTimeField(auto_now_add=True)
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='prescriptions')
    instructions = models.TextField(default='Take 1 tablet 3 times daily')
    status = models.CharField(
        max_length=20, choices=PrescriptionChoice.STATUS_CHOICES, default=PrescriptionChoice.STATUS_PENDING)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def patient_name(self):
        return f"{self.patient.user.first_name} {self.patient.user.last_name}"

    @property
    def doctor_name(self):
        return f"{self.doctor.user.first_name} {self.doctor.user.last_name}"

    @property
    def patient_file_number(self):
        return f"{self.patient.file_number}"

    @property
    def medicine_name(self):
        return f"{self.medicine.name}"

    def __str__(self):
        return f"Prescription for {self.patient.user.first_name} {self.patient.user.last_name}"
    

class Bill(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='bills')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='bills')
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name='bills', null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    date_issued = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=BillChoice.STATUS_CHOICES, default=BillChoice.STATUS_UNPAID)
    

    @property
    def patient_name(self):
        return f"{self.patient.user.first_name} {self.patient.user.last_name}"

    @property
    def patient_file_number(self):
        return self.patient.file_number


    def __str__(self):
        return f"Bill for {self.patient.user.first_name} {self.patient.user.last_name} - {self.amount}"


class LabResult(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='lab_results')
    lab_technician = models.ForeignKey(
        LabTechnician, on_delete=models.CASCADE, related_name='lab_results')
    test_type = models.CharField(max_length=100)
    result = models.TextField()
    date_conducted = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=LabResultsChoice.STATUS_CHOICES, default=LabResultsChoice.STATUS_PENDING)
    
    class Meta:
        ordering = ['-date_conducted']
        verbose_name = "LabResult"
        verbose_name_plural = "LabResults"

    @property
    def patient_name(self):
        return f"{self.patient.user.first_name}"

    @property
    def patient_file_number(self):
        return self.patient.file_number


    @property
    def lab_technician_name(self):
        return f"{self.lab_technician.user.first_name}"
    
    @property
    def lab_technician_license_number(self):
        return f"{self.lab_technician.license_number}"

    def __str__(self):
        return f"{self.test_type} for {self.patient.user.first_name}"
