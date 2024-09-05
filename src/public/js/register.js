/*
  separé la lógica de la función registro no tener que hacer el llamado directamente con el action y así mantener separadas las dos rutas; la de vistas y las de api. 
*/

document
  .querySelector("#registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar el envío normal del formulario
    const formData = new FormData(event.target);
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      age: formData.get("age"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: "user"
    };

    try {
      const response = await fetch("/api/sessions/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
        const result = await response.json();
        alert(result.error || "datos incorrectos");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el servidor");
    }
  });
