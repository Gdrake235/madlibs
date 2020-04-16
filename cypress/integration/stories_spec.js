describe("Stories", function() {
  it('allow user to choose a title', function(){
    cy.visit('/stories');
    cy.get('.title').contains('First Story');
  }); 
  it('allows user to create a story', function(){
    cy.visit('/stories');
    cy.contains('First Story').click(); 
    cy.get('body').contains('fill out the form');
  }); 
  it('allows user to see end story', function() {
    cy.visit('/stories');
    cy.contains('First Story').click();
    cy.get('form').find('[name="noun 1"] ').type('man');
    cy.get('form').find('[name="noun 2"] ').type('mockingbird');
    cy.get('form').find('[name="verb"] ').type('feeds');
    cy.contains('submit').click();
    cy.get('body').contains("man feeds a mockingbird")
  });
})