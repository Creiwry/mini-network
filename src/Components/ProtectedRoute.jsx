import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom'

const checkAuth = () => {
  return Cookies.get('token') ? true : false;
}

const PrivateRoute = ({children}) => {
  if (!checkAuth()) {
    return <Navigate to={{ pathname: '/signIn'}} />
  } 
  return children
};

export { PrivateRoute };
