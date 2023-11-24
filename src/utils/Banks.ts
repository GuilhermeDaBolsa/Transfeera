//this registers would probably be on a database... this file only exists because it is not :)
const fakeBankRegisters = [
	{ bank_code: "001", bank_name: "Banco do Brasil", logo: "/public/banks/banco-do-brasil-logo.png" },
	{ bank_code: "033", bank_name: "Santander", logo: "/public/banks/santander-logo.png" },
	{ bank_code: "260", bank_name: "Nubank", logo: "/public/banks/nubank-logo.png" },
	{ bank_code: "341", bank_name: "Itaú", logo: "/public/banks/itau-logo.png" },
]

function getBankLogo(bank_code: string) {
	const bank = fakeBankRegisters.find(bank => bank.bank_code == bank_code);

	if(!bank)
		return "/public/banks/generic-logo.png";

	return bank.logo;
}

export { getBankLogo };