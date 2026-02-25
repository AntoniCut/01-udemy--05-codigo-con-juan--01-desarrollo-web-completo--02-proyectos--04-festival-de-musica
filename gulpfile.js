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


import { src, dest, watch } from 'gulp';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';



/**  -----  `Configuración de Sass para Gulp`  ----- */
const sass = gulpSass(dartSass);



/**
 * -------------------------
 * -----  `css(done)`  -----
 * -------------------------
 * @description
 * - Esta función es una tarea de Gulp que compila el archivo `app.scss` ubicado en `src/scss/` y lo guarda en `build/css/`.
 * - Utiliza el plugin `gulp-sass` para realizar la compilación de Sass a CSS.
 * @returns {NodeJS.ReadWriteStream}
 */

export const css = ()  => {

    return src('src/scss/app.scss')
        
        .pipe(
            sass()
                .on('error', sass.logError)
        )
        
        .pipe(dest('build/css'));
   
 
} 


/**
 * ---------------------
 * -----  `dev()`  -----
 * ---------------------
 * @description
 * - Esta función es una tarea de Gulp que se encarga de ejecutar la tarea `css` para compilar los archivos Sass a CSS.
 * - Se puede configurar para observar cambios en los archivos Sass y recompilar automáticamente cuando se detecten cambios.
 * @returns {ReturnType<typeof watch>} - Retorna un objeto de tipo Watch de Gulp.
 */

export const dev = () => {

    return watch('src/scss/**/*.scss', css);


}