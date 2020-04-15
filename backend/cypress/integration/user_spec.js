describe('stories', function() {
  it('has a title', function() {
    cy.visit('/stories');
    cy.get('.title').should('contain', 'first story');
  });
});
