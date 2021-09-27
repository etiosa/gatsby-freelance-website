import React, { useEffect, useRef, useState } from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"

const Contact = () => {
    let contact = useRef(null)

    useEffect(() => {
        //console.log(props)
       // console.log(contact)

       // props.createRef(contact);




    }, [])


    return (
        <Layout>
            <Seo title="Contact"/>
        
        <section ref={el => contact = el} className='contact-form-root'  >
        <div className='contact-content'>
            <div className='contact-form-header'>

                <p>obasuyietiosa@gmail.com</p>
            </div>

            <div>
                <form className='form-root'>
                    <div>
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
                    <input type="text" id="email" />


                    <label>email</label>
                    <input type="email" id="email" />
                    <label>Message</label>
                    <textarea id='message' />

                    <button><span>Send</span></button>

                </form>
            </div>
        </div>




            </section>
        </Layout>
            
            )
}


export default Contact;