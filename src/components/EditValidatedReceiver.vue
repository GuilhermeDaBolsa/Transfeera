<template>
	<v-form ref="receiverForm" @submit.prevent>
		<v-row dense>
			<v-col cols="12">
				<div class="statement">CPF / CNPJ</div>
				<div class="information">{{ cpfCnpjMask.masked(receiver.tax_id) }}</div>
			</v-col>

			<v-col cols="7">
				<div class="statement">Banco</div>
				<div class="information">{{ receiver.bank_name }}</div>
			</v-col>
			<v-col cols="5">
				<div class="statement">Agência</div>
				<div class="information">{{ branchMask.masked(receiver.branch) }}</div>
			</v-col>

			<v-col cols="7">
				<div class="statement">Tipo de conta</div>
				<div class="information">{{ receiver.account_type }}</div>
			</v-col>
			<v-col cols="5">
				<div class="statement">{{ receiver.account_type }}</div>
				<div class="information">{{ accountMask.masked(receiver.account) }}</div>
			</v-col>

			<v-col cols="12" sm="7">
				<div class="statement">E-mail do favorecido</div>
				<v-text-field
					v-model="newEmail"
					placeholder="favorecido@email.com"
					variant="outlined"
					density="compact"
					prepend-inner-icon="mdi-email-outline"
					:rules="[requiredRule, emailRule]"
				/>
			</v-col>
		</v-row>
	</v-form>
</template>

<script lang="ts" setup>
import { ref, watch, defineExpose, PropType } from "vue";

import Receiver from "@/models/Receiver";
import { cpfCnpjMask, branchMask, accountMask } from "@/utils/Masks";
import { isValidEmail } from "@/utils/Validators";

const props = defineProps({
	receiver: { type: Object as PropType<Receiver>, required: true }
});

const receiverForm = ref<HTMLFormElement>();

const requiredRule = (value: string) => !!value || "Campo obrigatório";
const emailRule = (value: string) => isValidEmail(value) || "E-mail inválido";

const newEmail = ref("");

async function isNewReceiverDataValid() {
	if(!receiverForm.value)
		return false;

	const { valid } = await receiverForm.value.validate();
	return valid;
}

function getReceiverData() {
	return newEmail.value;
}

function updateInternalReceiverWithProps() {
	newEmail.value = props.receiver.email;
}

watch(() => props.receiver, () => {
	updateInternalReceiverWithProps();
});

updateInternalReceiverWithProps();

defineExpose({ isNewReceiverDataValid, getReceiverData });
</script>

<style scoped>
.statement {
	font-size: 1rem;
    font-weight: normal;
    line-height: 1.75rem;
    letter-spacing: 0.009375em;
    font-family: "Roboto", sans-serif;

	color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}

.information {
	padding: 6px 0px;
	font-size: 24px;
	font-weight: 300;
}</style>
