const socket = io();

// para guardar un producto /////////////////////////////////////////////////////////////////
document.querySelector("#formNewProduct").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  // para verificar si todos los campos no están vacíos.
  let listaDeErrores = [];
  for (const k in data) {
    if (data[k] == null || data[k] === undefined || data[k] == "") {
      listaDeErrores.push(k);
    }
  }

  if (listaDeErrores.length > 0) {
    alert(`Los campos "${listaDeErrores.join(", ")}" son obligatorios.`);
    return;
  }

  socket.emit("nuevoProducto", data);
  e.target.reset();
  return;
});

// para mostrar por socket.io todos los productos: ////////////////////////////////////////////
const contenedor = document.querySelector("#productContainer");
socket.on("allProducts", (socketProducts) => {
  contenedor.innerHTML = "";
  socketProducts.forEach((e) => {
    contenedor.innerHTML += `
      <div>
        <span>
          <p><strong>Name: ${e.title}</strong> </p>
          <p><strong>Description: ${e.description}</strong> </p>
          <p><strong>Code: ${e.code}</strong> </p>
          <p><strong>Price: ${e.price}</strong></p>
          <p><strong>Status: ${e.status}</strong></p>
          <p><strong>Stock: ${e.stock}</strong></p>
          <p><strong>Category: ${e.category}</strong></p>
        </span> 
          <button onclick="deleteProductSocket('${e._id}')" class="formButton buttonGray">Eliminar</button>
      </div>
      `;
  });
});

// Para elimiar el prodcuto indicado ///////////////////////////////////////////////////
const deleteProductSocket = (prodId) => {
  socket.emit("deleteProduct", prodId);
};
