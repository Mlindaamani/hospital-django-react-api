from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    ADMIN = 'admin'
    DOCTOR = 'doctor'
    RECEPTIONIST = 'receptionist'
    LAB_TECH = 'lab_tech'
    PHARMACIST = 'pharmacist'
    NURSE = 'nurse'
    ROLE_CHOICES = [
        (ADMIN, 'Admin'), 
        (DOCTOR, 'Doctor'),
        (RECEPTIONIST, 'Receptionist'),
        (LAB_TECH, 'Lab Technician'),
        (PHARMACIST, 'Pharmacist'),
        (NURSE, 'Nurse')]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self) -> str:
        return f"{self.first_name} {self.email}"


class Nurse(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='nurse_profile', blank=True, null=True)
    license_number = models.CharField(max_length=255, unique=True)
    year_of_experience = models.IntegerField()

    @property
    def full_name(self):
        return f"{self.user.first_name}-{self.user.last_name}"

    @property
    def email(self):
        return f"{self.user.email}"

    def __str__(self):
        return f"{self.user.first_name}-{self.user.last_name}: {self.lecense_number}"
    
    @property
    def get_email_and_username(self):
        return f"{self.user.username}-{self.user.password}"


class Doctor(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name}"


class Patient(models.Model):
    GENDER_CHOICES_FEMALE = 'F'
    GENDER_CHOICES_MALE = 'M'
    GENDER_CHOICES_OTHERS = 'O'

    GENDER_CHOICES = [
        (GENDER_CHOICES_FEMALE, 'Female'),
        (GENDER_CHOICES_MALE, 'Male'),
        (GENDER_CHOICES_OTHERS, 'Other')
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, default=GENDER_CHOICES_MALE)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    file_number = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Appointment(models.Model):
    STATUS_SCHEDULED = 'Scheduled'
    STATUS_COMPLETED = 'Completed'
    STATUS_CANCELLED = 'Cancelled'
    STATUS_CHOICES = [(STATUS_SCHEDULED, 'Scheduled'),
                      (STATUS_COMPLETED, 'Completed'), (STATUS_CANCELLED, 'Cancelled')]

    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=STATUS_SCHEDULED)
    reason = models.TextField()

    @property
    def patient_file_number(self):
        return self.patient.file_number

    @property
    def patient_name(self):
        return f"{self.patient.first_name} {self.patient.last_name}"

    @property
    def doctor_name(self):
        return f"{self.doctor.first_name} {self.doctor.last_name}"

    @property
    def doctor_specialization(self):
        return self.doctor.specialization

    def __str__(self):
        return f"Appointment with Dr. {self.doctor.last_name} for {self.patient.first_name} {self.patient.last_name}"


class Receptionist(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receptionist_profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class LabTechnician(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lab_technician_profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Pharmacist(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pharmacist_profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
 

class Medicine(models.Model):
    name = models.CharField(max_length=255)
    unit = models.IntegerField()
    dosage = models.TextField(max_length=255, null=True)

    def __str__(self):
        return self.name


class Prescription(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_DESPENSED = 'dispensed'
    STATUS_CHOICES = [(STATUS_PENDING, 'Pending'),
                      (STATUS_DESPENSED, 'Dispensed')]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor,  on_delete=models.CASCADE)
    prescription_date = models.DateTimeField(auto_now_add=True)
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    instructions = models.TextField(default='3x3')
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)

    @property
    def patient_name(self):
        return f"{self.patient.first_name} {self.patient.last_name}"

    @property
    def doctor_name(self):
        return f"{self.doctor.first_name} {self.doctor.last_name}"

    @property
    def patient_file_number(self):
        return f"{self.patient.file_number}"

    @property
    def medicine_name(self):
        return f"{self.medicines.name}"

    def __str__(self):
        return f"Prescription for {self.patient.first_name} {self.patient.last_name}"


class Bill(models.Model):
    STATUS_UNPAID = 'Unpaid'
    STATUS_PAID = 'Paid'
    STATUS_CHOICES = [(STATUS_UNPAID, 'Unpaid'), (STATUS_PAID, 'Paid')]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_issued = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=STATUS_UNPAID)

    @property
    def patient_name(self):
        return f"{self.patient.first_name} {self.patient.last_name}"

    @property
    def patient_file_number(self):
        return self.patient.file_number


    def __str__(self):
        return f"Bill for {self.patient.first_name} {self.patient.last_name} - {self.amount}"


class LabResult(models.Model):
    STATUS_PENDING = 'Pending'
    STATUS_COMPLETED = 'Completed'
    STATUS_CHOICES = [(STATUS_PENDING, 'Pending'),
                      (STATUS_COMPLETED, 'Completed')]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    lab_technician = models.ForeignKey(
        LabTechnician, on_delete=models.CASCADE, null=True)
    test_type = models.CharField(max_length=100)
    result = models.TextField()
    date_conducted = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)

    @property
    def patient_name(self):
        return f"{self.patient.first_name} {self.patient.last_name}"

    @property
    def patient_file_number(self):
        return self.patient.file_number

    @property
    def doctor_name(self):
        return f"{self.doctor.first_name} {self.doctor.last_name}"

    @property
    def doctor_specialization(self):
        return self.doctor.specialization

    @property
    def lab_technician_name(self):
        return f"{self.lab_technician.first_name} {self.lab_technician.last_name}"

    def __str__(self):
        return f"{self.test_type} for {self.patient.first_name} {self.patient.last_name}"
