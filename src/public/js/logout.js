/*
  separé la lógica de la función logout no tener que hacer el llamado directamente con el action y así mantener separadas las dos rutas; la de vistas y las de api. 
*/

document
  .querySelector("#logoutForm")
  .addEventListener("click", async (event) => {
    event.preventDefault(); 
    try {
      const response = await fetch("/api/sessions/logout", {
        method: "GET",
      });

      if (response.ok) {
        // Redirigir al login después de cerrar sesión
        window.location.href = "/login";
      } else {
        const data = await response.json();
        alert(`Error al cerrar sesión: ${data.error}`);
      }
    } catch (error) {
      console.error("Error en el proceso de logout:", error);
    }
  });
