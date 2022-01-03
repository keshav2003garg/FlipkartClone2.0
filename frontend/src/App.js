// import React from 'react';
// import Header from './components/layouts/Header/Header';
// import Home from './components/pages/Home/Home';
// import Admin from './components/pages/Admin/Admin';
// import Footer from './components/layouts/Footer/Footer';
// import Cart from './components/pages/Cart/Cart';

// const App = () => {
// 	return (
// 		<>
// 			<Header />
// 			{/* <Home /> */}
// 			<Cart />
// 			<Footer />
// 			{/* <Admin /> */}
// 		</>
// 	)
// }

// export default App

import React from 'react'
import { useAlert } from 'react-alert'

const App = () => {
  const alert = useAlert()

  return (
    <button
      onClick={() => {
        alert.show('Oh look, an alert!')
      }}
    >
      Show Alert
    </button>
  )
}

export default App