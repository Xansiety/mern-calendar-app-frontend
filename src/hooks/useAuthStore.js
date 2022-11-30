import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogOut } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {  
    dispatch(onChecking())
    try {
        const { data } = await calendarApi.post('/auth/login', { email, password })
        localStorage.setItem("token", data.token )
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(onLogin({name: data.name, uid: data.uid})) 
    } catch (error) {
         dispatch(onLogOut('Credenciales incorrectas'))
         setTimeout(() => {
            dispatch(clearErrorMessage())
         }, 10);
    }
  };
 
  const startRegister = async ({ nombre,email,password,rePassword,rol}) => {  
    dispatch(onChecking())
    try {
        const { data } = await calendarApi.post('/auth/register', { nombre,email,password,rePassword,rol})
        console.log({data})
        localStorage.setItem("token", data.token )
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(onLogin({name: data.name, uid: data.uid}))         
    } catch (error) { 
         dispatch(onLogOut('Ocurrió un error durante el registro' + ', ' + error.response.data.errors[0].msg))
         setTimeout(() => {
            dispatch(clearErrorMessage())
         }, 10);
    }
  };


  const checkAuthToken = async() =>{
    const token = localStorage.getItem("token")
    if(!token) return  dispatch(onLogOut()) // el token ya expiro
      try {
        const {data} = await calendarApi.get('/auth/renew'); 
        localStorage.setItem("token", data.token )
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(onLogin({name: data.nombre, uid: data.uid}))         
        console.log('Se renovó el token mediante checkAuthToken')
      } catch (error) {
        console.log(error)
        dispatch(onLogOut())
        localStorage.clear()         
      }
  }
 
  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogOut())
  }

  return {
    //* Properties
    status,
    user,
    errorMessage,
    //* Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
