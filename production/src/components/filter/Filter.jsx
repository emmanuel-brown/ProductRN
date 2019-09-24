import React from 'react';
import Product from '../products.json'
import Block from './ProductBlock'
import axios from 'axios'

class DoIt extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            /*
                defaults and display are seperated so that when catagory are being filter it will
                still be able to go back to it's original state.
            */
            defaults: Product,//Products from products.json
            display: [],//Content that will be mapped through from the defaults
            filterOn: true,//For toggling side bar
        }
    }

    componentDidMount(){
    
        this.alphaUp(true);//Page will display Product in alphabetical order
        axios({
            method: "post",
            url: '/api/upload', 
            data: [{
                name: "Emmanuel Brown",
                age: 17,
                favColor: "blue"
            }]
        }).then(() =>{
            //fetch('/api/restore').then(res => res.json()).then(res =>{console.table(res)}).catch(() => {alert("restore did not work")})
            console.log("there is hope")
        })
    }

    /*Start of filter*/
    priceAscend = (ascend) =>{ // If function parameter is true dipslay numerically ascending else numerically descend
        let takeIt = this.state.defaults.sort((a,b) =>{
            return ascend ? a.price - b.price : b.price - a.price
        });
        this.setState({ display: takeIt })
    }

    alphaUp = (up) =>{ // if function parameter is true dipslay by alphabetically ascending else alphabetically descned
        let takeIt = this.state.defaults.sort((a,b) =>{
            return up ? a.name.charCodeAt(0) - b.name.charCodeAt(0): b.name.charCodeAt(0) - a.name.charCodeAt(0);
        }); // Problem: takeIt only checks first letter of the word
        this.setState({ display: takeIt })
    }

    Catagory = (cata) =>{ // any products that match the parameter as its catagory will be displayed
        let takeIt = this.state.defaults;
        let pass = [];
        takeIt.map((product) =>{
            return product.description.includes(cata) && pass.push(product)
        })
        this.setState({ display: pass })
    }
    /* End of filter*/
    toggleFilter = () => { // This will toggle the visibility of the filter
        let {filterOn} = this.state;
        this.setState({ filterOn: !filterOn })
    }
    render(){
        /*
            Whenever component re-renders this will run itself t display the products
        */
        let deploy = []
        this.state.display.map((product1) =>{ // this maps the through display
            return deploy.push(
                <Block // each product will be display in the block. This is where it's being done
                    name={product1.name}
                    price={product1.price}
                    image={product1.image}
                    description={product1.description}
                    index={product1.index}
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
                        <div className="menu-button" onClick={() => this.toggleFilter()}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <main id="contents">{deploy}</main>
            </React.Fragment>
        )
    }
}

export default DoIt