enum PixKeyType {
	email = "email",
	cpf = "cpf",
	cnpj = "cnpj",
	random = "aleatoria"
}

const PixKeyTypeLabels = {
	[PixKeyType.email]: "E-mail",
	[PixKeyType.cpf]: "CPF",
	[PixKeyType.cnpj]: "CNPJ",
	[PixKeyType.random]: "Chave aleatória",
}

export { PixKeyType, PixKeyTypeLabels };