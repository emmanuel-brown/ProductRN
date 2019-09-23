import React from 'react'
import '../components/lib/css/index.scss'
import {Carousel} from 'react-responsive-carousel'
import'react-responsive-carousel/lib/styles/carousel.min.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TheMoment from '../components/lib/images/beInTheMoment.jpg'
import TheNew from '../components/lib/images/theNew.jpg'
import Oculus from '../components/lib/images/oculus.jpg'
import axios from 'axios'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sayIt : ""
        }
    }

    componentDidMount(){
        fetch('/api/hello').then(res => res.json()).then(thing => {console.log(thing.hello)})
        axios({
            method: 'post',
            url: '/api/name',
            data: {
                firstName: "Emmanuel",
                lastName: "Brown"
            }
        }).then(i => console.log(i)).catch(() => {console.log("unable to post")})
    }

    render(){
        return(
            <React.Fragment>
                <Navbar />
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
            </React.Fragment>
        )
    }
}

export default Home