const tablebody = document.getElementById('tablebody');
const ws = new WebSocket('wss://mainnet.infura.io/ws/v3/417c437454f9478f8dab1b0940fce3cc');

ws.onopen = () => {
  console.log('WebSocket connected.');

  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_subscribe",
    params: ["newHeads"]
  };
  ws.send(JSON.stringify(payload));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Message received:', message);

  if (message.method === "eth_subscription") {
    const blockDetails = message.params.result;
    console.log('New block:', blockDetails);
    generateTable(blockDetails);
  }
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('WebSocket connection closed.');
};


function generateTable(data) {
  const dataRow = document.createElement('tr');

  for (const [key, value] of Object.entries(data)) {
    const td = document.createElement('td');
    td.textContent = value;
    dataRow.appendChild(td);
  }
  tablebody.appendChild(dataRow);
}