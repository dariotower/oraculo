const cartas = [
  {
    numero: 1,
    romano: "I",
    titulo: "ALQUIMISTA",
    imagen: "carta-alquimista.jpg",
    explicacion:
      "Representa la mirada que guía la experiencia: observar, interpretar y transformar cada decisión del filtrado en una búsqueda consciente.",
  },
  {
    numero: 2,
    romano: "II",
    titulo: "EL CAFÉ",
    imagen: "carta-cafe.jpg",
    explicacion:
      "Es el origen de todo. Variedad, tueste, frescura y conservación afectan de manera directa el resultado final en la taza.",
  },
  {
    numero: 3,
    romano: "III",
    titulo: "EL MÉTODO",
    imagen: "carta-metodo.jpg",
    explicacion:
      "Cada método propone una forma distinta de extraer: cambia el cuerpo, la claridad y la manera en que percibimos el café.",
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    numero: i + 4,
    romano: ["IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][i],
    titulo: `Carta ${i + 4}`,
    imagen: null,
    explicacion:
      "Próximamente se sumará la ilustración final de esta carta. Por ahora este espacio funciona como estructura lista para completar.",
  })),
];

const app = document.querySelector(".app");
const bgEffects = document.getElementById("bgEffects");
const grid = document.getElementById("gridCartas");
const modalRoot = document.getElementById("modalRoot");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeButton = document.getElementById("closeButton");
const modalRoman = document.getElementById("modalRoman");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalCard = document.getElementById("modalCard");
const modalCardInner = document.getElementById("modalCardInner");
const modalCardFront = document.getElementById("modalCardFront");

let cartaActiva = null;
let flipTimeout = null;

function crearFondo() {
  Array.from({ length: 44 }).forEach((_, i) => {
    const spark = document.createElement("span");
    spark.className = "spark";
    const size = 1 + (i % 3);
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.left = `${(i * 17.3) % 100}%`;
    spark.style.top = `${(i * 11.7) % 100}%`;
    spark.style.opacity = "0.55";
    bgEffects.appendChild(spark);
  });
}

function crearPlaceholderHTML(titulo) {
  return `
    <div class="placeholder">
      <div>
        <div class="placeholder-title">${titulo}</div>
        <p>Ilustración en desarrollo</p>
      </div>
    </div>
  `;
}

function crearCarta(carta) {
  const article = document.createElement("article");
  article.className = "card-wrap";

  const roman = document.createElement("div");
  roman.className = "roman";
  roman.textContent = carta.romano;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "card-button";
  button.setAttribute("aria-label", `Abrir ${carta.titulo}`);

  const shell = document.createElement("div");
  shell.className = "card-shell";

  const img = document.createElement("img");
  img.className = "card-image";
  img.src = "dorso.jpg";
  img.alt = `Dorso de la carta ${carta.romano}`;

  const overlay = document.createElement("div");
  overlay.className = "card-overlay";

  shell.append(img, overlay);
  button.appendChild(shell);

  button.addEventListener("click", () => abrirModal(carta));

  article.append(roman, button);
  return article;
}

function poblarCartas() {
  cartas.forEach((carta) => {
    grid.appendChild(crearCarta(carta));
  });
}

function poblarModal(carta) {
  modalRoman.textContent = carta.romano;
  modalTitle.textContent = carta.titulo;
  modalText.textContent = carta.explicacion;

  modalCardInner.classList.remove("is-flipped");
  modalCardFront.innerHTML = "";

  if (carta.imagen) {
    const img = document.createElement("img");
    img.src = carta.imagen;
    img.alt = carta.titulo;
    img.className = "modal-card-image";
    modalCardFront.appendChild(img);
  } else {
    modalCardFront.innerHTML = crearPlaceholderHTML(carta.titulo);
  }
}

function abrirModal(carta) {
  cartaActiva = carta;
  clearTimeout(flipTimeout);

  poblarModal(carta);

  modalRoot.setAttribute("aria-hidden", "false");
  modalRoot.classList.add("is-open");
  app.classList.add("is-blurred");
  document.body.style.overflow = "hidden";

  flipTimeout = setTimeout(() => {
    modalCardInner.classList.add("is-flipped");
  }, 120);
}

function cerrarModal() {
  clearTimeout(flipTimeout);
  modalCardInner.classList.remove("is-flipped");
  modalRoot.classList.remove("is-open");
  modalRoot.setAttribute("aria-hidden", "true");
  app.classList.remove("is-blurred");
  document.body.style.overflow = "";
  cartaActiva = null;
}

modalBackdrop.addEventListener("click", cerrarModal);
closeButton.addEventListener("click", cerrarModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartaActiva) {
    cerrarModal();
  }
});

crearFondo();
poblarCartas();
