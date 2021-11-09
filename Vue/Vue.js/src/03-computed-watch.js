// -------------------------------------- 计算属性 --------------------------------------
Vue.createApp({
  data() {
    return {
      author:{
        name: 'John Doe',
        books:[
          'Vue 2 - Advanced Guide',
          'Vue 3 Basic Guide',
          'Vue 4 The Mystery'
        ]
      },
      count:0
    }
  },
  computed:{
    publishedBooksMessage() {
      console.log('computed')
      return this.author.books.length > 0  ? 'Yes' : 'No';
    }
  },
  methods:{
    calcPublishedBooksMessage() { // 调用increment 方法会调用
      console.log('methods')
      return this.author.books.length > 0 ? 'Yes' : 'No'
    },
    increment() {
      this.count += 1;
    }
  }
}).mount('#computed-basic')

// --------------------------------------  computed-getter/setter --------------------------------------
Vue.createApp({
  data() {
    return {
      firstName:"kyrie",
      lastName:"irving"
    }
  },
  computed: {
    fullName: {
      get() {
        return this.firstName + ' ' + this.lastName
      },
      set(newValue) {
        const names = newValue.split(' ');
        this.firstName = names[0];
        if(names[1]){
          this.lastName = names[1]
        }else{
          this.lastName = ''
        }
      }
    }
  }
}).mount("#computed-getter")
