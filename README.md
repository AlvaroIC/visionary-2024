# Ionic Installation Guide and Project Execution (EN)

## Command to install Ionic:

npm install -g @ionic/cli

## Command to run the web version of the app:

ionic serve

## Commands to run the Android version of the app (Android Studio needs to be installed beforehand):

- ionic integrations enable capacitor
- ionic capacitor add android (only Android considered because there is a need for a Mac to properly open the pseudo-native IOS application with XCode)
- ionic build (builds the project)
- ionic capacitor sync android
- ionic capacitor open android (wait for Android Studio to complete all pending processes)
- ionic capacitor run android (optional: can also be run on the emulator within Android Studio)
  
## Command to execute the unit tests:

npm run test:unit

(Execute all from the root folder of the projet)


# Guía de instalación de Ionic y ejecución del proyecto (ES)

## Comando para instalar Ionic:

npm install -g @ionic/cli

## Comando para ejecutar la versión web de la aplicación:

ionic serve

## Comandos para ejecutar la versión Android de la aplicación (necesario tener Android Studio instalado de forma previa):

- ionic integrations enable capacitor
- ionic capacitor add android (solo se considera Android porque es necesario un Mac para abrir la aplicación pseudo-nativa de IOS de forma correcta con XCode)
- ionic build (hace la build del proyecto)
- ionic capacitor sync android
- ionic capacitor open android (esperar a que Android Studio finalice todos los procesos pendientes)
- ionic capacitor run android (opcional: también se puede ejecutar en el emulador dentro de Android Studio)

## Comando para ejecutar los tests unitarios:

npm run test:unit

(Todos deben ser ejecutados desde la carpeta raíz del proyecto)
