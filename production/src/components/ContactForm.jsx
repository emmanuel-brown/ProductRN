import React from 'react'
import axios from 'axios'
import validator from 'validator'

class ContactForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            contact: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                address: 1,//let this be a separate popup
            },
            allIsGood: false
        }
    }

    handleFirstName = (e) => {
        const { contact } = this.state
        contact.firstName = e.target.value
        this.setState({ contact })
        console.log(contact)
    }

    handleLastName = (e) => {
        const { contact } = this.state
        contact.lastName = e.target.value
        this.setState({ contact })
        console.log(contact)
    }

    handleEmail = (e) => {
        const { contact } = this.state
        contact.email = e.target.value
        this.setState({ contact })
        console.log(contact)
    }

    handlePhoneNumber = (e) => {
        const { contact } = this.state
        contact.phoneNumber = e.target.value
        this.setState({ contact })
        console.log(contact)
    }

    handleAddress = (e) => {
        const { contact } = this.state
        contact.address = e.target.value
        this.setState({ contact })
        console.log(contact)
    }

    isValid = (errs) => {
        const { email, phoneNumber, lastName, firstName } = this.state.contact
        const iv = "was not valid"
        let allIsGood = true
        if(firstName.length > 50){
            errs && console.log('First Name was too long')
            allIsGood = false
        }
        if(lastName.length > 50){
            errs && console.log('Last name was too long')
            allIsGood = false
        }
        if(!validator.isMobilePhone(phoneNumber, "en-US") && phoneNumber.length < 10){
            errs && console.log(`Phone number ${iv}`)
            allIsGood = false
        }
        if(!validator.isEmail(email)){
            errs && console.log(`Email ${iv}`)
            allIsGood = false
        }
        return allIsGood
    }

    _sendContact = (e) =>{
        if(this.isValid()){
            axios({
                method: "POST",
                url: "/api/newContact",
                data: this.state.contact
            })
        } else{
            this.isValid(true)
        }
        e.preventDefault()
    }

    render(){
        const { email, phoneNumber, lastName, firstName } = this.state.contact
        return(
            <React.Fragment>
                <form onSubmit={ this._sendContact.bind(this) }>
                        <div className="">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="name" className="form-control" value={ firstName } onChange={ this.handleFirstName } required/>
                        </div>
                        <br />
                        <div className="">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="name" className="form-control" value={ lastName } onChange={ this.handleLastName }required/>
                        </div>
                        <br />
                        <div className="">
                            <label htmlFor="email">E-mail:</label>
                            <input type="address" value={ email } name="email" onChange={ this.handleEmail } required/>
                        </div>
                        <br />
                        <div className="">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input type="address" value={ phoneNumber } name="phoneNumber" onChange={ this.handlePhoneNumber } required/>
                        </div>
                        <br />
                        <input 
                            type="submit" 
                            className="btn btn-primary" 
                            value="Submit Your Order" 
                            // style={this.isValid() ? 
                            //     {backgroundColor: "#0FF4C6"} : 
                            //     {backgroundColor: "black", color: "blue"}}
                            />
                    </form>
            </React.Fragment>
        )
    }
}

export default ContactForm
