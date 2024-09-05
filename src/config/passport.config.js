const passport = require("passport");
const passportJWT = require("passport-jwt");
const local = require("passport-local");
require("dotenv").config();
const {
  getUser_manager,
  addUser_manager,
} = require("../managers/users.manager.js");
const {
  generateHash,
  validatePassword,
} = require("../utils.js");

const buscarToken = (req) => {
  let token = null;
  if (req.cookies.CoderCookie) {
    token = req.cookies.CoderCookie;
  }
  return token;
};

const initPassport = () => {
  //registro
  passport.use(
    "registro", // nombre de la estrategia asignada
    new local.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          let { first_name, last_name, age, role } = req.body;
          if (!first_name || !last_name || !age || !role) {
            return done(null, false, { message: "Faltan datos requeridos" });
          }

          let existe = await getUser_manager({ email: username });
          if (existe) {
            console.log("usuario repetido");
            return done(null, false, { message: "El usuario ya existe" });
          }

          let newUser = {
            first_name,
            last_name,
            age,
            email: username,
            password: generateHash(password),
            role,
          };

          let result = await addUser_manager(newUser);

          return done(null, result);
        } catch (error) {
          console.log("error:", error.message);
          return done(error);
        }
      }
    )
  );

  //login
  passport.use(
    "login",
    new local.Strategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          let usuario = await getUser_manager({ email: username });
          if (!usuario) {
            console.log("usuario No encontrado");
            return done(null, false, { message: "Usuario no existe." });
          }

          const isPasswordValid = validatePassword(password, usuario.password);
          if (!isPasswordValid) {
            console.log("contraseña inválida");
            return done(null, false, { message: "Contraseña inválida" });
          }

          usuario = { ...usuario };
          delete usuario.password;
          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //current
  passport.use(
    "current",
    new passportJWT.Strategy(
      {
        jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([
          (req) => req.cookies.jwt_token,
        ]),
        secretOrKey: process.env.SECRET,
      },
      async (contenidoToken, done) => {
        try {
          const user = await getUser_manager(contenidoToken.id);
          console.log("contenido user: ", user);
          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = { initPassport };
