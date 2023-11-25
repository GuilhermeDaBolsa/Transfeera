<template>
	<v-dialog v-model="show" temporary max-width="650">
		<v-card v-if="receiver" flat height="100%">
			<v-toolbar color="background" flat style="margin-bottom: -27px;">
				<v-spacer></v-spacer>
				<v-btn icon color="black" @click="close" style="z-index: 3;">
					<v-icon size="large">mdi-close</v-icon>
				</v-btn>
			</v-toolbar>

			<div class="px-4 px-sm-12" style="z-index: 2;">
				<v-row no-gutters style="gap: 12px;">
					<v-col cols="12" sm="auto" style="font-size: 26px;">
						{{ receiver.name }}
					</v-col>

					<v-col cols="12" sm="auto">
						<ReceiverStatusComponent :status="receiver.status" style="max-width: 100px;"/>
					</v-col>
				</v-row>

				<v-divider class="mt-4" />

				<EditValidatedReceiver
					v-if="receiver.status == ReceiverStatus.validated"
					class="pt-6"
					:receiver="receiver"
					ref="editReceiverForm"
				/>

				<EditSketchReceiver
					v-else
					:receiver="receiver"
					ref="editReceiverForm"
				/>

				<v-card-actions class="px-0 pb-8 pt-5">
					<v-row>
						<v-col cols="5">
							<v-btn color="primary" variant="outlined" size="x-large" min-width="150" @click="close">Voltar</v-btn>
						</v-col>
						<v-spacer></v-spacer>
						<v-col class="d-flex justify-end" cols="auto">
							<v-btn color="red" variant="flat" size="x-large" icon="mdi-delete-forever" rounded min-width="64" max-height="52" @click="openDeleteReceiversConfirmationModal"/>
							<v-btn color="valid" variant="flat" size="x-large" min-width="150" @click="validateAndConfirmEdit">Salvar</v-btn>
						</v-col>
					</v-row>
				</v-card-actions>
			</div>

			<ConfirmReceiversDeletionModal ref="confirmReceiversDeletionModal" @confirmDeletion="onConfirmDeletion"/>
		</v-card>
	</v-dialog>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from "vue";

import ReceiverStatusComponent from "@/components/ReceiverStatusComponent.vue";
import EditValidatedReceiver from "@/components/EditValidatedReceiver.vue";
import ConfirmReceiversDeletionModal from '@/components/ConfirmReceiversDeletionModal.vue';

import { Receiver, isSameReceiver } from "@/models/Receiver";
import ReceiverStatus from '@/models/ReceiverStatus';
import EditSketchReceiver from "./EditSketchReceiver.vue";

const emit = defineEmits(["editReceiver", "deleteReceiver"]);

const show = ref(false);
const editReceiverForm = ref<HTMLFormElement>();
const confirmReceiversDeletionModal = ref<HTMLFormElement>();

const receiver = ref<Receiver>();

async function validateAndConfirmEdit() {
	if(!editReceiverForm.value)
		return false;

	const valid = await editReceiverForm.value.isNewReceiverDataValid();

	if(!valid)
		return false;

	const editedReceiver = editReceiverForm.value.getReceiverData() as Receiver;

	if(!isSameReceiver(receiver.value!, editedReceiver)) {
		emit("editReceiver", editedReceiver);
	}

	close();
}

function openDeleteReceiversConfirmationModal() {
	confirmReceiversDeletionModal.value?.open([receiver.value]);
}

function onConfirmDeletion(receivers: Receiver[]) {
	emit("deleteReceiver", receivers);
	close();
}

function open(toEditReceiver: Receiver) {
	receiver.value = toEditReceiver;
	show.value = true;
}

function close() {
	show.value = false;
}

defineExpose({ open, close });
</script>

<style scoped>
</style>
