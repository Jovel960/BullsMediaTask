describe("testing the db", () => {
  it("should query the database", () => {
    const query = "SELECT * FROM service_credential_types;";
    cy.queryDatabase(query).then((rows) => {
      expect(rows).to.have.length.greaterThan(0);
    });
  });
});
