#!/bin/bash
echo "Iniciando aplicación CRUD en modo PRODUCCIÓN..."
# Llama a 'make up' del Makefile.prod, que usa SOLO el archivo 'docker-compose.yml'.
make -f Makefile.prod up
echo "Aplicación de PRODUCCIÓN iniciada. Verifica la configuración de puertos."
