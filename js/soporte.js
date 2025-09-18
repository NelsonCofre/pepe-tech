



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSoporte");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se envíe si hay errores

    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validaciones
    if (email === "" || asunto === "" || mensaje === "") {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }

    // Validar email simple
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      alert("❌ Ingrese un correo válido.");
      return;
    }

    if (asunto.length < 5) {
      alert("⚠️ El asunto debe tener al menos 5 caracteres.");
      return;
    }

    if (mensaje.length < 10) {
      alert("⚠️ El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    // Si todo está bien
    alert("✅ Formulario enviado con éxito.");
    form.reset(); // Limpia el formulario
  });
});
