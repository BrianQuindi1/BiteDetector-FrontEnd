import AsyncStorage from "@react-native-async-storage/async-storage";

const EMAIL_KEY = 'LOGIN_email';
const CLAVE_KEY = 'LOGIN_clave';
const NOMBRE_KEY = 'LOGIN_nombre';
const PERFIL_KEY = 'PERFIL';

export default class UsuarioService {
  login = async () => {
    let esValido = false;

    return esValido;
  };

  automaticlogin = async () => {
    let objeto = this.obtenerCredenciales();
    try {
      let esValido = this.login(objeto.Mail, objeto.Password);
      return esValido;
    } catch (e) {
      return false;
    }
  };

  // Elimina las credenciales almacenadas al cerrar sesión
  eliminarCredenciales = async () => {
    try {
      await AsyncStorage.removeItem(PERFIL_KEY);
    } catch (e) {
      console.log(e);
    }
  };

  almacenarCredenciales = async (perfil) => {
    try {
      await this.setObject(PERFIL_KEY, perfil);
      console.log("Perfil almacenado:", perfil);
    } catch (e) {
      console.error("Error al almacenar perfil:", e);
    }
  };
  obtenerCredenciales = async () => {
    let storedPerfil = await this.getObject(PERFIL_KEY);
    if (storedPerfil) {
      const returnValue = {
        Mail: storedPerfil.Mail,
        Password: storedPerfil.Password,
        IdUsuario: storedPerfil.IdUsuario,
        Nombre: storedPerfil.Nombre,
      };
      return returnValue;
    } else {
      return null; // Handle the case where no profile is stored
    }
  };

  setString = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  setObject = async (key, object) => {
    try {
      const jsonValue = JSON.stringify(object);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  getString = async (key, defaultValue) => {
    let returnValue = defaultValue;
    try {
      returnValue = await AsyncStorage.getItem(key);
    } catch (e) {
      console.log(e);
    }
    return returnValue;
  };

  getObject = async (key) => {
    let returnValue = null;
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      returnValue = jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (e) {
      console.log(e);
    }
    return returnValue;
  };

  removeKey = async (key) => {
    let returnValue = false;
    try {
      await AsyncStorage.removeItem(key);
      returnValue = true;
    } catch (e) {
      console.log(e);
    }
    return returnValue;
  };

  // FIJARSE SI ESTA FUNCION ESTA BIEN(ESTA EN EL CAMPUS)
  mergeUsers = async () => {
    try {
      // Guarda USER_1, luego hago merge USER_2 sobre USER_1, luego leo el resultado.
      await AsyncStorage.setItem('key_user', JSON.stringify(USER_1));
      await AsyncStorage.mergeItem('key_user', JSON.stringify(USER_2));
      const currentUser = await AsyncStorage.getItem('key_user');
      // currentUser queda así.
    } catch (e) {
      console.log(e);
    }
  };
}
