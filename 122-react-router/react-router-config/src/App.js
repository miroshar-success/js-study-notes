import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
}
from "react-router-dom"
import routes from "./router/index.js";
import HeadNav from "./components/HeadNav.jsx"
class App extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    <HeadNav title={true}/>
                    {
                        routes.map((route,index)=>{
                            return(
                                <Route
                                    key={index}
                                    path={route.path}
                                    render={()=>{
                                        return(
                                            <route.component data={route.routes}/>
                                        )
                                    }}
                                />
                            )
                        })
                    }
                </div>
            </Router>
        );
    }
}

export default App;
