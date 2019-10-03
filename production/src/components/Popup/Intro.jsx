import React from 'react'
import Popup from './Popup'
import ContactForm from  './ContactForm'

class Intro extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            display: "",
            Popup: props.isOn
        }
    }

    processSignUp = () =>{
        this.setState({ Popup: false }, this.props.whenMade)
    }

    componentDidMount(){
        if(true){
            let display = (
                <div className="Popup-intro" >
                    <button onClick={ () => this.setState({ display: <ContactForm whenMade={ () => this.processSignUp() } /> })} className="Popup-bttn">Sign Up</button>
                    <button onClick={ this.props.whenMade }  className="Popup-bttn">Sign In</button>
                </div>
            )
            this.setState({ display })
        }
    }

    clicked = () =>{
        this.setState({
            Popup: false
        })
    }

    render(){
        const { display } = this.state
        return(
            <Popup clicked={ this.clicked } isOn={ this.state.Popup }>
                { display  }
            </Popup>
        )
    }
}

export default Intro