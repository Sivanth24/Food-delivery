import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'
import EmptyCart from '../img/emptyCart.svg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import CartItem from './CartItem'

const CartContainer = () => {
    const [{ user, cartShow, cartItems, theme }, dispatch] = useStateValue()
    const [flag, setFlag] = useState(1)
    const [total, setTotal] = useState(0)
    const switchText = theme ? 'text-primary' : 'text-textColor'

    const showCart = () => {
      dispatch({
          type : actionType.SET_CART_SHOW,
          cartShow : !cartShow
      })
    }

    useEffect(() => {
      let totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.quantity * item.price
      }, 0)
      setTotal(totalPrice)
    }, [flag, total, cartItems])

    const clearCart = () => {
      dispatch({
        type : actionType.SET_CART_ITEMS,
        cartItems : []
      })
      localStorage.setItem('cartItems', JSON.stringify([]))
    }

  return (
    <motion.div
      initial={{opacity: 0, x: 200}} 
      animate={{opacity: 1, x: 0}} 
      exit={{opacity: 0, x: 200}} 
      className={`fixed top-0 right-0 z-[51] w-full md:w-375 h-screen drop-shadow-md flex flex-col ${theme ? 'bg-textColor' : 'bg-primary'}`}
    >
      {/* cart top section */}
      <div className={`w-full p-4 flex items-center justify-between ${switchText}`}>
        <motion.div whileTap={{scale: 0.75}} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-3xl cursor-pointer"/>
        </motion.div>
        <p className="text-lg">Cart</p>
        <motion.p 
          whileTap={{scale: 0.75}} 
          className={`flex items-center gap-1 p-1 px-2 my-2 text-base ${theme ? 'bg-lightRed' : 'bg-lightGray'} rounded-md cursor-pointer shadow-md`}
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className={`w-full h-full ${theme ? 'bg-primary' : 'bg-textColor'} rounded-t-[2rem] flex flex-col`}>
          {/* cartItem section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems.map((item) => {
              return(
                <CartItem key={item.id} item={item} flag={flag} setFlag={setFlag}/>
              )
            })}
          </div>
          {/* cart bottom section */}
          <div className={`w-full flex-1 flex flex-col items-center justify-evenly rounded-t-[2rem] ${theme ? 'bg-lightGray' : 'bg-darkGray'} px-8 py-2`}>
            <div className="w-full flex items-center justify-between">
              <p className={`${theme ? 'text-textColor' : 'text-primary'} text-lg`}>Sub Total</p>
              <p className={`${theme ? 'text-textColor' : 'text-primary'} text-lg`}><span className={`text-lightRed`}>$</span> {total}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className={`${theme ? 'text-textColor' : 'text-primary'} text-lg`}>Delivery</p>
              <p className={`${theme ? 'text-textColor' : 'text-primary'} text-lg`}><span className={`text-lightRed`}>$</span> 2.5</p>
            </div>
            <div className={`w-full border-b my-2 ${theme ? 'border-textColor' : 'border-primary'}`}></div>
            <div className="w-full flex items-center justify-between">
              <p className={`${theme ? 'text-textColor' : 'text-primary'} text-xl`}>Total</p>
              <p className={`${theme ? 'text-textColor' : 'text-primary'} text-xl`}><span className={`text-lightRed`}>$</span> {total + 2.5}</p>
            </div>
            {user ? (
              <motion.button
                whileTap={{scale: 0.9}}
                whileHover={{scale: 1.1}} 
                type='button'
                className={`w-full p-2 rounded-full bg-lightRed text-primary text-lg`}
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{scale: 0.9}}
                whileHover={{scale: 1.1}} 
                type='button'
                className={`w-full p-2 rounded-full bg-lightRed text-primary text-lg`}
              >
                Login to Check Out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className={`w-full h-full flex flex-col items-center justify-center gap-6`}>
          <img src={EmptyCart} alt="empty_cart" className={`w-300`} />
          <p className={`text-xl font-medium ${theme ? 'text-primary' : 'text-textColor'}`}>Add some items to your cart</p>
        </div>
      )}
      
    </motion.div>
  )
}

export default CartContainer