import React, { Component } from "react"
import "../sass/index.scss"
import About from "../components/sections/About"
import Contact from "../components/sections/Contact"
import Home from "../components/sections/Home"
import Work from "../components/sections/Work"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Line from "../components/line"
import Navbar from "../components/Navbar"

gsap.registerPlugin(ScrollToPlugin)
const arrayRef = []
class IndexPage extends Component {
  state = {
    MAX_SECTION: 4,
    currentIndex: 0,
  }
  componentDidMount() {
    this.mouseCurouser = document.querySelector('.cursor');
    this.worksection = document.querySelector('.work-header');
    this.work = document.querySelector('.work')

    this.view = document.querySelector('.view')
    this.navLink = document.querySelectorAll('.nav-link-container a');

    window.addEventListener("mousemove", this.cursor)

    this.navLink.forEach(link => {
      link.addEventListener("mouseover", () => {
        this.mouseCurouser.classList.add("active-grow")
      })

      link.addEventListener("mouseleave", () => {
        this.mouseCurouser.classList.remove("active-grow")
      })
    })
    this.worksection.addEventListener("mouseover", () => {
      this.mouseCurouser.classList.add("cursour-work-section")
      this.mouseCurouser.style.zIndex = 1
    })

    this.worksection.addEventListener("mouseleave", () => {
      this.mouseCurouser.classList.remove("cursour-work-section")
      this.mouseCurouser.style.zIndex = -1
    })
    this.work.addEventListener("mouseover", () => {
      this.work.classList.add(".work-cursour-over")
    })
  }
  cursor = e => {
    this.mouseCurouser.style.top = e.clientY + "px"
    this.mouseCurouser.style.left = e.clientX + "px"
  }

  createReferences = ref => {
    if (arrayRef.length !== this.state.MAX_SECTION) {
      arrayRef.push(ref)
    }
  }

  gotoSection = (index) => {
    const timeline = gsap.timeline();
    timeline.to(window, { scrollTo: arrayRef[index].offsetTop, duration: 1, ease: "power2.out", delay: 0 });
  }

  render() {
    return (
      <Layout>
        <Seo title="Home" />
        <div className='cursor'></div>
        <Line />
        <Navbar gotoSection={this.gotoSection} />
        <Home gotoSection={this.gotoSection} createReferences={this.createReferences} />
        <Work createReferences={this.createReferences} />
        <About createReferences={this.createReferences} />
        <Contact createReferences={this.createReferences} />
      </Layout>
    )
  }
}
export default IndexPage
