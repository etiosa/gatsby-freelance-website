import React, { useRef, useEffect } from 'react';
import gsap from "gsap";
import { Link } from 'gatsby';



const MobileNavBar = (props) => {

    gsap.defaults({
        duration: 0.3,
        stagger: 1
    })
    const timeline = gsap.timeline();

    const barTimeline = gsap.timeline({repeat:1, repeatDelay:1});

    const bagRef = useRef(null)
    const navRef = useRef(null)
    const divFirst =useRef(null)
    const divSecond = useRef(null)
    const divThird = useRef(null)

    
    useEffect(() => {

        console.log(document.querySelectorAll('.root-logo'))
        console.log(document.querySelectorAll('.root-logo')[0].childNodes)
        if (document.querySelectorAll('.root-logo')[0]) {

            const elements = document.querySelectorAll('.root-logo')[0].childNodes;
            console.log(elements)
            elements.forEach((element, index) => {

               const elTime= gsap.to(element, { height: 2+index*1+'em', yoyo: true, duration: 0.5,delay:1, repeat:-1 })
                barTimeline.add(elTime)
                 
                console.log(element.clientHeight)
             })
        
        }

        
    },[])


  

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
            
            <div className='app-nav-bar'>
                <div className='root-logo'>
                    <div ref={divFirst}></div>
                    <div ref={divSecond}></div>
                   <div ref={divThird}></div>
                </div>
                <ul className='nav-link-container'>
                    <Link >Home</Link>
                    <Link>Work</Link>
                    <Link >Contact</Link>
                    <Link >About</Link>
                    <Link  to='https://obasuyietiosa.com/'>Blog</Link>
                </ul>
            </div>

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