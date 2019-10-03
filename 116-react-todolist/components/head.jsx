window.Head = class Head extends React.Component{
	constructor(props){
		super(props)
		//接收子组件传递过来的函数参数,
		this.state = {
			handleDown:this.props.data
		}
	}
	render(){
		return(
			<header className="header">
				<h1>todos</h1>
				<input
					onKeyDown = {this.state.handleDown}
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
				/>
			</header>
		)
	}
}
