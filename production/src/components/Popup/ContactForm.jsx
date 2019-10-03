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
                username: "",
                password: ""
            },
        }
    }
    /*
        future development will display all errs inside of Popup
    */

    /* START OF onChanges */
    // each function in section will indiviaully update each field to state
    // must find a more dry way to do this
    handleFirstName = (e) => {
        const { contact } = this.state
        contact.firstName = e.target.value
        this.setState({ contact })
    }

    handleLastName = (e) => {
        const { contact } = this.state
        contact.lastName = e.target.value
        this.setState({ contact })
    }

    handleEmail = (e) => {
        const { contact } = this.state
        contact.email = e.target.value
        this.setState({ contact })
    }

    handlePhoneNumber = (e) => {
        const { contact } = this.state
        contact.phoneNumber = e.target.value
        this.setState({ contact })
    }

    handleUsername = (e) => {
        const { contact } = this.state
        contact.username = e.target.value
        this.setState({ contact })
    }

    handlePassword = (e) => {
        const { contact } = this.state
        contact.password = e.target.value
        this.setState({ contact })
    }
    /* END OF onChange */

    /*
        validate inputs. return true or false if one input is incorrect. If "errs" is true it will 
        log each individaul error if any.                    
    */
    isValid = (errs) => {
        const { email, phoneNumber, lastName, firstName, username, password } = this.state.contact
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
        if(username.length < 6){
            errs && console.log('Username is not long enough')
            allIsGood = false
        }
        if(password.length < 6){
            errs && console.log('Password is not long enough')
            allIsGood = false
        }
        return allIsGood
    }

    _sendContact = (e) =>{
        if(this.isValid()){ //if validation returns true send to my sql database
            axios({
                method: "POST",
                url: "/api/newContact",
                data: this.state.contact
            }).then( this.props.whenMade ) //indicates to parent component that newContact was successful'
                .catch(console.log("Sorry. Please Try again later"))
        } else{
            this.isValid(true)
        }
        e.preventDefault()
    }

    render(){
        const { email, phoneNumber, lastName, firstName, username, password } = this.state.contact
        return(
            <React.Fragment>
                <form onSubmit={ this._sendContact.bind(this) } className="contactForm">
                        <div className="">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="name" className="form-control" value={ firstName } onChange={ this.handleFirstName } required/>
                        </div>
                        <br />
                        <div className="">
                            <label  htmlFor="lastName">Last Name:</label>
                            <input type="name" className="form-control" value={ lastName } onChange={ this.handleLastName }required/>
                        </div>
                        <br />
                        <div className="">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" value={ email } name="email" onChange={ this.handleEmail } required/>
                        </div>
                        <br />
                        <div className="">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input type="phoneNumber" value={ phoneNumber } name="phoneNumber" onChange={ this.handlePhoneNumber } required/>
                        </div>
                        <br />
                        <div className="">
                            <label htmlFor="username">New Username:</label>
                            <input type="username" value={ username } name="username" onChange={ this.handleUsername } required/>
                        </div>
                        <br />
                        <div className="">
                            <label htmlFor="password">New Password:</label>
                            <input type="password" value={ password } name="password" onChange={ this.handlePassword } required/>
                        </div>
                        <br />
                        <input 
                            type="submit" 
                            className="Popup-bttn" 
                            value="Submit Your Order" 
                        />
                    </form>
            </React.Fragment>
        )
    }
}

export default ContactForm
