/// <reference types="cypress" />

context("Create Receivers", () => {

	beforeEach(() => {
		cy.visit("http://localhost:3001/");
		
		//PREVENT FIRST TIME FAIL
		cy.get("#app", { timeout: 30000 })
	});

	it("Delete one 'Nome Teste' receiver via receivers table", () => {

		//FILTER RECEIVER ON THE RECEIVERS TABLE
		cy.get("#filterReceiversField").type("Nome Teste");
		
		//CHECK RECEIVER
		cy.get("#receiversTable").contains("Nome Teste").parent().prev().click();

		//START LISTENING TO DELETE REQUEST
		cy.intercept("DELETE", "**/receivers/*").as("deleteReceiverRequest");

		//CLICK DELETE AND CONFIRM
		cy.get("#deleteSelectedReceiversButton").click();
		cy.get("[name=confirmReceiverDeletion]").click();

		//ASSERT VISUAL FEEDBACK OF REQUEST
		cy.get("[name=requestFeedback]").should("be.visible");

		//VERIFY REQUEST RESPONSE
		cy.wait("@deleteReceiverRequest").its("response.statusCode").should("be.oneOf", [200]);
	});

	it("Delete one 'Nome Teste' receiver via edit modal", () => {

		//FILTER RECEIVER ON THE RECEIVERS TABLE
		cy.get("#filterReceiversField").type("Nome Teste");
		
		//OPEN EDIT FORM
		cy.get("#receiversTable").contains("Nome Teste").click();

		cy.get("#editReceiverModal").within(() => {
			//CLICK DELETE
			cy.get("[name=openDeleteReceiverConfirmation]").click();
		});

		//START LISTENING TO DELETE REQUEST
		cy.intercept("DELETE", "**/receivers/*").as("deleteReceiverRequest");

		//CONFIRM DELETION
		cy.get("[name=confirmReceiverDeletion]").click();

		//ASSERT VISUAL FEEDBACK OF REQUEST
		cy.get("[name=requestFeedback]").should("be.visible");

		//VERIFY REQUEST RESPONSE
		cy.wait("@deleteReceiverRequest").its("response.statusCode").should("be.oneOf", [200]);
	});
})
