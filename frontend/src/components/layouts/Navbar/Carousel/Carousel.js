import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Carousel.css';
import Carousel from 'react-bootstrap/Carousel';

const nextIcon = ()=>{
    return (
        <div className="next-icon-carousel">
            <svg width="14.6" height="27" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="_2-wzdc"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#fff" className="FXox6K"></path></svg>
        </div>
    )
}
const prevIcon = ()=>{
    return (
        <div className="prev-icon-carousel">
            <svg width="14.6" height="27" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="_2-wzdc"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#fff" className="FXox6K"></path></svg>
        </div>
    )
}

const Carousell = () => {
    return (
        <>
            <Carousel indicators={false} wrap={true} slide={true} nextIcon={nextIcon()} prevIcon={prevIcon()}>
                <Carousel.Item interval={3000}><img className="d-block w-100" src="/images/carousel/2.jpg" /> </Carousel.Item>
                <Carousel.Item interval={3000}><img className="d-block w-100" src="/images/carousel/3.jpg" /> </Carousel.Item>
                <Carousel.Item interval={3000}><img className="d-block w-100" src="/images/carousel/4.jpg" /> </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Carousell
