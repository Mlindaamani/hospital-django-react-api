
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    Patient, Doctor, Receptionist,
    LabTechnician,
    Appointment, LabResult,
    Prescription, Bill, User, Medicine
)

from .forms import CustomUserCreationForm, CustomUserChangeForm

@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User

    list_display = ['first_name', 'email',  'last_name', 'is_superuser', 'role', 'phone_number']
    list_filter = ['is_staff', 'is_superuser', 'role']
    search_fields = ['email', 'first_name', 'last_name']
    ordering = ['email']
    filter_horizontal = ()

    fieldsets = (
        ('Authentication Infomation', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'role', 'password1', 'password2'),
        }),
    )


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['user__first_name', 'user__last_name',
                    'specialization', 'user__phone_number', 'user__email']
    list_filter = ['specialization']


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ['name', 'dosage', 'stock']
    list_filter = ['stock']
    list_editable = ['stock']


@admin.register(Receptionist)
class ReceptionistAdmin(admin.ModelAdmin):
    list_display = ['user__first_name', 'user__last_name', 'user__email']
    list_filter = ['user__first_name']


@admin.register(LabTechnician)
class LabTechnicianAdmin(admin.ModelAdmin):
    list_display = ['id', 'user__first_name', 'user__last_name', 'user__email']
    list_filter = ['user__first_name']



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
    list_display = [ 'patient', 'doctor',
                    'prescription_date', 'medicine', 'instructions', 'status']
    list_filter = ['status', 'prescription_date']
    list_editable = ['status']


@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = ['patient', 'amount', 'date_issued', 'status']
    list_filter = ['status', 'amount']


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = [ 'user__first_name', 'user__last_name', 'gender', 'address',
                    'user__phone_number', 'user__email',  'file_number']
    list_per_page = 30
    list_editable = ['gender']
