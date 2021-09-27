import React, { Component } from 'react'

import "../../sass/index.scss"
import ImageOne from "../../images/2.jpg"
import ImageTwo from "../../images/2.jpg"
import ImageThree from "../../images/3.png"
import * as THREE from "three"

import gsap from "gsap";
import { onTargetChange } from "../../ulilites/ulit"
import { Link } from 'gatsby'

class Work extends Component {
  

    constructor(props) {
        super(props);
        this.WorkRef = React.createRef();
    }
    
    initConstu = () => {

        this.container = document.querySelector('.work')
        this.itemWrapper = document.querySelector('.work')
    }
    //The get syntax binds an object property to a 
    //function that will be called when that property is looked up.

    animation = () => {
        this.time += this.clock.getDelta() * this.timeSpeed

        this.renderer.render(this.scene, this.camera)
        //console.log("called frame")
        requestAnimationFrame(this.animation);

    }

    get viewport() {

        let width = this.container.clientWidth
        let height = this.container.clientHeight;
        let aspectRatio = width / height;
       // console.log("container height", height)

        return { width, height, aspectRatio }
    }
    initSetup = () => {
        //setup the scene
        this.initConstu();
        console.log(this.itemWrapper)

        window.addEventListener('resize', this.onWindowResize.bind(this), false); // boolean, if true it will be remove once is was trigger

        //render 
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.viewport.width, this.viewport.height);
       // console.log("viewport height", this.viewport.height)
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement)
        // for canvas to append element

        //scene
        this.scene = new THREE.Scene()


        //camera
        //look into  camera 

        this.camera = new THREE.PerspectiveCamera(40, this.viewport.aspectRatio, 0.1, 100)
        this.camera.position.set(0, 0, 3)

        //mouse
        this.mouse = new THREE.Vector2()


        //time
        this.timespeed = 2
        this.time = 0
        this.clock = new THREE.Clock()


        this.pushTexture();
        this.loadTexture();
        this.createMesh();
        this.createEventListener();
        this.animation();

    }
    //bind an object to this class 
    get itemsElements() {


        //convert nodelist to array 
        const items = [...document.querySelectorAll('.link')]
        console.log(items)


        return items.map((item, index) => ({
            element: item,
            img: item.querySelector('img') || null,
            index: index

        }))
    }

    pushTexture = () => {

        let texturePromise = []
        const THREETextureloader = new THREE.TextureLoader();

        this.items = this.itemsElements;

        this.items.forEach((item, index) => {
            //create texture here
            texturePromise.push(
                this.loadTexture(THREETextureloader, item.img ? item.img.src : null,

                    index
                )
            )

        })


        return new Promise((resolve, reject) => {

            //resolve  texture promises
            Promise.all(texturePromise).then(promises => {

                promises.forEach((promise, index) => {

                    //assign texture to item
                    this.items[index].texture = promise.texture

                })
                resolve()
            })
        })
    }



    //load texture
    loadTexture = (loader, url, index) => {

        return new Promise((resolve, reject) => {

            if (!url) {
                resolve({ texture: null, index })
                return
            }


            //load a resource
            loader.load(
                //resource url
                url,

                //onload callback
                texture => {
                    console.log(" load call back", texture)
                    resolve({ texture, index })
                },

                //onProgress callback currentrly not supported
                undefined,

                //onError callback
                error => {
                    console.error('An error happened', error)
                    reject(error)
                }

            )



        })

    }
    //create a mesh 
    createMesh = () => {
        this.position = new THREE.Vector3(0, 0, 0);
        this.scale = new THREE.Vector3(1, 1, 1)
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32) // look into this
        this.uniforms = {
            uTexture: {
                value: null
            },

            uOffset: {
                value: new THREE.Vector2(0.0, 0.0)
            },
            uAlpha: {
                value: 0
            }
        }


        this.material = new THREE.ShaderMaterial({

            uniforms: this.uniforms,
            vertexShader: `
              uniform vec2 uOffset;

        varying vec2 vUv;

        vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
          float M_PI = 3.1415926535897932384626433832795;
          position.x = position.x + (sin(uv.y * M_PI) * offset.x);
          position.y = position.y + (sin(uv.x * M_PI) * offset.y);
          return position;
        }

        void main() {
          vUv =  uv + (uOffset * 2.);
          vec3 newPosition = position;
          newPosition = deformationCurve(position,uv,uOffset);
          gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
        }
      `,
            fragmentShader:
                `   uniform sampler2D uTexture;
        uniform float uAlpha;

        varying vec2 vUv;

        vec2 scaleUV(vec2 uv,float scale) {
          float center = 0.5;
          return ((uv - center) * scale) + center;
        }

        void main() {
          vec3 color = texture2D(uTexture,scaleUV(vUv,0.8)).rgb;
          gl_FragColor = vec4(color,uAlpha);
        }
      `,
            transparent: true

        })

        this.plane = new THREE.Mesh(this.geometry, this.material)

        //add the plane to the scene 
        this.scene.add(this.plane)






    }



    createEventListener = () => {
        this.items.forEach((item, index) => {

            item.element.addEventListener('mouseover', this._onMouseOver.bind(this, index), false)
            item.element.addEventListener('mouseleave', this._onMouseLeave.bind(this), false)
        })
        this.container.addEventListener('mousemove', this._onMouseMove, false)

        // this.itemWrapper.addEventListener('mouseleave', this._onMouseLeave.bind(this), false)

    }


    _onMouseLeave = (event) => {


        this.isMouseOver = false
        this.onMouseLeave(event)
    }
    _onMouseMove = (event) => {

        // get normaliozed mouse position on viewport
        this.mouse.x = (event.clientX / this.viewport.width) * 2 - 1
        this.mouse.y = -(event.clientY / this.viewport.height) * 2 + 1
        //console.log(this.mouse.x.map)

        this.onMouseMove(event)
        //onMouseMove(event, this.viewSize, gsap,this.mouse, this.onPositionUpdate,  this.plane, this.position)
    }



    _onMouseOver = (index, event) => {
        this.tempItemIndex = index;
        this.onMouseOver(index, event)

    }
    onMouseEnter = () => {
        // console.log("mouse enter")


        if (!this.currentItem || !this.isMouseOver) {
            this.isMouseOver = true
            // show plane
            gsap.to(this.uniforms.uAlpha, {
                value: 1,
                ease: 'Power4.easeOut',
                duration: 0.5
            })
        }
    }


    onMouseLeave = (index, event) => {
        //console.log("mouse leave")
        console.log(this.itemWrapper)

        gsap.to(this.uniforms.uAlpha, {
            value: 0,
            ease: 'Power4.easeOut',
            duration: 0.5
        })

    }

    onMouseOver = (index, event) => {

        //check here once we fully loaded texture
        this.onMouseEnter()
        if (this.currentItem && this.currentItem.index === index) return

        onTargetChange(index, THREE, this.currentItem, this.items, this.plane, this.uniforms)
        //this.onTargetChange(index)


    }


    onMouseMove = (event) => {

        // project mouse position to world coordinates
        // console.log(this.mouse.x.map)
        let x = this.mouse.x.map(
            -1,
            1,
            -this.viewSize.width / 2,
            this.viewSize.width / 2
        )
        let y = this.mouse.y.map(
            -1,
            1,
            -this.viewSize.height / 2,
            this.viewSize.height / 2
        )

        this.position = new THREE.Vector3(x, y, 0)
        gsap.to(this.plane.position, {
            x: x,
            y: y,
            ease: 'Power4.easeOut',
            duration: 1,
            onUpdate: this.onPositionUpdate.bind(this)
        })




    }



    onPositionUpdate = () => {

        //compute offset

        let offset = this.plane.position
            .clone()
            .sub(this.position)
            .multiplyScalar(-0.25)
        this.uniforms.uOffset.value = offset
    }


    get viewSize() {
        // fit plane to screen
        let distance = this.camera.position.z
        let vFov = (this.camera.fov * Math.PI) / 180
        let height = 2 * Math.tan(vFov / 2) * distance
        let width = height * this.viewport.aspectRatio
        //console.log(height, width)
        return { width, height, vFov }
    }

    onWindowResize = () => {
        this.camera.aspect = this.viewport.aspectRatio
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.viewport.width, this.viewport.height)

    }

    //change Target

    onTargetChange = (index) => {



        //item changed
        this.currentItem = this.items[index]
        if (!this.currentItem.texture) return

        //compute image ratio 

        let imageRatio =
            this.currentItem.img.naturalWidth / this.currentItem.img.naturalHeight
        this.scale = new THREE.Vector3(imageRatio, 1, 1)
        this.uniforms.uTexture.value = this.currentItem.texture
        this.plane.scale.copy(this.scale)
    }

    componentDidMount() {
        //this.initScene();
        Number.prototype.map = function (in_min, in_max, out_min, out_max) {
            return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        }
        

        //console.log(window.screen.orientation)
        const test = 'ver'.split('')
        const t = 'var'
        console.log(t.charAt(0))
        //console.log(test)
        this.initSetup();
        console.log("work mounted")
       // console.log(this.WorkRef);
        //this.props.createRef(this.WorkRef);

     

        //console.log(this.textureFour);



    }

    // need to generate pages for all of them
    //coming from the firebase backend
    render() {
        return (
            
          
               
            <section className='work-header' ref={this.WorkRef}>
                <div className='work-title'>
                    <h1>Work</h1>
                </div>
                <div className="work-root">
                    <div className="work link w-inline-block">
                        <a className='' target="_blank" rel="noopener" draggable="false"><h1>Etiosa Obasuyi</h1>
                        <div>
                            <img src={ImageOne} alt="img1" style={{height:'10em', width:'10em'}}/>
                            </div>
                        </a>
                    <span>wEBSITE</span>
                    </div>
            </div>
                
               

              

             
         




                

              
               
                   <div className="work-root">
                    <a className='work link w-inline-block'  target="_blank" rel="noopener" draggable="false" >

                        <h1>Morjoy candles</h1>
                        <span>website</span>
                            <img src={ImageOne} alt="img1" />
                        </a>
                </div>
                

                <div className="work-root">
                    <a className='work link w-inline-block' target="_blank" rel="noopener" draggable="false" >

                        <h1>Morjoy candles</h1>
                        <span>website</span>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>

              {/*}  <div className="work-root">
                    <a className='work link w-inline-block' target="_blank" rel="noopener" draggable="false" >

                        <h1>Etiosa Obasuyi</h1>
                        <span>website</span>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>


                <div className="work-root">
                    <a className='work link w-inline-block' target="_blank" rel="noopener" draggable="false" >

                        <h1>Black & Brown LLC</h1>
                        <span>website</span>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>


                <div className="work-root">
                    <a className='work link w-inline-block' target="_blank" rel="noopener" draggable="false" >

                        <h1>Onyedap</h1>
                        <span>website</span>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>


                <div className="work-root">
                    <a className='work link w-inline-block' target="_blank" rel="noopener" draggable="false" >

                        <h1>Radioactive Games LLC</h1>
                        <span>website</span>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>

                <div className="work-root">
                    <a className='work link w-inline-block' target="_blank" rel="noopener" draggable="false" >

                        <h1 className='wholer'>Wholesaler skite</h1>
                        <span>website</span>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>


                <div className="work-root">
                    <a className='work link w-inline-block' target="_blank" rel="noopener" draggable="false" >

                        <h1>Co-op Pad</h1>
                        <span>website</span>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>
                
                <div className="work-root">
                    <a className='work link w-inline-block' target="_blank" rel="noopener" draggable="false" >

                        <h1>PCI Paining</h1>
                        <span>website</span>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>

                <div className="work-root">
                    <a className='work link w-inline-block' target="_blank" rel="noopener" draggable="false" >

                        <h1>Jules Market</h1>
                        <span>website</span>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>
                
 */}
                </section>
               

        




           
        )
    }
}


/*
                   <div className="work-root">
                        <a aria-label="link-1" target="_blank" rel="noopener" draggable="false" class="link w-inline-block">

                            <h1>Onyedap</h1>
                            <img src={ImageOne} alt="img1" />
                        </a>
                    </div>
                    <div className="work-root">
                        <a aria-label="link-1" target="_blank" rel="noopener" draggable="false" class="link w-inline-block">

                            <h1>Morj Candles</h1>
                            <img src={ImageTwo} alt="img1" />
                        </a>
                    </div>
                    <div className="work-root">
                        <a aria-label="link-1" target="_blank" rel="noopener" draggable="false" class="link w-inline-block">

                            <h1>Black & Brown LLc</h1>
                            <img src={ImageOne} alt="img1" />
                        </a>
                </div>

                <div className="work-root">
                    <a aria-label="link-1" target="_blank" rel="noopener" draggable="false" class="link w-inline-block">

                        <h1>WholesalerKite</h1>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>
                <div className="work-root">
                    <a aria-label="link-1" target="_blank" rel="noopener" draggable="false" class="link w-inline-block">

                        <h1>Radioactive Games LLC</h1>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>
                <div className="work-root">
                    <a aria-label="link-1" target="_blank" rel="noopener" draggable="false" class="link w-inline-block">

                        <h1>Jules Market</h1>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>
                <div className="work-root">
                    <a aria-label="link-1" target="_blank" rel="noopener" draggable="false" class="link w-inline-block">

                        <h1>PCI Painting</h1>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>
                <div className="work-root">
                    <a aria-label="link-1" target="_blank" rel="noopener" draggable="false" class="link w-inline-block">

                        <h1>Cop-op pad Mobile Application</h1>
                        <img src={ImageOne} alt="img1" />
                    </a>
                </div>
                */

export default Work;



