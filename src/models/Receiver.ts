import ReceiverStatus from "@/models/ReceiverStatus";
import { cpfCnpjMask } from "@/utils/Masks";

export type Receiver = {
	id: string,
	name: string,
	email: string,
	tax_id: string,
	branch?: string,
	account?: string,
	account_type?: string,
	bank_name?: string,
	bank_code?: string,
	pix_key: string,
	pix_key_type: string,
	status: ReceiverStatus,
	created_at?: string,
	updated_at?: string
}

export function isSameReceiver(r1: Receiver, r2: Receiver) {
	return r1.name == r2.name &&
		r1.email == r2.email &&
		cpfCnpjMask.unmasked(r1.tax_id) == cpfCnpjMask.unmasked(r2.tax_id) &&
		r1.pix_key_type == r2.pix_key_type &&
		r1.pix_key == r2.pix_key;
}