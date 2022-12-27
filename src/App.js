import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Header, MainContainer, CreateContainer, Footer } from "./components"
import { useStateValue } from "./context/StateProvider"
import { getAllFoodItems } from "./utils/firebaseFunctions"
import { actionType } from "./context/reducer"

const App = () => {
  const [{ theme }, dispatch] = useStateValue()
  const switchBg = theme ? 'bg-textColor' : 'bg-primary'

    const fetchData = async () => {
      await getAllFoodItems().then(data => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        })
      })
    }

    useEffect(() => {
      fetchData()
      // eslint-disable-next-line
    },[])

  return (
    <AnimatePresence>
      <div className={`w-screen h-auto flex flex-col ${switchBg}`}>
        <Header />
        <main className="w-full mt-14 md:mt-20 px-4 md:px-16 py-4">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
        <Footer theme={theme} />
      </div>
    </AnimatePresence>
  )
}

export default App