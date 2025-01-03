// Inicia el tiny-slider para la galería de imágenes
var slider = tns({
  container: '.my-slider',
  items: 3, // Mostrar 3 ítems a la vez
  slideBy: '1', // Moverse de a 1 ítem
  autoplay: true, // Activar autoplay
  autoplayTimeout: 3000, // Intervalo de 3 segundos
  controls: false, // Ocultar los controles (prev/next)
  nav: true, // Mostrar puntos de navegación
  mouseDrag: true, // Permitir arrastrar con el ratón y deslizar con el dedo en móviles
  loop: true, // Carrusel en bucle
  gutter: 0, // Ajustar espacio entre imágenes (en píxeles)
  responsive: {
    0: {
      items: 2, // Mostrar 2 ítems en pantallas pequeñas
      gutter: 0 // Menor espacio entre ítems en pantallas pequeñas
    },
    600: {
      items: 2, // Mostrar 2 ítems en pantallas medianas
      gutter: 0
    },
    1000: {
      items: 3, // Mostrar 3 ítems en pantallas grandes
      gutter: 0
    }
  }
});

// Inicia el tiny-slider para la galería de imágenes
var slider3 = tns({
  container: '.my-slider-2',
  items: 3, // Mostrar 3 ítems a la vez
  slideBy: '1', // Moverse de a 1 ítem
  autoplay: true, // Activar autoplay
  autoplayTimeout: 3000, // Intervalo de 3 segundos
  controls: false, // Ocultar los controles (prev/next)
  nav: true, // Mostrar puntos de navegación
  mouseDrag: true, // Permitir arrastrar con el ratón y deslizar con el dedo en móviles
  loop: true, // Carrusel en bucle
  gutter: 0, // Ajustar espacio entre imágenes (en píxeles)
  responsive: {
    0: {
      items: 2, // Mostrar 2 ítems en pantallas pequeñas
      gutter: 0 // Menor espacio entre ítems en pantallas pequeñas
    },
    600: {
      items: 2, // Mostrar 2 ítems en pantallas medianas
      gutter: 0
    },
    1000: {
      items: 3, // Mostrar 3 ítems en pantallas grandes
      gutter: 0
    }
  }
});

// Selecciona todas las imágenes dentro del slider "my-slider-2"
const sliderImages = document.querySelectorAll('.my-slider-2 img');

// Selecciona el elemento de la modal donde se mostrará la imagen
const modalImage = document.getElementById('modal-image');
const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

// Agregar un evento de clic a cada imagen en "my-slider-2"
sliderImages.forEach(image => {
    image.addEventListener('click', function() {
        // Cambia la fuente de la imagen en la modal a la URL de la imagen clicada
        modalImage.src = this.src;

        // Abre la modal
        imageModal.show();
    });
});

//////////////////////////

// Inicia el tiny-slider para el carrusel con contenido (por ejemplo, de texto o videos)
var slider2 = tns({
  container: '.carousel-content',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false, // Ocultar los botones prev y next
  nav: true, // Mostrar navegación por puntitos
  autoplayButtonOutput: false,
  autoplayTimeout: 10000,
  loop: false, // No buclear los slides
  mouseDrag: true, // Permitir arrastrar con el ratón y deslizar con el dedo en móviles
});

// Selecciona la barra de progreso
var progressBar = document.querySelector('.progress');

// Obtén la cantidad de páginas (items) en el slider
var totalSlides = slider2.getInfo().slideCount;

// Actualiza el ancho de la barra de progreso al cambiar el slide
slider2.events.on('indexChanged', function(info) {
  var currentIndex = info.displayIndex - 1; // Obtiene el índice visible actual ajustado a 0 para la primera página
  var progressPercentage = ((currentIndex + 1) / totalSlides) * 100; // Calcula el porcentaje de progreso
  
  // Ajusta el ancho de la barra de progreso según el progreso actual
  progressBar.style.width = `${progressPercentage}%`;
});

// Inicializa la barra de progreso en la primera página
progressBar.style.width = `${(1 / totalSlides) * 100}%`;





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

//boton copiar
document.getElementById('copy-button').addEventListener('click', function() {
  var tokenAddress = document.getElementById('token-address').textContent;
  
  // Crea un campo de texto temporal para copiar el contenido
  var tempInput = document.createElement('input');
  tempInput.value = tokenAddress;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  // Mostrar el mensaje "Copiado!"
  var copiedMessage = document.getElementById('copied-message');
  copiedMessage.style.display = 'block';

  // Ocultar el mensaje después de 2 segundos
  setTimeout(function() {
      copiedMessage.style.display = 'none';
  }, 2000);
});


///////////////////////////////////////////////////
// galeria de videos
document.addEventListener('DOMContentLoaded', function () {
  const videoModal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('video-player');
  const videoSource = document.getElementById('video-source');
  const videoThumbnails = document.querySelectorAll('.my-slider img[data-video-url]');

  // Cuando se hace clic en una miniatura de video
  videoThumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function () {
          const videoUrl = this.getAttribute('data-video-url');
          videoSource.src = videoUrl;
          videoPlayer.load(); // Recargar el video con la nueva URL
          const bootstrapModal = new bootstrap.Modal(videoModal);
          bootstrapModal.show();
      });
  });

  // Limpia el video al cerrar la modal
  videoModal.addEventListener('hidden.bs.modal', function () {
      videoPlayer.pause(); // Pausar el video
      videoSource.src = ""; // Limpiar la URL del video
  });
});


////////////////////////////////////////////////////////////
// para cerrar el menu en mobile
// Selecciona todos los enlaces dentro del navbar
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

// Agrega el evento a cada enlace para cerrar el menú
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).hide(); // Oculta el menú
        }
    });
});

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Selecciona el modal por su ID
const modalElement = document.getElementById('videoModal');

// Detecta cuándo se está cerrando el modal
modalElement.addEventListener('hide.bs.modal', function (event) {
    // Añade la clase que activa la animación de cierre
    modalElement.classList.add('closing');
});

// Detecta cuándo se ha terminado la animación de cierre para remover la clase
modalElement.addEventListener('hidden.bs.modal', function (event) {
    // Quita la clase de cierre una vez que se ha cerrado el modal completamente
    modalElement.classList.remove('closing');
});
