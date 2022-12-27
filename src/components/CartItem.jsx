import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const CartItem = ({ item, flag, setFlag }) => {
    let items = []
    const [{ cartItems, theme }, dispatch] = useStateValue()
    const [qty, setQty] = useState(item?.quantity)

    const cartDispatch = () => {
      localStorage.setItem('cartItems', JSON.stringify(items))
      dispatch({
          type : actionType.SET_CART_ITEMS,
          cartItems : items,
      })
    }

    const updateQty = (action, id) => {
        if(action === 'add') {
            setQty(qty + 1)
            cartItems.forEach((item) => {
                if(item.id === id) {
                    item.quantity += 1
                    setFlag(flag + 1)
                }
            })
            cartDispatch()
        } else {
            if(qty === 1) {
                items = cartItems.filter((item) => item.id !== id)
                cartDispatch()
            } else {
                setQty(qty - 1)
                cartItems.forEach((item) => {
                    if(item.id === id) {
                        item.quantity -= 1
                        setFlag(flag - 1)
                    }
                })
                cartDispatch()
            }
        }
    }

    useEffect(() => {
        // eslint-disable-next-line
        items = cartItems
    }, [qty, items, cartItems])

  return (
    <div key={item?.id} className={`w-full p-1 px-2 rounded-lg flex items-center gap-2 ${theme ? 'bg-lightGray' : 'bg-darkGray'}`}>
        <img src={item?.imageURL} alt="item" className="w-20 h-20 max-w-[60px] rounded-full object-contain"/>
        <div className={`flex flex-col gap-2 ${theme ? 'text-textColor' : 'text-primary'}`}>
          <p className="text-base">{item?.title}</p>
          <p className="text-sm block font-medium"><span className="text-lightRed">$</span> {item?.price * qty}</p>
        </div>
        <div className={`group flex items-center ml-auto ${theme ? 'text-textColor' : 'text-primary'} font-medium`}>
          <motion.div 
            whileTap={{scale: 0.8}} 
            className={`px-1 py-1 cursor-pointer ${theme ? 'bg-gray-400' : 'bg-textColor'} rounded-l-lg`}
            onClick={() => updateQty('remove', item?.id)}
          >
            <BiMinus />
          </motion.div>
          <div className={`${theme ? 'bg-gray-400' : 'bg-textColor'} py-[2px]`}>
            <p className={`w-full text-sm px-2 border-l border-r ${theme ? 'border-textColor' : 'border-primary'}`}>{qty}</p>
          </div>
          <motion.div 
            whileTap={{scale: 0.8}} 
            className={`px-1 py-1 cursor-pointer ${theme ? 'bg-gray-400' : 'bg-textColor'} rounded-r-lg`}
            onClick={() => updateQty('add', item?.id)}
          >
            <BiPlus />
          </motion.div>
        </div>
    </div>
  )
}

export default CartItem