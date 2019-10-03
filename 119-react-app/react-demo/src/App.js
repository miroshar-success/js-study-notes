import React from 'react';
import Head from "./components/header/header.jsx"
import Main from "./components/main/main.jsx"
import Footer from "./components/footer/footer.jsx"

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            city:"杭州"
        }
    }
    changeCity = ()=>{
        this.setState({
            city:"深圳"
        })
    }
    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <p onClick={this.changeCity}>Hello World</p>
                    <Head city={this.state.city}></Head>
                    <Main></Main>
                    <Footer></Footer>
                </header>
            </div>
        );
    }
}
export default App;
