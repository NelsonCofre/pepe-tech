// Inicializar admin por defecto
const adminDefault = {
  nombre: "Administrador",
  email: "admin@pepets.com",
  password: "admin123",
  rol: "admin",
};

// Forzar recarga si la página viene del cache (botón "atrás")
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});

// Obtener usuarios existentes de localStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Agregar admin si no existe
if (!usuarios.some((u) => u.email === adminDefault.email)) {
  usuarios.push(adminDefault);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Botón de login
const btnIngresar = document.querySelector(".btn");

btnIngresar.addEventListener("click", (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  // Leer usuarios actualizados
  const usuariosActuales = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuariosActuales.find(
    (u) => u.email === emailInput && u.password === passwordInput
  );

  if (usuarioEncontrado) {
    // Guardar usuario activo en sessionStorage
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    alert("¡Login exitoso! Redirigiendo...");

    setTimeout(() => {
      // Redirigir según rol
      if (usuarioEncontrado.rol === "admin") {
        window.location.href = "clientes-admin.html"; // Panel admin
      } else {
        window.location.href = "index.html"; // Usuario normal
      }
    }, 2000);
  } else {
    alert("Correo o contraseña incorrectos.");
  }
});

// Limpiar sesión al cargar login
window.addEventListener("DOMContentLoaded", () => {
  sessionStorage.removeItem("usuarioActivo");
});
