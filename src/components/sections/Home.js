import React, { useEffect, useRef } from "react"

import "../../sass/index.scss"
import { Link } from "gatsby"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { RoughEase } from "gsap/EasePack"

const words = [
    "Full-Stack developer",
    "UI/UX Designer",
    "Web Designer",
    "Mobile App Developer",
]
gsap.registerPlugin(TextPlugin, RoughEase)

const Home = (props) => {
    let HomeRef = useRef(null)
    useEffect(() => {

        props.createReferences(HomeRef);

        let masterTimeline = gsap.timeline({ repeat: -1 });
        words.forEach(word => {

            let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 })
            tl.to('.text', { duration: 1, text: word, ease: 'power2.inout' })
            masterTimeline.add(tl)
        })
    }, [])

    const gotToSection = (index) => {
        props.gotoSection(index)
    }

    return (
        <section className='home-section' ref={el => HomeRef = el} >
            <div className='home-root'>
                <div className='text-root' style={{ marginTop: '2em' }}>
                    <span style={{ fontFamily: "FH OScar" }}>Hi, I'm a </span>
                    <span className='text'></span>
                </div>

                <h2 style={{ position: 'relative' }}>{/* <span style={{ display: 'block', width: '100%', height: '10%', background: 'red', position: 'absolute' }}>
                    </span> */}A Developer WITH PASSION FOR UI.</h2>
                <p>I will help you design a Minimalistic,
                    and intuitive user interface that will enthrall and engage your users</p>
            </div>
            <div className='link-root'>
                <Link className='cta' to='#work' onClick={() => { gotToSection(1) }}><span>View My Work</span></Link>
                <Link className='view' to='#contact' onClick={() => { gotToSection(3) }}>

                    <span>Let's Talk</span></Link>
            </div>
            <div className='root-scroll' style={{ marginTop: '10em' }}>
                <div className="mouse"></div>
                <p className='scrollp '>Scroll</p>
            </div>
        </section>


    )


}

export default Home
