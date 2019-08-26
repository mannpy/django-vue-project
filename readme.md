# Django-vue-project

This is django-vue test project to process some stories.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install Django-vue-project.

Development
```bash
pip install -r requirements/local.txt 
```

Production
```bash
pip install -r requirements/production.txt 
```

## Usage

You should to add secrets.json containing SECRET_KEY as follow:

```json
{
"SECRET_KEY": "SOME-SECRET-KEY"
}

```
Then to run in development

```bash
python manage.py runserver --settings=config.settings.local
```