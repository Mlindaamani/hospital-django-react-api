from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from .permissions import (IsReceptionist, IsAdminOrDoctorOrLabTech, IsAdminOrDoctorOrReceptionist)

from .serializers import (
    DoctorSerializer, ReceptionistSerializer, PatientSerializer,
    LabResultSerializer, LabTechnicianSerializer,
    AppointmentSerializer, BillSerializer, PrescriptionSerializer,
    CustomTokenObtainPairSerializer, MedicineSerializer)

from .models import (Doctor, Receptionist, Patient, LabResult, LabTechnician, Appointment, Bill, Prescription, Medicine)
from .choices import RoleChoices


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class BaseViewSet(ModelViewSet):
    pass


class MedicineViewSet(BaseViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


class DoctorViewSet(BaseViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = []


class PrescriptionViewSet(BaseViewSet):
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAdminOrDoctorOrLabTech]

    def get_queryset(self):
        user = self.request.user
        if user.role == RoleChoices.DOCTOR:
            return Prescription.objects.filter(doctor=user.doctor)
        else:
            return Prescription.objects.all()


class LabTechnicianViewSet(BaseViewSet):
    queryset = LabTechnician.objects.all()
    serializer_class = LabTechnicianSerializer
    permission_classes = [IsAdminOrDoctorOrLabTech]


class BillViewSet(BaseViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'patient'):
            return Bill.objects.filter(patient=user.patient)
        
        elif hasattr(user, 'doctor'):
            return Bill.objects.filter(doctor=user.doctor)
        elif user.role == RoleChoices.ADMIN or hasattr(user, 'receptionist'):
            return Bill.objects.all()
        else:
            return Bill.objects.none()
    


class AppointmentViewSet(BaseViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAdminOrDoctorOrReceptionist]

    def perform_create(self, serializer):
        user = self.request.user

        if not hasattr(user, 'patient'):
            raise PermissionDenied("You do not have permission to create an appointment.")
        serializer.save(patient=user.patient)

     
    def get_queryset(self):
        user = self.request.user

        if hasattr(user, 'doctor'):
            scheduled = Appointment.objects.today()
            print(list(scheduled))
            return Appointment.objects.filter(doctor=user.doctor)
        
        elif hasattr(user, 'patient'):
            return Appointment.objects.filter(patient=user.patient)
        
        elif user.role in [RoleChoices.RECEPTIONIST, RoleChoices.ADMIN]:
            return Appointment.objects.all()
        else:
            return Appointment.objects.none()
        
        
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def cancel(self, request, pk=None):
        appointment = self.get_object()
        if request.user != appointment.patient.user:
            raise PermissionDenied("You can only cancel your own appointments.")
        appointment.status = AppointmentChoice.STATUS_CANCELLED
        appointment.save()
        return Response({"detail": "Appointment cancelled."})



class LabResultViewSet(BaseViewSet):
    queryset = LabResult.objects.all()
    serializer_class = LabResultSerializer
    permission_classes = [IsAdminOrDoctorOrLabTech]


class ReceptionistViewSet(BaseViewSet):
    queryset = Receptionist.objects.all()
    serializer_class = ReceptionistSerializer
    permission_classes = [IsReceptionist]

       
class PatientViewSet(BaseViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAdminOrDoctorOrReceptionist]

