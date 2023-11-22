<template>
	<v-tabs model-value="1" bg-color="primary" color="inside-primary" height="58" >
		<AppContentContainerBounds>
			<v-tab value="1">Seus favorecidos</v-tab>
		</AppContentContainerBounds>
	</v-tabs>

	<v-toolbar flat height="120">
		<AppContentContainerBounds>
			<div class="d-flex align-center" style="width: 100%;">
				<div style="font-size: 28px; font-weight: 300; color: grey;">Seus favorecidos</div>
				<v-btn class="ml-2" color="primary" variant="flat" icon size="44">
					<v-icon color="inside-primary" size="38">mdi-plus</v-icon>
				</v-btn>

				<v-spacer />

				<v-text-field
					placeholder="Nome, CPF, agência ou conta"
					variant="solo"
					density="compact"
					append-inner-icon="mdi-magnify"
					flat
					hide-details
					style="max-width: 380px;"
					@click:append-inner="()=>{}"
				/>
			</div>
		</AppContentContainerBounds>
	</v-toolbar>

	<v-toolbar color="background" flat height="120">
		<AppContentContainerBounds>
			<v-btn size="x-large" color="red-lighten-1" variant="flat" :disabled="selectedReceivers.length == 0" style="font-size: 16px;">
				Excluir selecionados
			</v-btn>
		</AppContentContainerBounds>
	</v-toolbar>

	<AppContentContainerBounds>
		<v-data-table
			v-model="selectedReceivers"
			:headers="receiversTableHeaders"
			:items="receivers" show-select
			items-per-page="7"
			height="420"
		>
			<template v-slot:item.tax_id="{ value }">{{ value ? tax_idMask.masked(value) : '' }}</template>
			<template v-slot:item.branch="{ value }">{{ value ? branchMask.masked(value) : '' }}</template>
			<template v-slot:item.account="{ value }">{{ value ? accountMask.masked(value) : '' }}</template>

			<template v-slot:item.status="{ value }">
				<v-chip
					class="justify-center"
					:color="value == ReceiverStatus.validated ? '#3d8cd8' : '#72818d'"
					variant="flat"
					style="width: 100%;
					text-transform: capitalize;"
				>
					{{ value }}
				</v-chip>
			</template>
		</v-data-table>
	</AppContentContainerBounds>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { Mask } from "maska"

import AppContentContainerBounds from '@/layouts/default/AppContentContainerBounds.vue';
import Receiver from "@/models/Receiver";
import ReceiverStatus from "@/models/ReceiverStatus";

/* TODO see axios instance injection and its type */
const axios = inject('axios');

const tax_idMask = new Mask({ mask: ['###.###.###-##', '##.###.###/####-##'] });
const branchMask = new Mask({ mask: ['####', '####-#', '####-##'] });
const accountMask = new Mask({ mask: ['#####-#', '######-#', '#######-#', '########-#', '#########-#', '###########-#'] });

/* TODO get REQUESTER AND FEEDBACKDIALOG (obs: make loading, error, etc... states) */
const receivers = ref<Receiver[]>([]);
const selectedReceivers = ref<Receiver[]>([]);

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
	axios
		.get<Receiver[]>("http://localhost:3000/receivers")
		.then(response => {
			receivers.value = response.data
		})
}

getReceivers();
</script>
