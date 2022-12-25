import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { RiMailFill, RiPhoneFill, RiFacebookCircleFill, RiInstagramFill, RiTwitterFill } from 'react-icons/ri'
import { useStateValue } from '../context/StateProvider'
import { saveEmail } from '../utils/firebaseFunctions'

const Footer = () => {
    const [{ theme }] = useStateValue()
    const [email, setEmail] = useState('')
    const [fields, setFields] = useState(false)
    const [msg, setMsg] = useState('')

    const switchText = theme ? 'text-primary' : 'text-textColor'
    const borderTopColor = theme ? 'border-t-primary' : 'border-t-textColor'

    const saveMail = () => {
        try {
            if(!email) {
                setFields(true)
                setMsg('Please enter your Email')
                setTimeout(() => {
                    setFields(false)
                    setMsg('')
                }, 3000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    email: email
                }
                saveEmail(data)
                setFields(true)
                setMsg('Thanks for Subscribing!')
                setEmail('')
                setTimeout(() => {
                    setFields(false)
                    setMsg('')
                }, 3000);
            }
        } catch(error) {
            setFields(true)
            setMsg('Error while submitting : Try again')
            setTimeout(() => {
                setFields(false)
                setMsg('')
            }, 3000);
        }
    }

  return (
    <div id="footer" className={`w-screen md:max-h-max pb-7 flex flex-col md:flex-row border-t ${borderTopColor} rounded-t-2xl`}>
        <div className={`h-full flex flex-col gap-5 pt-7 pl-4 md:pl-16 md:py-7`}>
            <h1 className={`mr-auto text-2xl font-semibold capitalize ${switchText} relative before:absolute before:rounded-lg before:content before:w-12 before:h-1 before:-bottom-2 before:left-0 before:bg-lightRed`}>
                Contact Us
            </h1>
            <div className={`w-full flex flex-col gap-3 mt-3 pr-10 md:border-r ${theme ? 'border-r-primary' : 'border-r-textColor'}`}>
                <p className={`w-full flex items-center gap-2 text-lg ${switchText}`}>
                    <a href='mailto:sivanth24@gmail.com' target='_blank' rel='noreferrer'>
                        <RiMailFill className={`w-full h-6 hover:-translate-y-2 transition-all ease-linear duration-100`}/>
                    </a>
                    delivery_app@gmail.com
                </p>
                <p className={`w-full flex items-center gap-2 text-lg ${switchText}`}>
                    <a href='tel:+393200938021' target='_blank' rel='noreferrer'>
                        <RiPhoneFill className={`w-full h-6 hover:-translate-y-2 transition-all ease-linear duration-100`}/>
                    </a>
                    +39 1234567890
                </p>
            </div>
        </div>
        <div className={`md:w-[350px] h-full flex flex-col gap-8 pt-7 pl-4 md:pl-0 md:py-7`}>
            <h1 className={`w-full mr-auto md:text-center text-2xl font-semibold ${switchText} relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-auto before:bg-lightRed`}>
                Follow us On Social
            </h1>
            <div className={`flex w-full h-[68px] md:items-center md:justify-center gap-9 md:border-r ${theme ? 'border-r-primary' : 'border-r-textColor'}`}>
                <a href='https://www.facebook.com/p.sivanth/' target='_blank' rel='noreferrer'>
                    <RiFacebookCircleFill className={`w-full h-8 hover:-translate-y-2 transition-all ease-linear duration-100 ${switchText}`}/>
                </a>
                <a href='https://twitter.com/sivanth_p' target='_blank' rel='noreferrer'>
                    <RiTwitterFill className={`w-full h-8 hover:-translate-y-2 transition-all ease-linear duration-100 ${switchText}`}/>
                </a>
                <a href='https://www.instagram.com/sivanth_p/' target='_blank' rel='noreferrer'>
                    <RiInstagramFill className={`w-full h-8 hover:-translate-y-2 transition-all ease-linear duration-100 ${switchText}`}/>
                </a>
            </div>
        </div>
        <div className={`h-full flex flex-col pl-4 md:px-10 md:py-7`}>
            <h1 className={`text-center text-md font-medium ${switchText}`}>If you want to get promotions and new deals, Subscribe to our Newsletter.</h1>
            <motion.div whileHover={{scale: 1.05}} className="w-full py-3 px-5 flex items-center justify-center">
                <input type="email" name="Email" value={email} placeholder="Your Email" required onChange={(e) => {setEmail(e.target.value)}} className="w-full py-2 px-3 border-none outline-none rounded-tl-full rounded-bl-full shadow-xl font-light"/>
                <button className="py-2 px-3 bg-lightRed text-primary rounded-tr-full rounded-br-full shadow-xl cursor-pointer" onClick={saveMail}>Subscribe!</button>
            </motion.div>
            { fields && (
                <p className={`w-full rounded-lg text-center text-base font-light ${switchText}`}>"{msg}"</p>
            )}
            <ul className="grid grid-cols-2 md:flex md:flex-row md:gap-5 items-center justify-center py-3">
                <motion.li whileHover={{scale: 1.05}} className={`cursor-pointer text-center text-gray-500`}>Terms of use</motion.li>
                <motion.li whileHover={{scale: 1.05}} className={`cursor-pointer text-center text-gray-500`}>Disclaimer</motion.li>
                <motion.li whileHover={{scale: 1.05}} className={`cursor-pointer text-center text-gray-500`}>Privacy policy</motion.li>
                <motion.li whileHover={{scale: 1.05}} className={`cursor-pointer text-center text-gray-500`}>Cookies policy</motion.li>
            </ul>
            <p className={`w-full p-2 md:absolute md:left-7 md:flex md:mt-[150px] text-gray-500`}>&copy; 2022 Sivanth Pachipala.</p>
        </div>
    </div>
  )
}

export default Footer