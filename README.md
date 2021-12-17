# Challenge GBM

Esté es un proyecto que fue creado para el reto GBM el cual consta de mostrar información general en su vista `/home`. Al momento de ser un usuario registrado podrás tener acceso a información privada.

Al contar con un acceso, se podrá contar con diferentes **Roles** los cuales son:

* **Usuario:** La cuenta con este Rol solo podrá tener acceso a la parte de analiticos.
* **Administrator:** La cuenta con este Rol podrá tener acceso a los analiticos y también a poder reactivar las cuentas que fueron bloquedas por intentar iniciar sesión mas de 3 veces sin colocar correctamente su contraseña. 
* **Owner:** La cuenta con este Rol tendrá acceso a los analiticos, reactivar cuentas y también podrá cambiar el tipo de Rol para las cuentas que se encuentran registradas.


# Introducción a la aplicación Create React App

## Scripts disponibles

Para descargar todos los modulos requeridos para la ejecución de la aplicación en entorno local, en el directorio raíz del proyecto, puede ejecutarel comando:

### `yarn`

Para iniciar el proyecto localmente, en el directorio raíz del proyecto ejecute el comando:

### `yarn start`

Ejecuta la aplicación en el modo de desarrollo. \
Abra [http://localhost:3000](http://localhost:3000) para verlo en el navegador.


# Vistas

La aplicación cuenta diferentes vistas:

* **Home:** La cuenta con este Rol solo podrá tener acceso a la parte de analíticos.
* * **Home con sesión iniciada:** La cuenta con este Rol solo podrá tener acceso a la parte de analíticos.
* **Perfil:** Aquí se mostrara la información de la cuenta del usuario donde podre actualizar su nombre de usuario.
* **Analiticos:** Muestra las gráficas con respecto al IPC.
* **Reactivación de cuentas:** Muestra una tabla con la lista de usuario con su cuenta bloqueada.
* **Control de Roles:** Muestra una tabla con los usuarios registrados donde se podrá modificar el Rol con el que cuentan.

# Información técnica

Está aplicación fue desarrollada con:

* **React JS**
* **Typescript**
* **CSS**
* **Firebase**
* **Material UI**

