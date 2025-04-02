
class RoleChoices:
    ADMIN = 'admin'
    DOCTOR = 'doctor'
    RECEPTIONIST = 'receptionist'
    LAB_TECH = 'lab_tech'
    PHARMACIST = 'pharmacist'
    NURSE = 'nurse'
    PATIENT='patient'
    ROLE_CHOICES = [
        (ADMIN, 'Admin'), (DOCTOR, 'Doctor'),
        (RECEPTIONIST, 'Receptionist'),
        (LAB_TECH, 'Lab Technician'),
        (PHARMACIST, 'Pharmacist'),
        (NURSE, 'Nurse'),
        (PATIENT, 'Patient')
    ]
    


class PatientGenderChoices:
    GENDER_CHOICES_FEMALE = 'F'
    GENDER_CHOICES_MALE = 'M'
    GENDER_CHOICES_OTHERS = 'O'

    GENDER_CHOICES = [
        (GENDER_CHOICES_FEMALE, 'Female'),
        (GENDER_CHOICES_MALE, 'Male'),
        (GENDER_CHOICES_OTHERS, 'Other')
    ]

class AppointmentChoice:
    STATUS_SCHEDULED = 'Scheduled'
    STATUS_COMPLETED = 'Completed'
    STATUS_CANCELLED = 'Cancelled'
    STATUS_CHOICES = [
        (STATUS_SCHEDULED, 'Scheduled'), 
        (STATUS_COMPLETED, 'Completed'), 
        (STATUS_CANCELLED, 'Cancelled')
    ]

class PrescriptionChoice:
    STATUS_PENDING = 'pending'
    STATUS_DESPENSED = 'dispensed'
    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_DESPENSED, 'Dispensed')
    ]
    

class LabResultsChoice:
    STATUS_PENDING = 'Pending'
    STATUS_COMPLETED = 'Completed'
    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_COMPLETED, 'Completed')
    ]


class BillChoice:
    STATUS_UNPAID = 'Unpaid'
    STATUS_PAID = 'Paid'
    STATUS_CHOICES = [(STATUS_UNPAID, 'Unpaid'), (STATUS_PAID, 'Paid')]