import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import { Link } from "gatsby"

const MobileNavBar = props => {
  gsap.defaults({
    duration: 0.3,
    stagger: 1,
  })
  const timeline = gsap.timeline()

  const barTimeline = gsap.timeline({ repeat: 1, repeatDelay: 1 })

  const bagRef = useRef(null)
  const navRef = useRef(null)
  const divFirst = useRef(null)
  const divSecond = useRef(null)
  const divThird = useRef(null)

  useEffect(() => {
    if (document.querySelectorAll(".root-logo")[0]) {
      const elements = document.querySelectorAll(".root-logo")[0].childNodes
      elements.forEach((element, index) => {
        const elTime = gsap.to(element, {
          height: 2 + index * 1 + "em",
          yoyo: true,
          duration: 0.5,
          delay: 1,
          repeat: -1,
        })
        barTimeline.add(elTime)
      })
    }
  }, [])
    
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
      timeline.reverse(1);

    }
    const gotToSection = (index) => {
        closeMenu()
        props.gotoSection(index)
       
    }

    const gotToSectionNONMobile = (index)=>{
        props.gotoSection(index)

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
                 <Link onClick={() => { gotToSectionNONMobile(0)}} to='#home' >Home</Link>
                 <Link onClick={() => { gotToSectionNONMobile(1) }} to='#work'>Work</Link>
                 <Link onClick={() => { gotToSectionNONMobile(2) }} to='#about'>About</Link>
                 <Link onClick={() => { gotToSectionNONMobile(3) }} to='#contact'>Contact</Link>
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
                     <Link onClick={() => { gotToSection(0) }} to='#home'>
                     <span>Home</span>
                    </Link>
                 </li>
                 <li>
                     <Link onClick={() => { gotToSection(1) }} to='#work'>
                        <span>Work</span>
                    </Link>
                 </li>
                 <li>
                     <Link onClick={() => { gotToSection(2) }} to='#about'>
                        <span>About</span>
                    </Link>
                 </li>
                 <li>
                     <Link onClick={() => { gotToSection(3) }} to='#contact'>
                         <span>Contact</span>
                     </Link>
                 </li>
                </ul>
            </div>
        </React.Fragment>)
}

export default MobileNavBar
