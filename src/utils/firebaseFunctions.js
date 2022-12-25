import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

/* Saving new Item data */
export const saveItem = async (data) => {
    await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), data, { merge: true })
}

/* Getting food items */
export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, 'foodItems'), orderBy('id', 'desc'))
    )
    return items.docs.map((doc) => doc.data())
}

/* Saving email for newslwìetter */
export const saveEmail = async (email) => {
    await setDoc(doc(firestore, 'newsletter_emails', `${Date.now()}`), email, { merge: true })
}