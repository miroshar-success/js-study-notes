<template>
	<view class="content">
		<view>
            <text class="title">{{title}}</text>
        </view>
		<view>
			<text>普通选择器：当前选择</text>
			<view class="uni-list-cell-db">
				<picker :range="array" :value="index" @change="choose" @cancel="cancel">
					<view>{{array[index]}}</view>
				</picker>
			</view>
			<text>选择你最喜欢的球员</text>
			<view class="uni-list">
				<picker :range="players" @change="selected">
					<view>{{players[number]}}</view>
				</picker>
			</view>
			<text>选择你的家乡</text>
			<view>
				<picker 
				:range="home" 
				@change="a" 
				mode="multiSelector" 
				:value="index1"
				@columnchange="colChanged"
				>
					<view>{{home[0][index1[0]]}}--{{home[1][index1[1]]}}</view>
				</picker>
			</view>
			<text>日期选择器</text>
			<view>
				<!-- fields="year/month/day" 可以控制 选择的 时间 年 日 -->
				<picker mode="date" @change="dateChanged" :value="date">
					<view>{{date}}</view>
				</picker>
			</view>
			<text>选择时间</text>
			<view>
				<picker mode="time" :value="time" @change="bindTimeChange">
					<view>{{time}}</view>
				</picker>
			</view>
			<text>选择省市区</text>
			<view>
				<picker 
				@change="bindReginChanged" 
				custom-item="customItem"
				>
				<view>{{customItem[0],customItem[1],customItem[2]}}</view>
				</picker>
			</view>
		</view>
		<view>
			<radio-group @change="radioChanged">
				<label for="" v-for="(item,index) in items" :key="index">
					<view>
						<radio :value="item.value" :checked="index === current"/>
						<text>{{item.name}}</text>
					</view>
				</label>
			</radio-group>
		</view>
		<view>
			<slider show-value min="30" max="80" value="5"
			activeColor="#f00"
			backgroundColor="#00f"
			block-size="20"
			@change="bindSliderChange"
			@changing = "bindSlidering"
			></slider>
		</view>
		<view>
			<switch checked></switch>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				index:0,
				array:["中国","美国","意大利","俄罗斯","澳大利亚"],
				number:0,
				players:["kyrie","lebron","durant","kobe","curry","wade"],
				home:[ ["安庆","合肥","黄山"],["望江","宿松","怀宁","潜山"] ],
				index1:[0,0],
				time:"21:20",
				date:"2019-04-09",
				customItem:["安徽省","合肥市","蜀山区"],
				items:[
					{
                    value: 'USA',
                    name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					}
				],
				current:0
			}
		},
		onLoad() {
			
		},
		methods: {
			choose(event){
				console.log(event);
				this.index = event.detail.value;
			},
			cancel(){
				console.log("取消了");
			},
			selected(event){
				this.number = event.detail.value;
			},
			a(e){
				this.index1 = e.detail.value;
				console.log(this.index1);
			},
			colChanged(e){
				console.log(e.detail);
				let city = e.detail.column;
				let town = e.detail.value;	// value表示下标
				switch(town){
					case 0:
					this.home[1] = ["望江","宿松","怀宁","潜山","岳西","太湖"]
					break;
					case 1:
					this.home[1] = ["蜀山区","瑶海区","包河区","经济技术开发区"]
					break;
					case 2:
					this.home[1] = ["屯溪","歙县"]
				}
			},
			dateChanged(event){
				console.log(event);
				this.date = event.detail.value;
			},
			bindTimeChange(event){
				console.log(event.detail);
				this.time = event.detail.value;
			},
			bindReginChanged(event){
				console.log(event.detail);
			},
			radioChanged(event){
				console.log(event.detail);
			},
			bindSliderChange(event){
				console.log(event);
			},
			bindSlidering(event){
				console.log(event.detail);
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
