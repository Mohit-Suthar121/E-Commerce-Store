import React from 'react'

const PreviousArrow = ({ className ,currentColor}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" className={className} fill={currentColor}><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
  )
}

export default PreviousArrow