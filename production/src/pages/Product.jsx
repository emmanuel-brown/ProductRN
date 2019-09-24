import React from 'react';
import '../components/lib/css/normalize.css';
import '../components/lib/css/product.scss';
import Filtered from '../components/filter/Filter';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'



class Product extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <Filtered />
                <Footer />
            </div>
        )
    }
}

export default Product