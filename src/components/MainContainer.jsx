import React, { useRef, useState } from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from "../context/StateProvider"
import MenuContainer from './MenuContainer'

const MainContainer = () => {
    const [{ foodItems }] = useStateValue()
    const rowContainer = useRef()
    // eslint-disable-next-line
    const [data, setData] = useState()
    
    const scroll = (scrollOffset) => {
      rowContainer.current.scrollLeft += scrollOffset;
    }

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-textColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-orangeText">
            Our fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div 
              whileTap={{scale: 0.75}} 
              className="group w-8 h-8 rounded-lg bg-textColor hover:bg-orangeText hover:text-textColor cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg flex items-center justify-center"
              onClick={() => {scroll(-400)}}
            >
              <MdChevronLeft className="text-lg text-primary group-hover:text-textColor"/>
            </motion.div>
            <motion.div 
              whileTap={{scale: 0.75}} 
              className="group w-8 h-8 rounded-lg bg-textColor hover:bg-orangeText cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg flex items-center justify-center"
              onClick={() => {scroll(+400)}}
            >
              <MdChevronRight className="text-lg text-primary group-hover:text-textColor"/>
            </motion.div>
          </div>
        </div>
        <RowContainer flag={true} rowContainer ={rowContainer} data={foodItems?.filter((n) => n.category === "fruits")} setData={setData}/>
      </section>
      <MenuContainer />
    </div>
  )
}

export default MainContainer