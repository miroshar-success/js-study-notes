<template>
	<div>
    <button @click.stop='hello'>click me</button>
  </div>
</template>

<script>
	export default {
		name:'home',
		data() {
			return {
				message:'I am home page1223333'
			}
    },
    methods:{
      hello(){
        console.log('hello world')
      }
    }
	}
</script>
