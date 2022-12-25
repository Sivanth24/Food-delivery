import React from 'react'
import HomeContainer from './HomeContainer'
import { useStateValue } from "../context/StateProvider"
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'
import FruitContainer from './FruitContainer'

const MainContainer = () => {
    const [{ cartShow }] = useStateValue()

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <FruitContainer />
      <MenuContainer />
      {cartShow && 
        <CartContainer />
      }
    </div>
  )
}

export default MainContainer