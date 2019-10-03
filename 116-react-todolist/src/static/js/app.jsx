(function (ReactDOM,React) {
	window.App = class App extends React.Component{
		constructor(){
			super(...arguments)
			this.state = {
				playList:["Kyrie","Lebron","Durant","Curry","Kobe"]
			}
			this.handleGetValue = this.handleGetValue.bind(this);
			this.handleRemove = this.handleRemove.bind(this);
		}
		handleGetValue(e){
			var txt = e.target.value.trim();
			if(!txt.length) return;
			if(e.keyCode !== 13) return;
			let arr = this.state.playList;
				arr.unshift(txt);
			this.setState({
				playList:arr,
				// 这样写返回的是数组长度
				// playList:arr.unshift(txt)
			})
			console.log(arr,this.state.playList);
			e.target.value = "";
		}
		handleRemove(index){
			console.log("你好",index);
			let data = this.state.playList;
			data.splice(index,1);
			this.setState({
				playList:data
			})
		}
		render(){
			return(
				<div>
					<section className="todoapp">
						{
						//	父组件给子组件传递数据,传递一个函数,
						}

						<Head data={this.handleGetValue}/>
						{
							// 当有数据的时候才渲染组件
							this.state.playList.length > 0 && <Main
								player={this.state.playList}
								// 将函数传递给子组件,子组件点击执行,然后获取索引值再返回到父级
								remove={this.handleRemove}
							/>
						}
						<Footer/>
					</section>
					<Info/>
				</div>
			)
		}
	}
})(ReactDOM,React);
