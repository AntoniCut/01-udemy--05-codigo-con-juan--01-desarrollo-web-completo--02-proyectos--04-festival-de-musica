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
 * --------------------------------
 * -----  `navegacionFija()`  -----
 * --------------------------------
 * @description
 * - Esta función se encarga de hacer que el encabezado del sitio web se fije en la parte superior de la pantalla cuando el usuario hace scroll hacia abajo.
 * - Utiliza el método `getBoundingClientRect()` para determinar la posición del elemento `.sobre-festival` y agregar o quitar la clase `fixed` al encabezado según corresponda.
 */

const navegacionFija = () => {


    /** @type {HTMLHeaderElement | null} - `elemento <header> del documento` */
    const $header = document.querySelector('.header')
    
    
    /** @type {HTMLSectionElement | null} - `elemento .sobre-festival del documento` */
    const $sobreFestival = document.querySelector('.sobre-festival')


    if (!$header || !$sobreFestival)
        throw new Error('No se encontró el elemento <header> con la clase .header o el elemento .sobre-festival en el DOM.');


    //  -----  Agregamos un evento de scroll al documento para fijar  ----- 
    //  -----  el encabezado cuando se haga scroll hacia abajo        -----
    document.addEventListener('scroll', function() {
        
        if($sobreFestival.getBoundingClientRect().bottom < 1) 
            $header.classList.add('fixed')
        
        else 
            $header.classList.remove('fixed')
        
    })

}



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



/**
 * --------------------------------------
 * -----  `resaltarEnlace()`  -----
 * --------------------------------------
 * @description
 * - Esta función se encarga de resaltar el enlace de navegación correspondiente a la sección visible en la pantalla.
 * - Agrega un evento de scroll al documento para detectar qué sección está actualmente visible y resaltar el enlace correspondiente en la navegación.
 */
const resaltarEnlace = () => {
    
    
    //  -----  Agregamos un evento de scroll al documento para resaltar      -----
    //  -----  el enlace de navegación correspondiente a la sección visible  -----
    document.addEventListener('scroll', function() {
        
        /** @type {NodeListOf<HTMLElement>} - `todas las secciones del documento` */
        const $sections = document.querySelectorAll('section');
        
        /** @type {NodeListOf<HTMLAnchorElement>} - `todos los enlaces de navegación` */
        const $navLinks = document.querySelectorAll('.navegacion-principal a');

        /** @type {string} - `id de la sección actualmente visible` */
        let actual = '';
        

        //  -----  Iteramos sobre cada sección para determinar   -----
        //  -----  cuál está actualmente visible en la pantalla  -----
        $sections.forEach( section => {
            

            /** @type {number} - `posición superior de la sección con su elemento padre` */
            const sectionTop = section.offsetTop;
            

            /** @type {number} - `altura de la sección` */
            const sectionHeight = section.clientHeight;

            //  -----  Si la posición de scroll es mayor o igual a la posición superior de la sección menos un tercio de su altura,   -----
            if(window.scrollY >= (sectionTop - sectionHeight / 3 ) ) 
                actual = section.id;
            
        })


        //  -----  Iteramos sobre cada enlace de navegación para     -----
        //  -----  resaltar el que corresponde a la sección visible  -----
        $navLinks.forEach(link => {
            
            //  -----  Eliminamos la clase 'active' de todos los enlaces  -----
            link.classList.remove('active');
            
            //  -----  Si el enlace tiene un href que coincide con el id   -----
            //  -----  de la sección visible, agregamos la clase 'active'  -----
            if(link.getAttribute('href') === '#' + actual) 
                link.classList.add('active');
            
        })
    })
}



/**
 * --------------------------------------
 * -----  `scrollNav()`  -----
 * --------------------------------------
 * @description
 * - Esta función se encarga de agregar un comportamiento de desplazamiento suave a los enlaces de navegación.
 * - Agrega un evento de clic a cada enlace de navegación para evitar el comportamiento predeterminado y desplazar suavemente a la sección correspondiente.
 */

const scrollNav = () => {
    

    /** @type {NodeListOf<HTMLAnchorElement> | null} - `todos los enlaces de navegación` */
    const $navLinks = document.querySelectorAll('.navegacion-principal a')


    //  -----  Validamos que existan enlaces de navegación en el DOM  -----
    if (!$navLinks || $navLinks.length === 0)
        throw new Error('No se encontraron enlaces de navegación con la clase .navegacion-principal a en el DOM.');
    

    //  -----  Agregamos un evento de clic a cada enlace de navegación para     -----
    //  -----  desplazar suavemente a la sección correspondiente al enlace clicado  -----
    $navLinks?.forEach( link => {
        

        link.addEventListener('click', e => {
            
            e.preventDefault()
          
            /** @type {string | null} - `href del enlace clicado` */           
            const $sectionScroll = link.getAttribute('href');
            
            if (!$sectionScroll) 
                return;
            
            /** @type {HTMLSectionElement | null} - `sección correspondiente al enlace clicado` */
            const $section = document.querySelector($sectionScroll);

            //  -----  Desplazamos suavemente a la sección correspondiente al enlace clicado  -----
            $section?.scrollIntoView({behavior: "smooth"});

        })
    })
}



//  -----  Ejecutamos la función crearGaleria cuando el DOM esté completamente cargado  -----
document.addEventListener('DOMContentLoaded', () => {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});
