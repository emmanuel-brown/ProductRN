import React from 'react'
// import axios from 'axios'
import {Carousel} from 'react-responsive-carousel'
import '../components/lib/css/index.scss'
import'react-responsive-carousel/lib/styles/carousel.min.css'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TheMoment from '../components/lib/images/beInTheMoment.jpg'
import TheNew from '../components/lib/images/theNew.jpg'
import Oculus from '../components/lib/images/oculus.jpg'
import Popup from '../components/Popup/Popup'
import Intro from '../components/Popup/Intro'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contacts: [],
            id: "", // user id of the user
            intro: false, //sign in or sign up
            made: false, //does the user have an account
            username: "", //username input
            password: "" // password input
        }
    }

    componentDidMount(){ //retieves all contacts when the component mounts
        fetch('/api/contacts')
            .then(res => res.json())
            .then(contacts => this.setState({ contacts }));
        // axios({
        //     method: "DELETE",
        //     url: `/api/deleteContact/${this.state.id}`
        // })
    }

    getContact = (id) =>{
        fetch(`/api/contact/${ id }`)
            .then(res => res.json())
            .then(res => console.table(res))
    }

    _switched = () =>{ //toggles the sign up or sign in popup
        this.setState({ intro: !this.state.intro })
    }

    _contactMade = () =>{ //this states that the user is logged in
        this.setState({
            made: true
        })
    }

    _toggleIntro = () =>{
        this.setState({ intro: !this.state.intro })
    }

    /* START OF onChanges */
    handleUsername = (e) =>{
        this.setState({ username: e.target.value })
    }

    handlePassword = (e) =>{
        this.setState({ password: e.target.value })
    }
    /* END OF onChange */

    logIn = (e) =>{ //logs the user in. backend handles validation. if false the function catches error
        const { username, password, id } = this.state
        fetch(`/api/user/${ username }/${ password }`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ 
                    id: res[0].contact_ID,
                    made: false
                })
            }).then(() => {
                this.getContact(id)
            }).catch(() =>{
                console.log("incorrect password or user name")
            })
        e.preventDefault()
    }

    render(){
        const { id, made, intro, username, password } = this.state
        return(
            <React.Fragment>
                <Navbar signIn={ this._toggleIntro } hasLogin={true}/>
                <Carousel infiniteLoop={true} autoPlay={true} showStatus={false} centerMode={false} showIndicators={false} stopOnHover={false} showArrows={false} transitionTime={800} interval={5000}>
                    <div>
                        <img src={TheMoment} alt=""/>
                    </div>
                    <div>
                        <img src="https://www.canva.com/learn/wp-content/uploads/2016/05/futuristic-fonts.jpg" alt="HoverBoard"/>
                    </div>
                    <div>
                        <img src={Oculus} alt=""/>
                    </div>
                    <div>
                        <img src={TheNew} alt=""/>
                    </div>
                </Carousel>
                <span className="divider"></span>
                
                <section id="description" className="text-center">
                    <h2 id="Welcome">Welcome to Future Fancy</h2>
                    <p id="sumUp">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe quidem alias rerum iste sit, accusamus animi optio magnam, 
                        expedita mollitia ipsam, laboriosam praesentium sapiente eum reiciendis! Voluptas non temporibus totam?Veniam possimus rem 
                        quo amet corrupti modi ipsum laborum blanditiis facilis suscipit incidunt veritatis accusamus sequi nemo vero, consectetur 
                        sed harum natus doloremque neque, eius animi voluptatem. Excepturi, culpa eveniet.</p>
                </section>

                <span className="divider"></span>

                <section id="content">
                    <div id="hoverBoard" className="box">
                        <div id="hoverBoard-Img" className="viewer"></div>
                        <div className="backend">
                        <h3>HoverBoard</h3>
                        <p>
                            Be the first get get a hold
                            of this furturistic technology.
                            Imagine floating beaming into the eyes those
                            four wheeled gravity limited contraption.
                        </p>
                        </div>
                    </div>
                    <div className="extra">
                        <h3>Just</h3>
                    </div>
                    <div className="extra">
                        <h3>TOO</h3>
                    </div>
                    <div id="LexusBoard" className="box">
                        <div id="LexusBoard-Img" className="viewer"></div>
                        <div className="backend">
                        <h3>Lexus Hover Board</h3>
                        <p>
                            Take your summer to the next
                            level with to premium hover board.
                            Show off to your friends that your
                            an air surfer.
                        </p>
                        </div>
                    </div>
                    <div className="extra"></div>
                    <div className="extra"></div>
                    <div id="contactLenses" className="box">
                        <div id="contactLenses-img" className="viewer"></div>
                        <div className="backend">
                            <h3>Contacts 2.0</h3>
                            <p>
                                Regular contacts these days are just too simple.
                                Be the first to get the power of your phone in a 
                                more visual persective.
                            </p>
                        </div>
                    </div>
                    <div className="extra">
                        <h3>FANCY</h3>
                    </div>
                </section>
                <Footer />
                { intro && <Intro isOn={ id === "" && !made } whenMade={ this._contactMade }/> }
                <Popup clicked={ () => this.setState({ made: false }) }  isOn={ made }>
                    <form onSubmit={ this.logIn }>
                        <label htmlFor="username">User Name:</label>
                        <input type="username" name="username" value={ username } onChange={ this.handleUsername } required/>
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={ password } onChange={ this.handlePassword } required/>
                        <br />
                        <input 
                            type="submit" 
                            className="bttn" 
                            value="Log In" 
                            style={{color: '#0FF4C6', backgroundColor: "black"}}
                        />
                    </form>
                </Popup>
            </React.Fragment>
        )
    }
}

export default Home