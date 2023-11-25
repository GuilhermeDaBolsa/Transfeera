import ReceiverStatus from "@/models/ReceiverStatus";
import SketchReceiver from "@/models/SketchReceiver";
import { cpfCnpjMask } from "@/utils/Masks";

class Receiver{
	constructor(
		public id: string,
		public name: string,
		public email: string,
		public tax_id: string,
		public branch: string,
		public account: string,
		public account_type: string,
		public bank_name: string,
		public bank_code: string,
		public pix_key: string,
		public pix_key_type: string,
		public status: ReceiverStatus,
		public created_at: string,
		public updated_at: string
	){}

	public static isSameReceiver(r1: Receiver, r2: SketchReceiver) {
		return r1.name == r2.name &&
			r1.email == r2.email &&
			cpfCnpjMask.unmasked(r1.tax_id) == cpfCnpjMask.unmasked(r2.tax_id) &&
			r1.pix_key_type == r2.pix_key_type &&
			r1.pix_key == r2.pix_key;
	}
}

export default Receiver;