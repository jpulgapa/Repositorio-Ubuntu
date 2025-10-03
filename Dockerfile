# -------------------------------
# Etapa de construcción (build)
# -------------------------------
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiar pom.xml y dependencias primero (mejora la cacheo de capas)
COPY backend/pom.xml .
COPY backend/mvnw .
COPY backend/.mvn .mvn

# Descargar dependencias
RUN ./mvnw dependency:go-offline

# Copiar el código fuente
COPY backend/src src

# Compilar el proyecto (sin tests)
RUN ./mvnw clean package -DskipTests


# -------------------------------
# Etapa de producción (runtime)
# -------------------------------
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copiar solo el JAR generado
COPY --from=build /app/target/*.jar app.jar

# Exponer puerto
EXPOSE 8080

# Comando de arranque en producción
CMD ["java", "-jar", "app.jar"]
