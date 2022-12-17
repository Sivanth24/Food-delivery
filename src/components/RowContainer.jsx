import React from 'react'
import { motion } from 'framer-motion'
import { TiShoppingCart } from 'react-icons/ti'
import Rating from './Rating'

const RowContainer = ({ flag, data, setData, rowContainer}) => {
    console.log('data',data)

    const setRatingField =(id, value) => {
        console.log('setRatingField',id, value)
        const newData = {...data };
        newData[id].rating = value;
        console.log('setRatingField',id,newData[id])
        setData(newData);
      }
    
  return (
    <div
        ref={rowContainer}
        className={`w-full my-12 flex items-center gap-3 scroll-smooth ${
            flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap"
        }`}
    >
        { data && data.map((item,index) => (
            <motion.div 
                whileHover={{scale: 1.05}} 
                key={item?.id} 
                className="w-275 min-w-[275px] md:w-300 md:min-w-[300px] h-[175px] mx-4 my-12 flex items-center justify-between bg-cardOverlay rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg transition-all ease-in-out duration-100"
            >
                <div className="w-full h-full">
                    <motion.img
                        whileHover={{scale: 1.2}}
                        src={item?.imageURL} 
                        alt="item"
                        className="w-40 max-h-40 -mt-10 drop-shadow-2xl" 
                    />
                    <div className="absolute bottom-5 ml-2">
                        <div className="flex gap-1 items-center justify-center">Rating: {<Rating  index={index} rating={data[index]?.hasOwnProperty('rating') ? data[index]?.rating:0 } onRating={setRatingField} />}</div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-end justify-end">
                    <motion.div whileTap={{scale: 0.75}} className="w-8 h-8 mb-10 mr-2 mt-2 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md">
                        <TiShoppingCart  className="text-white"/>
                    </motion.div>
                    <p className="text-textColor font-semibold text-base md:text-lg text-right">
                        {item?.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{item?.calories} Calories</p>
                    <div className="flex items-center gap-8">
                        <p className="text-lg text-headingColor font-semibold">
                            <span className="text-sm text-red-500">$</span> {item?.price}
                        </p>
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
  )
}

export default RowContainer