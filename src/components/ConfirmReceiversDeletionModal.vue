<template>
	<v-dialog v-model="show" temporary max-width="600">
		<v-card v-if="receivers && receivers.length > 0" flat height="100%">
			<v-toolbar color="background" flat style="margin-bottom: -27px;">
				<v-spacer></v-spacer>
				<v-btn icon color="black" @click="close">
					<v-icon size="large">mdi-close</v-icon>
				</v-btn>
			</v-toolbar>

			<div class="px-4 px-sm-12" style="z-index: 2; font-size: 18px;">
				<div class="mb-8" style="font-size: 26px;">Excluir favorecidos</div>

				<div class="mb-4" style="font-weight: 500;">
					<div class="mb-2">Você confirma a exclusão dos seguintes favorecidos?</div>
					
					<div v-for="receiver in receivers" :key="receiver.id">• {{ receiver.name }}</div>
				</div>

				<div class="mb-4">O histórico de pagamentos deles será mantido, mas serão removidos da sua lista de favorecidos.</div>

				<v-card-actions class="px-0 pb-8 pt-5">
					<v-btn color="primary" variant="outlined" size="x-large" min-width="150" @click="close">Cancelar</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="red" variant="flat" size="x-large" min-width="150" @click="confirmDeletion">Confirmar exclusão</v-btn>
				</v-card-actions>
			</div>
		</v-card>
	</v-dialog>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from "vue";

import Receiver from "@/models/Receiver";

const emit = defineEmits(["confirmDeletion"]);

const show = ref(false);

const receivers = ref<Receiver[]>();

function confirmDeletion() {
	emit("confirmDeletion", receivers.value);
	close();
}

function open(toDeleteReceivers: Receiver[]) {
	receivers.value = toDeleteReceivers;
	show.value = true;
}

function close() {
	show.value = false;
}

defineExpose({ open, close });
</script>

<style scoped>
</style>
