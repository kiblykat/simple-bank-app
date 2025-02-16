# 💳 Simple Banking System

## Preamble

This project implements a simple banking application utilizing a single-page web application GUI. The application should be capable of 3 main features:

- depositing an amount
- withdrawing an amount
- printing account statement

I have structured this app so that a Navbar is available for easy navigation. <b>Depositing</b> and <b>Withdrawing</b> are done through the <u>Transfer</u> tab. <b>Printing account statements</b> is done through the <u>Statement</u> tab. I have ensured that the design is responsive for mobile screens as well, with an adaptive UI.

The github repository can be found here: https://github.com/kiblykat/zenika-client-final.

## Setup Instructions

### Running the program

1. Ensure nodejs is installed on your system: https://nodejs.org/en/download
2. Clone the repository from https://github.com/kiblykat/zenika-client-final.
3. Open command line, run "npm i" to download the relevant dependencies and generate the /node_modules folder
4. run "npm run dev" to start the development mode. By default, the vite server will run on http://localhost:5173/

### Testing

Ensure relevant dependencies are already downloaded from above (type "npm i" in terminal)

1. To run the unit tests, type "npm run test"
2. To run integration tests, first ensure dev environment is running. type "npm run dev" in terminal
3. Next, type "npx cypress open" to start the cypress GUI
4. A GUI will pop-up, click "E2E testing" -> "Chrome" -> "Start E2E Testing in Chrome"
5. A chrome browser will popup with the cypress environment
6. Under the current "Specs" tab, you will see printStatement.cy.ts and TransferMoney.cy.ts - which corresponds to the two integration tests created mimicing user interaction.
7. Click on either one of these to start the integration test.

## Tech Stack

- Frontend: Node.js, React, TypeScript
- Styling: Tailwind + DaisyUI (+fontawesome for icons)
- Testing: Vitest, Cypress
