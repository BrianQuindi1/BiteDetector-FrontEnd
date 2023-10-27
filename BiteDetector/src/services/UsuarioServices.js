import AsyncStorage from "@react-native-async-storage/async-storage"; 

const EMAIL_KEY='LOGIN_email';
const CLAVE_KEY='LOGIN_clave';
const NOMBRE_KEY = "LOGIN_nombre";

export default class UsuarioService { 

    login = async(/* Mail, Password */) => { 
        let esValido = false;
        
        return esValido; 
        
    };


    automaticlogin = async() => {   
        let objeto = this.obtenerCredenciales()
        try {
            esValido = this.login(objeto.Mail,objeto.Password);
            return isValid; 

        } catch(e){
            return false;
        }
    };

    //Elimina las credenciales almacenadas al cerrar sesión 
    eliminarCredenciales = async() => { /* para cerrar sesion */
        try{
            await AsyncStorage.removeItem(EMAIL_KEY); 
            await AsyncStorage.removeItem(CLAVE_KEY); 
        }catch(e){
            console.log(e);
        }
    }; 

    almacenarCredenciales = async (Mail,Password, Nombre) => { 
        //Almacena las credenciales en el asyncStorage
        //(para leerlas al iniciar la próxima vez) 
        // AGREGAR LO QUE FALTA
        try {    
            await AsyncStorage.setItem(EMAIL_KEY, Mail);  
            await AsyncStorage.setItem(CLAVE_KEY, Password);
            await AsyncStorage.setItem(NOMBRE_KEY, Nombre);
        } catch(e) {    
            console.log(e);
        }
    };  

    obtenerCredenciales = async() => { 
        let storedEmail = await AsyncStorage.getItem(EMAIL_KEY);
        let storedClave = await AsyncStorage.getItem(CLAVE_KEY);
        const returnValue = {'Mail':storedEmail, 'Password':storedClave}; 
        return returnValue; 
    }; 
    
    setString = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch(e) {
            console.log(e);       
        }
    }
    
    setObject = async (key, object) => {
        try {
            const jsonValue = JSON.stringify(object);
            await AsyncStorage.setItem(key, jsonValue);
        } catch(e) {
            console.log(e);        
        }
    }
    
    getString = async (key, defaultValue) => {
        let returnValue = defaultValue;
        try {
            returnValue = await AsyncStorage.getItem(key);
        } catch(e) {
            console.log(e);        
        }
        return returnValue;
    }

    getObject = async (key) => {
        let returnValue = null;
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            returnValue = ((jsonValue != null) ?
            JSON.parse(jsonValue) : defaultValue);
        } catch(e) {
            console.log(e);
        }
        return returnValue;
    }
    
    removeKey = async (key) => {  
        let returnValue = false;  
        try {    
            await AsyncStorage.removeItem(key);    
            returnValue  = true;  
        } catch(e) {    
            console.log(e); 
        }  
        return returnValue; 
    }

    //FIJARSE SI ESTA FUNCION ESTA BIEN(ESTA EN EL CAMPUS)
    mergeUsers = async () => {    
        try { 
            //Guarda USER_1, luego hago merge USER_2 sobre USER_1, luego leo el resultado.        
            await AsyncStorage.setItem('key_user', JSON.stringify(USER_1));        
            await AsyncStorage.mergeItem('key_user', JSON.stringify(USER_2));        
            const currentUser = await AsyncStorage.getItem('key_user');        
            // currentUser queda así.
        } catch(e){
            console.log(e);
        }
    }
    
} 

