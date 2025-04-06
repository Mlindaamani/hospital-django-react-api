from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsDoctorOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.role == 'doctor')


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'doctor'


class IsReceptionist(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'receptionist'


class IsLabTech(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'lab_tech'


class IsAdminOrDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['doctor', 'admin']


class IsAdminOrReceptionist(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role.role in ['receptionist', 'admin']


class IsAdminOrLabTech(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['lab_tech', 'admin']


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['admin']


class IsAdminOrDoctorOrReceptionist(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['doctor', 'admin', 'receptionist', 'patient', 'lab_tech']


class IsAdminOrDoctorOrLabTech(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['doctor', 'admin', 'lab_tech']


class IsAdminOrDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['doctor', 'admin']


class IsAdminOrReceptionistOrLabTech(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['receptionist', 'admin', 'lab_tech']


class IsAdminOrReceptionistOrOrPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['receptionist', 'admin',  'patient', 'doctor', 'lab_tech']
