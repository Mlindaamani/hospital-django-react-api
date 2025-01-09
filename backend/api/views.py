
from .permissions import (
    IsAdminOrDoctor, IsReceptionist, IsPharmacist, IsAdminOrDoctorOrLabTech, IsNurse,
    IsAdmin, IsAdminOrDoctorOrReceptionist
)
from .serializers import (
    DoctorSerializer, ReceptionistSerializer, PatientSerializer,
    LabResultSerializer, PharmacistSerializer, LabTechnicianSerializer,
    AppointmentSerializer, BillSerializer, PrescriptionSerializer,
    CustomTokenObtainPairSerializer, MedicineSerializer, NurseSerializer
)
from .models import (
    Doctor, Receptionist, Patient, LabResult,
    Pharmacist, LabTechnician, Appointment, Bill,
    Prescription, CustomUser, Medicine, Nurse
)
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.decorators import action


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class BaseViewSet(ModelViewSet):
    def destroy(self, request, pk):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_serializer_context(self):
        return {'request': self.request}


class MedicineViewSet(BaseViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


class NurseViewSet(BaseViewSet):
    queryset = Nurse.objects.all()
    serializer_class = NurseSerializer
    permission_classes = [IsNurse]

    @action(detail=False, methods=['post'], url_path='profile')
    def profile(self, request):
        user = request.user

        serializer = NurseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = Nurse.objects.create(user=user, **serializer.validated_data)
        return Response({"detail": "Nurse profile created successfully!"}, status=status.HTTP_201_CREATED)


class DoctorViewSet(BaseViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAdminOrDoctorOrReceptionist]


class PrescriptionViewSet(BaseViewSet):
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAdminOrDoctor]

    def get_queryset(self):
        user = self.request.user
        if user.role == CustomUser.DOCTOR:
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
        if user.role == CustomUser.DOCTOR:
            return Appointment.objects.filter(doctor__user=user)
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
        patial  = kwargs.pop('patial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, request.data, patial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
       
class PatientViewSet(BaseViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAdminOrDoctorOrReceptionist]

