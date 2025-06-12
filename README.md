# Ethereum Balance Summary Script

This script takes an Ethereum address as an argument and outputs a CSV file with basic summary metadata. It uses the Etherscan API to retrieve:

- Balance (ETH)
- Transaction count
- Latest block number
- Timestamp

The CSV file is saved as `output.csv` and includes Balance, Transaction count, Latest block number, and Timestamp.

## Setup

1. Clone the repository or download the script.

2. Open the `index.js` file and **replace** the placeholder API key with your own Etherscan API key:
   ```javascript
   const API_KEY = 'YourEtherscanAPIKey';
   ```
   You can obtain an API key for free at [Etherscan.io](https://etherscan.io/apis).

3. Ensure you’re using a compatible Node.js version (tested on Node.js **v18+**).

## Usage

Run the script using Node:

```bash
node index.js <ETH_ADDRESS>
```

Example:

```bash
node index.js 0x111d23Dc4434C1322925a3c844Ce454e4438f44f
```

## Notes

- The output CSV file (`output.csv`) is ignored by `.gitignore`.
- No external dependencies are used.
- Make sure your Node.js version is at least 18 to support the built-in `fetch` API.

