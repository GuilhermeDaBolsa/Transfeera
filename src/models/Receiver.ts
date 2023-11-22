import ReceiverStatus from "./ReceiverStatus";

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
}

export default Receiver;