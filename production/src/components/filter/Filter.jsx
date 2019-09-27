import React from 'react';
import Popup from '../Popup'
import Block from './ProductBlock'
import ContactForm from '../ContactForm'
// import axios from 'axios'


class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            /*
                defaults and display are seperated so that when catagory are being filter it will
                still be able to go back to it's original state.
            */
            defaults: [],//Products from database
            display: [],//Content that will be mapped through from the defaults
            filterOn: true,//For toggling side bar
            ascend: Boolean,
            orderBy: "price",
            Popup: true
        }
    }

    

    componentDidMount(){
        this.alphaUp(true)

        // axios( {
        //     method: 'POST',
        //     url: '/api/upload/',
        //     data: Product
        // })
    }

    switched = () =>{
        this.setState({ Popup: !Popup }, () => console.log(this.state.Popup))
    }

    sendContact = (e) =>{
        
        e.preventDefalut()
    }

    /*Start of filter*/
    priceAscend = (ascend) =>{ // If function parameter is true dipslay numerically ascending else numerically descend
        fetch(`/api/products/price/${ascend ? "ASC" : "DESC"}`)
            .then(res => res.json())
            .then( res =>  this.setState({ display: res, orderBy: "price" , ascend }))
    }

    alphaUp = (ascend) =>{ // if function parameter is true dipslay by alphabetically ascending else alphabetically descend
        fetch(`/api/products/name/${ascend ? "ASC" : "DESC"}`)
            .then(res => res.json())
            .then( res =>{ this.setState({ display: res, orderBy: "price" , ascend  })})
    }

    Catagory = (cata) =>{ // any products that match the parameter as its catagory will be displayed
        const { orderBy, ascend } = this.state
        fetch(`/api/products/${orderBy}/${ascend ? "ASC" : "DESC"}/${cata}`)
            .then(res => res.json())
            .then( res =>{ this.setState({ display: res })})
    }
    /* End of filter*/
    toggleFilter = () => { // This will toggle the visibility of the filter
        let {filterOn} = this.state;
        this.setState({ filterOn: !filterOn })
    }
    render(){
        /*
            Whenever component re-renders this will run itself to display the products
        */
        let deploy = []
        this.state.display.map((product1) =>{ // this maps the through display
            return deploy.push(
                <Block // each product will be display in the block. This is where it's being done
                    name={product1.name}
                    price={product1.price}
                    image={product1.image_href}
                    description={product1.description}
                    index={product1.index}
                    key={product1.product_ID}
                /> 
            );
        })

        let position = '0' // the natural position of the filter is 0 which moves that it's visible
        if(!this.state.filterOn){ // if the filter is not on (filterOn = false) move itself -100% off the screen
            position = '-100';
        }
        return(
            <React.Fragment>
                <div id="filter" style={{transform: `translateX(${position}%)`}}>
                    <div id="catagory">Filter</div>
                    <div id="catagories">
                        <div id="price" className="contain">
                            <h3>Prices</h3>
                            <div className="options">
                                <div onClick={() => this.priceAscend(true)}>Low to high</div>
                                <div onClick={() => this.priceAscend(false)}>High to low</div>
                            </div>
                        </div>
                        <div id="alphabet" className="contain">
                            <h3>Alphabetical</h3>
                            <div className="options">
                                <div onClick={() => this.alphaUp(true)}>[A-Z]</div>
                                <div onClick={() => this.alphaUp(false)}>[Z-A]</div>
                            </div>
                        </div>
                        <div id="types" className="contain">
                            <h3>types</h3>
                            <div className="options">
                                <div onClick={() => this.Catagory("compliance")}>Compliance</div>
                                <div onClick={() => this.Catagory("wearable")}>Wearable</div>
                                <div onClick={() => this.Catagory("vehicle")}>Vehicle</div>
                            </div>
                        </div>
                        <div className="menu-button" onClick={ () => this.toggleFilter() }>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <main id="contents">{deploy}</main>
                <Popup clicked={ this.switched } isOn={ this.state.Popup }>
                    <ContactForm />
                </Popup>
            </React.Fragment>
        )
    }
}

export default Filter