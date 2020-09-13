const items = [
    {
        name:"苹果",
        id:1,
        description:"苹果公司（Apple Inc. ）是美国一家高科技公司。由史蒂夫·乔布斯、斯蒂夫·沃兹尼亚克和罗·韦恩(Ron Wayne)等人于1976年4月1日创立，并命名为美国苹果电脑公司（Apple Computer Inc. ），2007年1月9日更名为苹果公司，总部位于加利福尼亚州的库比蒂诺。\n"
    },
    {
        name:"华为",
        id:2,
        description:"华为消费者业务产品全面覆盖手机、移动宽带终端、终端云等，凭借自身的全球化网络优势、全球化运营能力，致力于将最新的科技带给消费者，让世界各地享受到技术进步的喜悦，以行践言，实现梦想"
    },
    {
        name:"小米",
        id:3,
        description:"小米公司正式成立于2010年4月，是一家专注于智能手机自主研发的移动互联网公司，定位于高性能发烧手机。小米手机、MIUI、米聊是小米公司旗下三大核心业务。“为发烧而生”是小米的产品理念。小米公司首创了用互联网模式开发手机操作系统、发烧友参与开发改进的模式。"
    }
]

class PhoneItem extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <React.Fragment>
                <dt>{this.props.item.name}</dt>
                <dd>{this.props.item.description}</dd>
            </React.Fragment>
        )
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items,
        }
    }
    render(){
        return (
            <dl>
                {this.state.items.length > 0 && this.state.items.map((item) =>
                    <PhoneItem item={item} key={item.id}/>
                )}
            </dl>
        )
    }
}

// key是唯一可以传递给Fragment的属性
class Phone extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <dl>
                {items.length > 0 && items.map((item) => (
                    <React.Fragment key={item.id}>
                        <dt>{item.name}</dt>
                        <dd>{item.description}</dd>
                    </React.Fragment>
                ))}
            </dl>
        )
    }
}

ReactDOM.render(
    <div>
        <App/>
        <Phone/>
    </div>,
    document.getElementById("root")
)