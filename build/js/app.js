/*
    * ---------------------------------------   
    * -----  app.js --  /src/js/app.js  -----
    * ---------------------------------------
*/


/** - `path` base para las imágenes de la galería */
const path = '/05-codigo-con-juan/01-desarrollo-web-completo/02-proyectos/04-festival-de-musica';


/** @type {HTMLBodyElement | null} - `elemento <body> del documento` */
const $body = document.querySelector('body');

if (!$body)
    throw new Error('No se encontró el elemento <body> en el DOM.');



/**
 * -------------------------------------------
 * -----  `cerrarModal()`  -----
 * -------------------------------------------
 * @description
 * - Esta función se encarga de cerrar el modal que muestra la imagen seleccionada en la galería.
 * - Busca un elemento con la clase `.modal` y lo elimina del DOM para cerrar el modal.
 */

const cerrarModal = () => {

    /** @type {HTMLDivElement | null} - `modal que se desea cerrar` */
    const $modal = document.querySelector('.modal');

    if (!$modal)
        throw new Error('No se encontró el modal para cerrarlo.');


    //  -----  Agregar clase CSS para animación de cierre  -----
    $modal.classList.add('fade-out');

    //  -----  Eliminar el modal del DOM después de la animación de cierre  -----
    setTimeout(() => {

        $modal.remove();
        $body?.classList.remove('overflow-hidden');

    }, 500);

}



/**
 * -------------------------------------------
 * -----  `crearModalImagen(numImagen)`  -----
 * -------------------------------------------
 * @description
 * - Crea un modal para mostrar la imagen seleccionada de la galería.
 * - Recibe como parámetro el número de la imagen que se desea mostrar en el modal.
 * @param {number} numImagen 
 */

const crearModalImagen = (numImagen) => {


    /** @type {HTMLDivElement} - `modal que mostrará la imagen` */
    const $modal = document.createElement('div');
    
    $modal.classList.add('modal');

    $body?.classList.add('overflow-hidden');

    //  -----  Agregar el modal al cuerpo del documento para mostrarlo  -----
    $body.appendChild($modal);


    /** @type {HTMLImageElement} - `imagen que se mostrará en el modal` */
    const $imagenModal = document.createElement('img');

    $imagenModal.src = `${path}/src/img/gallery/full/${numImagen}.jpg`;
    $imagenModal.alt = `Imagen ${numImagen}`;

    //  -----  Agregar la imagen al modal para mostrarla  -----
    $modal.appendChild($imagenModal);

    // Evita que el click en la imagen cierre y vuelva a abrir
    $imagenModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });


    /** @type {HTMLButtonElement} - `botón para cerrar el modal` */
    const $btnCerrarModal = document.createElement('button');
    
    $btnCerrarModal.textContent = 'X';
    $btnCerrarModal.classList.add('btn-cerrar');

    //  -----  Agregar el botón de cerrar al modal  -----
    $modal.appendChild($btnCerrarModal);

    //  -----  click en el modal para cerrarlo  -----
    $modal.addEventListener('click', cerrarModal);

}



/**
 * --------------------------------------
 * -----  `crearImagen(numImagen)`  -----
 * --------------------------------------
 * @description
 * - Crea una imagen y la agrega a la galería de imágenes.
 * - Recibe como parámetro el número de la imagen que se desea crear.
 * - Cada imagen se obtiene de la ruta `${path}/src/img/gallery/full/${numImagen}.jpg` donde `numImagen` es el número de la imagen.
 * @param {number} numImagen - Número de la imagen a crear, utilizado para construir la ruta de la imagen.
 */

const crearImagen = (numImagen) => {


    /** @type {HTMLImageElement} - `imagen de la galería` */
    const $imagen = document.createElement('img');

    $imagen.src = `${path}/src/img/gallery/full/${numImagen}.jpg`;
    $imagen.alt = `Imagen ${numImagen}`;

    return $imagen;
}


/**
 * ------------------------------
 * -----  `crearGaleria()`  -----
 * ------------------------------
 * @description
 * - Crea una galería de imágenes dinámicamente y la agrega al DOM.
 * - Busca un elemento con la clase `.galeria-imagenes` y le agrega 16 imágenes.
 * - Cada imagen tiene su `src`, `alt` y una clase CSS para estilos.
 */

const crearGaleria = () => {


    /** @type {HTMLDivElement | null} - `galeria donde se mostrarán las imágenes` */
    const $galeriaImagenes = document.querySelector('.galeria-imagenes');


    //  -----  Validamos que el elemento exista en el DOM  -----
    if (!$galeriaImagenes)
        throw new Error('No se encontró el elemento con la clase .galeria-imagenes');


    /** @type {number} - `cantidad de imágenes a mostrar en la galería` */
    const cantidadImagenes = 16;


    /** @type {DocumentFragment} - `fragmento en memoria para agregar las imágenes` */
    const $fragment = document.createDocumentFragment();


    //  -----  Creamos la cantidad de imágenes especificada y las agregamos a la galería  -----
    for (let i = 1; i <= cantidadImagenes; i++) {

        /** @type {HTMLImageElement} - `imagen de la galería` */
        const $imagen = crearImagen(i);

        //  -----  Añadimos la imagen al fragmento en memoria  -----
        $fragment.appendChild($imagen);

        //  -----  añadir evento de clic a la imagen para mostrarla en un modal  -----
        $imagen.addEventListener('click', () => crearModalImagen(i));

    }


    //  -----  Agregamos el fragmento al DOM  -----
    $galeriaImagenes.appendChild($fragment);

}


//  -----  Ejecutamos la función crearGaleria cuando el DOM esté completamente cargado  -----
document.addEventListener('DOMContentLoaded', () => crearGaleria());

