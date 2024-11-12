FROM python:3

RUN useradd -m myuser

COPY . /python-api

WORKDIR /python-api

RUN pip install -r requirements.txt

EXPOSE 5000

HEALTHCHECK CMD curl --fail http://localhost:5000/health || exit 1

USER myuser
CMD ["python", "main.py"]
