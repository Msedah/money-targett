// Array of products with investment info per product
const investments = [
    {
      id: 1,
      productName: "Pack of Oranges",
      dailyIncome: 11,
      totalDays: 35,
      currentDay: 1,
      totalProfit: 0,
      lastGrabDate: null
    },
    {
      id: 2,
      productName: "Boxes of Tomatoes",
      dailyIncome: 36,
      totalDays: 35,
      currentDay: 1,
      totalProfit: 0,
      lastGrabDate: null
    },
    {
      id: 3,
      productName: "Sack of Maize",
      dailyIncome: 50,
      totalDays: 35,
      currentDay: 1,
      totalProfit: 0,
      lastGrabDate: null
    },
    // Add more products here...
  ];
  
  // Check if user can grab profit for a product today
  function canGrabProfit(product) {
    const today = new Date().toDateString();
    return product.lastGrabDate !== today;
  }
  
  // Grab profit for a specific product
  function grabProfit(productId) {
    const product = investments.find(inv => inv.id === productId);
  
    if (!canGrabProfit(product)) {
      alert(`You already grabbed your profit today for ${product.productName}. Come back tomorrow!`);
      return;
    }
  
    if (product.currentDay > product.totalDays) {
      alert(`Investment period completed for ${product.productName}! No more profits to grab.`);
      return;
    }
  
    product.totalProfit += product.dailyIncome;
    product.currentDay++;
    product.lastGrabDate = new Date().toDateString();
  
    updateDisplay(product.id);
  
    alert(`You grabbed R${product.dailyIncome} profit today for ${product.productName}! Total profit: R${product.totalProfit}`);
  }
  
  // Update display info for a specific product
  function updateDisplay(productId) {
    const product = investments.find(inv => inv.id === productId);
    document.getElementById(`daily-income-${product.id}`).innerText = "Daily Income: R" + product.dailyIncome;
    document.getElementById(`total-profit-${product.id}`).innerText = "Total Profit Grabbed: R" + product.totalProfit;
    document.getElementById(`days-left-${product.id}`).innerText = "Days Left: " + (product.totalDays - product.currentDay + 1);
  }
  
  // Generate the product list dynamically on page load
  function generateProducts() {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
  
    investments.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <h2>${product.productName}</h2>
        <p id="daily-income-${product.id}">Daily Income: R${product.dailyIncome}</p>
        <p id="total-profit-${product.id}">Total Profit Grabbed: R${product.totalProfit}</p>
        <p id="days-left-${product.id}">Days Left: ${product.totalDays}</p>
        <button id="grab-btn-${product.id}">Grab Profit</button>
        <hr />
      `;
  
      container.appendChild(productDiv);
  
      // Add event listener to button
      document.getElementById(`grab-btn-${product.id}`).addEventListener("click", () => grabProfit(product.id));
    });
  }
  
  window.onload = function() {
    generateProducts();
  };
  
  