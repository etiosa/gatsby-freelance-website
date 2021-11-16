import React,{Component} from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "../sass/index.scss"
import About from "../components/sections/About"
import Contact from "../components/sections/Contact"
import Home from "../components/sections/Home"
import Work from "../components/sections/Work";
import gsap, { Power2 } from "gsap";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Line from "../components/line";
import SideNavBar from "../components/SideBar"
import Navbar from "../components/Navbar"

const arryRef = [];
const ar = [<Home />,

  <Work />,
  <About />,
  <Contact />
]
//const MAX_SECTION=2
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger );
class IndexPage extends Component {
  state = {
    MAX_SECTION: 3,
    currentIndex: 0,
    index:0
  }

  componentDidMount() {
   // window.addEventListener('wheel', this.next)
    //console.log(com.greensock.plugins.ScrollToPlugin.version); // -> 1.8.0

  }


  goToSnapSection = (e) => {
    //console.log("scroll")
    //console.log(e)

    //console.log(arryRef)
    console.log('scroll')
    let Delta = e.wheelDelta;
    console.log(Delta)
    //down wheel
    if (Delta < 0) {
      console.log('down')

      if (this.state.currentIndex !== arryRef.length - 1) {
        if (gsap.isTweening(window)) {
          return;
        }
        else {
          this.setState({ currentIndex: this.state.currentIndex + 1 })
          this.goToSection(this.state.currentIndex)
        }


        // console.log(this.state.currentIndex)
      }

    }
    //up wheel

    else if (Delta > 0) {
      console.log('up')
      console.log(this.state.currentIndex)

      //console.log(e.wheelDelta)
      // console.log(this.state.currentIndex)
      if (this.state.currentIndex !== arryRef.length && this.state.currentIndex > 0) {
        console.log("back?")
        if (gsap.isTweening(window)) {
          return;
        }
        else {
          this.setState({ currentIndex: this.state.currentIndex - 1 })
          this.goToSection(this.state.currentIndex)
        }

      }


    }
  }
  createReferences = (ref) => {
    console.log(ref)
    if (arryRef.length !== this.state.MAX_SECTION) {
      arryRef.push(ref);

    }


    console.log(arryRef)
  }
  goToSection = (index) => {
    // console.log(index)

    console.log("gotosection")

   // const timeline = gsap.timeline();
   //console.log("index 0 offsettop",arryRef[0].offsetTop)

   // console.log("index 1 offsettop", arryRef[1].offsetTop)



    if (gsap.isTweening(window)) {
      console.log("return?")
      return;
    }
    else {
     // timeline.to(window, { scrollTo: arryRef[index].offsetTop, duration:0.6, ease:'Power2.out'})
      console.log("else")
      console.log(arryRef[index].offsetTop)

      //timeline.to(window, { scrollTo: arryRef[index].offsetTop, duration: 0.6, ease: "power2.out" });
    }


   //handle next section
    // handle prev section

    //click it reveal the item to you
    //an array



  }
  next = () => {
    this.setState({index:this.state.index+1})
  }
  prev = () => {
    console.log('prev', this.state.index)
    this.setState({index:this.state.index-1})
  }

  render() {
    return (
      <Layout>
        <Seo title="Home" />
        <Navbar />
        
        <Home />
        <Work />
        <About />
      
     
    
       

            
  
  
    
      </Layout>
    )
  }
}

export default IndexPage
