from django.utils import timezone
from rest_framework import serializers
from .models import User
from djoser.serializers import UserCreateSerializer,  UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (Doctor, Receptionist, Patient, LabTechnician ,Appointment,
    Prescription, Bill, LabResult, Medicine)
from .choices import   PrescriptionChoice

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        return token


class CustomUserCreateSerializer(UserCreateSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'role']
        read_only_fields = ['id']
 

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User.objects.create_user(password=password, **validated_data)
        return user

class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields= ['id', 'first_name', 'last_name', 'email', 'role', "patient_profile_url"]


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'id', 
            'patient',
            'doctor', 
            'patient_name',
            'patient_file_number',
            'doctor_name',
            'doctor_specialization', 
            'appointment_date',
            'reason', 
            'status'
        ]
        read_only_fields = ['id', 'patient', 'patient_name', 'patient_file_number', 'doctor_name', 'doctor_specialization']


    def validate(self, data):
        if data['appointment_date'] < timezone.now():
            raise serializers.ValidationError("Appointment date cannot be in the past")
        return data
        

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'specialization', 'first_name', 'last_name', 'year_of_experience', 'bio', 'license_number']


class ReceptionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptionist
        fields = ['id', 'specialization', 'year_of_experience', 'bio']


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'id', 
            'user',
            'first_name',
            'last_name',
            'file_number',
            'address',
            'has_insurance',
            'profile_picture', 
            'has_insurance',
            'gender',
        ]


class LabTechnicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTechnician
        fields = ['id', 'specialization', 'year_of_experience', 'bio']



class LabResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = LabResult
        fields = ['id', 'test_type', 'result', 'patient', 'patient_name', 'patient_file_number', 
                  'date_conducted','status',  'lab_technician', 'lab_technician_name', 'lab_technician_license_number'
                  ]


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
        request = self.context['request']
        
        if request.user.is_authenticated:
           doctor_id = request.user.id
           return Prescription.objects.create(doctor_id=doctor_id, **validated_data)
        raise serializers.ValidationError("Invalid request")
    
    def delete(self, instance):
        # Check if the prescription is completed
        if instance.status == PrescriptionChoice.STATUS_DESPENSED:
            raise serializers.ValidationError("Cannot delete a completed prescription.")
        # Update the deleted field to True
        instance.deleted = True
        return instance


