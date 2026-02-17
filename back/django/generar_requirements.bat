@REM Requirements para desarrollo
@REM pip freeze > requirements.txt
pip-chill > requirements.txt

@REM Requirements para produccion
@REM pip-chill --no-chill > requirements_prod.txt
@REM echo pymemcache==4.0.0 >> requirements_prod.txt