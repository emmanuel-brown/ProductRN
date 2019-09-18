import React from 'react';
import Product from '../products.json'
import Block from './ProductBlock'

class DoIt extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaults: Product,//Products from products.json
            display: [],//Content that will be mapped through from the defaults
            filterOn: true,//For toggling side bar
        }
    }

    componentDidMount(){
        this.alphaUp(true);//Page will display Product in alphabetical order
    }

    /*Start of filter*/
    priceAscend = (ascend) =>{
        let takeIt = this.state.defaults.sort((a,b) =>{
            return ascend ? a.price - b.price : b.price - a.price
        });
        this.setState({ display: takeIt })
    }

    alphaUp = (up) =>{
        let takeIt = this.state.defaults.sort((a,b) =>{
            return up ? a.name.charCodeAt(0) - b.name.charCodeAt(0): b.name.charCodeAt(0) - a.name.charCodeAt(0);
        });
        this.setState({ display: takeIt })
    }

    Catagory = (cata) =>{
        let takeIt = this.state.defaults;
        let pass = [];
        takeIt.map((product) =>{
            product.description.includes(cata) && pass.push(product)
        })
        this.setState({ display: pass })
    }
    /* End of filter*/
    toggleFilter = () => {
        let {filterOn} = this.state;
        this.setState({ filterOn: !filterOn })
    }
    render(){
        let deploy = []
        this.state.display.map((product1) =>{
            deploy.push(
                <Block 
                    name={product1.name}
                    price={product1.price}
                    image={product1.image}
                    description={product1.description}
                    index={product1.index}
                />
            );
        })

        let position = '0'
        if(!this.state.filterOn){
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