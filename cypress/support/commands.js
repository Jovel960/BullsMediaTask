// Adds a custom command to execute a database query using `cy.task`.
Cypress.Commands.add('queryDatabase', (query) => {
  // Sends a task to the Cypress plugin to run a query against the database.
  return cy.task('queryDatabase', query);
});

// Adds a custom command to close the database client connection using `cy.task`.
Cypress.Commands.add('closeClient', () => {
  // Sends a task to the Cypress plugin to close the database connection.
  return cy.task('closeDatabaseClient');
});
