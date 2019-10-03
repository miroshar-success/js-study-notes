import React from 'react';
import logo from './logo.svg';
import './App.css';
import g from './static/imgs/timg.jpg';
import Head from "./components/head";
function App() {
  return (
    <div className="App">
      <Head/>
      <header className="App-header">
        <img src={g} alt="" width="200"/>
          <img src={require("./static/imgs/timg.jpg")} alt="" width="200"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
