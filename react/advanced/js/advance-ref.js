const FancyButton = React.forwardRef((props,ref) => (
    <button ref={ref} className='FancyButton'>{props.children}</button>
));
const ref = React.createRef();

function App(){
    return (
        <div>
            <FancyButton ref={ref}>Click me!</FancyButton>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)