// Fetching data using async/await
async function fetchData() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      renderTable(data); // Call the function to render the data in the table
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  
  fetchData();
  function renderTable(data) {
    const tableBody = document.getElementById('table-body'); // Assuming the table body has this id
    tableBody.innerHTML = ''; // Clear existing rows
  
    data.forEach(coin => {
      const row = `
        <tr>
          <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
          <td>${coin.name}</td>
          <td>${coin.symbol}</td>
          <td>$${coin.current_price}</td>
          <td>${coin.total_volume}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }
  function searchCoins() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const filteredData = coinsData.filter(coin => coin.name.toLowerCase().includes(input) || coin.symbol.toLowerCase().includes(input));
    renderTable(filteredData); // Re-render the table with the filtered data
  }
  
  document.getElementById('search-button').addEventListener('click', searchCoins);
  function sortByMarketCap() {
    const sortedData = [...coinsData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
  }
  
  function sortByPercentageChange() {
    const sortedData = [...coinsData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
  }
  
  document.getElementById('sort-marketcap').addEventListener('click', sortByMarketCap);
  document.getElementById('sort-percentage').addEventListener('click', sortByPercentageChange);
  