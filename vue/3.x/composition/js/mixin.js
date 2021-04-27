const mixin = {
  data(){
    return {
      counter:0
    }
  },
  computed:{
    double(){
      return this.counter * 2
    }
  },
  methods:{
    add(){
      this.counter += 1;
    }
  }
}

export default mixin;