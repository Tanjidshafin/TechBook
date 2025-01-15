import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.init";

export const AppContext = createContext();
const AppContextProvider = (props) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
                localStorage.setItem("user", JSON.stringify(user))
                console.log(user);
            }
            else {
                setUser(null)
                localStorage.removeItem("user")
            }
        })
        return unsubscribe
    }, [])
    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
            .then(res => {
                setUser(res.user)
                console.log(res.user);
            })
    }

    const value = { googleSignIn, user }
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
export default AppContextProvider;