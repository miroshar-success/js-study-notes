<template>
	<div>
		{{message}}
		<router-link to="/home">home</router-link>
		<router-view/>
	</div>
</template>

<script>
	export default {
		name:'App',
		data() {
			return {
				message:'hello world'
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
