## Set up

1. Clone the the repo using git clone:
   `git clone https://github.com/Jovel960/BullsMediaTask.git`
2. Cd to the root of the project same in windows and linux
3. run - `npm i`
4. At the project root dir create .env file (the file params are listed below the set up instructions)
5. Installing postgresDB:
   5a. **On linux**
   1.Update Package List: sudo apt update
   2.Install PostgreSQL: sudo apt install postgresql postgresql-contrib
   3.Start PostgreSQL Service: sudo systemctl start postgresql
   4.Enable PostgreSQL to Start on Boot: sudo systemctl enable postgresql
   5.Switch to the PostgreSQL User: sudo -i -u postgres
   6.Access the PostgreSQL Prompt: psql
   5b. **On windows**
   1.Download PostgreSQL Installer: https://www.postgresql.org/download/windows/ and run it
   2.Ensure you include the PostgreSQL server, pgAdmin, and command-line tools during the installation.
   3.set up password for postgres
   4.Init the DB and complete the installation
   5.Open postgres UI or work through SQL shell (psql)

## ENV

The .env parameters are:

- USER
- HOST
- DB
- PASSWORD
- PORT

## Flow

- You can just run the test file using `npm run cy:test:db` (for both windows and linux) or create the tables using `npm run createTables` and inject the data using 'npm run inject_data', if you want to change the data that i use during the tests you can change it through `utils/sqlQueryString.js` at injectDataQuery

- If your db is already initiated and you dont want the DB the cleaned up after the tests comment out the 'before' and 'after' hooks in 'cypress/e2e/db/db_test.cy.js'
- If you want to insert more/other data go to 'utils/sqlQueryStrings.js' and change the 'injectDataQuery' value to your query
- The idea behind the before and after hooks is that the DB will not affected by the tests such as new data added and should be in testing db env

There is one main test files:

- db_test - testing the db according to the task

There is one main DB module that is good to use for further development missions
