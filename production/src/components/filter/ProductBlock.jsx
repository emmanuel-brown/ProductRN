import React from 'react'

const Block = (props) =>{
    return(
        <div key={props.name} id={props.name.split(' ').join('') + "1"} className="box">
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
    )
}

export default Block