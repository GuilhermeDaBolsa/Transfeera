<template>
	<v-tabs model-value="1" bg-color="primary" color="inside-primary" height="58" >
		<AppContentContainerBounds>
			<v-tab value="1">Seus favorecidos</v-tab>
		</AppContentContainerBounds>
	</v-tabs>

	<v-toolbar flat height="120">
		<AppContentContainerBounds>
			<v-row>
				<v-col class="d-flex align-center">
					<div style="font-size: 28px; font-weight: 300; color: grey;">Seus favorecidos</div>
					<v-btn class="ml-2" color="primary" variant="flat" icon size="44" @click="createReceiverModal?.open">
						<v-icon color="inside-primary" size="38">mdi-plus</v-icon>
					</v-btn>
				</v-col>
				<v-col class="d-flex justify-end" cols="12" sm="6">
					<v-text-field
						v-model="receiversSearch"
						placeholder="Nome, CPF, agência ou conta"
						variant="solo"
						density="compact"
						append-inner-icon="mdi-magnify"
						flat
						hide-details
						style="max-width: 380px;"
						@click:append-inner="()=>{}"
					/>
				</v-col>
			</v-row>
		</AppContentContainerBounds>
	</v-toolbar>

	<v-toolbar color="background" flat height="120">
		<AppContentContainerBounds>
			<v-btn
				size="x-large"
				color="red-lighten-1"
				variant="flat"
				:disabled="selectedReceivers.length == 0"
				style="font-size: 16px;"
				@click="deleteSelectedReceivers"
			>
				Excluir selecionados
			</v-btn>
		</AppContentContainerBounds>
	</v-toolbar>

	<AppContentContainerBounds>
		<div v-if="!receivers.isLoading && receivers.isError" class="d-flex flex-column align-center ma-auto">
			<v-icon color="error" size="48">mdi-alert</v-icon>
			Ocorreu um erro ao buscar seus favorecidos
		</div>

		<v-data-table
			v-else
			v-model="selectedReceivers"
			v-model:page="pageSelected"
			:loading="receivers.isLoading"
			loading-text="Carregando favorecidos"
			no-data-text="Nenhum favorecido cadastrado"
			:headers="receiversTableHeaders"
			:items="receivers.response ? receivers.response : []"
			:search="receiversSearch"
			show-select
			:items-per-page="receiversPerPage"
			:height="64 * receiversPerPage"
		>
			<template v-slot:item.name="{ value, item }">
				<span @click="editReceiverModal?.open(item)" style="cursor: pointer;">
					{{ value }}
				</span>
			</template>
			<template v-slot:item.tax_id="{ value }">{{ value ? cpfCnpjMask.masked(value) : '' }}</template>
			<template v-slot:item.bank_code="{ value }"><v-avatar v-if="value" :image="getBankLogo(value)" rounded="lg" size="small" /></template>
			<template v-slot:item.branch="{ value }">{{ value ? branchMask.masked(value) : '' }}</template>
			<template v-slot:item.account="{ value }">{{ value ? accountMask.masked(value) : '' }}</template>
			<template v-slot:item.status="{ value }"><ReceiverStatusComponent :status="value" /></template>

			<template v-slot:bottom>
				<div class="text-center pt-3 pb-5">
					<v-pagination v-model="pageSelected" :length="pageCount"></v-pagination>
				</div>
			</template>
		</v-data-table>
	</AppContentContainerBounds>

	<v-img class="ma-auto" :width="120" cover src="/transfeera-logo-cinza.png"></v-img>

	<CreateReceiverModal ref="createReceiverModal"/>
	<EditReceiverModal ref="editReceiverModal"/>
	<!-- <RequestFeedBackDialog ref="dialogRefExample"/> -->
</template>

<script lang="ts" setup>
import { ref, inject, reactive, computed } from 'vue';
import { AxiosStatic } from 'axios';

import AppContentContainerBounds from '@/layouts/default/AppContentContainerBounds.vue';
import CreateReceiverModal from '@/components/CreateReceiverModal.vue';
import EditReceiverModal from '@/components/EditReceiverModal.vue';
import ReceiverStatusComponent from "@/components/ReceiverStatusComponent.vue";

import Receiver from "@/models/Receiver";
import Requester from "@/utils/Requester";
import { cpfCnpjMask, branchMask, accountMask } from "@/utils/Masks";
import { getBankLogo } from "@/utils/Banks";

const axios = inject('axios') as AxiosStatic;

const receivers = reactive(new Requester<Receiver[]>(axios));

const receiversSearch = ref("");
const selectedReceivers = ref<Receiver[]>([]);
const receiversPerPage = 6;
const pageCount = computed(() => Math.ceil((receivers.response?.length ?? 0) / receiversPerPage));
const pageSelected = ref(1);


const createReceiverModal = ref<HTMLFormElement>();
const editReceiverModal = ref<HTMLFormElement>();

const receiversTableHeaders = [
	{ title: "Favorecido", key: "name" },
	{ title: "CPF / CNPJ", key: "tax_id" },
	{ title: "Banco", key: "bank_code" },
	{ title: "Agência", key: "branch" },
	{ title: "CC", key: "account" },
	{ title: "Status do favorecido", key: "status" },
];

function deleteSelectedReceivers() {
	console.log(selectedReceivers.value);
}

function getReceivers() {
	receivers.request({ method: "get", url: "/receivers" });
}

/* 
const dialogRefExample = ref<HTMLFormElement>();

function feedBackDialogExample() {
	dialogRefExample.value?.changeStateToLoading("loading example...");
	dialogRefExample.value?.open();

	requesterExample.request({
		method: "post",
		url: "urlExample",
		data: { exampleKey: "exampleValue"},
		onSuccess: () => {
			dialogRefExample.value?.changeStateToSuccess("success example!");

			setTimeout(() => {
				dialogRefExample.value?.close();
				
				//After success and conclude code space
			}, 1200);
		},
		onError: () => {
			dialogRefExample.value?.changeStateToError("error example: " + requesterExample.errorMessage);
		}
	});
}
*/

getReceivers();
</script>

<style scoped>
</style>
