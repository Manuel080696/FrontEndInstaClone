<h1>InstaClone</h1>

![InstaCloneLogo](https://github.com/Manuel080696/PruebasManu/blob/main/logo_final2.png)

<h2>Rutas aplicadas</h2>

<ul>
  <li>Users</li>
  <ul>
    <li>POST - "newUserController" ✔️</li>
    <li>GET - "getUserController" ✔️</li>
    <li>POST - "loginController" ✔️</li>
    <li>DEL - "deleteUserController" ✔️</li>
    <li>PATCH - "updateUserController" ✔️</li>
  </ul>
  <li>Photos</li>
    <ul>
      <li>GET - "getAllPhotosController" ✔️</li>
      <li>POST - "newPhotoController" ✔️ </li>
      <li>GET - "searchPhotoController" ✔️ </li>
      <li>GET - "getPhotoControllerSingle" ✔️ </li>
      <li>DEL - "deletePhotoController" ✔️ </li>
  </ul>
  <li>Likes</li>
  <ul>
    <li>POST - "newLikesController" ✔️ </li>
  </ul>
  <li>Comments</li>
  <ul>
    <li>POST - "postCommentController" ✔️ </li>
    <li>DEL - "unCommentController" ✔️ </li>
</ul>
  

<h2>Manual de uso</h2>
<ol>
  <li>Este es el frontend, del proyecto de InstaClone, para iniciar el proyecto, hay que seguir los siguientes pasos:
	<ol>
		<li><article><p>Vamos al repositorio y le damos a code, y copiaremos la clave HTTPS o SSH</p>
		<img src="https://github.com/Manuel080696/PruebasManu/blob/main/claveHTTPSSSHFront.png?raw=true"/></article></li>
		<p/>
      <li><p>Deberemos elegir la carpeta donde deseamos crear nuestro repositorio. Para este ejemplo, usaremos <a href="https://git-scm.com/">git</a> para windows. Una vez situados en el directorio deseado, haremos click derecho y pulsaremos en la opción "Git Bash Here". Esto iniciará la consola de comandos de git, una vez situados en la cosnola introduciremos el siguiente comando "git clone claveHTTPS o claveSSH":</p>
      <img src="https://github.com/Manuel080696/PruebasManu/blob/main/gitCloneFront.png?raw=true"/>
      </li>
      <p/>
		<li>Una vez tengamos el repositorio descargado, deberemos ejecutarlo mediante algun compilador de código. En este ejemplo usaremos <a href="https://code.visualstudio.com/">visual studio code</a>, simplemente en la misma consola de git usada en el ejemplo anterior, primero accederemos a la carpeta mediante "cd FrontEndInstaClone/". Y por último iniciaremos visual mediante el comando "code ."
    <img src="https://github.com/Manuel080696/PruebasManu/blob/main/gitCodeVisualFront.png?raw=true"/>
    </li>
        <p/>
    <li>Deberemos renombrar el ".env.example" y a ".env",y en el colocar el puerto y el host que colocamos en el .env de nuestro backend como PORT y HOST.
    <img src="https://github.com/Manuel080696/PruebasManu/blob/main/envFront.png?raw=true"/>
    </li>
          <p/>
    <li>Una vez realizados todos estos pasos, solo nos quedará iniciar el terminal de visual, instalar los modulos npm mediante el comando "npm i" y después simplemente, ejecutar el front mediante el comando "npm run dev". (Para poder inicializar el frontend, deberemos tener inicializado en backend)
      <img src="https://github.com/Manuel080696/PruebasManu/blob/main/insalacionDelFront.png?raw=true"/>
    </li>
<p/>
</ol>
</li>
  <p></p>
  <li>Para los usuarios más avanzados que quieran hacer pruebas mediante postman, aquí os dejo la colección de rutas <a href="https://github.com/Manuel080696/PruebasManu/blob/main/InstaClone.postman_collection.json">PostmanCollectionInstaClone</a>
  </li>
  <p></p>
  <li>Para crear un usuario, debe tener obligatoriamente:
  <ul>
    <li>Nombre</li>
    <li>Apellido</li>
    <li>Nombre de Usuario</li>
    <li>Email (único)</li>
    <li>Contraseña</li>
    </ul>
  </li>
  <p></p>
  <li>Para loggearlo, deberemos de introducir:</li>
  <ul>
    <li>Email</li>
    <li>Contraseña</li>
  </ul>
  <p></p>
  <li>Esto nos dará un token, el cual se guardará automáticamente en la variable TOKEN, que podremos ver más adelante en los controllers de photos, likes y comments, aúnque no siempre su uso será obligatorio. (se usará para obtener información por si el usuario está loggeado o no, y mostrarle sus likes en las publicaciones)</li>
  <p></p>
  <li>El controller "getAllPhotosController", simplemente nos mostrará todos los post de la red social</li>
  <p></p>
  <li>"newPhotoController" nos servirá para subir un post, se hace a través de form-data y sus datos obligatorios serán:
  <ul>
    <li>Place -- text</li>
    <li>Description -- text</li>
    <li>Image -- file</li>
    </ul>
  </li>
  <p></p>
  <li>"shearchPhotoController" nos servirá para buscar todas las fotos de la red social, por palabras contenidas en su descripción, esta palabra se la pasaremos a través del body, en un JSON con la propiedad:
    <ul>
      <li>"Search": "palabra a buscar"</li>
    </ul>
  </li>
  <p></p>
  <li>"getPhotoControllerSingle" sirve para coger una sola foto mediante el ID, pasado a través del parametro, justo después de "photos/:id", es decir "photos/4". Veremos en headers, el nombrado anteriormente Authorization, el cuál usaremos para saber si el usuario está loggeado o no, y pueda ver su like en dicha publicación si lo ha dado.</li>
  <p></p>
  <li>"deletePhotoController" sirve para eliminar el post, si el usuario es el que lo ha creado, de la siguiente forma:</li>
   <ul>
     <li>"photos/:photoId", es decir "/photos/4"</li>
  </ul>
  <p></p>
  <li>"newLikeController" sirve para dar like a las diferentes publicaciones, indicadas en el params de la siguiente forma: "photos/4/like", así le darémos like a la photo con el id 4, si le damos like a algo que ya tenía un like, quitaremos dicho like</li>
  <p></p>
  <li>"postCommentController" para subir un comentario a una foto indicada en el params, algo parecido a el de "newLikeController" pero esta vez solo cambiando el like por comment "photos/4/comment", pero además, deberemos indicar que es lo que queremos comentar mediante un JSON con la propiedad:</li>
    <ul>
      <li> "comment": "Comentario"</li>
    </ul>
  <p></p>
  <li>"unCommentController" sirve para eliminar un comentario si ese comentario te pertenece, para ello deberemos indicar tanto la foto como el comentario que deseamos eliminar mediante params, de la siguiente forma:</li>
  <ul>
    <li> "photos/4/uncomment/5" -- De esta forma eliminaremos el comentario con la id 5 de la foto con el id 4 </li>
  </ul>
</ol>

<h2>Sumario de errores y dudas, durante esta semana de trabajo</h2>

<h4>06/05/2023 -- Librerías npm a usar</h4>
 
  <h4>-NPM</h4>
    <p>boxicons: Para los logos de like, coments, delete, etc.</p>
    <p>material: Para las tarjetas de las imagenes, los mensajes de error, etc.</p>
    
    
<h4>12/06/2023 -- Errores del backend corregidos, y base de React Vite realizada.</h4>

<h4>21/06/2023 -- Añadimos modal de addPhoto e implementación del photoCard mediante material.</h4>

<h4>22/06/2023 -- Realizamos el merge de todas las ramas, ya que implementamos todos los cambios y partimos de una base general bien construida del proyecto.</h4>

<h4>27/06/2023 -- Implementamos modal para login y register.</h4>

<h4>04/07/2023 -- Implementación de animación de likes sobre las imágenes.</h4>

<h4>05/07/2023 -- Error con el context y hook de usePhotos, repetición multiple de llamadas por un useEffect y muchos datos en AuthContext del usuario. Dividimos tanto el context como el hook, en 3 partes. Se solucionó el error de las llamadas múltiples del useEffect.</h4>
