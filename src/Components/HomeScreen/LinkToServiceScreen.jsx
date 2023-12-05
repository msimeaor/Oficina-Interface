import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './HomeScreen.module.css'

const LinkToServiceScreen = ({ href, LinkIcon, linkDescription }) => {
  const [hovered, setHovered] = React.useState(false)

  function handleHover() {
    setHovered(!hovered)
  }

  return (
    <div className={`col-lg-2 col-md-3 col-4 pt-2 pb-2 ${hovered ? styles.containerBordered : ''}`} >
      <Link 
        to={href} 
        className={`d-flex flex-wrap justify-content-center ${styles.linkDescription}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
          {
            React.cloneElement(LinkIcon, {
              className: hovered ? `${styles.hoveredIcon}` : '',
            })
          }
          <h5 className={`mt-2 text-dark ${hovered ? styles.hoveredDescription : ''}`} >{linkDescription}</h5>
      </Link>
    </div>
  )
}

export default LinkToServiceScreen