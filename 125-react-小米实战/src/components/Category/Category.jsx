import React, {Component} from 'react';
import "../../css/category.scss"
import {NavLink} from "react-router-dom";
class Category extends Component {
    constructor(){
        super();
        this.state={
            category:[]
        }
    }
    componentDidMount(){
        fetch("http://47.100.98.54:9020/api/category")
            .then(response=>response.json())
            .then(result=>{
                if(result.status === 200){
                    this.setState({
                        category:result.data
                    })
                }
            })
    }
    componentWillUnmount(){
        this.setState = ()=>{
            return
        }
    }
    render() {
        return (
            <section className="category">
                <ul className="category_container">
                    {
                        this.state.category.length > 0 && (
                            this.state.category.map((item,index) => {
                                return (
                                    <li key={index}>
                                        <NavLink to={`/detail/${item.shopid}`}>
                                            <img src={item.picurl} alt={item.alt}/>
                                        </NavLink>
                                    </li>
                                )
                            })
                        )
                    }
                </ul>
            </section>
        );
    }
}

export default Category;