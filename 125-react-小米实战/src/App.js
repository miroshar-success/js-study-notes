import React from 'react';
import Main from "./components/Main/Main"
import NotFound from "./components/NotFound/NotFound"
import Mine from "./components/Mine";
import Cart from "./components/Cart"
import Detail from "./components/Detail"
import Map from "./components/Map"
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"

class App extends React.Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/mine" component={Mine}/>
                    <Route path="/cart" component={Cart}></Route>
                    <Route path="/detail/:goods_id" component={Detail}></Route>
                    <Route path="/address" component={Map}></Route>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}
export default App;
