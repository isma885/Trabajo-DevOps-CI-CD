from app import app
from flaskext.mysql import MySQL
import os
mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = os.environ.get('MYSQL_DATABASE_USER')
password = os.environ.get('MYSQL_DATABASE_PASSWORD')
app.config['MYSQL_DATABASE_PASSWORD'] = password
app.config['MYSQL_DATABASE_DB'] = os.environ.get('MYSQL_DATABASE_DB')
mysql_host = os.environ.get('MYSQL_DATABASE_HOST')
app.config['MYSQL_DATABASE_HOST'] = mysql_host or 'localhost'
mysql_port = os.environ.get('MYSQL_DATABASE_PORT')
app.config['MYSQL_DATABASE_PORT'] = int(mysql_port) if mysql_port else 3306

print(app.config)
mysql.init_app(app)
