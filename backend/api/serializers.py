from rest_framework import serializers
from djoser.serializers import UserCreateSerializer,  UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    Doctor, Receptionist,
    Patient,
    LabTechnician,
    Pharmacist, Appointment,
    Prescription, Bill, LabResult, Medicine, Nurse
)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ['id', 'username', 'password',
                  'email', 'first_name', 'last_name', 'role']


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']


class AppointmentSerializer(serializers.ModelSerializer):
    # patient_name = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'doctor', 'patient_name', 'patient_file_number', 'doctor_name',
                  'doctor_specialization', 'appointment_date', 'reason', 'status'
                  ]

    # def get_patient_name(self, obj):
    #     return f"{obj.patient.first_name} {obj.patient.last_name}"

    # def get_doctor_name(self, obj):
    #     return f"{obj.doctor.first_name} {obj.doctor.last_name}"


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'first_name', 'last_name',
                  'specialization', 'phone_number', 'email']


class ReceptionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptionist
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email']


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name',
                  'gender', 'address', 'phone_number', 'email', 'file_number']


class LabTechnicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTechnician
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email']


class PharmacistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacist
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email']


class LabResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = LabResult
        fields = ['id', 'patient_name', 'patient_file_number', 'doctor_specialization',
                  'lab_technician_name', 'test_type', 'result', 'date_conducted', 'status']


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ['id', 'patient_name', 'patient_file_number',
                  'amount', 'date_issued', 'status']


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'unit', 'dosage']


class PrescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prescription
        fields = ['id', 'patient',  'patient_name', 'patient_file_number',
                  'doctor_name', 'prescription_date', 'medicine', 'medicine_name',
                  'instructions', 'status'
                  ]

    def create(self, validated_data):
        doctor_id = self.context['request'].user.id
        return Prescription.objects.create(doctor_id=doctor_id, **validated_data)


class NurseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nurse
        fields = ['id', 'full_name', 'email',
                  'license_number', 'year_of_experience', ]

    def validate_year_of_experience(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Year of experince cannot be less than  years")
        return value
