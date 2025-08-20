#!/usr/bin/env bash
# build.sh for Render deployment

set -o errexit  # exit on error

pip install -r requirements.txt

python manage.py collectstatic --noinput
python manage.py migrate