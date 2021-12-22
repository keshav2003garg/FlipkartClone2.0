import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from './actions/productActions';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  return (
    <div>

    </div>
  )
}


export default App;


