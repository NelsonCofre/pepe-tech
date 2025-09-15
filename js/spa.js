let subtotal = 0;
const subtotalEl = document.getElementById("subtotal");

document.querySelectorAll(".btn-add").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".servicio-card");
    const precio = Number(card.dataset.precio);

    // Alternar selección
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
  });
});

document.getElementById("reservarBtn").addEventListener("click", () => {
  const fecha = document.getElementById("fechaCita").value;
  const hora = document.getElementById("horaCita").value;
  if (!fecha || !hora) {
    alert("Selecciona fecha y hora para la cita.");
    return;
  }

  // Servicios seleccionados
  const serviciosSeleccionados = [];
  document.querySelectorAll(".btn-add.selected").forEach((btn) => {
    serviciosSeleccionados.push(
      btn.closest(".servicio-card").querySelector(".card-title").textContent
    );
  });

  alert(
    `Reserva confirmada para ${fecha} a las ${hora}.\nServicios: ${serviciosSeleccionados.join(
      ", "
    )}\nSubtotal: $${subtotal.toLocaleString()}`
  );
});
