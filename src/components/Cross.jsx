import React from 'react'

const Cross = (props) => {
  return (
    <div className="box x" style={props?.style} onClick={() => props.handleClick(props.index)}>
        X
    </div>
  )
}

export default Cross