<template>
	<v-navigation-drawer v-model="show" location="bottom" temporary style="height: calc(100% - 64px);">
		<v-card flat rounded="0" height="100%">
			<v-toolbar color="primary" flat>
				<AppContentContainerBounds>
					<v-spacer></v-spacer>
					<v-btn icon color="inside-primary" @click="close">
						<v-icon size="x-large">mdi-close</v-icon>
					</v-btn>
				</AppContentContainerBounds>
			</v-toolbar>

			<div class="d-flex justify-center px-2">
				<div>
					<EditSketchReceiver ref="receiverComponent" :receiver="newReceiver" />
					
					<v-card-actions class="px-0">
						<v-btn color="primary" variant="outlined" size="x-large" min-width="150" @click="close">
							Cancelar
						</v-btn>
						<v-spacer />
						<v-btn name="saveReceiver" color="valid" variant="flat" size="x-large" min-width="150" @click="validateAndSaveReceiver">
							Salvar
						</v-btn>
					</v-card-actions>
				</div>
			</div>
		</v-card>
	</v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from "vue";

import AppContentContainerBounds from '@/layouts/default/AppContentContainerBounds.vue';
import EditSketchReceiver from "@/components/receivers/EditSketchReceiver.vue";

import { Receiver } from "@/models/Receiver";
import ReceiverStatus from "@/models/ReceiverStatus";

const emit = defineEmits(["saveReceiver"]);

const show = ref(false);

const newReceiver = ref<Receiver>({} as Receiver);
const receiverComponent = ref<HTMLFormElement>();

async function validateAndSaveReceiver() {
	if(!receiverComponent.value)
		return false;

	const valid = await receiverComponent.value.isNewReceiverDataValid();

	if(valid) {
		emit("saveReceiver", receiverComponent.value.getReceiverData());
		close();
	}
}

function open() {
	newReceiver.value = { status: ReceiverStatus.sketch } as Receiver;
	receiverComponent.value?.resetFormValidation();
	show.value = true;
}

function close() {
	show.value = false;
}

defineExpose({ open, close });
</script>

<style></style>
