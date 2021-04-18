const computed_watch = Vue.createApp({
	data() {
		return {
			author:{
				name:"John Doe",
				books: [
					'Vue 2 - Advanced Guide',
					'Vue 3 - Basic Guide',
					'Vue 4 - The Mystery'
				]
			},
			count:1,
			firstName:"Kyrie",
			lastName:"Irving",
			question:"",
			answer:'Questions usually contain a question mark. ;-)'
		}
	},
	computed:{
		publishedBooksMessage(){
			console.log("计算属性执行了");
			return this.author.books.length > 0 ? 'Yes' : 'NO'
		},
		fullName:{
			get(){
				return this.firstName + " " + this.lastName;
			},
			set(newValue){
				console.log('newValue:',newValue);
				let [firstName,lastName] = newValue.split(" ");
				this.firstName = firstName;
				this.lastName = lastName;
			}
		}
	},
	watch:{
		question(newQuestion,oldQuestion){
			if(newQuestion.indexOf('?') > -1){
				this.getAnswer()
			}
		}
	},
	methods:{
		getPublishedMessage(){
			console.log('方法执行了');
			return this.author.books.length > 0 ? 'YES' : "NO"
		},
		increment(){
			this.count += 1;
		},
		getAnswer(){
			this.answer = "Thinking......";
			axios({
				url:"https://yesno.wtf/api'",
				method:"get"
			}).then(response => {
				console.log('response:',response);
			})
		}
	}
});
console.log('computed_watch:',computed_watch);
let c = computed_watch.mount("#demo3");
console.log('c:',c);