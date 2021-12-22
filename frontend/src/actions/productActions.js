import axios from 'axios';

import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL } from '../constants/productConstants';



const getProducts = () => {
    return (
        async (dispatch)=>{
            try {
                dispatch({
                    type: ALL_PRODUCT_REQUEST
                })
                const {data} = await axios.get('/api/products/get');
                dispatch({
                    type: ALL_PRODUCT_SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: ALL_PRODUCT_FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}



export { getProducts };