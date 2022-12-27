import React, { useEffect, useState } from 'react'
import NotFound from '../img/NotFound.svg'
import { motion } from 'framer-motion'
import { TiShoppingCart } from 'react-icons/ti'
import Rating from './Rating'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const RowContainer = ({ flag, data, setData, rowContainer }) => {
    const [{ theme, cartItems }, dispatch] = useStateValue()
    const [cartData, setCartData] = useState(cartItems.length > 0 ? cartItems :[])

    const setRatingField =(id, value) => {
        const newData = {...data };
        newData[id].rating = value;
        setData(newData);
      }
    
      const addToCart = () => {
        dispatch({
            type : actionType.SET_CART_ITEMS,
            cartItems : cartData,
        })
        localStorage.setItem('cartItems', JSON.stringify(cartData))

      }

      useEffect(() => {
        addToCart();
        // eslint-disable-next-line
      }, [cartData])
    
  return (
    <div
        ref={rowContainer}
        className={`w-full my-12 flex items-center gap-3 scroll-smooth ${
            flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"
        }`}
    >
        { data && data.length > 0 ? data.map((item,index) => (
            <motion.div 
                whileHover={{scale: 1.05}} 
                key={item?.id} 
                className={`w-275 min-w-[275px] md:w-300 md:min-w-[300px] h-[175px] mx-4 my-12 flex items-center justify-between ${theme ? 'bg-darkGray' : 'bg-lightGray'} rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg transition-all ease-in-out duration-100`}
            >
                <div className="w-full h-full">
                    <motion.img
                        whileHover={{scale: 1.2}}
                        src={item?.imageURL} 
                        alt="item"
                        className="w-40 max-h-40 -mt-10 drop-shadow-2xl" 
                    />
                    <div className="absolute bottom-5 ml-2">
                        <div className={`flex gap-1 items-center justify-center ${theme ? 'text-primary' : 'text-textColor'}`}>Rating: {<Rating  index={index} rating={data[index]?.hasOwnProperty('rating') ? data[index]?.rating:0 } onRating={setRatingField} theme={theme} />}</div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-end justify-center gap-4">
                    <motion.div 
                        whileTap={{scale: 0.75}} 
                        className={`w-8 h-8 rounded-full ${theme ? 'bg-lightRed' : 'bg-blueText'} flex items-center justify-center cursor-pointer hover:shadow-md`}
                        onClick={() => setCartData([...cartItems, item])}
                    >
                        <TiShoppingCart  className="text-primary"/>
                    </motion.div>
                    <div className="w-full h-28 flex flex-col items-end justify-end">
                        <p className={`${theme ? 'text-primary' : 'text-textColor'} font-semibold text-base md:text-lg text-right`}>
                            {item?.title}
                        </p>
                        <p className={`mt-1 text-sm ${theme ? 'text-lightRed' : 'text-blueText'}`}>{item?.calories} Calories</p>
                        <div className="flex items-center">
                            <p className={`text-lg ${theme ? 'text-primary' : 'text-textColor'} font-semibold`}>
                                <span className={`text-sm ${theme ? 'text-lightRed' : 'text-blueText'}`}>$</span> {item?.price}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        )): (
            <div className="w-full flex flex-col items-center justify-center gap-3 md:gap-4">
                <img src={NotFound} alt="NotFound" className="h-300" />
                <p className={`text-xl font-medium ${theme ? 'text-primary' : 'text-textColor'}`}>Items Not Available</p>
            </div>
        )}
    </div>
  )
}

export default RowContainer