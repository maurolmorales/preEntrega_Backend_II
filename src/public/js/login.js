/*
  separé la lógica de la función login no tener que hacer el llamado directamente con el action y así mantener separadas las dos rutas; la de vistas y las de api. 
*/
document
  .querySelector("#loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/sessions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/"; 
      } else {
        const result = await response.json();
        alert(result.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error en el servidor");
    }
  });
