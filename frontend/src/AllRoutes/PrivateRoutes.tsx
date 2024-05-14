import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }:PrivateRouteProps) => {
    const isAuth = useSelector((state: any) => state.login.isAuth);
    return isAuth ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
