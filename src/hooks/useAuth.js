import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider"; // আপনার AuthProvider ফাইলের সঠিক পাথ দিন

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;