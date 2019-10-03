import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Switch
}
from "react-router-dom"
import Home from "./components/Home.jsx"
import Bar from "./components/Bar.jsx"
import Pie from "./components/Pie.jsx"
import Plate from "./components/Plate.jsx"
import Tree from "./components/Tree.jsx"
import Progress from "./components/Progress.jsx"
import Diagram from "./components/Diagram.jsx"
class App extends React.Component{
    render(){
        return (
            <Router>
               <div className="app">
                   <section className="menu">
                       <div className="logo">
                           <div className="img"></div>
                           <span className="title">React-Echart</span>
                       </div>
                       <section className="slide_nav">
                           <ul>
                               <li><NavLink className="iconfont icon-shouye" to="/" exact>首页</NavLink></li>
                               <li><NavLink className="iconfont icon-61" to="/bar">柱状图</NavLink></li>
                               <li><NavLink className="iconfont icon-icon" to="/pie">饼状图</NavLink></li>
                               <li><NavLink className="iconfont icon-ditu" to="/tree">树状图</NavLink></li>
                               <li><NavLink className="iconfont icon-shuzhuangtu" to="diagram">3D城市</NavLink></li>
                               <li><NavLink className="iconfont icon-yibiaopan" to="plate">汽车表盘</NavLink></li>
                               <li><NavLink className="iconfont icon-jindu1" to='/progress'>业务逻辑进度</NavLink></li>
                           </ul>
                       </section>
                   </section>
                   <section className="content">
                       <div className="top_nav">
                           <ul className="nav_list">
                               <li className="nav_item">
                                   <a href="/" className="active">
                                       <i className="user">牧童</i>
                                   </a>
                               </li>
                               <li className="nav_item">
                                   <a href="/">
                                       <i className="iconfont icon-duanxin"></i>
                                   </a>
                               </li>
                               <li className="nav_item">
                                   <a href="/">
                                       <i className="iconfont icon-shuben"></i>
                                   </a>
                               </li>
                               <li className="nav_item">
                                   <a href="/">
                                       <i className="iconfont icon-icon--"></i>
                                   </a>
                               </li>
                               <li className="nav_item">
                                   <a href="/">
                                       <i className="iconfont icon-icon-user"></i>
                                   </a>
                               </li>
                           </ul>
                       </div>
                        <Switch>
                            <Route path="/" component={Home} exact></Route>
                            <Route path="/bar" component={Bar}></Route>
                            <Route path='/pie' component={Pie}></Route>
                            <Route path="/plate" component={Plate}></Route>
                            <Route path="/tree" component={Tree}></Route>
                            <Route path="/progress" component={Progress}></Route>
                            <Route path="/diagram" component={Diagram}></Route>
                        </Switch>
                   </section>
               </div>
            </Router>
        );
    }
}
export default App;
