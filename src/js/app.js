/*
    * ---------------------------------------   
    * -----  app.js --  /src/js/app.js  -----
    * ---------------------------------------
*/



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
 * -----  `crearImagenModal(numImagen)`  -----
 * -------------------------------------------
 * @description
 * - Crea un modal para mostrar la imagen seleccionada de la galería.
 * - Recibe como parámetro el número de la imagen que se desea mostrar en el modal.
 * @param {number} numImagen 
 */

const crearImagenModal = (numImagen) => {


    //  -----  Modal y <Body> -----

    /** @type {HTMLDivElement} - `modal que mostrará la imagen` */
    const $modal = document.createElement('div');
    
    //  -----  Agregar clase CSS para estilos del modal  -----
    $modal.classList.add('modal');

    //  -----  Agregar clase CSS para evitar el scroll del fondo cuando el modal esté abierto  -----
    $body?.classList.add('overflow-hidden');

    //  -----  Agregar el modal al cuerpo del documento para mostrarlo  -----
    $body.appendChild($modal);


    //  -----  Crear el contenido del modal con diferentes formatos de imagen para optimización  -----


    /** @type {HTMLPictureElement} - elemento picture que contendrá las diferentes versiones de la imagen */
    const $picture = document.createElement('picture');


    /** @type {HTMLSourceElement} - fuente AVIF para el elemento picture */
    const $sourceAvif = document.createElement('source');
    
    //  -----  Configuramos la fuente AVIF para el elemento picture  -----
    $sourceAvif.srcset = `./build/img/gallery/full/${numImagen}.avif`;
    $sourceAvif.type = 'image/avif';


    /** @type {HTMLSourceElement} - fuente WebP para el elemento picture */
    const $sourceWebp = document.createElement('source');
    
    //  -----  Configuramos la fuente WebP para el elemento picture  -----
    $sourceWebp.srcset = `./build/img/gallery/full/${numImagen}.webp`;
    $sourceWebp.type = 'image/webp';


    /** @type {HTMLImageElement} - imagen que se mostrará en el modal */
    const $imgModal = document.createElement('img');
    
    //  -----  Configuramos el elemento img con la imagen en formato JPG como fallback  -----
    $imgModal.src = `./build/img/gallery/full/${numImagen}.jpg`;
    $imgModal.alt = `Imagen ${numImagen}`;


    //  -----  Agregar un evento de clic al modal para cerrarlo cuando se haga clic fuera de la imagen  -----
    $picture.append($sourceAvif, $sourceWebp, $imgModal);

    // ----- Agregar la imagen al modal -----
    $modal.appendChild($picture);

    //  -----  Evita que el click en la imagen cierre el modal  -----
    $imgModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });


    //  -----  Crear y agregar el botón de cerrar al modal  -----

    /** @type {HTMLButtonElement} - `botón para cerrar el modal` */
    const $btnCerrarModal = document.createElement('button');
    
    $btnCerrarModal.textContent = 'X';
    $btnCerrarModal.classList.add('btn-cerrar');

    //  -----  Agregar el botón de cerrar al modal  -----
    $modal.appendChild($btnCerrarModal);

    //  -----  click en el modal para cerrarlo  -----
    $modal.addEventListener('click', cerrarModal);


};



/**
 * --------------------------------------
 * -----  `crearImagen(numImagen)`  -----
 * --------------------------------------
 * @description
 * - Crea un elemento <picture> con diferentes formatos de imagen
 *   optimizados para la galería (AVIF, WebP y JPG).
 *
 * @param {number} numImagen - Número de la imagen en la galería.
 * @returns {HTMLPictureElement} - Elemento picture listo para insertarse en el DOM.
 */

const crearImagen = (numImagen) => {

    /** @type {HTMLPictureElement} - `elemento picture que contendrá las diferentes versiones de la imagen` */
    const $picture = document.createElement('picture');


    /** @type {HTMLSourceElement} - `fuente AVIF para el elemento picture` */
    const $sourceAvif = document.createElement('source');
        
    $sourceAvif.srcset = `./build/img/gallery/thumb/${numImagen}.avif`;
    $sourceAvif.type = 'image/avif';


    /** @type {HTMLSourceElement} - `fuente WebP para el elemento picture` */
    const $sourceWebp = document.createElement('source');
    
    $sourceWebp.srcset = `./build/img/gallery/thumb/${numImagen}.webp`;
    $sourceWebp.type = 'image/webp';

    /** @type {HTMLImageElement} - `imagen que se mostrará en el elemento picture` */
    const $img = document.createElement('img');

    //  -----  Configuramos el elemento img con la imagen en formato JPG como fallback  -----
    $img.loading = 'lazy';
    $img.width = 200;
    $img.height = 150;
    $img.src = `./build/img/gallery/thumb/${numImagen}.jpg`;
    $img.alt = `Imagen ${numImagen}`;

    $picture.append($sourceAvif, $sourceWebp, $img);

    return $picture;
};


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

        /** @type {HTMLPictureElement} - `imagen de la galería` */
        const $imagen = crearImagen(i);

        //  -----  Añadimos la imagen al fragmento en memoria  -----
        $fragment.appendChild($imagen);

        //  -----  añadir evento de clic a la imagen para mostrarla en un modal  -----
        $imagen.addEventListener('click', () => crearImagenModal(i));

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
