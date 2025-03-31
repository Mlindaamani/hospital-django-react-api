from django.contrib.auth.models import BaseUserManager

class HmsAccountManager(BaseUserManager):
    def create_user(self, email, password=None):
        email = self.normalize_email(email=email)
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        email = self.normalize_email(email=email)
        user = self.create_user(email=email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user