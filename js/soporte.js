document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSoporte");
  const errorDiv = document.getElementById("errorSoporte");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const asunto = form.asunto.value.trim();
    const mensaje = form.mensaje.value.trim();

    let errores = [];

    if (!email || !asunto || !mensaje)
      errores.push("Todos los campos son obligatorios.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) errores.push("Correo inválido.");

    if (errores.length) {
      errorDiv.innerHTML = errores.join("<br>");
      errorDiv.classList.remove("d-none");
      return;
    }

    errorDiv.classList.add("d-none");
    alert("Mensaje enviado correctamente!");
    form.reset();
  });
});
