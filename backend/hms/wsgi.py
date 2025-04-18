"""
WSGI config for hms project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hms.settings')

application = get_wsgi_application()
