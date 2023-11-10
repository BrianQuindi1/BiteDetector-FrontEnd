import AsyncStorage from '@react-native-async-storage/async-storage';
const PERFIL_KEY = "PERFIL";
export default class AsyncUtils {
    static setString = async (key, value) => {
        try {
        await AsyncStorage.setItem(key, value);
        } catch(e) {
        // error
        }
       }
       static setObject = async (key, object) => {
        try {
        const jsonValue = JSON.stringify(object);
        await AsyncStorage.setItem(key, jsonValue);
        } catch(e) {
        // error
        }
       }

    static getString = async (key, defaultValue) => {
        let returnValue = defaultValue;
        try {
        returnValue = await AsyncStorage.getItem(key);
        } catch(e) {
        // error
        }
        return returnValue;
       }
       
       static  getObject = async (key) => {
        let returnValue = null;
        try {
        const jsonValue = await AsyncStorage.getItem(key);
        returnValue = ((jsonValue != null) ?
        JSON.parse(jsonValue) : defaultValue);
        } catch(e) {
        // error
        }
        return returnValue;
       }
          

}


