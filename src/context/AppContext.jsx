import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useLocation } from "react-router";
import AxiosPublic from "./AxiosPublic";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export const AppContext = createContext();
const AppContextProvider = (props) => {
    const AxiosLink = AxiosPublic()
    const provider = new GoogleAuthProvider();
    const location = useLocation()
    const date = new Date()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [total, setTotal] = useState(0)
    //window Scroll top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])
    //user saved
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                const userEmail = { email: user?.email };
                AxiosLink.post("/jwt", userEmail)
                    .then((res) => {
                        setUser(user);
                        localStorage.setItem("token", res.data.token);
                    })
                    .catch(() => {
                        setUser(null);
                        localStorage.removeItem("token");
                    })
                    .finally(() => setLoading(false));
            } else {
                setUser(null);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [location.pathname]);
    //dark mode
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
        localStorage.setItem('darkMode', newDarkMode);
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
    //google login
    const googleSignIn = async () => {
        try {
            const res = await signInWithPopup(auth, provider);
            const currentUser = res.user;
            const addedUser = {
                image: currentUser.photoURL,
                name: currentUser.displayName,
                email: currentUser.email,
                dateTime: [
                    new Date().toLocaleDateString(),
                    new Date().toLocaleTimeString()
                ],
                role: "user"
            };
            await AxiosLink.post("/add-user", addedUser);
            Swal.fire({
                title: "Welcome",
                text: `${currentUser.displayName}`,
                icon: "success"
            });

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
            });
        }
    };

    //register
    const registerUser = async (email, password, name, image) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = auth.currentUser;
            await updateProfile(currentUser, {
                displayName: name,
                photoURL: image
            });
            const addedUser = {
                image: currentUser.photoURL,
                name: currentUser.displayName,
                email: currentUser.email,
                role: "user",
                dateTime: [
                    new Date().toLocaleDateString(),
                    new Date().toLocaleTimeString()
                ]
            };
            await AxiosLink.post("/add-user", addedUser);
            Swal.fire({
                title: "Welcome",
                text: `${currentUser.displayName}`,
                icon: "success"
            });

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
            });
        }
    };

    //login
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user)
            })
    }
    //fetch total
    useEffect(() => {
        AxiosLink.get("/total")
            .then(res => setTotal(res.data.result))
    },[location.pathname])
    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#ced4da"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>;
    }
    const value = { googleSignIn, user, registerUser, loginUser, toggleDarkMode, total }
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
export default AppContextProvider;