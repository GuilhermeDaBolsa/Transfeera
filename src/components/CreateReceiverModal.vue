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
				<v-form ref="createReceiverForm" @submit.prevent>
					<div class="py-4" style="font-size: 26px;">Dados do favorecido</div>

					<v-row dense>
						<v-col cols="12" sm="7">
							<div class="text-subtitle-1 text-medium-emphasis">Nome completo ou razão social</div>
							<v-text-field
								v-model="name"
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
								v-model="cpfCnpj"
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
								v-model="email"
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
						v-model="pixKeyType"
						placeholder="E-mail, CPF/CNPJ, etc..."
						:items="selectablePixKeyTypes"
						variant="outlined"
						density="compact"
						prepend-inner-icon="mdi-lock-outline"
					></v-select>

					<div class="text-subtitle-1 text-medium-emphasis">Chave</div>
					<v-text-field
						v-model="pixKey"
						placeholder="Chave do pix"
						variant="outlined"
						density="compact"
						prepend-inner-icon="mdi-key-outline"
					/>

					<v-card-actions class="px-0">
						<v-btn color="primary" variant="outlined" size="x-large" min-width="150" @click="close">Cancelar</v-btn>
						<v-spacer />
						<v-btn color="valid" variant="flat" size="x-large" min-width="150" @click="validateAndSaveReceiver">Salvar</v-btn>
					</v-card-actions>
				</v-form>
			</div>
		</v-card>
	</v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, defineExpose } from "vue";
import { vMaska } from "maska";

import AppContentContainerBounds from '@/layouts/default/AppContentContainerBounds.vue';

import { PixKeyType, PixKeyTypeLabels } from "@/models/PixKeyType";
import { cpfMaskPattern, cpfCnpjMaskPatterns } from "@/utils/Masks";
import { isValidCpf, isValidCnpj, isValidEmail } from "@/utils/Validators";

const show = ref(false);
const createReceiverForm = ref<HTMLFormElement>();

const selectablePixKeyTypes = computed(() => 
	Object.values(PixKeyType).map(type => { return { title: PixKeyTypeLabels[type], value: type }}))

const cpfCnpjMask = { mask: cpfCnpjMaskPatterns };

const requiredRule = (value: string) => !!value || "Campo obrigatório";
const cpfRule = (value: string) => isValidCpf(value) || "CPF inválido";
const cnpjRule = (value: string) => isValidCnpj(value) || "CNPJ inválido";
const cpfCnpjRule = (value: string) => value.length <= cpfMaskPattern.length ? cpfRule(value) : cnpjRule(value);
const emailRule = (value: string) => isValidEmail(value) || "E-mail inválido";

const name = ref("");
const cpfCnpj = ref("");
const email = ref("");
const pixKeyType = ref();
const pixKey = ref("");

async function validateAndSaveReceiver() {
	const { valid } = await createReceiverForm.value!.validate();

	if(valid) {
		//TODO FAZER REQUISIÇÃO DE INSERIR + REQUEST DIALOG
		console.log(name.value, cpfCnpj.value, email.value, pixKeyType.value, pixKey.value);
	}
}

function open() {
	show.value = true;
}

function close() {
	show.value = false;
}

defineExpose({ open, close });
</script>

<style></style>
