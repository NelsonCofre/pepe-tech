// Usuario por defecto
const adminUser = {
  email: "admin@pepets.com",
  password: "Admin123",
  rol: "admin",
};

// Guardar admin en el array de usuarios si no existe
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const existeAdmin = usuarios.some((u) => u.email === adminUser.email);

if (!existeAdmin) {
  usuarios.push(adminUser);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Referencia al botón de login
const btnIngresar = document.querySelector(".btn");

btnIngresar.addEventListener("click", (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  // Recuperar todos los usuarios
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar usuario con email y password correctos
  const usuarioEncontrado = usuarios.find(
    (u) => u.email === emailInput && u.password === passwordInput
  );

  if (usuarioEncontrado) {
    alert("¡Login exitoso! Rol: " + usuarioEncontrado.rol);
    // Redirigir según rol si quieres
    // if (usuarioEncontrado.rol === "admin") window.location.href = "dashboard-admin.html";
    // else window.location.href = "dashboard-usuario.html";
  } else {
    alert("Correo o contraseña incorrectos.");
  }
});
