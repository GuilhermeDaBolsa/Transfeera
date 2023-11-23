import { cpf, cnpj } from 'cpf-cnpj-validator'; 

function isValidCpf(value: string) {
	return cpf.isValid(value);
}

function isValidCnpj(value: string) {
	return cnpj.isValid(value);
}

function isValidEmail(value: string) {
	return /^\S+@\S+\.\S+$/.test(value);
}

export { isValidCpf, isValidCnpj, isValidEmail };