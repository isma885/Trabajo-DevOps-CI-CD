FROM python:3

# Copy app
COPY . /python-api

WORKDIR /python-api

# Install dependenceis
RUN pip install -r requirements.txt

# Expose port 5000
EXPOSE 5000

# Run the server when container is launched
CMD ["python", "main.py"]
