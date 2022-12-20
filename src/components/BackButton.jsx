import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';

const BackButton = (props) => {
  return (
    <IoIosArrowBack className='back-btn' onClick={props.handleClick}/>
  )
}

export default BackButton