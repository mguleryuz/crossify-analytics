# Crossify Analytics

Crossify Analytics is a web application that provides data analytics for Crossify, a crosschain cryptocurrency payment system. This project aims to gather, process, and visualize data from the Crossify platform, delivering valuable insights for investors, users, and developers alike.

Crossify offers a unique cross-chain payment and gateway system, simplifying the process of receiving payments in different tokens, regardless of the seller's preferred token. Alongside, it also provides checkout links for an easy payment page, data analytics via receipts, and plugins for e-commerce and accounting software.

## Setting Up The Project Locally

1. Clone the repository: 

    ```bash
    git clone https://github.com/crossifyxyz/crossify-analytics.git
    ```

2. Navigate into the directory:

    ```bash
    cd crossify-analytics
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Copy the `.env.example` file to a new file named `.env`:

    ```bash
    cp .env.example .env
    ```

5. Open the `.env` file and replace the placeholders with your actual values:

    ```
    NEXT_PUBLIC_ENV=development
    NEXT_PUBLIC_ALCHEMY_API_KEY=<your-api-key>
    MONGO_URI=<your-mongodb-uri>
    ```

6. Start the local development server:

    ```bash
    npm run dev
    ```

7. Open [http://localhost:3000](http://localhost:3000) to see the application in your browser.
