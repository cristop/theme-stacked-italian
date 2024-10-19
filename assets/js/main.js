var slider = tns({
  container: '.my-slider',
  items: 3, // Mostrar 3 ítems a la vez
  slideBy: '1', // Moverse de a 1 ítem
  autoplay: true, // Activar autoplay
  autoplayTimeout: 3000, // Intervalo de 3 segundos
  controls: false, // Ocultar los controles (prev/next)
  nav: true, // Ocultar puntos de navegación
  mouseDrag: true, // Arrastrar con el ratón
  loop: true, // Carrusel en bucle
  gutter: 10, // Ajustar espacio entre imágenes (en píxeles)
  responsive: {
      0: {
          items: 1, // Mostrar 1 ítem en pantallas pequeñas
          gutter: 5 // Menor espacio entre ítems en pantallas pequeñas
      },
      600: {
          items: 2, // Mostrar 2 ítems en pantallas medianas
          gutter: 5
      },
      1000: {
          items: 3, // Mostrar 3 ítems en pantallas grandes
          gutter: 5
      }
  }
});

//////////////////////////////////////////////////////////////////////

// Inicia el tiny-slider
var slider = tns({
  container: '.carousel-content',
  items: 1,
  slideBy: 'page',
  autoplay: true,
  controls: false, // Oculta los botones prev y next
  nav: true, // Activa la navegación por puntitos predeterminada de Tiny Slider
  autoplayButtonOutput: false,
  autoplayTimeout: 10000
});

// Selecciona la barra de progreso
var progressBar = document.querySelector('.progress');

// Obtén la cantidad de páginas (items) en el slider
var totalSlides = slider.getInfo().slideCount;

// Actualiza la barra de progreso al cambiar el slide
slider.events.on('indexChanged', function(info) {
  var currentIndex = info.index % totalSlides; // Asegurarse de que el índice esté dentro del rango
  var slideWidthPercentage = 100 / totalSlides; // Calcula el ancho del slide en porcentaje
  var translateXPercentage = currentIndex * slideWidthPercentage; // Calcula la posición de la barra

  // Mueve la barra en horizontal según la página actual
  progressBar.style.transform = `translateX(${translateXPercentage}%)`;
});

// Inicializa la barra de progreso en la primera página
progressBar.style.transform = 'translateX(0%)';



//////////////////////////////////////////////////////////////////////


// Precarga
window.addEventListener('load', function() {
  // Mostrar el navbar después de la carga con un pequeño retraso
  var navbar = document.querySelector('.navbar'); // Selecciona el navbar
  setTimeout(function() {
    navbar.classList.add('show-navbar'); // Añade la clase para hacer bajar el navbar
  }, 1000); // Ajusta el retraso según lo que prefieras (1000ms = 1 segundo de retraso)

  // Mostrar el loading screen y hacer fade-out
  setTimeout(function() {
      var loadingScreen = document.getElementById('loading-screen');
      loadingScreen.classList.add('fade-out');

      // Eliminar el "loading-screen" después de la transición (1 segundo)
      setTimeout(function() {
          //loadingScreen.style.display = 'none'; // O puedes usar remove() para eliminarlo completamente

          // Inicializar AOS una vez que el loading screen se ha ocultado
          AOS.init({
              duration: 1000,  // Duración de las animaciones
              once: false,     // Las animaciones se ejecutan más de una vez (al hacer scroll hacia abajo y arriba)
              mirror: true     // Las animaciones se activan al hacer scroll hacia arriba y hacia abajo
          });

      }, 50); // El tiempo debe coincidir con la duración del fade-out del loading screen
  }, 500); // Puedes ajustar el tiempo antes de iniciar el fade out
});



//scrolls
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar todos los enlaces del menú
  const menuLinks = document.querySelectorAll('.navbar-nav .nav-link');

  // Variable para controlar si el scroll fue hecho por clic
  let isClickScrolling = false;

  // Agregar evento de clic a cada enlace
  menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Evitar el comportamiento predeterminado

      // Remover la clase "active" de todos los enlaces inmediatamente al hacer clic
      menuLinks.forEach(link => link.classList.remove('active'));

      // Agregar la clase "active" al enlace que fue clicado
      this.classList.add('active');

      // Indicar que el scroll es iniciado por clic
      isClickScrolling = true;

      // Obtener el id de la sección destino desde el atributo href
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      // Hacer scroll suave hacia la sección de destino usando scrollTo
      const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - 60; // Restar 60px para compensar el menú flotante
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 900; // Duración más larga para suavidad (900ms)
      let start = null;

      // Función para animar el scroll
      function smoothScroll(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(smoothScroll);
        } else {
          // Una vez que el scroll ha finalizado, reiniciar la variable
          setTimeout(() => {
            isClickScrolling = false; // El scroll por clic ha terminado
          }, 100);
        }
      }

      // Función de easing (más suave con easeInOutCubic)
      function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }

      requestAnimationFrame(smoothScroll);
    });
  });

  // Cambiar clase active en scroll, 60px antes de la sección
  window.addEventListener('scroll', function () {
    // Solo aplicar el comportamiento del scroll si no estamos en un scroll activado por clic
    if (!isClickScrolling) {
      let current = '';

      menuLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section.offsetTop - 60 <= window.scrollY + 100 && section.offsetTop + section.offsetHeight - 60 > window.scrollY + 100) {
          current = link.getAttribute('href');
        }
      });

      // Remover la clase "active" de todos los enlaces
      menuLinks.forEach(link => link.classList.remove('active'));

      // Agregar la clase "active" al enlace del área visible
      if (current) {
        document.querySelector('.navbar-nav .nav-link[href="' + current + '"]').classList.add('active');
      }
    }
  });
});
