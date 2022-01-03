import React from 'react';

const Card = ({img, category, discount, subCategory}) => {
    return (
        <div className="slider-card">
            <img src={img} />
            <div className='card-category'>{category}</div>
            <div className='card-discount'>{discount}</div>
            <div className='card-sub-category'>{subCategory}</div>
        </div>
    )
}

export default Card;
