<template>
	<v-form ref="receiverForm" @submit.prevent>
		<div class="py-4" style="font-size: 26px;">Dados do favorecido</div>

		<v-row dense>
			<v-col cols="12" sm="7">
				<div class="text-subtitle-1 text-medium-emphasis">Nome completo ou razão social</div>
				<v-text-field
					v-model="editedReceiver.name"
					placeholder="Favorecido de Exemplo"
					variant="outlined"
					density="compact"
					prepend-inner-icon="mdi-account-outline"
					:rules="[requiredRule]"
				/>
			</v-col>
			<v-col cols="12" sm="5">
				<div class="text-subtitle-1 text-medium-emphasis">CPF / CNPJ</div>
				<v-text-field
					v-model="editedReceiver.tax_id"
					placeholder="000.000.000-00"
					variant="outlined"
					density="compact"
					prepend-inner-icon="mdi-card-account-details-outline"
					v-maska:[cpfCnpjMask]
					:rules="[requiredRule, cpfCnpjRule]"
				/>
			</v-col>
			<v-col cols="12">
				<div class="text-subtitle-1 text-medium-emphasis">Email para envio do comprovante</div>
				<v-text-field
					v-model="editedReceiver.email"
					placeholder="favorecido@email.com"
					variant="outlined"
					density="compact"
					prepend-inner-icon="mdi-email-outline"
					:rules="[requiredRule, emailRule]"
				/>
			</v-col>
		</v-row>

		<div class="py-4" style="font-size: 26px;">Chave pix</div>

		<div class="text-subtitle-1 text-medium-emphasis">Tipo de chave</div>
		<v-select
			v-model="editedReceiver.pix_key_type"
			placeholder="E-mail, CPF/CNPJ, etc..."
			:items="selectablePixKeyTypes"
			variant="outlined"
			density="compact"
			prepend-inner-icon="mdi-lock-outline"
		></v-select>

		<div class="text-subtitle-1 text-medium-emphasis">Chave</div>
		<v-text-field
			v-model="editedReceiver.pix_key"
			placeholder="Chave do pix"
			variant="outlined"
			density="compact"
			prepend-inner-icon="mdi-key-outline"
		/>
	</v-form>
</template>

<script lang="ts" setup>
import { ref, computed, defineExpose, PropType } from "vue";
import { vMaska } from "maska";

import SketchReceiver from "@/models/SketchReceiver";
import { PixKeyType, PixKeyTypeLabels } from "@/models/PixKeyType";
import { cpfMaskPattern, cpfCnpjMaskPatterns } from "@/utils/Masks";
import { isValidCpf, isValidCnpj, isValidEmail } from "@/utils/Validators";
import { watch } from "vue";

const props = defineProps({
	receiver: { type: Object as PropType<SketchReceiver>, required: true }
});

const receiverForm = ref<HTMLFormElement>();

const selectablePixKeyTypes = computed(() => 
	Object.values(PixKeyType).map(type => { return { title: PixKeyTypeLabels[type], value: type }}))

const cpfCnpjMask = { mask: cpfCnpjMaskPatterns };

const requiredRule = (value: string) => !!value || "Campo obrigatório";
const cpfRule = (value: string) => isValidCpf(value) || "CPF inválido";
const cnpjRule = (value: string) => isValidCnpj(value) || "CNPJ inválido";
const cpfCnpjRule = (value: string) => value.length <= cpfMaskPattern.length ? cpfRule(value) : cnpjRule(value);
const emailRule = (value: string) => isValidEmail(value) || "E-mail inválido";

const editedReceiver = ref(new SketchReceiver("", "", "", "", null));

async function isNewReceiverDataValid() {
	const { valid } = await receiverForm.value!.validate();
	return valid;
}

 function getReceiverData() {
	return editedReceiver.value;
}

watch(props.receiver, () => {
	editedReceiver.value = props.receiver;
});

defineExpose({ isNewReceiverDataValid, getReceiverData });
</script>

<style></style>
