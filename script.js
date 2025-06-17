// Products data
const investments = [
    { id: 1, productName: "Pack of Oranges", price: 100, dailyIncome: 11, totalDays: 35, currentDay: 0, totalProfit: 0, lastGrabDate: null, image: "assets/oranges.png" },
    { id: 2, productName: "Boxes of Tomatoes", price: 350, dailyIncome: 36, totalDays: 35, currentDay: 0, totalProfit: 0, lastGrabDate: null, image: "assets/tomatoes.png" },
    { id: 3, productName: "Sack of Maize", price: 500, dailyIncome: 50, totalDays: 35, currentDay: 0, totalProfit: 0, lastGrabDate: null, image: "assets/maize.png" },
    { id: 4, productName: "Sack of Potatoes", price: 800, dailyIncome: 70, totalDays: 34, currentDay: 0, totalProfit: 0, lastGrabDate: null, image: "assets/potatoes.png" },
    { id: 5, productName: "Golden Pack", price: 1300, dailyIncome: 108, totalDays: 34, currentDay: 0, totalProfit: 0, lastGrabDate: null, image: "assets/goldenpack.png" },
    { id: 6, productName: "Silver Box", price: 2200, dailyIncome: 170, totalDays: 34, currentDay: 0, totalProfit: 0, lastGrabDate: null, image: "assets/silverbox.png" },
    { id: 7, productName: "Platinum Sack", price: 8500, dailyIncome: 500, totalDays: 34, currentDay: 0, totalProfit: 0, lastGrabDate: null, image: "assets/platinumsack.png" }
  ];
  
  // List of official SA holidays (YYYY-MM-DD)
  const holidays = [
    "2025-01-01",
    "2025-03-21",
    "2025-04-27",
    "2025-05-01",
    "2025-06-16",
    "2025-08-09",
    "2025-09-24",
    "2025-12-16",
    "2025-12-25",
    "2025-12-26"
  ];
  
  // Save data to LocalStorage
  function saveInvestments() {
    localStorage.setItem("investmentsData", JSON.stringify(investments));
  }
  
  // Load data from LocalStorage
  function loadInvestments() {
    const data = localStorage.getItem("investmentsData");
    if (data) {
      const savedData = JSON.parse(data);
      savedData.forEach(savedProduct => {
        const product = investments.find(p => p.id === savedProduct.id);
        if (product) {
          product.currentDay = savedProduct.currentDay;
          product.totalProfit = savedProduct.totalProfit;
          product.lastGrabDate = savedProduct.lastGrabDate;
        }
      });
    }
  }
  
  // Check if a date is weekend or holiday
  function isHolidayOrWeekend(date) {
    const day = date.getDay();
    const dateStr = date.toISOString().split("T")[0];
    // 0 = Sunday, 6 = Saturday
    if (day === 0 || day === 6 || holidays.includes(dateStr)) {
      return true;
    }
    return false;
  }
  
  // Generate product cards on the page
  function generateProducts() {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
  
    investments.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
  
      card.innerHTML = `
        <img src="${product.image}" alt="${product.productName}" class="product-image" />
        <h3>${product.productName}</h3>
        <p>Price: R${product.price}</p>
        <p>Daily Income: R${product.dailyIncome}</p>
        <p>Total Days: ${product.totalDays}</p>
        <p>Current Day: ${product.currentDay}</p>
        <p>Total Profit: R${product.totalProfit}</p>
        <button onclick="grabProfit(${product.id})" ${product.currentDay >= product.totalDays ? 'disabled' : ''}>Grab Profit</button>
      `;
  
      container.appendChild(card);
    });
  }
  
  // Grab profit for a product (once per day, skip weekends and holidays)
  function grabProfit(productId) {
    const product = investments.find(p => p.id === productId);
    if (!product) return;
  
    if (product.currentDay >= product.totalDays) {
      alert(`You have completed all profit days for ${product.productName}.`);
      return;
    }
  
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
  
    if (product.lastGrabDate === todayStr) {
      alert("You already grabbed profit for today on this product.");
      return;
    }
  
    if (isHolidayOrWeekend(today)) {
      alert("No profit can be grabbed on weekends or public holidays.");
      return;
    }
  
    // Add daily income to total profit
    product.totalProfit += product.dailyIncome;
    product.currentDay++;
    product.lastGrabDate = todayStr;
  
    alert(`You grabbed R${product.dailyIncome} profit for ${product.productName} today! Total profit: R${product.totalProfit}`);
  
    saveInvestments();
    generateProducts();
  }
  
  // Initialize on page load
  window.onload = function () {
    loadInvestments();
    generateProducts();
  };
  