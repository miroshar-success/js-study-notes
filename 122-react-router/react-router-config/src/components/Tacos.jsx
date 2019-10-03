import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Route
}
from "react-router-dom"
class Tacos extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            routes:this.props.data
        }
    }
    render() {
        const routes = this.state.routes;
        return (
            <Router>
                <div>
                    <ul>
                        <li><NavLink to="/tacos/bus">Bus</NavLink></li>
                        <li><NavLink to="/tacos/cart">Cart</NavLink></li>
                    </ul>
                </div>
                {
                    routes.length > 0 && routes.map((route,index)=>{
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                component={route.component}
                            />
                        )
                    })
                }
            </Router>
        );
    }
}
export default Tacos;