document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const resumenDiv = document.getElementById("resumen");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    // Datos básicos
    const ownerName = formData.get("ownerName");
    const petName = formData.get("petName");
    const checkIn = formData.get("checkIn");
    const checkOut = formData.get("checkOut");

    // Calcular noches
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const nights = (outDate - inDate) / (1000 * 60 * 60 * 24);

    // Precio base
    let total = nights * 10000;

    // Extras
    const extras = formData.getAll("extras[]");
    const preciosExtras = {
      "Baño": 8000,
      "Corte de uñas": 3000,
      "Masaje": 7000,
      "Reportes": 2000 * nights,
    };

    extras.forEach(extra => total += preciosExtras[extra]);

    // Crear resumen en HTML
    let resumenHTML = `
      <h5>Resumen de la Reserva</h5>
      <p><strong>Dueño:</strong> ${ownerName}</p>
      <p><strong>Mascota:</strong> ${petName}</p>
      <p><strong>Noches:</strong> ${nights}</p>
      <p><strong>Servicios extras:</strong> ${extras.length ? extras.join(", ") : "Ninguno"}</p>
      <p class="fw-bold">Total a pagar: $${total.toLocaleString("es-CL")}</p>
    `;

    // Mostrarlo en el div
    resumenDiv.innerHTML = resumenHTML;
    resumenDiv.classList.remove("d-none");

    // Resetear formulario
    form.reset();
  });
});
