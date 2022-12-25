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
import { MdOutlineLightMode, MdOutlineNightlight, MdLogout } from 'react-icons/md'

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{user, theme, cartShow, cartItems}, dispatch] = useStateValue()
    const [isMenu, setIsMenu] = useState(false)
    const [photo,setPhoto]=useState(Avatar)
    const switchBg = theme ? 'bg-textColor' : 'bg-primary'
    const switchText = theme ? 'text-primary' : 'text-textColor'
    
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
            user : null
        })
    }

    const showCart = () => {
        dispatch({
            type : actionType.SET_CART_SHOW,
            cartShow : !cartShow
        })
    }

    const toggleTheme = () => {
        dispatch({
            type : actionType.SET_THEME,
            theme : !theme
        })
    }

    useEffect(() => {
        if(user?.photoURL) {setPhoto(user?.photoURL)}
        else {setPhoto(Avatar)}
    }, [user])
  
  return (
    <header className={`fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 ${switchBg}`}>
        {/* desktop & tablet */}
        <div className="hidden md:flex w-full h-full items-center justify-between">
            <Link to={"/"} className="flex items-center gap-2">
                <img src={Logo} className="w-8 object-cover" alt='logo' />
                <p className={`${switchText} text-xl font-bold`}>City</p>
            </Link>
            <div className="flex items-center gap-8">
                <motion.ul
                    initial={{opacity: 0, x: 200}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 200}}
                    className="flex items-center gap-8 ml-auto"
                >
                    <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={`text-base ${switchText} duration-100 transition-all ease-in-out cursor-pointer`}>
                        Home
                    </motion.li>
                    <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={`text-base ${switchText} duration-100 transition-all ease-in-out cursor-pointer`}>
                        Menu
                    </motion.li>
                    <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={`text-base ${switchText} duration-100 transition-all ease-in-out cursor-pointer`}>
                        Services
                    </motion.li>
                    <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={`text-base ${switchText} duration-100 transition-all ease-in-out cursor-pointer`}>
                        Contact Us
                    </motion.li>
                </motion.ul>
                <motion.button
                    whileTap={{scale: 0.9}}
                    whileHover={{scale: 1.1}} 
                    type="button" 
                    className={`text-primary bg-lightRed w-12 h-6 p-2 rounded-full shadow-xl flex items-center gap-1 cursor-pointer text-base`}
                    onClick={toggleTheme}
                >
                    <MdOutlineLightMode />
                    <p className={`rounded-full bg-primary w-4 h-4 ${theme ? '-mr-5' : '-ml-5'}`}></p>
                    <MdOutlineNightlight />
                </motion.button>
                <motion.div whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} className="relative flex items-center justify-center" onClick={showCart}>
                    <TiShoppingCart className={`${switchText} text-2xl cursor-pointer`}/>
                    {cartItems && cartItems.length > 0 && (
                        <div className={`absolute -top-4 -right-2  w-5 h-5 rounded-full ${theme ? 'bg-primary' : 'bg-blueText'} flex items-center justify-center`}>
                            <p className={`text-xs ${theme ? 'text-blueText' : 'text-primary'} font-semibold`}>{cartItems.length}</p>
                        </div>
                    )}
                </motion.div>
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
                                className={`flex flex-col absolute w-40 ${switchBg} shadow-xl rounded-lg top-12 right-0 border ${theme ? 'border-primary' : 'border-textColor'}`}
                            >
                                {
                                    user && user.email === "sivanth24@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p 
                                                className={`${switchText} px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-lightRed hover:text-primary rounded-t-lg text-base transition-all duration-100`}
                                                onClick={() => setIsMenu(false)}
                                            >
                                                New Item <IoMdAdd />
                                            </p>
                                        </Link>
                                    )
                                }
                                <p 
                                    className={`${switchText} px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-lightRed hover:text-primary rounded-b-lg text-base transition-all duration-100`}
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
            <div className="relative flex items-center justify-center" onClick={showCart}>
                <TiShoppingCart className={`${switchText} text-2xl cursor-pointer`}/>
                {cartItems && cartItems.length > 0 && (
                    <div className={`absolute -top-4 -right-2  w-5 h-5 rounded-full ${theme ? 'bg-primary' : 'bg-blueText'} flex items-center justify-center`}>
                        <p className={`text-xs ${theme ? 'text-blueText' : 'text-primary'} font-semibold`}>{cartItems.length}</p>
                    </div>
                )}
            </div>
            <Link to={"/"} className="flex items-center gap-2">
                <img src={Logo} className="w-8 object-cover" alt='logo' />
                <p className={`${switchText} text-xl font-bold`}>City</p>
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
                            className={`flex flex-col absolute w-40 border border-solid ${switchBg} ${theme ? 'border-primary' : 'border-textColor'} shadow-xl rounded-lg top-12 right-0`}
                        >
                            <div className="flex items-center justify-center py-3">
                                <motion.button
                                    whileTap={{scale: 0.9}}
                                    whileHover={{scale: 1.1}} 
                                    type="button" 
                                    className={`text-primary bg-lightRed w-12 h-6 p-2 rounded-full shadow-xl flex items-center gap-1 cursor-pointer text-base`}
                                    onClick={toggleTheme}
                                >
                                    <MdOutlineLightMode />
                                    <p className={`rounded-full bg-primary w-4 h-4 ${theme ? '-mr-5' : '-ml-5'}`}></p>
                                    <MdOutlineNightlight />
                                </motion.button>
                            </div>
                            {
                                user && user.email === "sivanth24@gmail.com" && (
                                    <Link to={"/createItem"}>
                                        <p 
                                            className={`px-4 py-2 flex items-center gap-3 cursor-pointer ${switchText} text-base transition-all duration-100`}
                                            onClick={() => setIsMenu(false)}
                                        >
                                            New Item <IoMdAdd />
                                        </p>
                                    </Link>
                                )
                            }
                            <ul className="flex flex-col">
                                <motion.li
                                    whileTap={{scale: 0.85}} 
                                    className={`text-base ${switchText} px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer`}
                                    onClick={() => setIsMenu(false)}
                                >
                                    Home
                                </motion.li>
                                <motion.li
                                    whileTap={{scale: 0.85}} 
                                    className={`text-base ${switchText} px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer`}
                                    onClick={() => setIsMenu(false)}
                                >
                                    Menu
                                </motion.li>
                                <motion.li
                                    whileTap={{scale: 0.85}} 
                                    className={`text-base ${switchText} px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer`}
                                    onClick={() => setIsMenu(false)}
                                >
                                    About Us
                                </motion.li>
                                <motion.li
                                    whileTap={{scale: 0.85}} 
                                    className={`text-base ${switchText} px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer`}
                                    onClick={() => setIsMenu(false)}
                                >
                                    Services
                                </motion.li>
                            </ul>
                            <motion.p   
                                whileTap={{scale: 0.85}} 
                                className={`text-primary bg-lightRed m-2 p-2 rounded-md shadow-xl flex items-center justify-center gap-3 cursor-pointer text-base`}
                                onClick={logout}
                            >
                                Logout <MdLogout />
                            </motion.p>
                        </motion.div>
                    )
                }     
            </div>
        </div>
    </header >
  )
}

export default Header