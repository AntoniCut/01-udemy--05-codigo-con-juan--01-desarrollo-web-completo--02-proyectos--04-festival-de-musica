/*
    ----------------------------------------------------
    ----------  /udemy.antonydev.tech/  ----------------
    ----------  /05-codigo-con-juan/  ------------------
    ----------  /01-desarrollo-web-completo/  ----------
    ----------  /02-proyectos/  ------------------------
    ----------  /04-festival-de-musica/  ---------------
    ----------  /gulpfile.js  --------------------------
    ----------------------------------------------------
*/


import fs from 'fs';
import path from 'path';
import {glob} from 'glob';
import sharp from 'sharp';


import gulp from 'gulp';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
import terser from 'gulp-terser';



//  -----  desestructuración de métodos de Gulp  -----
const { src, dest, watch, series, parallel } = gulp;


/**  -----  `Configuración de Sass para Gulp`  ----- */
const sass = gulpSass(dartSass);


/**
 * -------------------------
 * -----  `favicon()`  -----
 * -------------------------
 * @description
 * - Esta función es una tarea de Gulp que se encarga de copiar los archivos de favicon desde la carpeta `src/favicon/` a la carpeta `build/favicon/`.
 * - Utiliza el método `src` para seleccionar los archivos y el método `dest` para especificar el destino de los archivos copiados. 
 */

// export const favicon = () => 
//     src('src/favicon/**/*')
//         .pipe(dest('build/favicon'));


        

/**
 * -------------------------
 * -----  `css(done)`  -----
 * -------------------------
 * @description
 * - Esta función es una tarea de Gulp que compila el archivo `app.scss` ubicado en `src/scss/` y lo guarda en `build/css/`.
 * - Utiliza el plugin `gulp-sass` para realizar la compilación de Sass a CSS.
 */

export const css = () =>
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(
            sass({
                style: 'compressed'
            })
                .on('error', sass.logError)
        )
        .pipe(dest('build/css', { sourcemaps: true }));



 /**
 * ---------------------
 * -----  `js()`  -----
 * ---------------------
 * @description 
 * - Esta función es una tarea de Gulp que se encarga de copiar el archivo `app.js` 
 *   desde la carpeta `src/js/` a la carpeta `build/js/`.
 */

export const js = () =>
    src('src/js/app.js')
        .pipe(terser())
        .pipe(dest('build/js'));



/**
 * ---------------------
 * -----  `dev()`  -----
 * ---------------------
 * @description
 * - Esta función es una tarea de Gulp que se encarga de ejecutar la tarea `css` para compilar los archivos Sass a CSS.
 * - Se puede configurar para observar cambios en los archivos Sass y recompilar automáticamente cuando se detecten cambios.
 */

export const dev = () =>
    watch(
        [
            //'src/favicon/**/*',
            'src/scss/**/*.scss',
            'src/js/**/*.js',
            'src/img/**/*.{jpg,png}'
        ],
        series(css, js, imagenes)
    );



/*
    --------------------------------------
    -----  Tareas para las IMAGENES  -----
    --------------------------------------
*/



/**
 * ----------------------
 * -----  `crop()`  -----
 * ----------------------
 * 
 * @async
 * @function crop
 *
 * @description
 * - Recorta y redimensiona todas las imágenes JPG de la carpeta gallery/full
 *   y genera miniaturas en la carpeta thumb.
 *
 * - Esta función lee las imágenes desde `src/img/gallery/full`,
 *   las redimensiona a 250x180 usando Sharp y guarda las
 *   imágenes procesadas en `src/img/gallery/thumb`.
 *
 * - La función devuelve una Promise para que pueda usarse directamente
 *   como una tarea de Gulp sin necesidad del callback `done`.
 *
 * @returns {Promise<void>} 
 * - devuelve una Promise para que pueda usarse directamente comom una tarea de Gulp.
 * 
 */

export const crop = async () => {


    /** - `carpeta de entrada de las imágenes` */
    const inputFolder = 'src/img/gallery/full';

    /** - `carpeta de salida de las imágenes` */
    const outputFolder = 'src/img/gallery/thumb';

    /** - `ancho de las imágenes` */
    const width = 250;

    /** - `alto de las imágenes` */
    const height = 180;

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }

    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });


    /** - `tareas de procesamiento de imágenes` */
    const tasks = images.map(file => {

        /** - `archivo de entrada` */
        const inputFile = path.join(inputFolder, file);

        /** - `archivo de salida` */
        const outputFile = path.join(outputFolder, file);


        //  -----  procesamiento de la imagen con Sharp  -----
        return sharp(inputFile)
            .resize(width, height, {
                position: 'centre'
            })
            .toFile(outputFile);
    });


    await Promise.all(tasks);

}



/**
 * --------------------------
 * -----  `imagenes()`  -----
 * --------------------------
 *
 * @async
 * @function imagenes
 *
 * @description
 * - Procesa todas las imágenes del directorio `src/img` y genera
 *   versiones optimizadas en `build/img`, manteniendo la misma
 *   estructura de carpetas.
 *
 * - Para cada imagen encontrada (jpg o png) se generan:
 *   - una versión optimizada en su formato original
 *   - una versión en formato WebP
 *
 * - La función devuelve una Promise para poder usarse directamente
 *   como tarea en Gulp.
 *
 
 * @returns {Promise<void>} Promesa que se resuelve cuando todas las imágenes han sido procesadas.
 */

export const imagenes = async () => {
    
    /** - `directorio de origen de las imágenes` */
    const srcDir = './src/img';

    /** - `directorio de destino de las imágenes` */
    const buildDir = './build/img';

    /** - `patrón de búsqueda de imágenes` */
    const images = await glob('./src/img/**/*{jpg,png}');

    /** - `tareas de procesamiento de imágenes` */
    const tasks = images.map(file => {
        
        /** - `ruta relativa de la imagen` */
        const relativePath = path.relative(srcDir, path.dirname(file));
        
        /** - `directorio de salida para la imagen` */
        const outputSubDir = path.join(buildDir, relativePath);

        return procesarImagen(file, outputSubDir);

    });


    await Promise.all(tasks);

}



/**
 * --------------------------------
 * -----  `procesarImagen()`  -----
 * --------------------------------
 * @async
 * @function procesarImagen
 * 
 * @description
 * - Procesa una imagen generando versiones optimizadas en el
 *   directorio indicado.
 *
 * - Se crean dos archivos:
 *   - imagen optimizada en su formato original
 *   - imagen convertida a formato WebP
 *
 
 * @param {string} file Ruta completa del archivo de imagen a procesar.
 * @param {string} outputSubDir Directorio donde se guardarán las imágenes generadas.
 * @returns {Promise<void>} Promesa que se resuelve cuando la imagen ha sido procesada.
 */

export const procesarImagen = async (file, outputSubDir) => {

    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true });
    }

    /** - `nombre base de la imagen` */
    const baseName = path.basename(file, path.extname(file));
    
    /** - `extensión de la imagen` */
    const extName = path.extname(file);

    /** - `archivo de salida en formato original` */
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
    
    /** - `archivo de salida en formato WebP` */
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);

    /** - `archivo de salida en formato AVIF` */
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);

    /** - `opciones de compresión` */
    const options = { quality: 80 };

    //  -----  procesamiento de la imagen con Sharp  -----
    await Promise.all([
        sharp(file).jpeg(options).toFile(outputFile),
        sharp(file).webp(options).toFile(outputFileWebp),
        sharp(file).avif().toFile(outputFileAvif)
    ]);

}



export default parallel(crop, css, js, imagenes, dev);
