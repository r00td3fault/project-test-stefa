# project-test-stefa
Proyecto de prueba serverles + typescritp + node

## Stack
- Clean architecture
- node20
- Docker
- serverless3.40
- typescript
- DynamoDb
- mysql


## Endpoints
- GET /fusionados
- POST /almacenar
- GET /historial
- POST /auth/register
- POST /auth/login
- GET /auth/validate 
- GET /swagger

## Modelado del sistema
Se implementó una arquitectura limpia para desacoplar la logica de negocio de su implementacion

### entidades
![Entidades](/assets/images/enttities.PNG)

### Basic Endpoints
![Basic Endpoints](/assets/images/principalEps.PNG)

### Repositories 
![Repositories](/assets/images/reposiories.PNG)

### Services
![Services](/assets/images/servicies.PNG)

### Casos de uso
![Casos de uso](/assets/images/getmergedUsecase.PNG)

### Protected
![Protegidos](/assets/images/protected.PNG)

### User
![User](/assets/images/aut.PNG)

## Comandos
```bash
sls offline start #para correr en local
docker compose up -d #Para levantar la base de datos
sls deploy --aws-profile <your creential profile> # desplegar en aws
npm run test # para correr los test primero debe estar desplegado ya que se prueba sobre el entorno
sls print # te ayuda a depurar variables de entorno y config
```

## Capturas de uso

![Registro](/assets/images/register.PNG)
![Login](/assets/images/login.PNG)
![Verificación de token fallida](/assets/images/errorToken.PNG)
![Verificación de token exitosa](/assets/images/succesValidation.PNG)
![Historial](/assets/images/getHistorial.PNG)
