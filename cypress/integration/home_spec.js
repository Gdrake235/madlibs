describe('Home Page', function(){
  it('has a title', function(){
    cy.visit('/');
    cy.get('body').contains("madlibs");
  })
})