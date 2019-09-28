import React, { useState } from 'react'
import Popup from '../Popup'

const Block = (props) =>{
    const [ popup, setPopup ] = useState(false)
    const switched = () =>{
        setPopup(!popup )
    }
    return(
        <React.Fragment>
            <div key={props.name} onClick={ () => setPopup(!popup) } id={props.name.split(' ').join('') + "1"} className="box">
                {/* if the index of the product is odd display to the right else dipslay to the left */}
                <div className={`block-${props.index % 2 === 0 ? "left" : "right"}`}>
                    <div className="show">
                        <img id="contents-img" src={props.image} alt={props.name}/>
                    </div>
                    <div className="info">
                        <h3>{props.name}</h3>
                        <h4>{`$${props.price}`}</h4>
                        <h4>{props.description}</h4>
                    </div>
                </div>
            </div>
            <Popup clicked={ switched } isOn={ popup }>
                <p>{props.name}</p>
                <p>{props.description}</p>
            </Popup>
        </React.Fragment>
    )
}

export default Block