<template>
	<v-dialog v-model="show" :persistent="!userAllowedToClose" transition="dialog-bottom-transition" max-width="550" max-height="85%">
		<v-sheet class="pa-3 overflow-y-auto" rounded="xl" max-height="100%">

			<div v-if="isLoading" class="d-flex flex-column align-center">
				<v-progress-circular class="mb-1" indeterminate size="42" />
				<div> {{ loadingMessage }} </div>
			</div>

			<div v-else-if="isError" class="d-flex flex-column align-center">
				<v-icon class="mb-1" icon="mdi-alert" size="48" color="error" />
				<div style="max-width: 100%; word-wrap: break-word"> {{ errorMessage }} </div>
			</div>

			<div v-else class="d-flex flex-column align-center">
				<v-icon class="mb-1" icon="mdi-check-circle" size="46" color="success"/>
				<div> {{ successMessage }} </div>
			</div>
			
		</v-sheet>
	</v-dialog>
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
