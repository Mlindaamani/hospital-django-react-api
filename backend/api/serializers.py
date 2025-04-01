from rest_framework import serializers
from djoser.serializers import UserCreateSerializer,  UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from .models import (Doctor, Receptionist, Patient, LabTechnician, Pharmacist, Appointment,
    Prescription, Bill, LabResult, Medicine, Nurse
)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role 
        return token



class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'role']

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User.objects.create_user(password=password, **validated_data)
        return user

class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields= ['id', 'first_name', 'last_name', 'email', 'password', 'role']


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'doctor', 'patient_name', 'patient_file_number', 'doctor_name',
                  'doctor_specialization', 'appointment_date', 'reason', 'status'
                  ]

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'specialization', 'year_of_experience', 'bio', 'license_number']


class ReceptionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptionist
        fields = ['id', 'specialization', 'year_of_experience', 'bio']


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'specialization', 'year_of_experience', 'bio']


class LabTechnicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTechnician
        fields = ['id', 'specialization', 'year_of_experience', 'bio']


class PharmacistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacist
        fields = ['id', 'specialization', 'year_of_experience', 'bio']


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
                  'instructions', 'status']

    
    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
           doctor_id = request.user.id
           return Prescription.objects.create(doctor_id=doctor_id, **validated_data)
        raise serializers.ValidationError("Invalid request")


class NurseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nurse
        fields = ['id', 'specialization', 'year_of_experience', 'bio']

    def validate_year_of_experience(self, value):
        if value < 0:
           raise serializers.ValidationError(
            "Year of experience cannot be negative."
        )
        return value


