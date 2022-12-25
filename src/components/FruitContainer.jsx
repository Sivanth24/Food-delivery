import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'

const FruitContainer = () => {
    const [{ foodItems, theme }] = useStateValue()
    const rowContainer = useRef()
    // eslint-disable-next-line
    const [data, setData] = useState()
    const switchText = theme ? 'text-primary' : 'text-textColor'
    
    const scroll = (scrollOffset) => {
      rowContainer.current.scrollLeft += scrollOffset;
    }

  return (
    <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className={`text-2xl font-semibold capitalize ${switchText} relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-lightRed`}>
            Our fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div 
              whileTap={{scale: 0.75}}
              whileHover={{scale: 1.15}} 
              className="w-8 h-8 rounded-lg bg-lightRed cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg flex items-center justify-center"
              onClick={() => {scroll(-400)}}
            >
              <MdChevronLeft className="text-lg text-primary"/>
            </motion.div>
            <motion.div 
              whileTap={{scale: 0.75}}
              whileHover={{scale: 1.15}} 
              className="w-8 h-8 rounded-lg bg-lightRed cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg flex items-center justify-center"
              onClick={() => {scroll(+400)}}
            >
              <MdChevronRight className="text-lg text-primary"/>
            </motion.div>
          </div>
        </div>
        <RowContainer flag={true} rowContainer ={rowContainer} data={foodItems?.filter((n) => n.category === "fruits")} setData={setData} theme={theme}/>
    </section>
  )
}

export default FruitContainer