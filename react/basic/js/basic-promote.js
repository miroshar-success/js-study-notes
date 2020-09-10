function BoilingVerdict(props){
    if(props.celsius >= 100){
        return <p>The water would boil.</p>
    }
    return <p>The water would not boil</p>
}

const scaleNames = {
    c:"Celsius",
    f:"Fahrenheit"
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

class TemperatureInput extends React.Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {temperature:""}
    }
    handleChange(event) {
        // this.setState({
        //     temperature:event.target.value
        // })
        this.props.onTemperatureChange(event.target.value);
    }
    render() {
        const temperature = this.props.temperatue;
        return (
            <fieldset >
                <legend>Enter temperature in {scaleNames[this.props.scale]}</legend>
                <input type="text"
                    value={this.state.temperature}
                    onChange={this.handleChange}
                />
            </fieldset>
        )
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }
    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }
    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

class MyInput extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.props.change(event.target.value);
    }
    render(){
        console.log(this.props);
        return (
            <div>
                <input type="text" value={this.props.value} onChange={this.handleChange}/>
            </div>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:0
        }
    }
    handleChange = (value) => {
        console.log('接受来自子组件的数据',value);
        this.setState({
            value
        })
    }
    render() {
        return (
            <MyInput value={this.state.value} change={this.handleChange}/>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)