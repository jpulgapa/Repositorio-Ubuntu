#!/bin/bash
echo "Iniciando aplicación CRUD..."
make up
echo "Aplicación iniciada. Accede a:"
echo "Frontend: http://localhost:3005"
echo "Backend: http://localhost:8080"
echo "Base de datos MySQL en el contenedor 'mysql' en el puerto 3306."
echo "Para detener la aplicación, usa 'make down'."
