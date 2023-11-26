/// <reference types="cypress" />

context("Create Receivers", () => {

	beforeEach(() => {
		cy.visit("http://localhost:3001/");
		
		//PREVENT FIRST TIME FAIL
		cy.get("#app", { timeout: 30000 })
	});

	it("Edit pix key of 'Nome Teste' sketch receiver", () => {

		//FILTER RECEIVER ON THE RECEIVERS TABLE
		cy.get("#filterReceiversField").type("Nome Teste");

		//OPEN EDIT FORM
		cy.get("#receiversTable").contains("Nome Teste").click();

		//EDIT PIX KEY
		cy.get("#editReceiverModal").within(() => {

			const randomPixKey = Math.random() + "-" + Date.now() + "-" + Math.random();

			cy.get("[name=receiverPixKeyField]").clear()
				.type(randomPixKey).should("have.value", randomPixKey);

			//START LISTENING TO EDIT REQUEST
			cy.intercept("PUT", "**/receivers/*").as("editReceiverRequest");
	
			//CLICK ON SAVE
			cy.get("[name=saveReceiver]").click();
		})

		//ASSERT VISUAL FEEDBACK OF REQUEST
		cy.get("[name=requestFeedback]").should("be.visible");

		//VERIFY REQUEST RESPONSE
		cy.wait("@editReceiverRequest").its("response.statusCode").should("be.oneOf", [200]);
	});

	it("Edit email of 'Guilherme Santos' valid receiver", () => {

		//FILTER RECEIVER ON THE RECEIVERS TABLE
		cy.get("#filterReceiversField").type("Guilherme Santos");

		//OPEN EDIT FORM
		cy.get("#receiversTable").contains("Guilherme Santos").click();

		//EDIT EMAIL
		cy.get("#editReceiverModal").within(() => {

			const randomemail = Math.random() + "-" + Date.now() + "@hotmail.com";

			cy.get("[name=receiverEmailField]").clear()
				.type(randomemail).should("have.value", randomemail);

			//START LISTENING TO EDIT REQUEST
			cy.intercept("PUT", "**/receivers/*").as("editReceiverRequest");
	
			//CLICK ON SAVE
			cy.get("[name=saveReceiver]").click();
		})

		//ASSERT VISUAL FEEDBACK OF REQUEST
		cy.get("[name=requestFeedback]").should("be.visible");

		//VERIFY REQUEST RESPONSE
		cy.wait("@editReceiverRequest").its("response.statusCode").should("be.oneOf", [200]);
	});
});
