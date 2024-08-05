const { getClient } = require("./db");

async function removeTables() {
  const client = await getClient();

  const injectDataQuery = `
  drop table affiliate_network_offer_by_services;
  drop table affiliate_network_offers;
  drop table service_credentials;
  drop table service_credential_types;
  `;
  //wrapping the interaction with the db with try catch block
  try {
    //Perform db query
    await client.query(injectDataQuery);
    console.log("Tables removed successfully!");
  } catch (err) {
    console.error("Error removing data:", err);
  } finally {
    await client.end();
  }
}

removeTables();
