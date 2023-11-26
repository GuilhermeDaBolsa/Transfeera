<template>
	<v-snackbar
		:model-value="show"
		:timeout="-1"
		:color="isLoading ? 'grey' : (isError ? 'error' : 'valid')"
		:content-props="{ style: 'transform: initial; bottom: initial; left: initial; top: 10px; right: 0;'}"
	>
		<div name="requestFeedback">
			<div v-if="isLoading" class="d-flex align-center">
				<v-progress-circular class="mr-4" indeterminate size="28" />
				<div>{{ loadingMessage }}</div>
			</div>
			
			<div v-else-if="isError" class="d-flex align-center">
				<v-icon class="mr-4" icon="mdi-alert" size="28" />
				<div style="max-width: 100%; word-wrap: break-word"> {{ errorMessage }} </div>
				<v-spacer></v-spacer>
				<v-btn icon="mdi-close" variant="text" density="compact" @click="close"></v-btn>
			</div>
			
			<div v-else class="d-flex align-center">
				<v-icon class="mr-4" icon="mdi-check-circle" size="28" />
				<div> {{ successMessage }} </div>
			</div>
		</div>
	</v-snackbar>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from "vue";

const show = ref(false);

const isLoading = ref(false);
const loadingMessage = ref("");
const isError = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

function changeStateToLoading(message: string) {
	isLoading.value = true;
	loadingMessage.value = message;
}

function changeStateToError(message: string) {
	isError.value = true;
	isLoading.value = false;

	errorMessage.value = message;

	setTimeout(close, 5000);
}

function changeStateToSuccess(message: string) {
	isError.value = false;
	isLoading.value = false;

	successMessage.value = message;
}

function open() {
	show.value = true;
}

function close() {
	show.value = false;
}

defineExpose({ open, close, changeStateToLoading, changeStateToError, changeStateToSuccess });
</script>

<style></style>
