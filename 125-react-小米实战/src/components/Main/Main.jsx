import React, {Component} from 'react';
import Header from "../Header/Header"
import Banner from "../Banner/Banner"
import Category from "../Category/Category"
import Goods from "../Goods/Goods"
import Recommend from "../Recommend/Recommend"
import Footer from "../Footer/TabBar.jsx"
class Viewwrapper extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="view_wrapper">
                    <Banner/>
                    <Category/>
                    <Recommend/>
                    <Goods/>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Viewwrapper;