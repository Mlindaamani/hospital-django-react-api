
from django.contrib import admin

from .models import (
    Patient, Doctor, Receptionist,
    LabTechnician, Pharmacist,
    Appointment, LabResult,
    Prescription, Bill, User, Medicine, Nurse

)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email', 'is_superuser', 'role']
    list_per_page = 30
    list_editable = ['role']
    actions = ["send_email"]

    def send_email(self, request, queryset):
        for obj in queryset:
            obj.send_monthly_report()
            self.message_user(request, f"Monthly report sent to {obj.email}")
    

@admin.register(Nurse)
class NurseAdmin(admin.ModelAdmin):
    list_display = ['user', 'year_of_experience', 'license_number']


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['user__first_name', 'user__last_name',
                    'specialization', 'user__phone_number', 'user__email']
    list_filter = ['specialization']


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ['name', 'dosage', 'unit']
    list_filter = ['unit']
    list_editable = ['unit']


@admin.register(Receptionist)
class ReceptionistAdmin(admin.ModelAdmin):
    list_display = ['user__first_name', 'user__last_name', 'user__email']
    list_filter = ['user__first_name']


@admin.register(LabTechnician)
class LabTechnicianAdmin(admin.ModelAdmin):
    list_display = ['id', 'user__first_name', 'user__last_name', 'user__email']
    list_filter = ['user__first_name']


@admin.register(Pharmacist)
class PharmacistAdmin(admin.ModelAdmin):
    list_display = ['user__first_name', 'user__last_name', 'user__email']
    list_filter = ['user__first_name']
    list_per_page= 10


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['patient', 'doctor',
                    'appointment_date', 'status', 'reason']
    list_filter = ['status', 'doctor', 'appointment_date']
    list_select_related = ['patient', 'doctor']
    search_fields = ['patient__first_name', 'doctor__first_name']
    list_editable = ['status']


@admin.register(LabResult)
class LabResultAdmin(admin.ModelAdmin):
    list_display = ['patient', 'lab_technician',
                    'test_type', 'result', 'date_conducted', 'status']
    list_filter = ['status', 'test_type']
    list_editable = ['status']


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient', 'doctor',
                    'prescription_date', 'medicine', 'instructions', 'status']
    list_filter = ['status', 'prescription_date']
    list_editable = ['status']


@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = ['patient', 'amount', 'date_issued', 'status']
    list_filter = ['status', 'amount']


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['id', 'user__first_name', 'user__last_name', 'gender', 'address',
                    'user__phone_number', 'user__email',  'file_number']
    list_per_page = 30
    list_editable = ['gender']
