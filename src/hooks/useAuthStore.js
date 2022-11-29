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

         console.log('Login success')
    } catch (error) {
         dispatch(onLogOut('Credenciales incorrectas'))
         setTimeout(() => {
            dispatch(clearErrorMessage())
         }, 10);
    }
  };

  return {
    //* Properties
    status,
    user,
    errorMessage,
    //* Methods
    startLogin,
  };
};
