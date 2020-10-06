const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

const ThemeContext = React.createContext({
    theme:themes.light,
    toggle:() => {}
});
ThemeContext.displayName = 'theme';

function App(){
    const [theme,setTheme] = React.useState(themes.light);
    return (
        <ThemeContext.Provider value={{
            theme,
            toggle:() => {
                setTheme(theme => {
                    setTheme(theme === themes.light ? themes.dark : themes.light);
                })
            }
        }}>
            <ToolBar/>
        </ThemeContext.Provider>
    )
}

function ToolBar(){
    return <ThemeButton/>
}

function ThemeButton(){
    const context = React.useContext(ThemeContext);
    return (
        <button
            style={{
                color:context.theme.foreground,
                background:context.theme.background
            }}
            onClick={context.toggle}
        >Click Me</button>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)