describe("Testing the db", () => {
  //An option to create new cypress task that initiallize the db in case its empty  and add a cleanup function to the after hook
  // before(() => {})

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
    const query = `select affiliate_network_offers.offer_tracking_link, affiliate_network_offer_by_services.offer_country
      from affiliate_network_offers 
      join affiliate_network_offer_by_services
      on affiliate_network_offers.offer_id = affiliate_network_offer_by_services.offer_id
      where affiliate_network_offers.service_credential_type_id = 5;`;
    cy.queryDatabase(query).then((rows) => {
      //Iterating over the results to assert that the market values equals to the offer country values using upperCase in both in case
      rows.forEach((row) => {
        //Creating new URL object to get an access to the query string
        const url = new URL(row.offer_tracking_link);
        //Access the market param
        const marketParam = url.searchParams.get("market");
        //Assert that the values of market and country are equal
        expect(marketParam.toUpperCase()).to.equal(
          row.offer_country.countries[0].toUpperCase()
        );
      });
    });
  });

  it("Second test", () => {
    //A select query to fetch the tracking links and offer_id from  affiliate_network_offers that match only where service_credential_type_id = 6
    const query = `
      SELECT 
        offer_id,
        offer_tracking_link
      FROM 
        affiliate_network_offers 
      WHERE 
        service_credential_type_id = 6
    `;
    //Peform a query to the DB
    cy.task("queryDatabase", query).then((rows) => {
      //Creating new Set to insure that only one unique val exists
      const wprogramIds = new Set();

      rows.forEach((row) => {
        //Creating new URL object to get an access to the query string
        const url = new URL(row.offer_tracking_link);
        //Access the wprogramid param
        const wprogramid = url.searchParams.get("wprogramid");
        //Assert wprogramid is eq to offer id
        expect(wprogramid).to.equal(row.offer_id.toString());
        //Checking if wprogramid value is unique
        expect(wprogramIds.has(wprogramid)).to.be.false;
        //Adding its value to the set object
        wprogramIds.add(wprogramid);
      });
    });
  });

  it("Third test", () => {
    //Query to get the service_credential_id and offer_status wrapped in array where the values are distinct and group them by the id so we can know which 
    //status each id has 
    const query = `
      select 
        service_credential_id, 
        array_agg(DISTINCT offer_status) as statuses
      from 
        affiliate_network_offer_by_services
      group by
        service_credential_id
    `;

    cy.task("queryDatabase", query).then((rows) => {
      rows.forEach((row) => {
        //Extract the statuses array
        const statuses = row.statuses;
        //Iterate over each value to check the status
        const hasOnlyNewOrDeactivated = statuses.every(
          (status) => status === "new" || status === "deactivated"
        );
         // Assert that no account should have only 'new' or 'deactivated' statuses
         // The test expects this condition to be false
        expect(hasOnlyNewOrDeactivated).to.be.false;
      });
    });
  });

  after(() => {
    cy.closeClient();
  });
});
