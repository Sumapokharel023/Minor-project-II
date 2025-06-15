document.addEventListener('DOMContentLoaded', function() {
  if (!window.jobsData) {
    console.error('Jobs data not found. Attempting to load shared-data.js dynamically...');
    const script = document.createElement('script');
    script.src = 'js/shared-data.js';
    script.onload = () => {
      if (window.jobsData) {
        console.log('shared-data.js loaded successfully');
        initializeFeed();
      } else {
        console.error('Failed to load jobsData from shared-data.js');
        showErrorMessage();
      }
    };
    script.onerror = () => {
      console.error('Error loading shared-data.js');
      showErrorMessage();
    };
    document.head.appendChild(script);
    return;
  }
  initializeFeed();
});

function showErrorMessage() {
  const fallback = document.getElementById('job-feed-fallback');
  if (fallback) {
    fallback.innerHTML = 'Failed to load jobs. Please try refreshing the page or contact support.';
  }
}

function initializeFeed() {
  const sortBy = document.getElementById('sort-by');
  const jobTypeFilter = document.getElementById('job-type-filter');
  const locationFilter = document.getElementById('location-filter');
  const loadMoreBtn = document.getElementById('load-more-btn');

  if (sortBy) {
    sortBy.addEventListener('change', function() {
      console.log('Sorting by:', this.value);
      renderJobs(getFilteredJobs(jobTypeFilter?.value || 'all', locationFilter?.value || 'all', this.value));
    });
  }

  if (jobTypeFilter) {
    jobTypeFilter.addEventListener('change', function() {
      console.log('Filtering by job type:', this.value);
      renderJobs(getFilteredJobs(this.value, locationFilter?.value || 'all', sortBy?.value || 'newest'));
    });
  }

  if (locationFilter) {
    locationFilter.addEventListener('change', function() {
      console.log('Filtering by location:', this.value);
      renderJobs(getFilteredJobs(jobTypeFilter?.value || 'all', this.value, sortBy?.value || 'newest'));
    });
  }

  if (loadMoreBtn) {
    let visibleJobs = 5;
    const jobsPerLoad = 5;

    loadMoreBtn.addEventListener('click', function() {
      console.log('Loading more jobs...');
      this.textContent = 'Loading...';
      setTimeout(() => {
        visibleJobs += jobsPerLoad;
        renderJobs(getFilteredJobs(
          jobTypeFilter?.value || 'all',
          locationFilter?.value || 'all',
          sortBy?.value || 'newest'
        ), visibleJobs);
        this.textContent = 'Load More Jobs';
        if (visibleJobs >= window.jobsData.length) {
          this.style.display = 'none';
        }
      }, 1000);
    });
  }

  function getSortedJobs(sortValue) {
    const jobs = [...window.jobsData];
    switch (sortValue) {
      case 'newest':
        return jobs.sort((a, b) => new Date(b.postedTime || 0) - new Date(a.postedTime || 0));
      case 'oldest':
        return jobs.sort((a, b) => new Date(a.postedTime || 0) - new Date(b.postedTime || 0));
      case 'salary-high':
        return jobs.sort((a, b) => {
          const aSalary = parseInt(a.salary.match(/\d+/)?.[0] || 0);
          const bSalary = parseInt(b.salary.match(/\d+/)?.[0] || 0);
          return bSalary - aSalary;
        });
      case 'salary-low':
        return jobs.sort((a, b) => {
          const aSalary = parseInt(a.salary.match(/\d+/)?.[0] || 0);
          const bSalary = parseInt(b.salary.match(/\d+/)?.[0] || 0);
          return aSalary - bSalary;
        });
      default:
        return jobs;
    }
  }

  function getFilteredJobs(jobType, location, sortValue = 'newest') {
    let filteredJobs = window.jobsData.filter(job => {
      const matchesType = jobType === 'all' || job.type === jobType;
      const matchesLocation = location === 'all' || job.location.toLowerCase().includes(location.toLowerCase());
      return matchesType && matchesLocation;
    });
    return getSortedJobs(sortValue).filter(job => filteredJobs.includes(job));
  }

  function renderJobs(jobs, limit = jobs.length) {
    const jobFeedContainer = document.getElementById('job-feed-container');
    const fallback = document.getElementById('job-feed-fallback');
    if (!jobFeedContainer) {
      console.error('job-feed-container not found');
      return;
    }

    if (fallback) fallback.remove();

    if (!jobs || jobs.length === 0) {
      jobFeedContainer.innerHTML = '<div class="text-center text-gray-600">No jobs found.</div>';
      return;
    }

    jobFeedContainer.innerHTML = '';
    jobs.slice(0, limit).forEach(job => {
      const jobItem = document.createElement('div');
      jobItem.className = 'job-feed-item bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-cyan-blue';
      jobItem.innerHTML = `
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center">
            <img src="${job.logo}" alt="${job.company}" class="h-12 w-12 rounded-full mr-4" />
            <div>
              <h3 class="text-xl font-semibold text-midnight-blue">${job.title}</h3>
              <p class="text-gray-600">${job.company} • ${job.location}</p>
              <p class="text-sm text-gray-500">Posted ${job.postedTime ? timeSince(job.postedTime) : 'Unknown'}</p>
            </div>
          </div>
          <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">${job.postedTime && new Date(job.postedTime) > new Date(Date.now() - 24 * 60 * 60 * 1000) ? 'New' : 'Open'}</span>
        </div>
        <p class="text-gray-700 mb-4">${job.description.substring(0, 100)}...</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${job.skills ? job.skills.map(skill => `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${skill}</span>`).join('') : '<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">No skills listed</span>'}
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-600">${job.salary} • ${job.experience}</p>
            <p class="text-gray-600">${job.type.replace('-', ' ').toUpperCase()} • ${job.workMode ? job.workMode.replace('-', ' ').toUpperCase() : 'On-Site'}</p>
          </div>
          <div class="flex space-x-3">
            <button data-job-id="${job.id}" class="view-details-btn bg-cyan-blue text-white px-4 py-2 rounded-lg hover:bg-vivid-sky-blue transition-colors duration-200">View Details</button>
            <button data-job-id="${job.id}" class="quick-apply-btn bg-electric-blue text-white px-4 py-2 rounded-lg hover:bg-azure-blue transition-colors duration-200">Quick Apply</button>
          </div>
        </div>
      `;
      jobFeedContainer.appendChild(jobItem);
      jobItem.querySelector(".view-details-btn").addEventListener("click", function() {
        const jobId = this.getAttribute("data-job-id");
        window.location.href = `view-details.html?jobId=${jobId}`;
      });
      jobItem.querySelector(".quick-apply-btn").addEventListener("click", function() {
        const jobId = this.getAttribute("data-job-id");
        window.location.href = `quick-apply.html?jobId=${jobId}`;
      });
    });
  }

  function timeSince(date) {
    const now = new Date();
    const posted = new Date(date);
    const seconds = Math.floor((now - posted) / 1000);
    let interval = Math.floor(seconds / 3600);
    if (interval < 1) return `${Math.floor(seconds / 60)} minutes ago`;
    if (interval < 24) return `${interval} hours ago`;
    return `${Math.floor(interval / 24)} days ago`;
  }

  renderJobs(getFilteredJobs("all", "all"));
}