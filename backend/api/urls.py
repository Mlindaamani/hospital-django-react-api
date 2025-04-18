from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    DoctorViewSet,
    ReceptionistViewSet,
    PatientViewSet,
    PrescriptionViewSet,
    LabTechnicianViewSet,
    BillViewSet,
    AppointmentViewSet,
    LabResultViewSet,
    MedicineViewSet,
)


router = DefaultRouter()
router.APIRootView.__name__ = "BACKEND"

router.register('doctors', DoctorViewSet, basename='doctors')
router.register('patients', PatientViewSet, basename='patients')
router.register('labtechnicians', LabTechnicianViewSet,
                basename='labtechnicians')
router.register('receptionists', ReceptionistViewSet, basename='receptionists')
router.register('prescriptions', PrescriptionViewSet, basename='prescriptions')
router.register('bills', BillViewSet, basename='bills')
router.register('appointments', AppointmentViewSet, basename='appointments')
router.register('labresults', LabResultViewSet, basename='labresults')
router.register('medicines', MedicineViewSet, basename='medicines')
from hms import settings

urlpatterns = [
    path('api/auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/jwt/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
]




# POST /auth/users/ → Register a new user

# POST /auth/jwt/create/ → Log in

# POST /auth/jwt/refresh/ → Refresh token

# POST /auth/jwt/verify/ → Verify token

# GET /auth/users/me/ → Get current user
