const { getClient } = require("./db");

async function createTables() {
  //Getting the DB instance
  const client = await getClient();

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS service_credentialns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250),
    service_credentil_type_id INT,
    credentials JSON,
    status BOOLEAN,
    created_at TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS affiliate_network_offer_by_services (
    id SERIAL PRIMARY KEY,
    offer_id VARCHAR(250),
    service_credential_id INT,
    offer_status VARCHAR(250),
    last_activation_date TIMESTAMP,
    last_deactivation_date TIMESTAMP,
    service_action BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    offer_country JSON
    );

    CREATE TABLE IF NOT EXISTS affiliate_network_offers (
    id SERIAL PRIMARY KEY,
    offer_id VARCHAR(250),
    service_credential_type_id INT,
    offer_name VARCHAR(250),
    offer_description VARCHAR(250),
    offer_currency VARCHAR(250),
    offer_tracking_link VARCHAR(250),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    offer_domain JSON,
    available_affiliate_networkd VARCHAR(250)
    );

    CREATE TABLE IF NOT EXISTS service_credential_types (
    id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    short_name VARCHAR(250)
    );
  `;
  //wrapping the interaction with the db with try catch blok
  try {
    //Perform db query
    await client.query(createTableQuery);
    console.log("🚀 Tables created successfully! 🚀");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await client.end();
  }
}

createTables();
