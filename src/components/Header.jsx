import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { TiShoppingCart } from 'react-icons/ti'
import { IoMdAdd } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{user}, dispatch] = useStateValue()
    const [isMenu, setIsMenu] = useState(false)
    const [photo,setPhoto]=useState(Avatar)
    
    const login = async () => {
        if(!user) {
            const { user : {providerData}} = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type : actionType.SET_USER,
                user : providerData[0]
            })
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu)
        }
    }

    const logout = () => {
        setIsMenu(false)
        localStorage.removeItem('user')
        localStorage.clear()
        dispatch({
            type : actionType.SET_USER,
            user: null
        })
    }

    useEffect(() => {
        if(user?.photoURL) {
            setPhoto(user?.photoURL)
            console.log("Sign-in provider: " + user?.providerId);
        console.log("  Provider-specific UID: " + user?.uid);
        console.log("  Name: " + user?.displayName);
        console.log("  Email: " + user?.email);
        console.log("  Photo URL: " + user?.photoURL);
        }
        else {setPhoto(Avatar)}
    }, [user])
  
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
        {/* desktop & tablet */}
        <div className="hidden md:flex w-full h-full items-center justify-between">
            <Link to={"/"} className="flex items-center gap-2">
                <img src={Logo} className="w-8 object-cover" alt='logo' />
                <p className="text-headingColor text-xl font-bold">City</p>
            </Link>
            <div className="flex items-center gap-8">
                <motion.ul
                    initial={{opacity: 0, x: 200}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 200}}
                    className="flex items-center gap-8 ml-auto"
                >
                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                        Home
                    </li>
                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                        Menu
                    </li>
                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                        About Us
                    </li>
                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                        Services
                    </li>
                </motion.ul>
                <div className="relative flex items-center justify-center">
                    <TiShoppingCart className="text-textColor text-2xl cursor-pointer"/>
                    <div className="absolute -top-4 -right-2  w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                        <p className="text-xs text-white font-semibold">2</p>
                    </div>
                </div>
                <div className="relative">
                    <motion.img
                        whileTap={{scale: 0.6}}
                        src={photo}
                        className="w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl rounded-full cursor-pointer" 
                        alt="userprofile"
                        onClick={login}
                    />
                    
                    {
                        isMenu && (
                            <motion.div
                                initial={{opacity: 0, scale: 0.6}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.6}}
                                className="flex flex-col absolute w-40 bg-gray-50 shadow-xl rounded-lg top-12 right-0"
                            >
                                {
                                    user && user.email === "sivanth24@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p 
                                                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 text-textColor text-base transition-all duration-100"
                                                onClick={() => setIsMenu(false)}
                                            >
                                                New Item <IoMdAdd />
                                            </p>
                                        </Link>
                                    )
                                }
                                <p 
                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 text-textColor text-base transition-all duration-100"
                                    onClick={logout}
                                >
                                    Logout <MdLogout />
                                </p>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </div>

        {/* mobile */}
        <div className="flex items-center justify-between md:hidden w-full h-full">
            <div className="relative flex items-center justify-center">
                <TiShoppingCart className="text-textColor text-2xl cursor-pointer"/>
                <div className="absolute -top-4 -right-2  w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                    <p className="text-xs text-white font-semibold">2</p>
                </div>
            </div>
            <Link to={"/"} className="flex items-center gap-2">
                <img src={Logo} className="w-8 object-cover" alt='logo' />
                <p className="text-headingColor text-xl font-bold">City</p>
            </Link>
            <div className="relative">
                <motion.img
                    whileTap={{scale: 0.6}}
                    src={photo}
                    className="w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl rounded-full cursor-pointer" 
                    alt="userprofile"
                    onClick={login}
                />
                {
                    isMenu && (
                        <motion.div
                            initial={{opacity: 0, scale: 0.6}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.6}}
                            className="flex flex-col absolute w-40 bg-gray-50 shadow-xl rounded-lg top-12 right-0"
                        >
                            {
                                user && user.email === "sivanth24@gmail.com" && (
                                    <Link to={"/createItem"}>
                                        <p 
                                            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 text-textColor text-base transition-all duration-100"
                                            onClick={() => setIsMenu(false)}
                                        >
                                                New Item <IoMdAdd />
                                        </p>
                                    </Link>
                                )
                            }
                            <ul className="flex flex-col">
                                <li 
                                    className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Home
                                </li>
                                <li 
                                    className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Menu
                                </li>
                                <li 
                                    className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer"
                                    onClick={() => setIsMenu(false)}
                                >
                                    About Us
                                </li>
                                <li 
                                    className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Services
                                </li>
                            </ul>
                            <p 
                                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 text-textColor text-base transition-all duration-100"
                                onClick={logout}
                            >
                                Logout <MdLogout />
                            </p>
                        </motion.div>
                    )
                }     
            </div>
        </div>
    </header >
  )
}

export default Header