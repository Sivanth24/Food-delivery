import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdFastfood } from 'react-icons/md'
import { useStateValue } from '../context/StateProvider'
import { categories } from '../utils/data'
import RowContainer from './RowContainer'

const MenuContainer = () => {
    const [{ foodItems, theme }] = useStateValue()
    const [filter, setFilter] = useState('chicken')
    // eslint-disable-next-line
    const [data, setData] = useState()
    const switchText = theme ? 'text-primary' : 'text-textColor'


    const handleCardColor =  (category)=>{
        if(filter === category.urlParamName) {
            if(theme) {
                return ('bg-lightRed hover:bg-lightRed')
            } else {
                return ('bg-blueText hover:bg-blueText')
            }
        } else {
            if(theme) {
                return ('bg-darkGray hover:bg-lightRed')
            } else {
                return ('bg-lightGray hover:bg-blueText')
            }
        }
    }

    const handleIconBg = (category) => {
        if(filter === category.urlParamName) {
            if(theme) {
                return ('bg-darkGray group-hover:bg-darkGray')
            } else {
                return ('bg-lightGray group-hover:bg-lightGray')
            }
        } else {
            if(theme) {
                return ('bg-lightRed group-hover:bg-darkGray')
            } else {
                return ('bg-blueText group-hover:bg-lightGray')
            }
        }
    }

    const handleIconColor = (category) => {
        if(filter === category.urlParamName) {
            if(theme) {
                return ('text-lightRed group-hover:text-lightRed')
            } else {
                return ('text-blueText group-hover:text-blueText')
            }
        } else {
            if(theme) {
                return ('text-darkGray group-hover:text-lightRed')
            } else {
                return ('text-lightGray group-hover:text-blueText')
            }
        }
    }

    const handleCardName = (category) => {
        if(filter === category.urlParamName) {
            if(theme) {
                return ('text-primary group-hover:text-primary')
            } else {
                return ('text-primary group-hover:text-primary')
            }
        } else {
            if(theme) {
                return ('text-lightRed group-hover:text-primary')
            } else {
                return ('text-textColor group-hover:text-primary')
            }
        }
    }

  return (
    <section id='menu' className="w-full my-6">
        <div className="w-full flex flex-col items-center justify-center">
            <p className={`mr-auto text-2xl font-semibold capitalize ${switchText} relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-lightRed`}>
                Our Hot Dishes
            </p>
            <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
                { categories && categories.map(category => (
                    <motion.div
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}} 
                        key={category.id} 
                        className={`group ${handleCardColor(category)} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center transition-all ease-in-out duration-150`}
                        onClick={() => setFilter(category.urlParamName)}
                    >
                        <div className={`w-10 h-10 rounded-full ${handleIconBg(category)} flex items-center justify-center`}>
                            <MdFastfood className={`${handleIconColor(category)} text-lg`}/>
                        </div>
                        <p className={`text-sm font-medium ${handleCardName(category)}`}>{category.name}</p>
                    </motion.div>
                )) }
            </div>
            <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
               <div className="w-full ml-auto" >
                    <RowContainer flag={false} data={foodItems?.filter((n) => n.category === `${filter}`)} setData={setData} theme={theme}/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default MenuContainer