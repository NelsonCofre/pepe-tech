/* ===========================
   clientes-admin.js
=========================== */

// Protección de la página: solo admin puede acceder
document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));
  if (!usuarioActivo || usuarioActivo.rol !== "admin") {
    alert("Debes iniciar sesión como administrador para acceder.");
    window.location.href = "login.html";
    return;
  }
});

// Admin por defecto
const adminDefault = {
  id: 0,
  nombre: "Administrador",
  email: "admin@pepets.com",
  password: "admin123",
  rol: "admin",
};

// Clientes por defecto
const clientesDefault = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juanperez@mail.com",
    password: "Juan123",
    nombreMascota: "Rocky",
    telefono: "+56 9 1111 2222",
    rol: "usuario",
  },
  {
    id: 2,
    nombre: "María González",
    email: "maria@mail.com",
    password: "Maria123",
    nombreMascota: "Luna",
    telefono: "+56 9 3333 4444",
    rol: "usuario",
  },
  {
    id: 3,
    nombre: "Pedro Soto",
    email: "pedro@mail.com",
    password: "Pedro123",
    nombreMascota: "Max",
    telefono: "+56 9 5555 6666",
    rol: "usuario",
  },
  {
    id: 4,
    nombre: "Carla Rojas",
    email: "carla@mail.com",
    password: "Carla123",
    nombreMascota: "Milo",
    telefono: "+56 9 7777 8888",
    rol: "usuario",
  },
  {
    id: 5,
    nombre: "Andrés Fuentes",
    email: "andres@mail.com",
    password: "Andres123",
    nombreMascota: "Bella",
    telefono: "+56 9 9999 0000",
    rol: "usuario",
  },
];

// Inicializar usuarios en localStorage si no existe
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
if (!usuarios.some((u) => u.email === adminDefault.email)) {
  usuarios.push(adminDefault);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Inicializar clientes en localStorage si no existe
if (!localStorage.getItem("clientes")) {
  localStorage.setItem("clientes", JSON.stringify(clientesDefault));
}

// Obtener clientes
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// Fusionar usuarios registrados (excepto admin) como clientes
const usuariosRegistrados = usuarios.filter((u) => u.rol !== "admin");
const usuariosComoClientes = usuariosRegistrados.map((u, index) => ({
  id: Date.now() + index,
  nombre: u.nombre,
  email: u.email,
  password: u.password,
  nombreMascota: u.nombreMascota,
  telefono: u.telefono,
  rol: u.rol,
}));

clientes = [
  ...clientes,
  ...usuariosComoClientes.filter(
    (u) => !clientes.some((c) => c.email === u.email)
  ),
];

// Renderizar tabla
function renderClientes() {
  const tbody = document.getElementById("tablaClientes");
  if (!tbody) return;

  tbody.innerHTML = "";

  const clientesAMostrar = clientes.filter((c) => c.rol !== "admin"); // nunca mostrar admin

  clientesAMostrar.forEach((c) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.nombre}</td>
        <td>${c.email}</td>
        <td>${c.nombreMascota}</td>
        <td>${c.telefono}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarCliente(${c.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${c.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// Eliminar cliente por id
function eliminarCliente(id) {
  const cliente = clientes.find((c) => c.id === id);
  if (!cliente || cliente.rol === "admin") return;

  if (confirm("¿Estás seguro de eliminar este cliente?")) {
    clientes = clientes.filter((c) => c.id !== id);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    renderClientes();
  }
}

// Editar cliente por id
function editarCliente(id) {
  const cliente = clientes.find((c) => c.id === id);
  if (!cliente || cliente.rol === "admin") return;

  const nuevoNombre = prompt("Nuevo nombre:", cliente.nombre);
  const nuevoTelefono = prompt("Nuevo teléfono:", cliente.telefono);

  if (nuevoNombre && nuevoTelefono) {
    cliente.nombre = nuevoNombre;
    cliente.telefono = nuevoTelefono;
    localStorage.setItem("clientes", JSON.stringify(clientes));
    renderClientes();
  }
}

// Inicializar tabla
renderClientes();
