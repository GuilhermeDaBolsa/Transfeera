class SketchReceiver{
	constructor(
		public name: string,
		public email: string,
		public tax_id: string,
		public pix_key: string,
		public pix_key_type: string | null,
	){}
}

export default SketchReceiver;