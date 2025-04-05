from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.decorators import action



from .permissions import (
     IsReceptionist, IsPharmacist, IsAdminOrDoctorOrLabTech, IsNurse,
    IsAdmin, IsAdminOrDoctorOrReceptionist, IsAdminOrReceptionistOrPharmacistOrPatientOrNurse)

from .serializers import (
    DoctorSerializer, ReceptionistSerializer, PatientSerializer,
    LabResultSerializer, PharmacistSerializer, LabTechnicianSerializer,
    AppointmentSerializer, BillSerializer, PrescriptionSerializer,
    CustomTokenObtainPairSerializer, MedicineSerializer, NurseSerializer)

from .models import (Doctor, Receptionist, Patient, LabResult, Pharmacist, LabTechnician, Appointment, Bill, Prescription, Medicine, Nurse)
from .choices import RoleChoices


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



class BaseViewSet(ModelViewSet):
    pass
    
    # def perform_create(self, serializer):
    #     print(serializer.validated_data)
    #     # Get the request object
    #     request = self.request
    #     # Check if the user is a doctor, lab technician, patient, or receptionist
    #     if hasattr(request.user, 'doctor'):
    #         # Set the doctor to the logged-in doctor
    #         serializer.validated_data['doctor'] = request.user.doctor

    #     # Check if the user is a lab technician, patient, or receptionist
    #     elif hasattr(request.user, 'labtechnician'):
    #         # Set the lab technician to the logged-in lab technician
    #         serializer.validated_data['lab_technician'] = request.user.labtechnician

    #     # Check if the user is a patient or receptionist
    #     elif hasattr(request.user, 'patient'):
    #         # Set the patient to the logged-in patient
    #         serializer.validated_data['patient'] = request.user.patient


    #     elif hasattr(request.user, 'receptionist'):
    #         # Set the receptionist to the logged-in receptionist
    #         serializer.validated_data['receptionist'] = request.user.receptionist
    #     # Save the serializer
    #     serializer.save()



class MedicineViewSet(BaseViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


class NurseViewSet(BaseViewSet):
    queryset = Nurse.objects.all()
    serializer_class = NurseSerializer
    permission_classes = [IsNurse]


class DoctorViewSet(BaseViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAdminOrReceptionistOrPharmacistOrPatientOrNurse]


class PrescriptionViewSet(BaseViewSet):
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAdminOrDoctorOrLabTech]

    def get_queryset(self):
        user = self.request.user
        if user.role == RoleChoices.DOCTOR:
            return Prescription.objects.filter(doctor__user=user)
        else:
            return Prescription.objects.all()


class LabTechnicianViewSet(BaseViewSet):
    queryset = LabTechnician.objects.all()
    serializer_class = LabTechnicianSerializer
    permission_classes = [IsAdminOrDoctorOrLabTech]


class BillViewSet(BaseViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [IsAdmin]
    


class AppointmentViewSet(BaseViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAdminOrDoctorOrReceptionist]

    def get_queryset(self):
        user = self.request.user
        
        if user.role == RoleChoices.DOCTOR:
            return Appointment.objects.filter(doctor__user=user)
        
        elif user.role == RoleChoices.RECEPTIONIST:
            return Appointment.objects.filter(receptionist__user=user)
        
        elif user.role == RoleChoices.PATIENT:
            return Appointment.objects.filter(patient__user=user)
        
        elif user.role == RoleChoices.NURSE:
            return Appointment.objects.filter(nurse__user=user)
        
        elif user.role == RoleChoices.LAB_TECH:
            return Appointment.objects.filter(lab_technician__user=user)
        else:
            return Appointment.objects.all()


class PharmacistViewSet(BaseViewSet):
    queryset = Pharmacist.objects.all()
    serializer_class = PharmacistSerializer
    permission_classes = [IsPharmacist]


class LabResultViewSet(BaseViewSet):
    queryset = LabResult.objects.all()
    serializer_class = LabResultSerializer
    permission_classes = [IsAdminOrDoctorOrLabTech]


class ReceptionistViewSet(BaseViewSet):
    queryset = Receptionist.objects.all()
    serializer_class = ReceptionistSerializer
    permission_classes = [IsReceptionist]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer=serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)  
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
        
       
class PatientViewSet(BaseViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAdminOrDoctorOrReceptionist]

