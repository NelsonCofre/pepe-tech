
let subtotal = 0;
const subtotalEl = document.getElementById("subtotal");
const contPerros = document.getElementById("serviciosPerros");
const contGatos = document.getElementById("serviciosGatos");

// Servicios por defecto
const serviciosDefault = [
  { id: 1, nombre: "Baño y Corte", precio: 20000, categoria: "Perros" },
  { id: 2, nombre: "Spa Relajante", precio: 15000, categoria: "Perros" },
  { id: 3, nombre: "Corte de Uñas", precio: 5000, categoria: "Perros" },
  { id: 4, nombre: "Baño Gato", precio: 12000, categoria: "Gatos" },
  { id: 5, nombre: "Cepillado y Pelaje", precio: 10000, categoria: "Gatos" },
  { id: 6, nombre: "Corte de Uñas Gato", precio: 4000, categoria: "Gatos" }
];

// Inicializar si está vacío
if (!localStorage.getItem("servicios")) {
  localStorage.setItem("servicios", JSON.stringify(serviciosDefault));
}

// Leer servicios del localStorage
const servicios = JSON.parse(localStorage.getItem("servicios")) || [];

// Guardar en localStorage1
function guardarServicios() {
  localStorage.setItem("servicios", JSON.stringify(servicios));
  renderServicios();
}


// Renderizar servicios separados por categoría
function renderServiciosSpa() {
  contPerros.innerHTML = "";
  contGatos.innerHTML = "";

  servicios.forEach((s) => {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
      <div class="card h-100 p-3 text-center servicio-card" data-precio="${
        s.precio
      }">
        <h5 class="card-title">${s.nombre}</h5>
        <p class="precio-texto">Precio: $${s.precio.toLocaleString()}</p>
        <button class="btn btn-primary btn-add">Agregar</button>
      </div>
    `;

    if (s.categoria.toLowerCase() === "perros") {
      contPerros.appendChild(card);
    } else if (s.categoria.toLowerCase() === "gatos") {
      contGatos.appendChild(card);
    }
  });
}

// Ejecutar render inicial
renderServiciosSpa();

// Botones agregar/quitar
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add")) {
    const btn = e.target;
    const card = btn.closest(".servicio-card");
    const precio = Number(card.dataset.precio);

    if (!btn.classList.contains("selected")) {
      subtotal += precio;
      btn.classList.add("selected");
      btn.textContent = "Quitar";
    } else {
      subtotal -= precio;
      btn.classList.remove("selected");
      btn.textContent = "Agregar";
    }
    subtotalEl.textContent = subtotal.toLocaleString();
  }
});
// Reservar
document.getElementById("reservarBtn").addEventListener("click", () => {
  // Verificar si hay usuario logeado
  const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));
  if (!usuarioActivo) {
    alert("Debes iniciar sesión antes de reservar.");
    window.location.href = "login.html"; // opcional: redirigir al login
    return;
  }

  const fecha = document.getElementById("fechaCita").value;
  const hora = document.getElementById("horaCita").value;
  if (!fecha || !hora) {
    alert("Selecciona fecha y hora para la cita.");
    return;
  }

  if (subtotal == 0) {
    alert("Antes de reservar debes agregar al menos un servicio.");
    return;
  }

  const seleccionados = [];
  document.querySelectorAll(".btn-add.selected").forEach((btn) => {
    seleccionados.push(
      btn.closest(".servicio-card").querySelector(".card-title").textContent
    );
  });

  alert(`Reserva confirmada para ${fecha} a las ${hora}.
Servicios: ${seleccionados.join(", ")}
Subtotal: $${subtotal.toLocaleString()}`);

  location.reload();
});
