// Job Details page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Apply Now button functionality
    const applyNowBtn = document.getElementById('apply-now-btn');
    if (applyNowBtn) {
        applyNowBtn.addEventListener('click', function() {
            // Redirect to quick apply page
            window.location.href = 'quick-apply.html';
        });
    }

    // Save Job functionality
    const saveJobBtns = document.querySelectorAll('button');
    saveJobBtns.forEach(btn => {
        if (btn.textContent.includes('Save Job')) {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('svg path');
                if (this.classList.contains('saved')) {
                    // Unsave job
                    this.classList.remove('saved', 'bg-red-100', 'text-red-700', 'border-red-200');
                    this.classList.add('bg-gray-100', 'text-gray-700');
                    this.querySelector('span').textContent = 'Save Job';
                    alert('Job removed from saved jobs');
                } else {
                    // Save job
                    this.classList.add('saved', 'bg-red-100', 'text-red-700', 'border-red-200');
                    this.classList.remove('bg-gray-100', 'text-gray-700');
                    this.querySelector('span').textContent = 'Saved';
                    alert('Job saved successfully!');
                }
            });
        }
    });

    // Share functionality
    const shareBtns = document.querySelectorAll('button');
    shareBtns.forEach(btn => {
        if (btn.textContent.includes('Share')) {
            btn.addEventListener('click', function() {
                if (navigator.share) {
                    navigator.share({
                        title: 'Fintech Support Specialist - eSewa',
                        text: 'Check out this job opportunity at eSewa',
                        url: window.location.href
                    });
                } else {
                    // Fallback for browsers that don't support Web Share API
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(() => {
                        alert('Job link copied to clipboard!');
                    }).catch(() => {
                        alert('Share this job: ' + url);
                    });
                }
            });
        }
    });

    // View All Jobs button
    const viewAllJobsBtn = document.querySelector('button');
    if (viewAllJobsBtn && viewAllJobsBtn.textContent.includes('View All Jobs')) {
        viewAllJobsBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Similar jobs click handlers
    const similarJobItems = document.querySelectorAll('.space-y-4 > div');
    similarJobItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            // In a real application, this would navigate to the specific job
            alert('Navigating to job details...');
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.classList.add('bg-gray-50');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('bg-gray-50');
        });
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to action buttons
    const actionButtons = document.querySelectorAll('button');
    actionButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

