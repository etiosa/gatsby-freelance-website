/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Three from "three.js"

const Layout = ({ children }) => {
  console.log("Layout");
  console.log(Three)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <>
      
     
        <main>{children}</main>

        {/* <div className='root-scroll'>
          <div className="mouse"></div>
          <p className='scrollp '>Scroll</p>
        </div> */}
      </>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

/*  
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />

  {` `}
© {new Date().getFullYear()}, Built with*/