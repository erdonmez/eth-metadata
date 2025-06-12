# Ethereum Balance Summary Script

This script takes an Ethereum address as an argument and outputs a CSV file with basic summary metadata. It uses the Etherscan API to retrieve:

- Balance (ETH)
- Transaction count
- Latest block number
- Timestamp

The CSV file is saved as `output.csv` and includes Balance, Transaction count, Latest block number, and Timestamp.

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/erdonmez/eth-metadata
cd eth-metadata
```

### 2. Configure the Etherscan API key

Open the `index.js` file and replace the placeholder with your own API key:

   ```javascript
   const API_KEY = 'YourEtherscanAPIKey';
   ```

   You can obtain an API key for free at [Etherscan.io](https://etherscan.io/apis).

### 3. Install Node.js (if not installed)

Make sure you're running **Node.js v18+** to support the built-in `fetch` API.

Check your version:

```bash
node -v
```

To install or upgrade, visit: https://nodejs.org


## Usage

Run the script with:

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

Features may be added later on;

> - Retry logic with attempt limits  
> - Unit and integration tests  
> - Environment variable support for the API key  
> - Improved error handling  
> - Support for multiple addresses  
> - Modularized structure (split into smaller files)  
> - Fallback to another API provider if Etherscan fails