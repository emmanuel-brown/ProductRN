import React from 'react';
import Popup from '../Popup/Popup'
import Block from './ProductBlock'
import ContactForm from '../Popup/ContactForm'
// import { runInThisContext } from 'vm';
import axios from 'axios'


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
            signUp: true,
            option: false,
            optionInput: ""
        }
    }

    

    componentDidMount(){
        this.alphaUp(true)
    }

    toggleSignUp = () =>{
        const { signUp } = this.state
        this.setState({ signUp: !signUp }, () => console.log(signUp))
    }

    toggleOption = () =>{
        const { option } = this.state
        this.setState({ option: !option }, () => console.log(option))
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

    byId = (del) =>{
        const { option, optionInput } = this.state
        if(!del){
            fetch(`/api/product/${ optionInput }`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    option: !option,
                    display: res
                })
            }).catch(() => console.log("did not work"))
        } else {
            axios({
                method: 'DELETE',
                url: `/api/deleteProduct/${ optionInput }`
            }).catch(() => console.log("deletion was unsuccessful"))
        }
    }
    /* End of filter*/

    /* START of onChanges */
    handleSearch = (e) =>{
        this.setState({ optionInput: e.target.value })
    }
    /* END of onChanges */

    toggleFilter = () => { // This will toggle the visibility of the filter
        let {filterOn} = this.state;
        this.setState({ filterOn: !filterOn })
    }

    toggleAdvanceSearch = () =>{
        const { option } = this.state
        this.setState({
            option: !option
        })
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
                    product_ID={product1.product_ID}
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
                                <div onClick={() => this.toggleAdvanceSearch()}>Advance Search</div>
                            </div>
                        </div>
                        <div id="types" className="contain">
                            <h3>Types</h3>
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
                <Popup clicked={ this.toggleSignUp } isOn={ this.state.signUp }>
                    <ContactForm />
                </Popup>
                <Popup clicked={ this.toggleAdvanceSearch } isOn={ this.state.option }>
                    <div className="Popup-addOns">
                        <input type="text" name="Search" id="Search" value={ this.state.optionInput } onChange={ this.handleSearch }/>
                        <br/>
                        <br/>
                        <button onClick={ () => this.byId(false) } className="Popup-bttn">Choose</button>
                        <br />
                        <button onClick={ () => this.ById(true) } className="Popup-bttn">Delete</button>
                    </div>
                </Popup>
            </React.Fragment>
        )
    }
}

export default Filter