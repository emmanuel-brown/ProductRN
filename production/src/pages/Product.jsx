import React from 'react';
import '../components/lib/css/normalize.css';
import '../components/lib/css/product.scss';
import Filtered from '../components/filter/Filter';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'



const Product = () =>(
    <>
        <Navbar hasLogin={false}/>
        <Filtered />
        <Footer />
    </>
)

export default Product