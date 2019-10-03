window.Main = class Main extends React.Component{
	constructor(props){
		super(props);
		this.player = this.props.player;
		console.log(this.props.player);
	}
	render(){
		return(
			<section className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox"/>
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul className="todo-list">
					{
						this.player.length > 0 && this.player.map((item,index)=>{
							return(
								<li className="completed" key={index}>
									<div className="view">
										<input className="toggle" type="checkbox" defaultChecked/>
										<label>{item}</label>
										<button
											className="destroy"
											onClick = {this.props.remove.bind(this,index)}
										></button>
									</div>
									<input className="edit" defaultValue="Create a TodoMVC template"/>
								</li>
							)
						})
					}
					<li>
						<div className="view">
							<input className="toggle" type="checkbox"/>
							<label>Buy a unicorn</label>
							<button className="destroy"></button>
						</div>
						<input className="edit" defaultValue="Rule the web"/>
					</li>
				</ul>
			</section>
		)
	}
}
