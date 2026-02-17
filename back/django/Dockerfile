ARG PYTHON_VERSION=3.13
FROM python:$PYTHON_VERSION

RUN apt-get update && \
    apt-get install -y locales gettext && \
    sed -i -e 's/# es_ES.UTF-8 UTF-8/es_ES.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales
ENV LANG=es_ES.UTF-8 LC_ALL=es_ES.UTF-8

WORKDIR /app
COPY ./requirements_prod.txt /app/

RUN python -m pip install --no-cache-dir -r requirements_prod.txt
RUN python -m pip install --no-cache-dir uwsgi

COPY ./ /app
VOLUME /app/static /app/media /app/locale

CMD ["uwsgi", "--ini", "uwsgi.ini"]
