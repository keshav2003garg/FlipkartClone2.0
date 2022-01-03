import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="upper-footer">
                <div className="upper-footer-box">
                    <div>ABOUT</div>
                    <p>Contact Us</p>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Flipkart Stories</p>
                    <p>Flipkart Wholesale</p>
                    <p>Corporate Information</p>
                </div>
                <div className="upper-footer-box">
                    <div>HELP</div>
                    <p>Payments</p>
                    <p>Shipping</p>
                    <p>Cancellations & Retuens</p>
                    <p>FAQ</p>
                    <p>Report Infringement</p>
                </div>
                <div className="upper-footer-box">
                    <div>POLICY</div>
                    <p>Return Policy</p>
                    <p>Terms Of Use</p>
                    <p>Security</p>
                    <p>Privacy</p>
                    <p>Sitemap</p>
                    <p>EPR Compliance</p>
                </div>
                <div className="upper-footer-box">
                    <div>SOCIAL</div>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>YouTube</p>  
                </div>
                <div className="upper-footer-box">
                    <div>Mail Us:</div>
                    <p>Flipkart Internet Private Limited,</p>
                    <p>Buildings Alyssa, Begonia &</p>
                    <p>Clove Embassy Tech Village,</p>
                    <p>Outer Ring Road, Devarabeesanahalli Village,</p>
                    <p>Bengaluru, 560103, Karnataka, India</p>
                </div>
                <div className="upper-footer-box">
                    <div>Registered Office Address:</div>
                    <p>Flipkart Internet Private Limited,</p>
                    <p>Buildings Alyssa, Begonia &</p>
                    <p>Clove Embassy Tech Village,</p>
                    <p>Outer Ring Road, Devarabeesanahalli Village,</p>
                    <p>Bengaluru, 560103, Karnataka, India</p>
                    <p>CIN : U51109KA2012PTC066107</p>
                    <p>Telephone: 1800 202 9898</p>
                </div>
            </div>
            <div className="lower-footer">
                <div className="lower-footer-box">
                    <img src="/images/footer/suitcase.svg" />
                    <span>Sell on Flipkart</span>
                </div>
                <div className="lower-footer-box">
                    <img src="/images/footer/star.svg" />
                    <span>Advertise</span>
                </div>
                <div className="lower-footer-box">
                    <img src="/images/footer/gift-card.svg" />
                    <span>Gift Card</span>
                </div>
                <div className="lower-footer-box">
                    <img src="/images/footer/question.svg" />
                    <span>Help</span>
                </div>
                <span className='copyright'>© 2007-2021 Flipkart.com</span>
                <img src="/images/footer/payments.svg" />
            </div>
        </footer>
    )
}

export default Footer
