const { getClient } = require("./db");

async function injectData() {
  const client = await getClient();

  const injectDataQuery = `
INSERT INTO service_credential_types (id, created_at, updated_at, short_name)
VALUES
(1, '2023-01-01 10:00:00', '2023-01-01 10:00:00', 'API Key'),
(2, '2023-01-02 11:00:00', '2023-01-02 11:00:00', 'OAuth Token');

INSERT INTO service_credentials (id, name, service_credential_type_id, credentials, status, created_at)
VALUES
(1, 'Credential1', 1, '{"api_key": "abc123"}', TRUE, '2023-02-01 12:00:00'),
(2, 'Credential2', 2, '{"oauth_token": "def456"}', TRUE, '2023-02-02 13:00:00');

INSERT INTO affiliate_network_offers (id, offer_id, service_credential_type_id, offer_name, offer_description, offer_currency, offer_tracking_link, created_at, updated_at, offer_domain, available_affiliate_networkd)
VALUES
(1, 'offer001', 1, 'Offer 1', 'First offer description', 'USD', 'https://ields.net/redirect?pubId=123&market=us&target=noj0.com&serrvId=789', '2023-03-01 14:00:00', '2023-03-01 14:00:00', '{"domains": ["noj0.com"]}', 'Network1'),
(2, 'offer002', 2, 'Offer 2', 'Second offer description', 'EUR', 'https://ields.net/redirect?pubId=456&market=us&target=noj0.com&serrvId=012', '2023-03-02 15:00:00', '2023-03-02 15:00:00', '{"domains": ["noj0.com"]}', 'Network2');


INSERT INTO affiliate_network_offer_by_services (id, offer_id, service_credential_id, offer_status, last_activation_date, last_deactivation_date, service_action, created_at, updated_at, offer_country)
VALUES
(1, 'offer001', 1, 'Active', '2023-04-01 16:00:00', NULL, TRUE, '2023-04-01 16:00:00', '2023-04-01 16:00:00', '{"countries": ["US"]}'),
(2, 'offer002', 2, 'Inactive', NULL, '2023-04-02 17:00:00', FALSE, '2023-04-02 17:00:00', '2023-04-02 17:00:00', '{"countries": ["DE"]}');
  `;
  //wrapping the interaction with the db with try catch block
  try {
    //Perform db query
    await client.query(injectDataQuery);
    console.log("Data injected successfully!");
  } catch (err) {
    console.error("Error injecting data:", err);
  } finally {
    await client.end();
  }
}

injectData();
