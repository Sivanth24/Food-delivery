import React, { useState } from 'react'
import { categories } from '../utils/data'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase.config'
import { motion } from 'framer-motion'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import Loader from './Loader'
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const CreateContainer = () => {
    const [{ theme }, dispatch] = useStateValue()
    const [title, setTitle] = useState("")
    const [calories, setCalories] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState(null)
    const [imageAsset, setImageAsset] = useState(null)
    const [fields, setFields] = useState(false)
    const [alertStatus, setAlertStatus] = useState('danger')
    const [msg, setMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [percentage, setPercentage] = useState('')
    const borderColor = theme ? 'border-primary' : 'border-textColor'
    const iconColor = theme ? 'text-primary' : 'text-textColor'

    const uploadImage = (e) => {
      setIsLoading(true)
      const imageFile = e.target.files[0]
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)

      uploadTask.on('state_changed', (snapshot) => {
        const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setPercentage(uploadProgress)
      }, (error) => {
        console.log(error)
        setFields(true)
        setMsg('Error while uploading : Try again')
        setAlertStatus('danger')
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL)
          setIsLoading(false)
          setFields(true)
          setMsg('Image uploaded successfully')
          setPercentage('')
          setAlertStatus('success')
          setTimeout(() => {
            setFields(false)
          }, 4000)
        })
      })
    }

    const deleteImage = () => {
      setIsLoading(true)
      const deleteRef = ref(storage, imageAsset)
      deleteObject(deleteRef).then(() => {
        setImageAsset(null)
        setIsLoading(false)
        setFields(true)
        setMsg('Image deleted successfully')
        setAlertStatus('success')
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    }

    const saveDetails = () => {
      setIsLoading(true)
      try {
        if(!title || !category || !imageAsset || !calories || !price) {
          setFields(true)
          setMsg('Required fields cannot be empty')
          setAlertStatus('danger')
          setTimeout(() => {
            setFields(false)
            setIsLoading(false)
          }, 4000)
        } else {
          const data = {
            id: `${Date.now()}`,
            title: title,
            category: category,
            imageURL: imageAsset,
            calories: calories,
            quantity: 1,
            price: price
          }
          saveItem(data)
          setIsLoading(false)
          setFields(true)
          setMsg('Data uploaded successfully')
          clearData()
          setAlertStatus('success')
          setTimeout(() => {
            setFields(false)
          }, 4000)
        }
      } catch (error) {
          console.log(error)
          setFields(true)
          setMsg('Error while uploading : Try again')
          setAlertStatus('danger')
          setTimeout(() => {
            setFields(false)
            setIsLoading(false)
          }, 4000)
      }
      fetchData()
    }

    const clearData = () => {
      setTitle("")
      setCategory(null)
      setImageAsset(null)
      setCalories("")
      setPrice("")
    }

    const fetchData = async () => {
      await getAllFoodItems().then(data => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        })
      })
    }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className={`w-[90%] md:w-[75%] border ${borderColor} rounded-lg p-4 flex flex-col items-center justify-center gap-4`}>
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800" 
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className={`w-full py-2 border-b ${borderColor} flex items-center gap-2`}>
          <MdFastfood className={`text-xl ${iconColor}`}/>
          <input
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" 
            type="text" 
            required 
            value={title} 
            placeholder='Enter the title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full">
          <select
            onChange={e => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option 
              value="other" 
              className="bg-primary"
            >
              Select Category
            </option>
            {categories && categories.map((item) => (
              <option 
                key={item.id} 
                className="text-base border-0 outline-none capitalize bg-primary text-textColor"
                value={item.urlParamName}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={`group flex justify-center items-center flex-col border-2 border-dotted ${borderColor} w-full h-225 md:h-420 cursor-pointer rounded-lg`}>
          {isLoading ? <Loader percentage={percentage}/> : <>
              {!imageAsset 
                ? <>
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <MdCloudUpload className={`text-gray-500 text-3xl md:text-5xl hover:${iconColor}`}/>
                        <p className={`text-gray-500 hover:${iconColor}`}>Click here to upload</p>
                      </div>
                      <input 
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={uploadImage}
                        className="hidden"
                      />
                    </label>
                  </> 
                : <>
                    <div className="relative h-full">
                      <img 
                        src={imageAsset} 
                        alt="uploaded file"  
                        className="w-full h-full object-cover"
                      />
                      <button 
                        type='button'
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md transition-all ease-in-out duration-500"
                        onClick={deleteImage}
                      >
                        <MdDelete className="text-primary" />
                      </button>
                    </div>
                  </>
              }
          </>}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className={`w-full py-2 border-b ${borderColor} flex items-center gap-2`}>
            <MdFoodBank className={`text-2xl ${iconColor}`}/>
            <input 
              type="text"
              required
              value={calories}
              placeholder="Enter the calories produced"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div className={`w-full py-2 border-b ${borderColor} flex items-center gap-2`}>
            <MdAttachMoney className={`text-2xl ${iconColor}`}/>
            <input 
              type="text"
              required
              value={price}
              placeholder="Enter the price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex items-center">
          <motion.button
            whileTap={{scale: 0.9}}
            whileHover={{scale: 1.05}} 
            type='button'
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-lightRed px-12 py-2 rounded-lg text-lg text-primary font-semibold shadow-xl transition-all ease-in-out duration-100"
            onClick={saveDetails}
          >
            Save 
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer