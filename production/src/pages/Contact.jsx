import React from 'react'
import validator from 'validator'
import '../components/lib/css/contact.scss'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


class Contact extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            valid: false,
            isName: false,
            Name: "",
            isEmail: false,
            Email: "",
            isAddress: false,
            Address: "",
        }
    }

    handleName = (e) =>{
        let {isName} = this.state
        if(e.target.value !== ""){
            isName = true
        }
        this.setState({
            Name: e.target.value,
            isName
        })
    }
    handleEmail = (e) =>{
        let {isEmail} = this.state
        if(validator.isEmail(e.target.value)){
            isEmail = true
        }
        this.setState({
            Email: e.target.value,
            isEmail
        })
    }
    handleAddress = (e) =>{
        let {isAddress} = this.state
        if(e.target.value !== ""){
            isAddress = true
        }
        this.setState({
            Address: e.target.value,
            isAddress
        })
    }

    handleSubmit = (e) =>{
        const {isName, isEmail, isAddress, Name} = this.state
        if(isName && isEmail && isAddress){
            alert(`thank you ${Name} we will get with you shortly`)
        }
        e.preventDefault();
    }

    render(){
        return(
            <React.Fragment>
                <Navbar />
                <div id="holdForm">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-name">
                            <label for="exampleInputName">Name:</label>
                            <input type="name" className="form-control" onChange={() => this.handleName} placeholder="First Name, Last Name" required/>
                        </div>
                        <br />
                        <div className="form-address">
                            <label for="E-mail">E-mail:</label>
                            <input type="address" value={this.state.Email} onChange={this.handleEmail.bind(this)} className="form-control" placeholder="E-mail" required/>
                        </div>
                        <br />
                        <div className="form-address">
                            <label for="Address">Address:</label>
                            <input type="address" className="form-control" onChange={this.handleAddress.bind(this)} placeholder="Address" required/>
                        </div>
                        <br />
                        <input type="submit" className="btn btn-primary" value="Submit Your Order"/>
                    </form>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default Contact