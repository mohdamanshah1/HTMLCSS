const cryptoGrid = document.getElementById('cryptoGrid');

const fetchCryptos = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    const data = await response.json();

    data.forEach(crypto => {
        const cryptoCard = document.createElement('div');
        cryptoCard.classList.add('crypto-card');

        cryptoCard.innerHTML = `
            <h2>${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
            <p>💰 Price: $${crypto.current_price.toFixed(2)}</p>
            <p>📊 Market Cap: $${crypto.market_cap.toLocaleString()}</p>
            <p>📈 24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%</p>
        `;

        cryptoGrid.appendChild(cryptoCard);
    });
};

fetchCryptos();