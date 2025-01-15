import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useLocation } from "react-router";

export const AppContext = createContext();
const AppContextProvider = (props) => {
    const provider = new GoogleAuthProvider();
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    //window Scroll top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])
    //user saved
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
                console.log(user);
                localStorage.setItem("user", JSON.stringify(user))
                setLoading(false)
            }
            else {
                setUser(null)
                localStorage.removeItem("user")
            }
        })
        return unsubscribe
    }, [location.pathname])
    //google login
    const googleSignIn = async () => {
        return await signInWithPopup(auth, provider)
            .then(res => {
                setUser(res.user)
            })
    }
    //register
    const registerUser = async (email, password, name, image) => {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then(async res => {
                await updateProfile(auth.currentUser, {
                    displayName: name, photoURL: image
                })
                    .then(result => {
                        setUser(result.user)
                    })
            })
    }
    //login
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user)
            })
    }

    const value = { googleSignIn, user, registerUser, loginUser }
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
export default AppContextProvider;