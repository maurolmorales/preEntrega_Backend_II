# ENTREGA DEL PROYECTO

## Páginas
### Products:
Muestra una galería de productos con soporte para paginación, accesible mediante el controlador (getAllProducts). Los usuarios pueden filtrar los productos mediante query params, por ejemplo, ( /products/?sort=asc&query=Audio ). Cada ítem en la galería muestra detalles del producto y ofrece un enlace para ver más información (getOneProduct). Además, incluye un botón para agregar el producto al carrito con estado 'open'. Si no existe un carrito abierto, se crea uno automáticamente (addProdToCart).

### Carts:
Muestra una galería de carritos con status 'complete' y 'open' (getAllCarts). Cada carrito lista la cantidad de productos que contiene, acompañados de un botón para eliminarlos (delProdToCart). También se muestra información como el ID del carrito, la fecha de creación y el status actual. Al final, se incluye una botonera que permite navegar al carrito seleccionado (getOneCart), vaciarlo de productos (emptyCart) o cerrarlo cambiando su status de 'open' a 'complete' (closeCart).

###  Real Time Products:
Implementado con Socket.IO, permite ingresar un producto a la base de datos a través de un formulario, reflejando instantáneamente el nuevo producto en una galería limitada a los 3 últimos ítems agregados. Cada ítem en la galería incluye un botón para eliminar el producto correspondiente (deleteOneProduct).

## Estructura
### Ruta Products:
- GET products/ Obtiene todos los productos
- GET products/:pid Obtiene el producto indicado por id
- POST products/ Crea un producto
- PATCH products/:pid Actualiza un producto indicado por id
- DELETE products/:pid Elimina un producto indicado por id

### Ruta Carts:
- GET carts/ Obtiene todos los carritos
- GET carts/:cid Obtiene el carrito indicado por id
- POST carts/:pid Añade un producto indicado por id al carrito
- PUT carts/:cid Actualiza el status del carrito a "Completed"
- DELETE carts/:cid/products/:pid Elimina el producto indicado por id del carrito
- DELETE carts/:cid Elimina la totalidad de productos del carrito