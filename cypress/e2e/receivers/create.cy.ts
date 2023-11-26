/// <reference types="cypress" />

context("Create Receivers", () => {

	beforeEach(() => {
		cy.visit("http://localhost:3001/");
		
		//PREVENT FIRST TIME FAIL
		cy.get("#app", { timeout: 30000 })
	});

	it("Create new sketch PF receiver", () => {
		//OPEN RECEIVER FORM
		cy.get("#createSketchReceiverLabelAndButton").click();
		
		//FILL FORM WITH FAKE RECEIVER INFORMATION
		cy.get("#createReceiverModal").within(() => {
			cy.get("[name=receiverNameField]").type("Nome Teste").should("have.value", "Nome Teste");
			cy.get("[name=receiverCpfCnpjField]").type("28150344098").should("have.value", "281.503.440-98");
			cy.get("[name=receiverEmailField]").type("email_teste@hotmail.com").should("have.value", "email_teste@hotmail.com");
	
			cy.get('[name=receiverPixKeyTypeSelect]').parent().type("Chave aleatória{enter}{esc}");
			cy.get("[name=receiverPixKeyTypeSelect]").should("have.value", "aleatoria");
			cy.get("[name=receiverPixKeyField]").type("pix_chave_teste").should("have.value", "pix_chave_teste");

			//START LISTENING TO SAVE REQUEST
			cy.intercept("POST", "**/receivers").as("saveReceiverRequest");
	
			//CLICK ON SAVE
			cy.get("[name=saveReceiver]").click();
		})

		//ASSERT VISUAL FEEDBACK OF REQUEST
		cy.get("[name=requestFeedback]").should("be.visible");

		//VERIFY REQUEST RESPONSE
		cy.wait("@saveReceiverRequest").its("response.statusCode").should("be.oneOf", [200, 201]);
	});

	it("Create new sketch PJ receiver", () => {
		//OPEN RECEIVER FORM
		cy.get("#createSketchReceiverLabelAndButton").click();
		
		//FILL FORM WITH FAKE RECEIVER INFORMATION
		cy.get("#createReceiverModal").within(() => {
			cy.get("[name=receiverNameField]").type("Nome Teste").should("have.value", "Nome Teste");
			cy.get("[name=receiverCpfCnpjField]").type("18536934000108").should("have.value", "18.536.934/0001-08");
			cy.get("[name=receiverEmailField]").type("email_teste@hotmail.com").should("have.value", "email_teste@hotmail.com");
	
			cy.get('[name=receiverPixKeyTypeSelect]').parent().type("CNPJ{enter}{esc}");
			cy.get("[name=receiverPixKeyTypeSelect]").should("have.value", "cnpj");
			cy.get("[name=receiverPixKeyField]").type("18536934000108").should("have.value", "18536934000108");

			//START LISTENING TO SAVE REQUEST
			cy.intercept("POST", "**/receivers").as("saveReceiverRequest");
	
			//CLICK ON SAVE
			cy.get("[name=saveReceiver]").click();
		})

		//ASSERT VISUAL FEEDBACK OF REQUEST
		cy.get("[name=requestFeedback]").should("be.visible");

		//VERIFY REQUEST RESPONSE
		cy.wait("@saveReceiverRequest").its("response.statusCode").should("be.oneOf", [200, 201]);
	});
})
