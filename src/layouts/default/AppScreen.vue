<template>
	<v-app>
		<v-app-bar scroll-behavior="elevate">
			<AppContentContainerBounds>
				<v-app-bar-title>
					<v-img :width="200" cover src="/transfeera-logo-verde.svg"></v-img>
				</v-app-bar-title>
			</AppContentContainerBounds>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import AppContentContainerBounds from '@/layouts/default/AppContentContainerBounds.vue';

</script>
