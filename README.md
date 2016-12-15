# charlex
Charla "De 0 a app movil con API web en 1 hora"

### Slides
Las slides están en [este Google doc](https://docs.google.com/presentation/d/1vTF11tbRXaKfFASuMBonaQad3oJg2yX4mhD6pJPuIbw/).

### Estructura
La charla está armada en tres etapas:

1. **Inicial**:
   - Modelos de datos básicos y la API para interactuar con la app.
   - App movil básica que consume esas API.

2. **Autorización y autenticación**
   - Un poco de seguridad en las API. Autenticación por token y limitación de algunos endpoint para trabajar solo con métodos de lectura.
   - Forzar a las API de participación de usuarios a poner el usuario que interactuó.
   - Funcionalidades de interacción en el móvil: Registrarse en una charla y mandar una opinión.

3. **Sacar fotos con el celu**
   - Usamos las API de [cordova](https://cordova.apache.org/) para acceder a la cámara del celular desde javascript.
   - Aprovechamos la abstracción de angular de [ngCordova](http://ngcordova.com/docs/).
   - Configuramos la API para interpretar las fotos como base64 con [django-extra-fields](https://github.com/Hipo/drf-extra-fields).

Cada etapa tiene un directorio `charlexapi` donde está el código de Django/DRF y un directorio `charlexmobile` donde está el código ionic.

### Buildeando
#### Dependencias
Las dependencias de python están en el `requirements.txt`, y las de bower en el `bower.json` correspondiente.
#### Otros requisitos
- Ionic. [Acá](http://ionicframework.com/docs/guide/installation.html) están las docs para la instalación.
- SDK para las plataformas que se quieran buildear. La de Android está [acá](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).
