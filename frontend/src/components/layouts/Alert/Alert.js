import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import './Alert.css';


const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};
const AlertTemplate = ({ options, message }) => {
    return (
        <div className='flex justify-between' style={{ marginBottom: "25px", backgroundColor: 'black', padding: "15px", borderRadius: "4px", width: "max-content" }}>
            {options.type === 'error' && <img style={{ width: "18px" }} src="images/error.svg" />}
            {options.type === 'success' && <img style={{ width: "18px" }} src="images/success.svg" />}
            {options.type === 'info' && <img style={{ width: "18px" }} src="images/success.svg" />}
            <div style={{ color: 'white', fontFamily: "Roboto", fontSize: "16px", marginLeft: "15px" }}>{message}</div>
        </div>
    )
}


export { options, AlertTemplate, AlertProvider }