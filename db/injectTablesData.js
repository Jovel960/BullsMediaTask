const { getClient } = require("./db");

async function injectData() {
  const client = await getClient();

  const injectDataQuery = `
INSERT INTO service_credential_types (created_at, updated_at, short_name)
VALUES
('2023-01-01 10:00:00', '2023-01-01 10:00:00', 'API Key'),
('2023-01-02 11:00:00', '2023-01-02 11:00:00', 'OAuth Token'),
('2023-01-03 12:00:00', '2023-01-03 12:00:00', 'Access Token'),
('2023-01-04 13:00:00', '2023-01-04 13:00:00', 'JWT'),
('2023-01-05 14:00:00', '2023-01-05 14:00:00', 'Basic Auth'),
('2023-01-06 15:00:00', '2023-01-06 15:00:00', 'Special Token');

INSERT INTO service_credentials (name, service_credential_type_id, credentials, status, created_at)
VALUES
('Credential1', 1, '{"api_key": "abc123"}', TRUE, '2023-02-01 12:00:00'),
('Credential2', 2, '{"oauth_token": "def456"}', TRUE, '2023-02-02 13:00:00'),
('Credential3', 3, '{"access_token": "ghi789"}', TRUE, '2023-02-03 14:00:00'),
('Credential4', 4, '{"jwt": "jkl012"}', TRUE, '2023-02-04 15:00:00'),
('Credential5', 5, '{"username": "user", "password": "pass"}', TRUE, '2023-02-05 16:00:00'),
('Credential6', 6, '{"special_key": "xyz123"}', TRUE, '2023-02-06 17:00:00');

INSERT INTO affiliate_network_offers (offer_id, service_credential_type_id, offer_name, offer_description, offer_currency, offer_tracking_link, created_at, updated_at, offer_domain, available_affiliate_networkd)
VALUES
('001', 1, 'Offer 1', 'First offer description', 'USD', 'https://ields.net/redirect?pubId=123&market=us&target=noj0.com&serrvId=789', '2023-03-01 14:00:00', '2023-03-01 14:00:00', '{"domains": ["ields.net"]}', 'Network1'),
('002', 2, 'Offer 2', 'Second offer description', 'EUR', 'https://ields.net/redirect?pubId=456&market=us&target=noj0.com&serrvId=012', '2023-03-02 15:00:00', '2023-03-02 15:00:00', '{"domains": ["ields.net"]}', 'Network2'),
('003', 3, 'Offer 3', 'Third offer description', 'GBP', 'https://ields.net/redirect?pubId=789&market=uk&target=example.com&serrvId=345', '2023-03-03 16:00:00', '2023-03-03 16:00:00', '{"domains": ["ields.net"]}', 'Network3'),
('004', 4, 'Offer 4', 'Fourth offer description', 'CAD', 'https://ields.net/redirect?pubId=012&market=ca&target=sample.com&serrvId=678', '2023-03-04 17:00:00', '2023-03-04 17:00:00', '{"domains": ["ields.net"]}', 'Network4'),
('005', 5, 'Offer 5', 'Fifth offer description', 'AUD', 'https://ields.net/redirect?pubId=345&market=au&target=test.com&serrvId=901', '2023-03-05 18:00:00', '2023-03-05 18:00:00', '{"domains": ["ields.net"]}', 'Network5'),
('006', 6, 'Offer 6', 'Sixth offer description', 'USD', 'https://example.com?waignid=0001&wprogramid=006&clickId=1', '2024-01-01 10:00:00', '2024-01-01 10:00:00', '{"domains": ["example.com"]}', 'NetworkA'),
('007', 6, 'Offer 7', 'Seventh offer description', 'EUR', 'https://example.com?waignid=0002&wprogramid=007&clickId=2', '2024-01-01 10:00:00', '2024-01-01 10:00:00', '{"domains": ["example.com"]}', 'NetworkB'),
('008', 6, 'Offer 8', 'Eighth offer description', 'GBP', 'https://example.com?waignid=0003&wprogramid=008&clickId=3', '2024-02-01 11:00:00', '2024-02-01 11:00:00', '{"domains": ["example.com"]}', 'NetworkC');

INSERT INTO affiliate_network_offer_by_services (offer_id, service_credential_id, offer_status, last_activation_date, last_deactivation_date, service_action, created_at, updated_at, offer_country)
VALUES
('001', 1, 'Active', '2023-04-01 16:00:00', '2023-04-01 16:00:00', TRUE, '2023-04-01 16:00:00', '2023-04-01 16:00:00', '{"countries": ["US"]}'),
('002', 2, 'New', '2023-04-02 17:00:00', '2023-04-02 17:00:00', FALSE, '2023-04-02 17:00:00', '2023-04-02 17:00:00', '{"countries": ["DE"]}'),
('003', 3, 'Active', '2023-04-03 18:00:00', '2023-04-03 18:00:00', TRUE, '2023-04-03 18:00:00', '2023-04-03 18:00:00', '{"countries": ["GB"]}'),
('004', 4, 'New', '2023-04-04 19:00:00', '2023-04-04 19:00:00', FALSE, '2023-04-04 19:00:00', '2023-04-04 19:00:00', '{"countries": ["CA"]}'),
('005', 5, 'Deactivated', '2023-04-05 20:00:00', '2023-04-05 20:00:00', TRUE, '2023-04-05 20:00:00', '2023-04-05 20:00:00', '{"countries": ["AU"]}'),
('006', 6, 'Active', '2024-01-01 10:00:00', '2024-01-01 10:00:00', TRUE, '2024-01-01 10:00:00', '2024-01-01 10:00:00', NULL),
('007', 6, 'New', '2024-01-01 10:00:00', '2024-01-01 10:00:00', FALSE, '2024-01-01 10:00:00', '2024-01-01 10:00:00', NULL),
('008', 6, 'Active', '2024-02-01 11:00:00', '2024-02-01 11:00:00', TRUE, '2024-02-01 11:00:00', '2024-02-01 11:00:00', NULL);
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
