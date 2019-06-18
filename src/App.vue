<template>
  <div id="app">
    <input-set input-count="4" v-on:inputData="getInputData"></input-set>
  </div>
</template>

<script>
export default {
  name: 'app',
	methods: {
		getInputData (someData) {
			console.log(someData)
		}
	}
}
</script>
