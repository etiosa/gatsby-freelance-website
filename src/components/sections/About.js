import React from 'react'


const About = () => {
    
    return (
        <section  className='About-root'>
            <div className='About-root-container'>
                <div className='grid-title'>
                    <h2>Who Am I </h2>
                </div>
                <div className='grid-item'>
                    <p>
                        Hi there, my name is Etiosa Obasuyi. I am a FullStack developer based in Charlotte, NC.
                        I am a tireless seeker of knowledge and a breaker of things. I am curious to find what's beneath the wall. My curiosity had led me to a different
                        aspect of programming and technology.
                    </p>
                </div>
                <div className='grid-item'>
                    <p >I recently opened a game studio with a friend called RadioActive Games LLC. We are currently working
                        on our first title called the Mandala Order.</p>
                </div>
                <div className='grid-item'>
                    <p>I am looking forward to collaborating with you and creating a long-term business relationship.</p>
                </div>
                <div className='grid-item calt'>
                    <p >Have Project in mind? or just want to chat</p>
                </div>
                <div >
                    <button className='grid-button'><span>Get in Touch</span></button>
                </div>

            </div>


        </section>
    )


}


export default About;