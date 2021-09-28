import React, { useEffect, useState } from 'react'



const Contact = (props) => {
    let contactRef= useState(null)
    useEffect(() => {
        props.createReferences(contactRef)

    }, [])
    return (

        <section className='contact-form-root' ref={el => contactRef = el} >
            <div className='contact-content'>
               {/*  <div className='contact-form-header'>

                    <p>obasuyietiosa@gmail.com</p>
                </div> */}

                
                <form className='form-root'>
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
                        <input type="text" id="email" />


                        <label>email</label>
                        <input type="email" id="email" />
                        <label>Message</label>
                        <textarea id='message' />

                        <button><span>Send</span></button>

                    </form>
                </div>
        




        </section>
    )


}




export default Contact;