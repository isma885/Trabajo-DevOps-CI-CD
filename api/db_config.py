from app import app
from flaskext.mysql import MySQL
import os
mysql = MySQL()
 
 
# MySQL configurations
# app.config['MYSQL_DATABASE_USER'] = 'testuser'
# app.config['MYSQL_DATABASE_PASSWORD'] = 'testuserpass'
# app.config['MYSQL_DATABASE_DB'] = 'test'
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# app.config['MYSQL_DATABASE_PORT'] = 3306

app.config['MYSQL_DATABASE_USER'] = os.environ.get('MYSQL_DATABASE_USER')
app.config['MYSQL_DATABASE_PASSWORD'] =  os.environ.get('MYSQL_DATABASE_PASSWORD')
app.config['MYSQL_DATABASE_DB'] =  os.environ.get('MYSQL_DATABASE_DB')
app.config['MYSQL_DATABASE_HOST'] =  os.environ.get('MYSQL_DATABASE_HOST')  or 'localhost'
app.config['MYSQL_DATABASE_PORT'] =  int(os.environ.get('MYSQL_DATABASE_PORT')) or 3306
print(app.config)
mysql.init_app(app)
# conn = mysql.connect()
# conn.close()