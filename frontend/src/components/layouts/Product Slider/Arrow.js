import React from 'react';


const PrevArrow = ({ onClick }) => {
    return (
        <div className="prev-icon" onClick={onClick}>
            <svg width="14.6" height="27" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="_2-wzdc"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#fff" className="FXox6K"></path></svg>
        </div>
    )
}
const NextArrow = ({ onClick }) => {
    return (
        <div className="next-icon" onClick={onClick}>
            <svg width="14.6" height="27" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="_2-wzdc"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#fff" className="FXox6K"></path></svg>
        </div>
    )
}

export { PrevArrow, NextArrow };
