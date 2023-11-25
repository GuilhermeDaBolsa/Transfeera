<template>
	<v-snackbar
		:model-value="show"
		:timeout="-1"
		:color="isLoading ? 'grey' : (isError ? 'error' : 'valid')"
		:content-props="{ style: 'transform: initial; bottom: initial; left: initial; top: 10px; right: 0;'}"
	>
		<div v-if="isLoading" class="d-flex align-center">
			<v-progress-circular class="mr-4" indeterminate size="28" />
			<div>{{ loadingMessage }}</div>
		</div>
		
		<div v-else-if="isError" class="d-flex align-center">
			<v-icon class="mr-4" icon="mdi-alert" size="28" />
			<div style="max-width: 100%; word-wrap: break-word"> {{ errorMessage }} </div>
		</div>
		
		<div v-else class="d-flex align-center">
			<v-icon class="mr-4" icon="mdi-check-circle" size="28" />
			<div> {{ successMessage }} </div>
		</div>
	</v-snackbar>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from "vue";

const show = ref(false);
const userAllowedToClose = ref(true);

const isLoading = ref(false);
const loadingMessage = ref("");
const isError = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

function changeStateToLoading(message: string) {
	isLoading.value = true;
	loadingMessage.value = message;

	userAllowedToClose.value = false;
}

function changeStateToError(message: string) {
	isError.value = true;
	isLoading.value = false;

	errorMessage.value = message;
	userAllowedToClose.value = true;
}

function changeStateToSuccess(message: string) {
	isError.value = false;
	isLoading.value = false;

	successMessage.value = message;
	userAllowedToClose.value = true;
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
