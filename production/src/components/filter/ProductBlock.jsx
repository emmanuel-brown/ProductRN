import React from 'react'

const Block = (props) =>{
    const isEven = (num) =>{
        if(num % 2 === 0){
            return true
        } else{
            return false
        }
    } 
    return(
        <div key={props.name} id={props.name.split(' ').join('') + "1"} className="box">
            <div className={`block-${isEven(props.index) ? "left" : "right"}`}>
                <div className="show">
                    <img id="contents-img" src={props.image} alt={props.name}/>
                </div>
                <div className="info">
                    <h3>{props.name}</h3>
                    <h4>{"$" + props.price + ".99"}</h4>
                    <h4>{props.description}</h4>
                </div>
            </div>
        </div>
    )
}

export default Block