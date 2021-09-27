import React, { useRef } from 'react';
import gsap from "gsap";



const MobileNavBar = (props) => {


    const bagRef = useRef(null)
    const navRef = useRef(null)

    gsap.defaults({
        duration: 0.3,
        stagger: 1
    })
    const timeline = gsap.timeline();

    const openMenu = () => {

        timeline.to(bagRef.current, { clipPath: 'circle(100%)' });
        for (const child of navRef.current.children) {
            timeline.to(child.children, { opacity: 1, });
        }
        if (timeline.reversed()) {
            timeline.play();
        }

    }

    const closeMenu = () => {

        timeline.reverse(1.5);

    }


    return (
        <React.Fragment>

            <div className='mobile-menu' onClick={openMenu}>
                <div></div>
                <div></div>
            </div>

            <div className='mobile-open-menu-bg' ref={bagRef} >
                <div className='mobile-menu-close' onClick={closeMenu}>
                    <div></div>
                    <div></div>
                </div>
                <ul ref={navRef} className='mobile-nav-bar' >


                    <li>
                        <a className='test'>Home</a>
                    </li>
                    <li>
                        <a>Work</a>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                    <li>
                        <a>Blog</a>
                    </li>
                </ul>
            </div>
        </React.Fragment>)
}

export default MobileNavBar;