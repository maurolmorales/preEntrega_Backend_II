const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const generaJWT = (usuario)=>{
  return jwt.sign(usuario, process.env.SECRET, {expiresIn:1800})  
}

const validaJWT = (token)=>{
  try {
    return jwt.verify(token, process.env.SECRET)
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
}

const generateHash = (password) => { 
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 
};

const validatePassword = (pass, hash) => {
  return bcrypt.compareSync(pass, hash);
};

module.exports = {
  generaJWT,
  validaJWT,
  generateHash,
  validatePassword,
}