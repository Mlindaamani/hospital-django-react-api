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
    PharmacistViewSet,
    LabResultViewSet,
    MedicineViewSet,
    NurseViewSet
)


router = DefaultRouter()
router.APIRootView.__doc__ = "Welcome to ebotcare"
router.APIRootView.__name__ = "BACKEND"

router.register('doctors', DoctorViewSet, basename='doctors')
router.register('patients', PatientViewSet, basename='patients')
router.register('labtechnicians', LabTechnicianViewSet,
                basename='labtechnicians')
router.register('receptionists', ReceptionistViewSet, basename='receptionists')
router.register('pharmacists', PharmacistViewSet, basename='pharmacists')
router.register('prescriptions', PrescriptionViewSet, basename='prescriptions')
router.register('bills', BillViewSet, basename='bills')
router.register('appointments', AppointmentViewSet, basename='appointments')
router.register('labresults', LabResultViewSet, basename='labresults')
router.register('medicines', MedicineViewSet, basename='medicines')
router.register('nurses', NurseViewSet, basename='nurses')

urlpatterns = [
    # JWT Authentication URLS
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('auth/jwt/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # router-generated URLs
    path('', include(router.urls)),
]
