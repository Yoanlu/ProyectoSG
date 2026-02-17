#!/bin/bash
while :
do
	echo -ef "Ejecución de Cron a las $(date)"
	cd /app && /usr/local/bin/python manage.py runcrons
	echo -ef "Ejecutado, esperando 5 minutos..."
	sleep 300
done	
