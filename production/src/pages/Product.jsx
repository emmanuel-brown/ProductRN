import React from 'react';
import '../components/lib/css/normalize.css';
import '../components/lib/css/product.scss';
import Order from '../components/filter/Filter';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'



class Product extends React.Component{
    google(){
        window.location = 'home';
    }
    render(){
        return(
            <div>
                <Navbar />
                <Order/>
                <Footer />
            </div>
        )
    }
}

export default Product