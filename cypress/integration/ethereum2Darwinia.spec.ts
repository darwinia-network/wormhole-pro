/// <reference types="cypress" />

describe('Ethereum to Darwinia', () => {
  const { pangolin: recipient, ropsten: sender } = Cypress.env('accounts');
  const TX_TIME_OUT = 2 * 60 * 1000;

  before(() => {
    cy.activeMetamask();
  });

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + '/#fm%3Dnative%26tm%3Dnative%26f%3Dropsten%26t%3Dpangolin');
    cy.waitForReact();
  });

  it('should launch ring tx', () => {
    cy.react('RecipientItem').find('input').type(recipient);

    cy.get('span')
      .contains('Cross-chain Fee')
      .then(() => {
        cy.react('Balance').type('3.14');
      });

    cy.react('SubmitButton').click();

    cy.get('.ant-modal-confirm-content .ant-typography').contains('Ropsten');
    cy.get('.ant-modal-confirm-content .ant-typography').contains('Pangolin');
    cy.get('.ant-modal-confirm-content .ant-typography').contains(sender);
    cy.get('.ant-modal-confirm-content .ant-typography').contains(recipient);
    cy.get('.ant-modal-confirm-content .ant-typography').contains('1.14');

    cy.get('.ant-modal-confirm-btns button').contains('Confirm').click();

    cy.wait(5000);
    cy.confirmMetamaskTransaction();

    cy.get('.ant-modal-confirm-content', { timeout: TX_TIME_OUT })
      .find('a')
      .should('have.text', 'View in Etherscan explorer');
  });

  it('should launch kton tx', () => {
    cy.react('RecipientItem').find('input').type(recipient);
    cy.react('Select', { props: { placeholder: 'Select Assets' } })
      .click()
      .then(() => {
        cy.get('.ant-select-item-option-content').contains('KTON').click();
      });
    cy.react('Balance').type('1.234');

    cy.react('SubmitButton').click();

    cy.get('.ant-modal-confirm-content .ant-typography').contains('Ropsten');
    cy.get('.ant-modal-confirm-content .ant-typography').contains('Pangolin');
    cy.get('.ant-modal-confirm-content .ant-typography').contains(sender);
    cy.get('.ant-modal-confirm-content .ant-typography').contains(recipient);
    cy.get('.ant-modal-confirm-content .ant-typography').contains('1.234');

    cy.get('.ant-modal-confirm-btns button').contains('Confirm').click();

    cy.wait(5000);
    cy.confirmMetamaskTransaction();

    cy.get('.ant-modal-confirm-content', { timeout: TX_TIME_OUT })
      .find('a')
      .should('have.text', 'View in Etherscan explorer');
  });
});
