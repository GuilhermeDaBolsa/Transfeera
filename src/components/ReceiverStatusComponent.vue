<template>
	<v-chip
		class="justify-center"
		:color="status == ReceiverStatus.validated ? 'valid' : '#72818d'"
		variant="flat"
		style="width: 100%;
		text-transform: capitalize;"
	>
		{{ status }}
	</v-chip>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import ReceiverStatus from '@/models/ReceiverStatus';

defineProps({
	status: String as PropType<ReceiverStatus>
})
</script>

<style></style>
