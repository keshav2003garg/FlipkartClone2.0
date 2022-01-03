import React, { useEffect } from 'react';
import './Modal.css'
import FloatingLabelInput from 'react-floating-label-input';

const Modal = ({setModal, modal}) => {
    const handle = ()=>{
        setModal(false)
    }
    useEffect(()=>{
        if(!modal){handle()}
    })
    return (
        <>
            {modal ?
                <div className="modal div-center">
                <div className="modal-container">
                    <div className="content-container">
                        <div className="left">
                            <span>Login</span>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="right">
                            <form action="" className='login-form'>
                                <div className="email">
                                    <FloatingLabelInput id="email" label="Enter Email Address" type='email' autoFocus="true" />
                                </div>
                                <div className="password">
                                    <FloatingLabelInput id="password" label="Enter Password" type='password' autoComplete='off' />
                                    <div className="forgot-password">Forgot?</div>
                                </div>
                                <div className="terms">By continuing, you agree to Flipkart's <a href="">Terms of Use </a>and <a href="">Privacy Policy</a>.</div>
                                <div className="login"><button type="submit">Login</button></div>
                            </form>
                            <div className="or">OR</div>
                            <div className="signup"><a href="">New to Flipkart? Create an account</a></div>
                        </div>
                    </div>
                    <div className="cross-btn"><button onClick={handle}>✕</button></div>
                </div>
            </div>: null}
        </>
    )
}

export default Modal
