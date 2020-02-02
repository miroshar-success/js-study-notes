# Context

    Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据
```jsx harmony
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {__
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```
    tips:
    1. Context主要应用场景在于很多不同层级的组件需要访问同样的一些数据
    2. 当Provider的value值发生变化时,它内部的所有消费组件都会重新渲染
    
## API

    1. React.createContext(defaultValue)
```jsx harmony
const MyContext = React.createContext(defaultValue);
```
        1. 当React渲染一个订阅了这个Context对象的组件,这个组件会从组件树离自身最近的那个匹配的Provider中读取到
        当前的context值。
        2. 组件树中没有匹配到Provider时,defaultValue才会生效。
        3. 将undefined传递给Provider的value时,消费组件的defaultValue不会生效
    
    2. Context.Provider
       每个Context对象都会返回一个Provider.React组件,它允许消费组件订阅context的变化。
```jsx harmony
<MyContext.Provider value={defaultValue}/>
```
    
    3. Class.contextType
        挂载在class上的contextType属性会被重赋值为一个由 React.createContext()创建的Context对象。 这能让你使用
        this.context来消费最近Context上的那个值。可以在任何生命周期中访问到它,包括render函数中。
    
    tips:
        1. 只通过该API订阅单一context。
        2. 可以使用static这个类属性来初始化contextType
        
    3. Context.Consumer
```jsx harmony
<MyContext.Consumer
    value={defaultValue}
>
</MyContext.Consumer>
``` 
    4. Context.displayName
        context对象接受一个名为displayName的property，类型为字符串。 React Devtools使用该字符串来确定
        context要显示的内容。
        
```jsx harmony
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    