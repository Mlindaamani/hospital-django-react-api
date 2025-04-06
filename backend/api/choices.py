
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
    FEMALE = 'F'
    MALE = 'M'
    OTHERS = 'O'

    GENDER_CHOICES = [
        (FEMALE, 'Female'),
        (MALE, 'Male'),
        (OTHERS, 'Other')
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


class  SpecializationChoice:
    CARDIOLOGY = 'Cardiology'
    DERMATOLOGY = 'Dermatology'
    PEDIATRICS = 'Pediatrics'
    ORTHOPEDICS = 'Orthopedics'
    GYNECOLOGY = 'Gynecology'
    NEUROLOGY = 'Neurology'
    PSYCHIATRY = 'Psychiatry'
    RADIOLOGY = 'Radiology'
    GENERAL_MEDICINE = 'General Medicine'
    SPECIALIZATION_CHOICES = [
        (CARDIOLOGY, 'Cardiology'),
        (DERMATOLOGY, 'Dermatology'),
        (PEDIATRICS, 'Pediatrics'),
        (ORTHOPEDICS, 'Orthopedics'),
        (GYNECOLOGY, 'Gynecology'),
        (NEUROLOGY, 'Neurology'),
        (PSYCHIATRY, 'Psychiatry'),
        (RADIOLOGY, 'Radiology'),
        (GENERAL_MEDICINE, 'General Medicine')
    ]