document.addEventListener("DOMContentLoaded", () => {
  // Verificar si hay usuario logeado en sessionStorage
  const usuarioLogeado = sessionStorage.getItem("usuarioActivo");
  if (!usuarioLogeado) {
    alert("Debes iniciar sesión para reservar alojamiento.");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("bookingForm");
  const resumenDiv = document.getElementById("resumen");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    resumenDiv.innerHTML = ""; // Limpiar resumen previo

    const ownerName = form.ownerName.value.trim();
    const ownerPhone = form.ownerPhone.value.trim();
    const petName = form.petName.value.trim();
    const checkIn = form.checkIn.value;
    const checkOut = form.checkOut.value;

    // Validación campos vacíos
    if (!ownerName || !ownerPhone || !petName || !checkIn || !checkOut) {
      resumenDiv.innerHTML = `<div class="alert alert-danger">Debes llenar todos los campos.</div>`;
      return;
    }

    // Validar teléfono chileno: puede ser con +56, espacios o guiones, mínimo 8 y máximo 15 dígitos
    const phoneDigits = ownerPhone.replace(/\D/g, ""); // quitar caracteres no numéricos
    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      resumenDiv.innerHTML = `
        <div class="alert alert-danger">
          Debes ingresar un número de teléfono válido (8-15 dígitos).<br>
          Ejemplo válido: <strong>912345678</strong> o <strong>+56912345678</strong>
        </div>`;
      return;
    }

    // Validar fechas
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inDate < today) {
      resumenDiv.innerHTML = `<div class="alert alert-danger">La fecha de ingreso no puede ser pasada.</div>`;
      return;
    }

    if (outDate <= inDate) {
      resumenDiv.innerHTML = `<div class="alert alert-danger">La fecha de salida debe ser posterior a la de ingreso.</div>`;
      return;
    }

    // Calcular noches y total
    const nights = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));
    const total = nights * 10000; // Precio base $10.000 por noche

    // Mostrar resumen
    resumenDiv.innerHTML = `
      <div class="alert alert-success p-3 rounded">
        <h5 class="mb-2">Resumen de la Reserva</h5>
        <p><strong>Dueño:</strong> ${ownerName}</p>
        <p><strong>Teléfono:</strong> ${ownerPhone}</p>
        <p><strong>Mascota:</strong> ${petName}</p>
        <p><strong>Noches:</strong> ${nights}</p>
        <p><strong>Total a pagar:</strong> $${total.toLocaleString("es-CL")}</p>
      </div>
    `;

    form.reset();
  });
});
