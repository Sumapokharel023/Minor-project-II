document.addEventListener("DOMContentLoaded", function () {
  // Search functionality
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector("#search-input");
  
  if (searchInput) {
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
    if (searchButton) {
      searchButton.addEventListener("click", performSearch);
    }
    
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

  // Mobile menu toggle functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  
  function openMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove("hidden");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  }
  
  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add("hidden");
      document.body.style.overflow = ""; // Restore background scrolling
    }
  }
  
  // Open mobile menu when hamburger button is clicked
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function(e) {
      e.stopPropagation();
      openMobileMenu();
    });
  }
  
  // Close mobile menu when close button is clicked
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", function(e) {
      e.stopPropagation();
      closeMobileMenu();
    });
  }
  
  // Close mobile menu when clicking on a navigation link
  if (mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll("nav a");
    mobileMenuLinks.forEach(link => {
      link.addEventListener("click", function() {
        closeMobileMenu();
      });
    });
    
    // Close mobile menu when clicking outside the menu content
    mobileMenu.addEventListener("click", function(e) {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }
  
  // Handle window resize to ensure mobile menu is hidden on desktop
  window.addEventListener("resize", function() {
    if (window.innerWidth >= 768) { // md breakpoint
      closeMobileMenu();
    }
  });
  
  // Handle escape key to close mobile menu
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && mobileMenu && !mobileMenu.classList.contains("hidden")) {
      closeMobileMenu();
    }
  });
});

