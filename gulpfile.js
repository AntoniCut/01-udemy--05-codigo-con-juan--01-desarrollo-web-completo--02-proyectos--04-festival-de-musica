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



import gulp from 'gulp';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';



//  -----  desestructuración de métodos de Gulp  -----
const { src, dest, watch, series, parallel } = gulp;


/**  -----  `Configuración de Sass para Gulp`  ----- */
const sass = gulpSass(dartSass);



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
            sass()
                .on('error', sass.logError)
        )
        .pipe(dest('build/css', { sourcemaps: true }));
 


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
            'src/scss/**/*.scss', 
            'src/js/**/*.js'
        ], 
        series(css, js)
    );



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
        .pipe(dest('build/js'));



//export default series(css, js, dev);
export default parallel(css, js, dev);
