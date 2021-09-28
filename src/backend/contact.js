import { addDoc,collection,firestore} from "./firebase"


const sendContact = async (contact) => {
   // console.log(isDone)
    try {
        const docRef = await addDoc(collection(firestore, 'CONTACT'), {
        
            name: contact.name,
            email: contact.email,
            message: contact.message
        

        });
        console.log(docRef.id)
      
    } catch (e) {
        console.error("Error adding document: ", e);

    }
}
export {sendContact} 