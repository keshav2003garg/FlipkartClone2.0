import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
    const [active, setActive] = useState(false);
    const handleActive = () => {
        setActive(!active);
    }
    return (
        <>
            <div className="admin-container">
                <div className={`admin-navigation ${active ? "admin-active-nav" : "notActive"}`}>
                    <ul>
                        <li>
                            <a href="">
                                <span className="icon"><img className='flipkart-logo' src="/images/flipkart-logo.png" alt="" /></span>
                                {active ? <span className="active-logo"><img src="/images/flipkart-logo-admin.png" alt="" /></span> : null}
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span className="icon"><ion-icon name="home"></ion-icon></span>
                                <span className="title">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span className="icon"><ion-icon name="people"></ion-icon></span>
                                <span className="title">Customers</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span className="icon"><ion-icon name="chatbubble"></ion-icon></span>
                                <span className="title">Message</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span className="icon"><ion-icon name="help"></ion-icon></span>
                                <span className="title">Help</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span className="icon"><ion-icon name="settings"></ion-icon></span>
                                <span className="title">Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span className="icon"><ion-icon name="log-out"></ion-icon></span>
                                <span className="title">Sign Out</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={`admin-main ${active ? "admin-active-main" : "notActive"}`}>
                    <div className="topbar">
                        <div className="toggle" onClick={handleActive}><ion-icon name="menu"></ion-icon></div>
                        <div className="search ">
                            <label htmlFor="search">
                                <input type="text" placeholder='Search Here' />
                                <ion-icon name="search-sharp"></ion-icon>
                            </label>
                        </div>
                        <div className="user"><img src="/images/flipkart-logo-admin.png" /></div>
                    </div>
                    <div className="cardBox">
                        <div className="admin-card">
                            <div className="detailBx"><div className="numbers">284</div><div className="cardName">Daily Views</div></div>
                            <div className="iconBx"><ion-icon name="eye"></ion-icon></div>
                        </div>
                        <div className="admin-card">
                            <div className="detailBx"><div className="numbers">20</div><div className="cardName">Sales</div></div>
                            <div className="iconBx"><ion-icon name="cart"></ion-icon></div>
                        </div>
                        <div className="admin-card">
                            <div className="detailBx"><div className="numbers">80</div><div className="cardName">Comments</div></div>
                            <div className="iconBx"><ion-icon name="chatbubbles"></ion-icon></div>
                        </div>
                        <div className="admin-card">
                            <div className="detailBx"><div className="numbers">$10000</div><div className="cardName">Earnings</div></div>
                            <div className="iconBx"><ion-icon name="cash"></ion-icon></div>
                        </div>
                    </div>
                    <div className="detailsBox">
                        <div className="recent-orders">
                            <div className="card-header"><h2>Recent Orders</h2><a href="">View All</a></div>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>Payments</td>
                                        <td>Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Star Refrigirator</td>
                                        <td>$1200</td>
                                        <td>Paid</td>
                                        <td><span className="status delivered">Delivered</span></td>
                                    </tr>
                                    <tr>
                                        <td>Star Refrigirator</td>
                                        <td>$1200</td>
                                        <td>Paid</td>
                                        <td><span className="status return">Return</span></td>
                                    </tr>
                                    <tr>
                                        <td>Star Refrigirator</td>
                                        <td>$1200</td>
                                        <td>Paid</td>
                                        <td><span className="status pending">Pending</span></td>
                                    </tr>
                                    <tr>
                                        <td>Star Refrigirator</td>
                                        <td>$1200</td>
                                        <td>Paid</td>
                                        <td><span className="status delivered">Delivered</span></td>
                                    </tr>
                                    <tr>
                                        <td>Star Refrigirator</td>
                                        <td>$1200</td>
                                        <td>Paid</td>
                                        <td><span className="status inprogress">In Progress</span></td>
                                    </tr>
                                    <tr>
                                        <td>Star Refrigirator</td>
                                        <td>$1200</td>
                                        <td>Paid</td>
                                        <td><span className="status delivered">Delivered</span></td>
                                    </tr>
                                    <tr>
                                        <td>Star Refrigirator</td>
                                        <td>$1200</td>
                                        <td>Paid</td>
                                        <td><span className="status pending">Pending</span></td>
                                    </tr>
                                    <tr>
                                        <td>Star Refrigirator</td>
                                        <td>$1200</td>
                                        <td>Paid</td>
                                        <td><span className="status inprogress">In Progress</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;
