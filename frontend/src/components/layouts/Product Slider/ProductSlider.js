import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './ProductSlider.css'
import Card from './Card';
import { NextArrow, PrevArrow } from './Arrow';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const responsive = [
//     {
//         breakpoint: 464,
//         settings: {slidesToShow: }
//     }
//     // superLargeDesktop: {
//     //     ,
//     //     items: 8
//     // },
//     // desktop: {
//     //     breakpoint: { max: 3000, min: 1024 },
//     //     items: 6
//     // },
//     // tablet: {
//     //     breakpoint: { max: 1024, min: 464 },
//     //     items: 4
//     // },
//     // mobile: {
//     //     breakpoint: { max: 464, min: 0 },
//     //     items: 2
//     // }
// ];

const ProductSlider = () => {
    var settings = {
        accessibility: true,
        className: 'slider-container',
        adaptiveHeight: true,
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 6,
        slidesToScroll: 1,
        draggable: false,
        focusOnSelect: true,
        nextArrow: <NextArrow />,
        lazyLoad: true,
        // responsive: responsive
    };
    return (
        <>
            <div className="slider">
                <div className="slider-heading">
                    <div>
                        <h2>Deals of the Day</h2>
                        <div className="view-btn">View All</div>
                    </div>
                </div>
                {/* <Carousel swipeable={false} draggable={false} showDots={false} responsive={responsive} containerClass="slider-container">
                    <Card />
                </Carousel> */}

                <Slider {...settings}>
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                    <Card img={"/images/products/2.jpeg"} category={"Personal Care Bestseller"} discount={"Min 20% + 5% Extra"} subCategory={"Shampoo, Conditionser etc"} />
                </Slider>

            </div>
        </>
    )
}

export default ProductSlider
