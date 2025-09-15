const formRegistro = document.getElementById("form-registro");

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const nombreMascota = document.getElementById("nombreMascota").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  // Crear objeto usuario
  const nuevoUsuario = {
    nombre,
    email,
    password,
    rol: "usuario", // siempre será usuario
    nombreMascota,
    telefono,
  };

  // Obtener usuarios existentes de localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Validar si el email ya está registrado
  const existe = usuarios.some((u) => u.email === email);
  if (existe) {
    alert("El correo ya está registrado.");
    return;
  }

  // Agregar nuevo usuario
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  window.location.href = "login.html";
});
