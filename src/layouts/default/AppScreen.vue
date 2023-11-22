<template>
	<v-app>
		<DefaultBar />

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue'
</script>
