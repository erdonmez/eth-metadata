const fs = require('fs');

const API_KEY = 'YourEtherscanAPIKey'; // Replace with your API key

// regex to validate ethereum address
const isEthereumAddressValid = (address) => {
  const result = address.match(/^0x[a-fA-F0-9]{40}$/);
  return result !== null;
};

// function to fetch balance
const getBalance = async (address) => {
  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.status !== '1' && data.result !== '0') {
    throw new Error(`Failed to fetch balance: ${data.message || data.result}`);
  }

  const balanceWei = data.result;

  return parseFloat(balanceWei) / 1e18;
};

// function to fetch transaction count
const getTxCount = async (address) => {
  const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.result) {
    if (data.error && data.error.message) {
      throw new Error(`Failed to fetch transaction count: ${data.error.message}`);
    }

    return 0;
  }

  return parseInt(data.result, 16);
};

// function to fetch latest block
const getLatestBlock = async () => {
  const url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Fallback to zero if result is missing
  if (!data.result) {
    if (data.error && data.error.message) {
      throw new Error(`Failed to fetch latest block number: ${data.error.message}`);
    }

    return 0;
  }

  return parseInt(data.result, 16);
};

// function to write to csv
const writeCsv = (address, balance, txCount, latestBlock) => {
  const csvHeader = 'Address,Balance (ETH),Transaction Count,Latest Block,Timestamp\n';
  const timestamp = new Date().toISOString();
  const csvData = `${address},${balance},${txCount},${latestBlock},${timestamp}\n`;
  fs.writeFileSync('output.csv', csvHeader + csvData, 'utf-8');
  console.log('Output.csv file created successfully.');
};

// main function
const run = async () => {
  const address = process.argv[2];

  if (!address || !isEthereumAddressValid(address)) {
    console.error('Ethereum address is invalid. Please provide a valid eth address.');
    console.error('Usage: node index.js <ETH_ADDRESS>');
    process.exit(1);
  }

  try {
    const [balance, txCount, latestBlock] = await Promise.all([
      getBalance(address),
      getTxCount(address),
      getLatestBlock(),
    ]);

    console.log(`Balance for ${address}: ${balance} ETH`);
    console.log(`Transaction Count: ${txCount}`);
    console.log(`Latest Block: ${latestBlock}`);

    writeCsv(address, balance, txCount, latestBlock);
  } catch (err) {
    console.error('Error:', err.message || err);
  }
};

run();
