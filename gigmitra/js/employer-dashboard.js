// Employer Dashboard JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Profile dropdown functionality
    const profileButton = document.getElementById('profile-button');
    const profileMenu = document.getElementById('profile-menu');
    const logoutBtn = document.getElementById('logout-btn');

    // Toggle dropdown menu
    profileButton.addEventListener('click', function(e) {
        e.stopPropagation();
        profileMenu.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileButton.contains(e.target) && !profileMenu.contains(e.target)) {
            profileMenu.classList.add('hidden');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to sign out?')) {
            alert('Signed out successfully!');
            // In a real application, you would redirect to login page
            window.location.href = 'index.html';
        }
    });

    // Quick action buttons
    const quickActionButtons = document.querySelectorAll('.space-y-3 button');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            switch(action) {
                case 'Post New Job':
                    window.location.href = 'post-job.html';
                    break;
                case 'Search Candidates':
                    window.location.href = 'find-jobs.html';
                    break;
                case 'View Analytics':
                    alert('Analytics feature coming soon!');
                    break;
            }
        });
    });

    // Application action buttons (Accept/Reject)
    const applicationButtons = document.querySelectorAll('.space-y-4 button');
    applicationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const candidateName = this.closest('.flex').querySelector('h3').textContent;
            
            if (action === 'Accept') {
                if (confirm(`Accept application from ${candidateName}?`)) {
                    this.textContent = 'Accepted';
                    this.classList.remove('bg-green-100', 'text-green-700', 'hover:bg-green-200');
                    this.classList.add('bg-gray-100', 'text-gray-600');
                    this.disabled = true;
                    
                    // Hide reject button
                    const rejectBtn = this.nextElementSibling;
                    if (rejectBtn) rejectBtn.style.display = 'none';
                    
                    alert(`Application from ${candidateName} has been accepted!`);
                }
            } else if (action === 'Reject') {
                if (confirm(`Reject application from ${candidateName}?`)) {
                    this.textContent = 'Rejected';
                    this.classList.remove('bg-red-100', 'text-red-700', 'hover:bg-red-200');
                    this.classList.add('bg-gray-100', 'text-gray-600');
                    this.disabled = true;
                    
                    // Hide accept button
                    const acceptBtn = this.previousElementSibling;
                    if (acceptBtn) acceptBtn.style.display = 'none';
                    
                    alert(`Application from ${candidateName} has been rejected.`);
                }
            }
        });
    });

    // Job table action buttons
    const jobActionButtons = document.querySelectorAll('table button');
    jobActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const jobTitle = this.closest('tr').querySelector('h3').textContent;
            
            switch(action) {
                case 'View':
                    window.location.href = `job-details.html?job=${encodeURIComponent(jobTitle)}`;
                    break;
                case 'Edit':
                    window.location.href = `post-job.html?edit=${encodeURIComponent(jobTitle)}`;
                    break;
                case 'Close':
                    if (confirm(`Close job posting for ${jobTitle}?`)) {
                        const statusCell = this.closest('tr').querySelector('td:nth-child(4) span');
                        statusCell.textContent = 'Closed';
                        statusCell.classList.remove('bg-green-100', 'text-green-800', 'bg-yellow-100', 'text-yellow-800');
                        statusCell.classList.add('bg-red-100', 'text-red-800');
                        
                        this.textContent = 'Reopen';
                        alert(`Job posting for ${jobTitle} has been closed.`);
                    }
                    break;
                case 'Reopen':
                    if (confirm(`Reopen job posting for ${jobTitle}?`)) {
                        const statusCell = this.closest('tr').querySelector('td:nth-child(4) span');
                        statusCell.textContent = 'Active';
                        statusCell.classList.remove('bg-red-100', 'text-red-800');
                        statusCell.classList.add('bg-green-100', 'text-green-800');
                        
                        this.textContent = 'Close';
                        alert(`Job posting for ${jobTitle} has been reopened.`);
                    }
                    break;
            }
        });
    });

    // Stats cards hover effects
    const statsCards = document.querySelectorAll('.grid-cols-1.md\\:grid-cols-4 > div');
    statsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Auto-refresh functionality for new applications
    let refreshInterval;
    
    function startAutoRefresh() {
        refreshInterval = setInterval(() => {
            // Simulate new application notification
            const random = Math.random();
            if (random < 0.1) { // 10% chance every 30 seconds
                showNotification('New application received!');
                updateApplicationCount();
            }
        }, 30000); // Check every 30 seconds
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function updateApplicationCount() {
        const totalApplicationsCard = statsCards[1];
        const countElement = totalApplicationsCard.querySelector('.text-2xl');
        const currentCount = parseInt(countElement.textContent);
        countElement.textContent = currentCount + 1;
        
        const newApplicationsCard = statsCards[2];
        const newCountElement = newApplicationsCard.querySelector('.text-2xl');
        const currentNewCount = parseInt(newCountElement.textContent);
        newCountElement.textContent = currentNewCount + 1;
    }

    // Start auto-refresh
    startAutoRefresh();

    // Stop auto-refresh when page is hidden
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(refreshInterval);
        } else {
            startAutoRefresh();
        }
    });

    // Profile menu item handlers
    const profileMenuItems = profileMenu.querySelectorAll('a');
    profileMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const text = this.textContent.trim();
            
            switch(href) {
                case '#profile':
                    alert('Opening profile settings...');
                    break;
                case '#settings':
                    alert('Opening account settings...');
                    break;
                case '#billing':
                    alert('Opening billing information...');
                    break;
            }
            
            profileMenu.classList.add('hidden');
        });
    });
});

