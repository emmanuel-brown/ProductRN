import React from 'react'

const Popup = (props) =>{
    const { isOn, clicked } = props
    return (
        <div className="Popup" style={{display: `${isOn ? 'block' : 'none'}`}}>
            <div className="Popup_exit" onClick={clicked}><span>x</span></div>
            {props.children}
        </div>
    )
}

export default Popup;