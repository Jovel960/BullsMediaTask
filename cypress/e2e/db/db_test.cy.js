describe("testing the db", () => {
  it("should query the database", () => {
    //Simple select query
    const query = "SELECT * FROM service_credential_types;";
    //Custom cypress command interacts with the db
    cy.queryDatabase(query).then((rows) => {
      //Check that the 
      expect(rows).to.have.length.greaterThan(0);
    });
  });


  after(() => {
    cy.closeClient()
  })
});
