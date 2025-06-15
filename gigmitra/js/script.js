
document.addEventListener("DOMContentLoaded", function () {
  // Search functionality
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");
  
  if (searchButton && searchInput) {
    // Add search functionality
    function performSearch() {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // In a real application, this would redirect to search results page
        // For now, we'll show a more informative message
        alert(`Searching for jobs: "${searchTerm}" in Kathmandu, Nepal`);
        // You could redirect to a search results page like:
        // window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
      } else {
        alert("Please enter a search term");
        searchInput.focus();
      }
    }
    
    // Search button click
    searchButton.addEventListener("click", performSearch);
    
    // Enter key press in search input
    searchInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
    
    // Add placeholder suggestions
    const suggestions = [
      "Software Developer",
      "Marketing Manager", 
      "Data Analyst",
      "Graphic Designer",
      "Customer Service",
      "Sales Representative"
    ];
    
    searchInput.addEventListener("focus", function() {
      if (!this.value) {
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        this.placeholder = `Try "${randomSuggestion}"`;
      }
    });
    
    searchInput.addEventListener("blur", function() {
      this.placeholder = "Search jobs by title, skill or company";
    });
  }

  // Mobile menu toggle
  const menuButton = document.querySelector(".md\\:hidden");
  const navLinks = document.querySelector("nav");
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
      navLinks.classList.toggle("hidden");
      navLinks.classList.toggle("flex");
      navLinks.classList.toggle("flex-col");
      navLinks.classList.toggle("space-y-4");
      navLinks.classList.toggle("mt-4");
    });
  }
});