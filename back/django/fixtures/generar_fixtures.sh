# Desde Linux se generan con utf8
# Desde Windows habria que generarlo desde el cmd (con powershell no se genera bien) y convertirlo de ansi a utf8

python manage.py dumpdata --format json --indent 4 auth.user > fixtures/auth.json
python manage.py dumpdata --natural-foreign --natural-primary --format json --indent 4 auth.group > fixtures/perfiles.json
python manage.py dumpdata --format json --indent 4 oauth2_provider.application > fixtures/oauth2.json
python manage.py dumpdata --format json --indent 4 general.idiomas > fixtures/idiomas.json