from sangarcia.settings.base import *
import os

DEBUG = True

SECRET_KEY = '_%rs*g4rfum+8puwpfq*fa@+huu#$4n71r=-@v5q!7yf$tot%l'
FERNET_KEY = b'NPO1oN2Rv8Pqncvzz8NO4e8FwJcXUzY80bx6a--nFsA='

ALLOWED_HOSTS = ['*']

PROJECT_DIR = os.path.abspath(os.path.dirname(__file__))
FIXTURE_DIRS = (
   os.path.join(PROJECT_DIR, 'fixtures'),
)


# Ampliamos en desarrollo la duración de los token
OAUTH2_PROVIDER = {
    'REFRESH_TOKEN_EXPIRE_SECONDS': 60 * 1000, # 1000 Minutos
    'SCOPES': {'read': 'Read scope', 'write': 'Write scope'},
    'ACCESS_TOKEN_EXPIRE_SECONDS': 60 * 100 # 100 Minutos
}


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite3',
    }
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': os.getenv('DB_NAME', 'sangarcia'),
    #     'USER': os.getenv('DB_USER', 'sangarcia'),
    #     'PASSWORD': os.getenv('DB_PWD', ''),
    #     'HOST': os.getenv('DB_HOST', ''),
    #     'PORT': os.getenv('DB_PORT', ''),
    #     'ATOMIC_REQUESTS': True,
    # }
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': './sangarcia.log',
            'mode': 'w',
            'encoding':'utf8', # this fixes UnicodeEncodeError
        },
        'queryset': {
            'class': 'logging.FileHandler',
            'filename': './sangarcia_sql.log',
            'mode': 'w',
            'encoding': 'utf8', # this fixes UnicodeEncodeError
        },
        'terminal': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler'
        },
    },
    'loggers': {
        'root': {
            'handlers': ['file' ],
            'level': 'DEBUG',
            'propagate': True,
        },
        'django': {
            'handlers': ['file' ],
            'level': 'DEBUG',
            'propagate': True,
        },
        'django.db.backends': {  # Para las consultas SQL de Queryset
            'handlers': ['queryset'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'sangarcia.urls'

STATIC_ROOT = None
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

EMAIL_HOST = os.getenv('EMAIL_HOST', 'webmail.sandav.es')
EMAIL_PORT = os.getenv('EMAIL_PORT', '465')
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', 'cloudofjobs')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', 'LcLlqbi4uNAHQHjwiyCb')
EMAIL_USE_TLS = False
EMAIL_USE_SSL = True
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', 'cloudofjobs@sandav.es')

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

FRONTEND_URL = "http://127.0.0.1:3000"

# Default Django cache. This cache is per-process (see below) and thread-safe.
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
        'OPTIONS': {
            'MAX_ENTRIES': 10000000
        }
    }
}
