/* =========================================
   ELEMENTOS
========================================= */

const musica = document.getElementById("musica");
const musicControl = document.getElementById("musicControl");
const musicText = document.getElementById("musicText");

const startButton = document.getElementById("startButton");
const topButton = document.getElementById("topButton");

const photoCards = document.querySelectorAll(".photo-card");

const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeModal = document.getElementById("closeModal");

const messageDots = document.querySelectorAll(".message-dot");
const dotMessage = document.getElementById("dotMessage");

const toast = document.getElementById("toast");
const toastText = toast.querySelector("p");

const newQuoteButton = document.getElementById("newQuoteButton");
const randomQuote = document.getElementById("randomQuote");

let musicaActiva = false;
let toastTimer;


/* =========================================
   MÚSICA
========================================= */

function actualizarBotonMusica() {

    if (musicaActiva) {

        musicControl.classList.add("playing");

        musicText.textContent = "Sonando";

        musicControl.setAttribute(
            "aria-label",
            "Pausar música"
        );

    } else {

        musicControl.classList.remove("playing");

        musicText.textContent = "Música";

        musicControl.setAttribute(
            "aria-label",
            "Reproducir música"
        );
    }
}


async function reproducirMusica() {

    try {

        await musica.play();

        musicaActiva = true;

        actualizarBotonMusica();

    } catch (error) {

        console.log(
            "No fue posible reproducir automáticamente la música."
        );

        mostrarToast(
            "Pulsa nuevamente el botón para iniciar la música."
        );
    }
}


function pausarMusica() {

    musica.pause();

    musicaActiva = false;

    actualizarBotonMusica();
}


musicControl.addEventListener("click", () => {

    if (musica.paused) {

        reproducirMusica();

    } else {

        pausarMusica();

    }

});


/*
    Intentamos comenzar la música cuando el usuario
    pulsa "Descubrir el mensaje".
*/

startButton.addEventListener("click", () => {

    document
        .getElementById("mensaje")
        .scrollIntoView({
            behavior: "smooth"
        });

    reproducirMusica();

});


/* =========================================
   VOLVER AL INICIO
========================================= */

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   GALERÍA / MODAL
========================================= */

photoCards.forEach((card) => {

    card.addEventListener("click", () => {

        const image = card.dataset.image;
        const caption = card.dataset.caption;

        modalImage.src = image;
        modalImage.alt = caption;
        modalCaption.textContent = caption;

        photoModal.classList.add("active");

        photoModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    });

});


function cerrarModal() {

    photoModal.classList.remove("active");

    photoModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    /*
        Limpiamos la imagen después de la animación.
    */

    setTimeout(() => {

        modalImage.src = "";

    }, 400);
}


closeModal.addEventListener(
    "click",
    cerrarModal
);


photoModal.addEventListener("click", (event) => {

    if (event.target === photoModal) {

        cerrarModal();

    }

});


/*
    También se puede cerrar presionando ESC.
*/

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        cerrarModal();

    }

});


/* =========================================
   MENSAJES DE LOS PUNTOS
========================================= */

messageDots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const mensaje = dot.dataset.message;

        /*
            Animación de salida
        */

        dotMessage.style.opacity = "0";
        dotMessage.style.transform =
            "translateY(10px)";


        setTimeout(() => {

            dotMessage.textContent = mensaje;

            dotMessage.style.opacity = "1";
            dotMessage.style.transform =
                "translateY(0)";

        }, 250);


        /*
            Mostrar pequeño aviso inferior
        */

        mostrarToast("Has descubierto un mensaje ✦");

    });

});


/* =========================================
   TOAST
========================================= */

function mostrarToast(mensaje) {

    clearTimeout(toastTimer);

    toastText.textContent = mensaje;

    toast.classList.add("active");

    toastTimer = setTimeout(() => {

        toast.classList.remove("active");

    }, 2800);

}


/* =========================================
   FRASES ALEATORIAS
========================================= */

const frases = [

    "Lo bonito también está por llegar.",

    "Que este nuevo mes te encuentre sonriendo.",

    "Nuevos días, nuevas oportunidades y nuevos motivos para seguir.",

    "Que nunca te falten razones para creer en ti.",

    "A veces, un nuevo comienzo es exactamente lo que necesitamos.",

    "Que este mes te regale momentos que quieras recordar.",

    "Confía en el camino y disfruta cada pequeño paso.",

    "Que lleguen buenas noticias cuando menos las esperes.",

    "Todo comienzo guarda una posibilidad.",

    "Que este nuevo mes tenga algo especial reservado para ti.",

    "Que la tranquilidad encuentre un lugar en tus días.",

    "Hay cosas bonitas que todavía no han sucedido."
];


let ultimaFrase = 0;


newQuoteButton.addEventListener("click", () => {

    let nuevaFrase;

    do {

        nuevaFrase =
            Math.floor(
                Math.random() * frases.length
            );

    } while (
        nuevaFrase === ultimaFrase &&
        frases.length > 1
    );


    ultimaFrase = nuevaFrase;


    /*
        Animación de salida
    */

    randomQuote.style.opacity = "0";

    randomQuote.style.transform =
        "translateY(15px)";


    setTimeout(() => {

        randomQuote.textContent =
            `“${frases[nuevaFrase]}”`;

        randomQuote.style.opacity = "1";

        randomQuote.style.transform =
            "translateY(0)";

    }, 250);

});


/* =========================================
   REVEAL AL HACER SCROLL
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .message-card, .quote-section, .photo-card, .message-orbit, .random-content, .final-section"
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   EFECTO DEL CURSOR
========================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* =========================================
   EFECTO PARALLAX SUAVE
========================================= */

window.addEventListener("scroll", () => {

    const scroll =
        window.scrollY;

    const hero =
        document.querySelector(".hero-content");

    if (hero && scroll < window.innerHeight) {

        hero.style.transform =
            `translateY(${scroll * 0.12}px)`;

        hero.style.opacity =
            Math.max(
                0,
                1 - scroll / 650
            );

    }

});


/* =========================================
   IMAGEN NO ENCONTRADA
========================================= */

document.querySelectorAll(
    ".photo-card img"
).forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            image.style.display = "none";

            image.parentElement.style.background =
                "linear-gradient(135deg, #17384d, #0b1d2b)";

            /*
                Si todavía no has colocado las fotos,
                mostramos un texto de sustitución.
            */

            const placeholder =
                document.createElement("div");

            placeholder.textContent =
                "Coloca aquí tu fotografía";

            placeholder.style.position =
                "absolute";

            placeholder.style.inset = "0";

            placeholder.style.display =
                "flex";

            placeholder.style.alignItems =
                "center";

            placeholder.style.justifyContent =
                "center";

            placeholder.style.color =
                "#c8a96b";

            placeholder.style.fontFamily =
                '"Cormorant Garamond", serif';

            placeholder.style.fontSize =
                "25px";

            placeholder.style.zIndex =
                "2";

            image.parentElement.appendChild(
                placeholder
            );

        }
    );

});


/* =========================================
   INICIALIZACIÓN
========================================= */

actualizarBotonMusica();