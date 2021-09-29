<<<<<<< HEAD
import React, { useEffect, useState, useContext } from "react"
import {
  addDoc,
  collection,
  firestore,
  serverTimestamp,
} from "../../backend/firebase"

const Contact = props => {
  let contactRef = useState(null)
  let [isDone, setDone] = useState(false)
  let [isSend, setSend] = useState(false)

  let [contactObject, setOContactObject] = useState({
    message: "",
    email: "",
    name: "",
    time: "",
  })

  useEffect(() => {
    props.createReferences(contactRef)
  }, [])
  const send = e => {
    e.preventDefault()
    sendContact(contactObject)
    document.getElementById("form").reset()
  }

  const sendContact = async contact => {
    // console.log(isDone)
    try {
      const docRef = await addDoc(collection(firestore, "CONTACT"), {
        name: contact.name,
        email: contact.email,
        message: contact.message,
        time: serverTimestamp(),
      })
      setDone(true)
      console.log(docRef.id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }
  const onChange = e => {
    console.log(e.target["name"])

    // console.log("message value ",contactObject['message'])
    setOContactObject({ ...contactObject, [e.target.id]: e.target.value })
  }

  return (
    <section className="contact-form-root" ref={el => (contactRef = el)}>
      <div className="contact-content">
        {/*  <div className='contact-form-header'>
=======
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

        try {
            const docRef = await addDoc(collection(firestore, 'CONTACT'), {

                name: contact.name,
                email: contact.email,
                message: contact.message,
                time: serverTimestamp()


            });
            setDone(true)
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
                {/*  <div className='contact-form-header'>
>>>>>>> main

                    <p>obasuyietiosa@gmail.com</p>
                </div> */}

<<<<<<< HEAD
        <form onSubmit={send} id="form" className="form-root">
          <div className="contact-title">
            <h1>Let's Talk</h1>
          </div>
          <div className="contact-p">
            <p>
              I'm always open to new creative collaborations and would love to
              talk about potential projects you have in mind.
            </p>
            <br />
            <p>
              Don't hesitate to get in touch, even if it's just say hello. I'm
              always happy to help
            </p>
          </div>
          <label>Name</label>
          <input onChange={onChange} type="text" id="name" />

          <label>email</label>
          <input onChange={onChange} type="email" id="email" />
          <label>Message</label>
          <textarea onChange={onChange} id="message" />

          <button>
            <span>Send</span>
          </button>
        </form>
      </div>
    </section>
  )
=======

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
                    <input onChange={onChange} type="text" id="name" />


                    <label>email</label>
                    <input onChange={onChange} type="email" id="email" />
                    <label>Message</label>
                    <textarea onChange={onChange} id='message' />

                    <button><span>Send</span></button>

                </form>
            </div>






        </section>
    )


>>>>>>> main
}

export default Contact
