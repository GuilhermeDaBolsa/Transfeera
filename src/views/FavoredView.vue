<template>
	<v-tabs model-value="1" bg-color="primary" color="inside-primary" height="58" >
		<AppContentContainerBounds>
			<v-tab value="1">Seus favorecidos</v-tab>
		</AppContentContainerBounds>
	</v-tabs>

	<v-data-table :headers="dessertHeaders" :items="desserts" show-select item-value="name">

		<template v-slot:top>
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
					<v-btn size="x-large" color="red-lighten-1" variant="flat" style="font-size: 16px;">Excluir selecionados</v-btn>
				</AppContentContainerBounds>
			</v-toolbar>
		</template>

	</v-data-table>
</template>

<script lang="ts" setup>
import AppContentContainerBounds from '@/layouts/default/AppContentContainerBounds.vue';

let dessertHeaders = [
	{ title: 'Dessert (100g serving)', align: 'start', sortable: false, key: 'name' },
	{ title: 'Calories', key: 'calories' },
	{ title: 'Fat (g)', key: 'fat' },
	{ title: 'Carbs (g)', key: 'carbs' },
	{ title: 'Protein (g)', key: 'protein' },
	{ title: 'Iron (%)', key: 'iron' },
];
let desserts = [
	{ name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, iron: 1 },
	{ name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, iron: 1 },
	{ name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, iron: 7 },
	{ name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, iron: 8 },
];
</script>
