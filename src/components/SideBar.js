import React from 'react'


const SideNavBar = (props) => {



    return (
        <>
            <div className='root-nav-bar'>
                <nav className='sideMobileNav-root                                                                                                                                                                      '>
                    <li><a href='#'></a></li>
                    <li><a></a></li>
                    <li><a></a></li>
                </nav>
                <nav className='sideNav-root'>
                    <li className='not-ActiveLink' >
                    </li>
                    <li className='not-ActiveLink'>
                    </li>
                    <li className='activeLink' >
                        <span className='toothtip'>Contact</span>
                    </li>
                    <li className='activeLink'  >
                        <span className='toothtip'>Contact</span>
                    </li>
                </nav>
            </div>

        </>
    )
}

export default SideNavBar
