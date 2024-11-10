curl http://localhost:8080/react/










# Correcciones en archivos de codigo para que pase el pipeline de LINTING

# 1 Espacios adicionales en archivo db_config.py luego del operador =
# ./db_config.py:7:40: E222 multiple spaces after operator
# app.config['MYSQL_DATABASE_USER'] = os.environ.get('MYSQL_DATABASE_USER')
# app.config['MYSQL_DATABASE_PASSWORD'] =  os.environ.get('MYSQL_DATABASE_PASSWORD')
# app.config['MYSQL_DATABASE_DB'] =  os.environ.get('MYSQL_DATABASE_DB')
# app.config['MYSQL_DATABASE_HOST'] =  os.environ.get('MYSQL_DATABASE_HOST')  or 'localhost'
# app.config['MYSQL_DATABASE_PORT'] =  int(os.environ.get('MYSQL_DATABASE_PORT')) or 3306


# 2 Linea demasiado larga
# ./db_config.py:9:80: E501 line too long (90 > 79 characters)
# app.config['MYSQL_DATABASE_HOST'] = os.environ.get('MYSQL_DATABASE_HOST')  or 'localhost'
# Cambie esa linea de 90 caracteres a estas dos:
# mysql_host = os.environ.get('MYSQL_DATABASE_HOST')
# app.config['MYSQL_DATABASE_HOST'] = mysql_host or 'localhost'

# ./db_config.py:10:80: E501 line too long (87 > 79 characters)
# app.config['MYSQL_DATABASE_PORT'] = int(os.environ.get('MYSQL_DATABASE_PORT')) or 3306
# La cambie por estas:
# mysql_port = os.environ.get('MYSQL_DATABASE_PORT')
# app.config['MYSQL_DATABASE_PORT'] = int(mysql_port) if mysql_port else 3306

# 3 En el archivo main.py tambien se hacen correcciones
# ./main.py:3:1: F401 'time' imported but unused
# ./main.py:6:1: F401 'flask.flash' imported but unused
# ./main.py:7:1: F401 'werkzeug.security.check_password_hash' imported but unused
# Elimine estas tres importaciones

# ./main.py:9:1: E302 expected 2 blank lines, found 1
# Para esto separe cada uno de los endpoints con dos lineas en blanco en lugar de solo una

# ./main.py:11:1: W191 indentation contains tabs
# Para esto cambie todos los tabs por espacios

# ./main.py:19:4: E265 block comment should start with '# '
# Para esto agregue un espacio luego del # en el comentario

# ./main.py:22:80: E501 line too long (88 > 79 characters)
# sql = "INSERT INTO tbl_user(user_name, user_email, user_password) VALUES(%s, %s, %s)"
# La reemplaze por :
# sql = (
#    "INSERT INTO tbl_user(user_name, user_email, user_password) "
#    "VALUES(%s, %s, %s)")

# ./main.py:36:17: W291 trailing whitespace
# Le saque el espacio a la linea 
#         cursor.close() 

# Tambien cambie esta linea y la puse en dos
#            sql = "UPDATE tbl_user SET user_name=%s, user_email=%s, user_password=%s WHERE user_id=%s"



