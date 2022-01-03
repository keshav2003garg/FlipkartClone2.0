import React from 'react';
import './Navbar.css';
import Carousel from './Carousel/Carousel';

const Navbar = () => {
    return (
        <>
            <div className='category'>
                <div className="category-container">
                    <div className="shop"><img src="/images/category/top-offers.png" /><div className="shop-text" >Top Offers</div></div>
                    <div className="shop"><img src="/images/category/grocery.png" /><div className="shop-text">Grocery</div></div>
                    <div className="shop"><img src="/images/category/mobile.png" /><div className="shop-text">Mobile</div></div>
                    <div className="shop"><img src="/images/category/fashion.png" /><div className="shop-text">Fashion</div></div>
                    <div className="shop"><img src="/images/category/electronics.png" /><div className="shop-text">Electronics</div></div>
                    <div className="shop"><img src="/images/category/home.jpg" /><div className="shop-text">Home</div></div>
                    <div className="shop"><img src="/images/category/appliances.png" /><div className="shop-text">Appliances</div></div>
                    <div className="shop"><img src="/images/category/travel.png" /><div className="shop-text">Travel</div></div>
                    <div className="shop"><img src="/images/category/beauty-toys-and-more.png" /><div className="shop-text">Beauty, Toys & More</div></div>
                </div>
            </div>
            <Carousel />
        </>
    )
}

export default Navbar
