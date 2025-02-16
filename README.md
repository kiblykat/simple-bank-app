# 💳 Simple Banking System

## Preamble

This project implements a simple banking application utilizing a single-page web application GUI. The application should be capable of 3 main features:

- depositing an amount
- withdrawing an amount
- printing account statement

I have structured this app so that a Navbar is available for easy navigation. The app starts with user being Logged Out. Simply click "LOG IN" on the top right to update the logged in state. No actual API is called for updating this state. <b>Depositing</b> and <b>Withdrawing</b> are done through the <u>Transfer</u> tab. <b>Printing account statements</b> is done through the <u>Statement</u> tab. I have ensured that the design is responsive for mobile screens as well, with an adaptive UI.

The github repository can be found here: https://github.com/kiblykat/zenika-client-final.

## Setup Instructions

### Running the program

1. Ensure nodejs is installed on your system: https://nodejs.org/en/download
2. Clone the repository from https://github.com/kiblykat/zenika-client-final.
3. Once cloned, open the command line in the folder -> run "npm i" on cmd line -> downloads the relevant dependencies and generates the /node_modules folder
4. run "npm run dev" to start the development mode. By default, the vite server will run on http://localhost:5173/

### Testing

Ensure relevant dependencies are already downloaded from above (type "npm i" in terminal)

1. To run the unit tests, simply type "npm run test". The unit tests will appear in the terminal.
2. Type "npm run coverage" to have a more descriptive overview of the unit tests. A /coverage folder will be generated.
3. Go into /coverage -> click index.html to access a web UI of the coverage.
4. To run integration tests, first ensure dev environment is running. type "npm run dev" in terminal
5. Next, type "npx cypress open" to start the cypress GUI
6. A GUI will pop-up, click "E2E testing" -> "Chrome" -> "Start E2E Testing in Chrome"
7. A chrome browser will popup with the cypress environment
8. Under the current "Specs" tab, you will see printStatement.cy.ts and TransferMoney.cy.ts - which corresponds to the two integration tests created mimicing user interaction.
9. Click on either one of these to start the integration test.

## Tech Stack

- Frontend: Node.js, React, TypeScript
- Styling: Tailwind + DaisyUI (+fontawesome for icons)
- Testing: Vitest, Cypress
