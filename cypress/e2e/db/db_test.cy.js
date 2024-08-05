describe("Testing the db", () => {
  it("Should query the database", () => {
    //Simple select query
    const query = `select * from service_credential_types;`;
    //Custom cypress command interacts with the db
    cy.queryDatabase(query).then((rows) => {
      //Check that the
      expect(rows).to.have.length.greaterThan(0);
    });
  });

  it("First test", () => {
    //A select query to fetch the link and offer country from both tables using inner join
    const query =
      `select affiliate_network_offers.offer_tracking_link, affiliate_network_offer_by_services.offer_country
      from affiliate_network_offers 
      join affiliate_network_offer_by_services
      on affiliate_network_offers.offer_id = affiliate_network_offer_by_services.offer_id
      where affiliate_network_offers.service_credential_type_id = 5;`;
    cy.queryDatabase(query).then((rows) => {
      //Iterating over the results to assert that the market values equals to the offer country values using upperCase in both in case 
      rows.forEach(row => {
        const url = new URL(row.offer_tracking_link);
        const marketParam = url.searchParams.get('market');
        expect(marketParam.toUpperCase()).to.equal(row.offer_country.countries[0].toUpperCase());
      });
    });
  });


 it('Second test', () => {
    const query = `
      SELECT 
        offer_id,
        offer_traCking_link
      FROM 
        affiliate_network_offers 
      WHERE 
        service_credential_type_id = 6
    `;

    cy.task('queryDatabase', query).then((rows) => {
      const wprogramIds = new Set();

      rows.forEach(row => {
        const url = new URL(row.offer_tracking_link);
        const wprogramid = url.searchParams.get('wprogramid');
        expect(wprogramid).to.equal(row.offer_id.toString());
        expect(wprogramIds.has(wprogramid)).to.be.false;
        wprogramIds.add(wprogramid);
      });
    });
  });


  after(() => {
    cy.closeClient();
  });
});
