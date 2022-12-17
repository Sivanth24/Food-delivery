import React, { useState } from 'react'
import { MdFastfood } from 'react-icons/md'
import { useStateValue } from '../context/StateProvider'
import { categories } from '../utils/data'
import RowContainer from './RowContainer'

const MenuContainer = () => {
    const [{ foodItems }] = useStateValue()
    const [filter, setFilter] = useState('chicken')
    // eslint-disable-next-line
    const [data, setData] = useState()

  return (
    <section id='menu' className="w-full my-6">
        <div className="w-full flex flex-col items-center justify-center">
            <p className="mr-auto text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
                Our Hot Dishes
            </p>
            <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
                { categories && categories.map(category => (
                    <div onClick={() => setFilter(category.urlParamName)}>
                        <div key={category.id} className="group bg-card hover:bg-cartNumBg w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center transition-all ease-in-out duration-150">
                            <div className="w-10 h-10 rounded-full bg-cartNumBg group-hover:bg-card flex items-center justify-center">
                                <MdFastfood className="text-card group-hover:text-textColor text-lg" />
                            </div>
                            <p className="text-sm text-textColor group-hover:text-white">{category.name}</p>
                        </div>
                    </div>
                )) }
            </div>
            <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
               <div className="w-full ml-auto" >
                    <RowContainer flag={true} data={foodItems?.filter((n) => n.category === `${filter}`)} setData={setData}/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default MenuContainer