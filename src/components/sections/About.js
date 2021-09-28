import React,{useEffect, useState} from 'react'


const About = (props) => {
    let aboutRef= useState(null)
    useEffect(() => {
        props.createReferences(aboutRef)

    },[])

    return (
        <section className='about-section' ref={el => aboutRef = el} id='about'>
            <div className='header-container'>
                <h1 className='header-title'>Who </h1>
                <h1 className='who' >AM I ?</h1>
            </div>
            <div className='about-root'>

                <div className='header-root'>
                </div>
                <div className='p1-root'>
                    <p>
                        Hi there, my name is Etiosa Obasuyi. I am a FullStack developer based in Charlotte, NC.
                        I am a tireless seeker of knowledge and a breaker of things. I am curious to find what's beneath the wall. My curiosity had led me to a different
                        aspect of programming and technology.
                    </p>
                </div>
                <div className='p1-root' >
                    <p >I recently opened a game studio with a friend called RadioActive Games LLC. We are currently working
                        on our first title called the Mandala Order.</p>
                     <p>I am looking forward to collaborating with you and creating a long-term business relationship.</p>
                    <p >Have Project in mind? or just want to chat</p>
                </div>
            </div>
    </section>
    )


}


export default About;