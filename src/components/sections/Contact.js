import React, { useEffect, useState } from 'react'
import { addDoc, collection, firestore, serverTimestamp } from "../../backend/firebase"



const Contact = (props) => {
    let contactRef = useState(null)
    let [isDone, setDone] = useState(false)
    let [isSend, setSend] = useState(false)

    let [contactObject, setOContactObject] = useState({

        message: '', email: '', name: '', time: ''

    })

    useEffect(() => {
        props.createReferences(contactRef)

    }, [])
    const send = (e) => {
        e.preventDefault();
        sendContact(contactObject)
        document.getElementById('form').reset()
    }

    const sendContact = async (contact) => {
        setSend(true)

        try {
            const docRef = await addDoc(collection(firestore, 'CONTACT'), {

                name: contact.name,
                email: contact.email,
                message: contact.message,
                time: serverTimestamp()


            });
            setDone(true)
            setSend(false)
            console.log(docRef.id)

        } catch (e) {
            console.error("Error adding document: ", e);

        }
    }
    const onChange = (e) => {
        setOContactObject({ ...contactObject, [e.target.id]: e.target.value })
    }

    return (

        <section className='contact-form-root' ref={el => contactRef = el} >
            <div className='contact-content'>

                <form onSubmit={send} id='form' className='form-root'>
                    <div className='contact-title'>
                        <h1 >Let's Talk</h1>
                    </div>
                    <div className='contact-p'>
                        <p>
                            I'm always open to new creative collaborations and would
                            love to talk about potential projects you have in mind.
                        </p>
                        <br />
                        <p>
                            Don't hesitate to get in touch, even if
                            it's just say hello. I'm  always happy to help
                        </p>
                    </div>
                    <label>Name</label>
                    <input required onChange={onChange} type="text" id="name" />


                    <label>Email</label>
                    <input required onChange={onChange} type="email" id="email" />
                    <label>Message</label>
                    <textarea required onChange={onChange} id='message' />
                    <div style={{ textAlign: 'center', marginTop: '0.6em' }}>
                        {isSend ? <p>Sending.....</p> : null}
                        {isDone ? <p style={{ fontWeight: 'bold', color: '#042904' }}>Thank you for reaching out</p> : null}


                    </div>

                    <button><span>Send</span></button>

                </form>
            </div>






        </section>
    )


}

export default Contact
