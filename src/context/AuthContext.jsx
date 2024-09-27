import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/appwrite/api";
export const INITIAL_USER={
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async() => false,
}

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(INITIAL_USER);
    const [isLoading,setIsLoading]= useState(false);
    const [isAuthenticated,setIsAuthenticated]= useState(false);

    const navigate=useNavigate();

    // When ever we reload our page this 'checkAuthUser' function will be called.
    const checkAuthUser= async ()=>{
        try{
            const currentAccount = await getCurrentUser();

            if(currentAccount){
                setUser({
                    id:currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.image,
                    bio: currentAccount.bio,
                });

                setIsAuthenticated(true);
                return true;
            }

            return false;
        }catch(error){
            console.log(error);
            return false;
        }finally{
            setIsLoading(false);
        }
    };

    // When we reload the page this will run.
    useEffect(()=>{
        // After the page reload then the if statement get checked 'cookieFallback' is given by appwrite if it is null or empty array then it will navigate to '/sign-in'
        if(
            localStorage.getItem('cookieFallback')==='[]' ||
            localStorage.getItem('cookieFallback')===null
        ) navigate('/sign-in')

        // and if statement is wrong then checkAuthUser() will run.
        checkAuthUser();
    },[]);
    const value ={
        user,
        isLoading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        checkAuthUser,
    }

    return (
        // We wraped every thing inside this so that we can find out if the user is logged in or not at any point of time. 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);