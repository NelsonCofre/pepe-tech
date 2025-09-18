document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar-nav");

  function renderNavbar() {
    const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));
    navbar.innerHTML = ""; // limpiar navbar

    // Links comunes
    const links = [
      { texto: "Inicio", href: "index.html" },
      { texto: "Servicios", href: "servicios.html" },
      { texto: "Nosotros", href: "nosotros.html" },
      { texto: "Soporte", href: "soporte.html" },
    ];

    links.forEach((link) => {
      const li = document.createElement("li");
      li.classList.add("nav-item");
      li.innerHTML = `<a class="nav-link" href="${link.href}">${link.texto}</a>`;
      navbar.appendChild(li);
    });

    if (usuarioActivo) {
      // Links de administración si es admin
      if (usuarioActivo.rol === "admin") {
        const liServiciosAdmin = document.createElement("li");
        liServiciosAdmin.classList.add("nav-item");
        liServiciosAdmin.innerHTML = `<a class="nav-link" href="servicios-admin.html">Servicios Admin</a>`;
        navbar.appendChild(liServiciosAdmin);

        const liClientesAdmin = document.createElement("li");
        liClientesAdmin.classList.add("nav-item");
        liClientesAdmin.innerHTML = `<a class="nav-link" href="clientes-admin.html">Clientes Admin</a>`;
        navbar.appendChild(liClientesAdmin);
      }

      // Botón logout
      const liLogout = document.createElement("li");
      liLogout.classList.add("nav-item");
      liLogout.innerHTML = `<a class="nav-link" href="#" id="logoutBtn">Cerrar Sesión</a>`;
      navbar.appendChild(liLogout);

      document.getElementById("logoutBtn").addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("¿Estás seguro que quieres cerrar sesión?")) {
          sessionStorage.removeItem("usuarioActivo");
          window.location.href = "login.html";
        }
      });
    } else {
      // Usuario no logeado: mostrar login y registro
      const liLogin = document.createElement("li");
      liLogin.classList.add("nav-item");
      liLogin.innerHTML = `<a class="nav-link" href="login.html">Iniciar Sesión</a>`;
      navbar.appendChild(liLogin);

      const liRegistro = document.createElement("li");
      liRegistro.classList.add("nav-item");
      liRegistro.innerHTML = `<a class="nav-link" href="registro.html">Registro</a>`;
      navbar.appendChild(liRegistro);
    }
  }

  renderNavbar();

  // ===== Manejar rollback/back/forward =====
  window.addEventListener("pageshow", (event) => {
    // Si viene de cache o no hay usuario activo, refrescar navbar
    if (event.persisted) {
      renderNavbar();
    }
  });
});
