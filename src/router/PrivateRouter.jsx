import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth";

export const PrivateRouter = ({ children }) => {
    const { logged } = useContext(AuthContext);
    const { pathname, search } = useLocation();
    // UseMemo or useEffect to prevent re-render unnecesary
    const lastPath = pathname + search;
    localStorage.setItem("lastPath", lastPath);

    return logged ? children : <Navigate to="/login" />;
};
