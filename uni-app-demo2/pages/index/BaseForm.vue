<template>
	<view>
		<form action="" method="GET" @submit="subData">
			<input type="text" name="user" placeholder="请输入姓名">
			<input type="password" name="psd" placeholder="请输入密码">
			<view>
				<switch checked="flag" name="swi"></switch>
				<slider show-value name="slide"></slider>
			</view>
			<text>选择你喜欢的运动(多选)</text>
			<checkbox-group name="sport">
				<label v-for="(item,index) in sports" :key="index">
					<view>
						<checkbox :value="item"></checkbox>
						<text>{{item}}</text>
					</view>
				</label>
			</checkbox-group>
			<text>选择你最喜欢的球员(单选)</text>
			<radio-group name="player">
				<label v-for="(item,index) in players" :key="index">
					<view>
						<radio :value="item">{{item}}</radio>
						<text>{{item}}</text>
					</view>
				</label>
			</radio-group>
			<button type="primary" form-type="submit">提交</button>
		</form>
	</view>
</template>

<script>
	export default{
		name:"BaseForm",
		data(){
			return{
				flag:false,
				sports:["basketball","football","badminton","volleyball"],
				players:["kyrie","lebron","kobe","curry"]
			}
		},
		methods:{
			subData(event){
				console.log(event.detail);
			}
		}
	}
</script>

<style>
</style>
