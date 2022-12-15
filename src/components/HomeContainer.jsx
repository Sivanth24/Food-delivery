import React from 'react'
import Delivery from '../img/delivery.png'
import Herobg from '../img/heroBg.png'
import { heroData } from '../utils/data'

const HomeContainer = () => {
  return (
    <section id='home' className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img 
              src={Delivery} 
              className="w-full h-full object-contain" 
              alt="delivery" 
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in <span className="text-orange-600 text-[3rem] lg:text-[4.5rem]">Your City</span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, obcaecati veritatis. Sit officia temporibus odio? Quia perspiciatis quis nemo, laboriosam ullam natus vel nobis consequuntur nam suscipit optio omnis quod.
        </p>
        <button 
          type='button' 
          className="w-full md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img src={Herobg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="hero-bg" />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap overflow-scroll">
            {
                heroData && heroData.map (data => (
                    <div key={data?.id} className="lg:w-190 2xl:w-190 p-4 lg:mt-7 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
                        <img src={data?.imagesrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20" alt="I1" />
                        <p className="text-base lg:text-xl font-semibold text-textColor text-cente mt-2 lg:mt-4">{data?.name}</p>
                        <p className="text-[12px] lg:text-sm font-semibold text-lighttextGray text-center my-1 lg:my-3">{data?.description}</p>
                        <p className="text-sm font-semibold text-headingColor">
                            <span className="text-xs text-red-600">$</span> {data?.price}
                        </p>
                    </div>
                ))
            }
        </div>
      </div>
    </section>
  )
}

export default HomeContainer