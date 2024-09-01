const { httpServer } = require("./src/app.js");
const PORT = 8080;

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando el http://localhost:${PORT}`);
});