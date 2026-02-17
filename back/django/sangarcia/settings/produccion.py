from sangarcia.settings.base import *

import os
import ast

SECRET_KEY = os.getenv(
    'SECRET_KEY', '!5xzake&%a6^8tr3a&*q*np05^kp@!idqvel8u#n@(#f3+td$u')

DEBUG = os.getenv('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'api.sandav.es').split(";")

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', ''),
        'USER': os.getenv('DB_USER', ''),
        'PASSWORD': os.getenv('DB_PASSWORD', ''),
        'HOST': os.getenv('DB_HOST', 'db'),
        'PORT': os.getenv('DB_PORT', '5432'),
        'ATOMIC_REQUESTS': True,
    }
}

#CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = os.getenv('CORS_WHITELIST', 'sangarcia.sandav.es').split(";")

FRONTEND_URL = os.getenv('FRONTEND_URL', "https://sangarcia.sandav.es")

STATIC_ROOT = os.path.join(BASE_DIR, "static")

CACHES = {
    'default': {
        "BACKEND": "django.core.cache.backends.memcached.PyMemcacheCache",
        "LOCATION": "unix:/socks/memcached.sock",
        "LOCATION": "cache:11211",
    }
}

EMAIL_HOST = os.getenv('EMAIL_HOST', '')
EMAIL_PORT = os.getenv('EMAIL_PORT', '')
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', '')


# Admins que recibirán emails de problemas
ADMINS_ENV = os.getenv('ADMINS', '("soporte", "soporte@sandav.es"),')
ADMINS = list(ast.literal_eval(ADMINS_ENV))


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': './app.log',
            'mode': 'w',
            'encoding':'utf8', # this fixes UnicodeEncodeError
        },
        'queryset': {
            'class': 'logging.FileHandler',
            'filename': './app_sql.log',
            'mode': 'w',
            'encoding': 'utf8', # this fixes UnicodeEncodeError
        },
           'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'include_html': True,
        },
       
    },
    'loggers': {
        'root': {
            'handlers': ['file' ],
            'level': 'ERROR',
            'propagate': True,
        },
        'django': {
            'handlers': ['file' ],
            'level': 'ERROR',
            'propagate': True,
        },
        'django.db.backends': {  # Para las consultas SQL de Queryset
            'handlers': ['queryset'],
            'level': 'ERROR',
            'propagate': False,
        },
    }
}
