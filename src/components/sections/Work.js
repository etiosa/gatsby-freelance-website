import React, { useEffect, useState } from "react"
import "../../sass/index.scss"

//firebase later
const projects = [
  {
    Name: "Morjoy candles",
    url: "https://www.morjoycandles.com/",
    type: "Website",
  },
  {
    Name: "Black & Brown LLC",
    url: "https://bbequitydreams.com/",
    type: "Website",
  },
  { Name: "Onyedap", url: "https://onyeone.com/", type: "Website" },

  {
    Name: "Jules Market",
    url: "https://julesafrimarket.com/",
    type: "Website",
  },
  {
    Name: "Wholesalerskite",
    url: "https://wholesalerstarterkit.com/",
    type: "Website",
  },
  { Name: "Radioactive Games LLC", url: "", type: "Website" },
  { Name: "Green House llC", url: "", type: "Website" },
  { Name: "Vision Art Gallery", url: "", type: "Website" },

]
const Work = (props) => {
  let workRef = useState(null)

  useEffect(() => {
    props.createReferences(workRef)

  }, [])
  return (
    <section id='work' className='work-header' ref={el => workRef = el}>
      <div className='work-title'>
        <h1>Work</h1>
      </div>
      {projects.map(data => {

        return (<div key={data.Name} className="work-root">
          <div className="work">
            <a href={data.url} className={data.url === '' ? 'disable list-root' : 'list-root'} target="_blank" rel="noopener" draggable="false">
              <h1>{data.Name}</h1>
            </a>
            <span className='type'>{data.url === '' ? 'In-development' : data.type}</span>
          </div>
        </div>)
      })}
    </section>
  )
}


export default Work;


