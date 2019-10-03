import React, { useState } from 'react'
import Popup from '../Popup/Popup'

const Block = (props) =>{
    const [ popup, setPopup ] = useState(false)
    const switched = () =>{ //turns on or off popup that display individual product information and add to cart feature
        setPopup(!popup )
    }
    const { name, index, price, description, image, product_ID } = props // object decomposition of all props
    return(
        <React.Fragment>
            <div key={ name } onClick={ () => setPopup(!popup) } id={ name.split(' ').join('') + "1"} className="box">
                {/* if the index of the product is odd display to the right else dipslay to the left */}
                <div className={`block-${index % 2 === 0 ? "left" : "right"}`}>
                    <div className="show">
                        <img id="contents-img" src={ image } alt={ name }/>
                    </div>
                    <div className="info">
                        <h3>{ name }</h3>
                        <h4>{`$${ price }`}</h4>
                        <h4>{ description }</h4>
                    </div>
                </div>
            </div>
            <Popup clicked={ switched } isOn={ popup }>{/* popup showing product details and add to cart */}
                <div className="product-info">
                    <h3>{ name }: { product_ID }</h3>
                    <img src={ image } alt={ name }/>
                    <p>{ description }</p>
                    <button className="Popup-bttn">Add to Cart</button>
                </div>
            </Popup>
        </React.Fragment>
    )
}

export default Block