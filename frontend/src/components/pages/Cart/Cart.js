import React from 'react';
import './Cart.css';

const Cart = () => {
    return (
        <>
            <div className="cart-container max-width-80">
                <div className="cart-items">
                    <div className="my-cart-header">
                        <div className="myCart">My Cart (1)</div>
                        <div className="deliverTo-container">
                            <div className="deliverTo">
                                <img src="/images/cart/location.svg" alt="" />
                                <span>Deliver To</span>
                                <div className="location">New Delhi - 110086</div>
                            </div>
                        </div>
                    </div>
                    <div className="cart-products-container">
                        <div className="cart-products-details-container">
                            <div className="cart-products-details">
                                <img src="/images/products/1.jpeg" />
                                <div className="about-product">
                                    <div >Toyshack 1:14 Pull Back motorcycle</div>
                                    <div>Blue</div>
                                    <div>Seller: RetailNet</div>
                                </div>
                            </div>
                            <div className="quantity-datails"></div>
                        </div>
                    </div>
                </div>
                <div className="cart-summary">
                    <div className="price-head">PRICE DETAILS</div>
                    <div className="price-summary">
                        <div className="price"></div>
                        <div className="discount"></div>
                        <div className="delivery-charge"></div>
                        <div className="total-amount"></div>
                        <div className="svaings"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
