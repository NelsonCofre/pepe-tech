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

let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

// Guardar en localStorage1
function guardarServicios() {
  localStorage.setItem("servicios", JSON.stringify(servicios));
  renderServicios();
}

// Renderizar tabla
function renderServicios() {
  const tbody = document.getElementById("tablaServicios");
  tbody.innerHTML = "";
  servicios.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${s.nombre}</td>
        <td>$${s.precio.toLocaleString()}</td>
        <td>${s.categoria}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarServicio(${i})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarServicio(${i})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// Agregar/Editar servicio
document.getElementById("formServicio").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("idServicio").value;
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const categoria = document.getElementById("categoria").value;

  if (id) {
    // Editar
    const index = servicios.findIndex(s => s.id == id);
    servicios[index] = { id: Number(id), nombre, precio: Number(precio), categoria };
  } else {
    // Nuevo
    servicios.push({ id: Date.now(), nombre, precio: Number(precio), categoria });
  }

  guardarServicios();
  e.target.reset();
  document.getElementById("idServicio").value = "";
});

// Eliminar
function eliminarServicio(index) {
  servicios.splice(index, 1);
  guardarServicios();
}

// Editar
function editarServicio(index) {
  const s = servicios[index];
  document.getElementById("idServicio").value = s.id;
  document.getElementById("nombre").value = s.nombre;
  document.getElementById("precio").value = s.precio;
  document.getElementById("categoria").value = s.categoria;
}

// Inicial
renderServicios();
