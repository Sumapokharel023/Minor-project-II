document.addEventListener("DOMContentLoaded", function () {
  // Job data
  const jobs = [
    {
      id: 1,
      title: "Fintech Support Specialist",
      company: "eSewa",
      location: "Lalitpur, Nepal",
      salary: "NPR 30K - 50K",
      experience: "1-2 years",
      type: "full-time",
      industry: "finance",
      expires: "25 days, 12 hours",
      postedTime: "2025-06-14T22:00:00+0545",
      skills: ["Customer Support", "Technical Support", "Communication"],
      workMode: "on-site",
      description:
        "We are seeking a dedicated Fintech Support Specialist to join our customer support team at eSewa. You will be responsible for providing exceptional customer service and technical support to our users, helping them navigate our digital payment platform and resolve any issues they may encounter.",
      requirements: [
        "Bachelor's degree in IT, Business, or related field",
        "1-2 years of experience in customer support or technical support",
        "Strong communication skills in English and Nepali",
      ],
      responsibilities: [
        "Provide first-level technical support via phone, email, and chat",
        "Assist customers with account setup, transactions, and troubleshooting",
        "Document and escalate complex technical issues to appropriate teams",
      ],
    },
    {
      id: 2,
      title: "Cabin Crew Member",
      company: "Yeti Airlines",
      location: "Kathmandu, Nepal",
      salary: "NPR 40K - 60K",
      experience: "1-3 years",
      type: "full-time",
      industry: "aviation",
      expires: "20 days, 8 hours",
      postedTime: "2025-06-14T20:00:00+0545",
      skills: ["Customer Service", "Safety Procedures", "Communication"],
      workMode: "on-site",
      description:
        "Join Yeti Airlines as a Cabin Crew Member and be part of Nepal's premier airline. You will ensure passenger safety and comfort while delivering exceptional in-flight service.",
      requirements: [
        "High school diploma or equivalent",
        "1-3 years of customer service experience",
        "Excellent communication and interpersonal skills",
        "Physical fitness and ability to work in confined spaces",
      ],
      responsibilities: [
        "Ensure passenger safety and comfort during flights",
        "Conduct safety demonstrations and emergency procedures",
        "Serve meals and beverages to passengers",
        "Handle passenger inquiries and concerns professionally",
      ],
    },
    {
      id: 3,
      title: "Travel Consultant",
      company: "Sasto Nepal Tour",
      location: "Thamel, Kathmandu",
      salary: "Negotiable",
      experience: "0-1 year",
      type: "full-time",
      industry: "tourism",
      expires: "15 days, 6 hours",
      postedTime: "2025-06-14T18:00:00+0545",
      skills: ["Sales", "Customer Service", "Travel Planning"],
      workMode: "on-site",
      description:
        "We are looking for an enthusiastic Travel Consultant to help our clients plan their perfect trips to Nepal. You will provide expert advice on destinations, accommodations, and activities.",
      requirements: [
        "Knowledge of Nepal's tourist destinations",
        "0-1 year of experience in tourism or hospitality",
        "Fluency in English and Nepali",
        "Strong sales and communication skills",
      ],
      responsibilities: [
        "Consult with clients to understand their travel preferences",
        "Create customized travel itineraries",
        "Book accommodations, transportation, and activities",
        "Provide ongoing support during clients' trips",
      ],
    },
    {
      id: 4,
      title: "Mobile App Developer",
      company: "eSewa",
      location: "Lalitpur, Nepal",
      salary: "NPR 50K - 80K",
      experience: "2-3 years",
      type: "full-time",
      industry: "technology",
      expires: "18 days, 10 hours",
      postedTime: "2025-06-14T14:00:00+0545",
      skills: ["React Native", "Flutter", "APIs", "Mobile Development"],
      workMode: "hybrid",
      description:
        "Join our mobile development team at eSewa to build and maintain our mobile applications. You will work on cutting-edge fintech solutions that serve millions of users across Nepal.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "2-3 years of mobile app development experience",
        "Proficiency in React Native, Flutter, or native iOS/Android development",
        "Experience with RESTful APIs and mobile app deployment",
      ],
      responsibilities: [
        "Develop and maintain mobile applications for iOS and Android",
        "Collaborate with backend developers to integrate APIs",
        "Optimize app performance and user experience",
        "Participate in code reviews and testing processes",
      ],
    },
    {
      id: 5,
      title: "Ground Operations Coordinator",
      company: "Yeti Airlines",
      location: "Kathmandu, Nepal",
      salary: "NPR 35K - 55K",
      experience: "1-2 years",
      type: "full-time",
      industry: "aviation",
      expires: "12 days, 5 hours",
      postedTime: "2025-06-14T12:00:00+0545",
      skills: ["Logistics", "Aviation Operations", "Team Coordination"],
      workMode: "on-site",
      description:
        "Coordinate ground operations at Tribhuvan International Airport to ensure smooth and efficient flight operations. You will work with various teams to manage aircraft turnaround times and passenger services.",
      requirements: [
        "Bachelor's degree in Aviation Management or related field",
        "1-2 years of experience in aviation or logistics",
        "Strong organizational and communication skills",
        "Ability to work in a fast-paced environment",
      ],
      responsibilities: [
        "Coordinate aircraft arrival and departure procedures",
        "Manage ground crew and equipment allocation",
        "Ensure compliance with safety and security regulations",
        "Handle passenger service issues and delays",
      ],
    },
    {
      id: 6,
      title: "Tour Operations Manager",
      company: "Sasto Nepal Tour",
      location: "Pokhara, Nepal",
      salary: "Negotiable",
      experience: "2-4 years",
      type: "full-time",
      industry: "tourism",
      expires: "8 days, 3 hours",
      postedTime: "2025-06-14T10:00:00+0545",
      skills: ["Team Management", "Tour Planning", "Customer Service"],
      workMode: "on-site",
      description:
        "Lead our tour operations in Pokhara, managing a team of guides and ensuring exceptional experiences for our clients. You will oversee day-to-day operations and develop new tour packages.",
      requirements: [
        "Bachelor's degree in Tourism Management or related field",
        "2-4 years of experience in tour operations",
        "Strong leadership and team management skills",
        "Extensive knowledge of Pokhara and surrounding areas",
      ],
      responsibilities: [
        "Manage tour operations and guide teams",
        "Develop new tour packages and experiences",
        "Ensure quality standards and customer satisfaction",
        "Handle operational challenges and emergency situations",
      ],
    },
    {
      id: 7,
      title: "Freelance Graphic Designer",
      company: "Freelance",
      location: "Remote, Nepal",
      salary: "NPR 20K - 40K",
      experience: "1-2 years",
      type: "freelance",
      industry: "media",
      expires: "10 days, 4 hours",
      postedTime: "2025-06-14T08:00:00+0545",
      skills: ["Adobe Photoshop", "Illustrator", "Graphic Design"],
      workMode: "remote",
      description:
        "Work as a freelance graphic designer creating visual content for various clients. You will have the flexibility to work remotely while building a diverse portfolio.",
      requirements: [
        "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
        "1-2 years of graphic design experience",
        "Strong portfolio showcasing diverse design work",
        "Excellent time management and communication skills",
      ],
      responsibilities: [
        "Create visual designs for print and digital media",
        "Collaborate with clients to understand design requirements",
        "Manage multiple projects and meet deadlines",
        "Maintain consistent brand identity across designs",
      ],
    },
    {
      id: 8,
      title: "Part-Time Content Writer",
      company: "Media House",
      location: "Kathmandu, Nepal",
      salary: "NPR 15K - 25K",
      experience: "0-1 year",
      type: "part-time",
      industry: "media",
      expires: "14 days, 7 hours",
      postedTime: "2025-06-14T06:00:00+0545",
      skills: ["Content Writing", "SEO", "Research"],
      workMode: "hybrid",
      description:
        "Join our content team as a part-time writer to create engaging articles and blog posts. This is a great opportunity for students or those looking for flexible work arrangements.",
      requirements: [
        "Excellent writing skills in English",
        "0-1 year of content writing experience",
        "Basic understanding of SEO principles",
        "Ability to research and write on various topics",
      ],
      responsibilities: [
        "Write articles and blog posts on assigned topics",
        "Research and fact-check content",
        "Optimize content for SEO",
        "Meet content deadlines and quality standards",
      ],
    },
    {
      id: 9,
      title: "Senior Software Engineer",
      company: "eSewa",
      location: "Lalitpur, Nepal",
      salary: "NPR 80K - 120K",
      experience: "3-5 years",
      type: "full-time",
      industry: "technology",
      expires: "30 days, 0 hours",
      postedTime: "2025-06-15T08:00:00+0545",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      workMode: "remote",
      description:
        "We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for developing scalable fintech solutions and mentoring junior developers.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3-5 years of software development experience",
        "Proficiency in React, Node.js, MongoDB, and AWS",
        "Experience leading projects and mentoring teams",
      ],
      responsibilities: [
        "Design and develop scalable web applications",
        "Mentor junior developers and conduct code reviews",
        "Collaborate with product teams to define technical requirements",
        "Optimize applications for performance and scalability",
      ],
    },
    {
      id: 10,
      title: "Flight Operations Coordinator",
      company: "Yeti Airlines",
      location: "Kathmandu, Nepal",
      salary: "NPR 50K - 70K",
      experience: "2-4 years",
      type: "full-time",
      industry: "aviation",
      expires: "28 days, 0 hours",
      postedTime: "2025-06-15T06:00:00+0545",
      skills: ["Aviation", "Operations", "Safety Management"],
      workMode: "on-site",
      description:
        "Join our flight operations team to ensure safe and efficient flight operations. Experience in aviation industry preferred.",
      requirements: [
        "Bachelor's degree in Aviation Management or related field",
        "2-4 years of experience in aviation operations",
        "Strong organizational and communication skills",
        "Knowledge of safety management systems",
      ],
      responsibilities: [
        "Coordinate flight schedules and crew assignments",
        "Ensure compliance with aviation regulations",
        "Monitor flight operations and address issues promptly",
        "Liaise with air traffic control and ground staff",
      ],
    },
    {
      id: 11,
      title: "Digital Marketing Specialist",
      company: "Sasto Nepal Tour",
      location: "Thamel, Kathmandu",
      salary: "NPR 35K - 50K",
      experience: "1-3 years",
      type: "full-time",
      industry: "tourism",
      expires: "25 days, 0 hours",
      postedTime: "2025-06-15T04:00:00+0545",
      skills: ["Digital Marketing", "SEO", "Social Media", "Content Creation"],
      workMode: "hybrid",
      description:
        "Looking for a creative digital marketing specialist to promote our tourism packages and increase online presence.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "1-3 years of digital marketing experience",
        "Proficiency in SEO, social media, and content creation",
        "Strong analytical and communication skills",
      ],
      responsibilities: [
        "Develop and execute digital marketing campaigns",
        "Optimize website content for SEO",
        "Manage social media accounts and engage audiences",
        "Analyze campaign performance and report insights",
      ],
    },
    {
      id: 12,
      title: "Project Manager",
      company: "Build Your Dreams",
      location: "Lalitpur, Nepal",
      salary: "NPR 60K - 90K",
      experience: "4-6 years",
      type: "full-time",
      industry: "construction",
      expires: "20 days, 0 hours",
      postedTime: "2025-06-14T10:00:00+0545",
      skills: ["Project Management", "Construction", "Leadership"],
      workMode: "on-site",
      description:
        "Seeking an experienced project manager to oversee construction projects and coordinate with various stakeholders.",
      requirements: [
        "Bachelor's degree in Civil Engineering or related field",
        "4-6 years of project management experience in construction",
        "Strong leadership and negotiation skills",
        "Proficiency in project management tools",
      ],
      responsibilities: [
        "Plan and oversee construction projects from start to finish",
        "Coordinate with contractors, architects, and clients",
        "Manage project budgets and timelines",
        "Ensure compliance with safety and quality standards",
      ],
    },
    {
      id: 13,
      title: "Automotive Sales Executive",
      company: "Tata Motors",
      location: "Kathmandu, Nepal",
      salary: "NPR 25K - 40K + Commission",
      experience: "1-2 years",
      type: "full-time",
      industry: "automotive",
      expires: "18 days, 0 hours",
      postedTime: "2025-06-13T10:00:00+0545",
      skills: ["Sales", "Automotive", "Customer Service"],
      workMode: "on-site",
      description:
        "Join our sales team to promote Tata Motors vehicles and provide excellent customer service to potential buyers.",
      requirements: [
        "High school diploma or equivalent",
        "1-2 years of sales experience, preferably in automotive",
        "Strong communication and negotiation skills",
        "Customer-focused mindset",
      ],
      responsibilities: [
        "Promote and sell Tata Motors vehicles",
        "Build and maintain client relationships",
        "Conduct vehicle demonstrations and test drives",
        "Meet sales targets and report performance",
      ],
    },
  ];

  // Utility functions for view-details.html and quick-apply.html
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function getJobById(jobId) {
    return jobs.find((job) => job.id === parseInt(jobId));
  }

  // Expose jobs data and utility functions globally
  window.jobsData = jobs;
  window.getUrlParameter = getUrlParameter;
  window.getJobById = getJobById;

  // Render jobs function for job cards
  function renderJobs(filteredJobs, containerId) {
    const jobListings = document.getElementById(containerId);
    if (!jobListings) return;

    jobListings.innerHTML = "";
    if (filteredJobs.length === 0) {
      jobListings.innerHTML =
        '<p class="text-gray-600 text-center col-span-3">No jobs found for the selected filters.</p>';
      return;
    }
    filteredJobs.forEach((job) => {
      const jobCard = `
        <div class="job-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold text-midnight-blue mb-2">${job.title}</h3>
          <p class="text-gray-600 mb-1">${job.company}, ${job.location}</p>
          <p class="text-gray-600 mb-1">Salary: ${job.salary} | ${job.experience}</p>
          <p class="text-gray-600 mb-4">${job.type
            .replace("-", " ")
            .toUpperCase()} | ${job.industry.toUpperCase()}</p>
          <div class="flex space-x-3 mt-4">
            <a href="view-details.html?jobId=${
              job.id
            }" class="bg-cyan-blue text-white px-4 py-2 rounded-lg hover:bg-vivid-sky-blue transition-colors duration-200 text-center block">View Details</a>
            <a href="quick-apply.html?jobId=${
              job.id
            }" class="bg-electric-blue text-white px-4 py-2 rounded-lg hover:bg-azure-blue transition-colors duration-200 text-center block">Quick Apply</a>
          </div>
          <p class="text-gray-500 text-sm mt-4">Job Expires: ${job.expires}</p>
        </div>
      `;
      jobListings.innerHTML += jobCard;
    });
  }

  // Render search suggestions for dropdown
  function renderSearchSuggestions(filteredJobs) {
    const suggestionsContainer = document.getElementById("search-suggestions");
    if (!suggestionsContainer) return;

    suggestionsContainer.innerHTML = "";
    if (filteredJobs.length === 0 || !document.getElementById("search-input").value.trim()) {
      suggestionsContainer.classList.add("hidden");
      return;
    }

    filteredJobs.slice(0, 5).forEach((job) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add(
        "p-3",
        "hover:bg-gray-100",
        "cursor-pointer",
        "border-b",
        "border-gray-200",
        "text-gray-800"
      );
      suggestionItem.innerHTML = `
        <p class="font-semibold">${job.title}</p>
        <p class="text-sm text-gray-600">${job.company}, ${job.location}</p>
        <p class="text-sm text-gray-500">${job.salary} | ${job.type
        .replace("-", " ")
        .toUpperCase()}</p>
      `;
      suggestionItem.addEventListener("click", () => {
        window.location.href = `view-details.html?jobId=${job.id}`;
      });
      suggestionsContainer.appendChild(suggestionItem);
    });

    suggestionsContainer.classList.remove("hidden");
  }

  // Job Categories page functionality
  const jobTypeSelect = document.getElementById("job-type");
  const industrySelect = document.getElementById("industry");
  const jobListings = document.getElementById("job-listings");

  function filterJobs() {
    if (!jobTypeSelect || !industrySelect || !jobListings) return;

    const jobType = jobTypeSelect.value;
    const industry = industrySelect.value;

    const filteredJobs = jobs.filter((job) => {
      const matchesType = jobType === "all" || job.type === jobType;
      const matchesIndustry = industry === "all" || job.industry === industry;
      return matchesType && matchesIndustry;
    });

    renderJobs(filteredJobs, "job-listings");
  }

  if (jobTypeSelect && industrySelect) {
    jobTypeSelect.addEventListener("change", filterJobs);
    industrySelect.addEventListener("change", filterJobs);
    renderJobs(jobs, "job-listings"); // Initial render for job_categories.html
  }

  // Index page functionality
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const trendingJobListings = document.getElementById("trending-job-listings");
  const suggestionsContainer = document.getElementById("search-suggestions");

  if (trendingJobListings) {
    renderJobs(jobs.slice(0, 6), "trending-job-listings"); // Initial render for index.html
  }

  if (searchInput) {
    // Real-time search for dropdown suggestions
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase().trim();
      const filteredJobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
      renderSearchSuggestions(filteredJobs);
    });

    // Hide suggestions when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !searchInput.contains(event.target) &&
        !suggestionsContainer.contains(event.target)
      ) {
        suggestionsContainer.classList.add("hidden");
      }
    });

    // Show suggestions when input is focused
    searchInput.addEventListener("focus", function () {
      const query = searchInput.value.toLowerCase().trim();
      if (query) {
        const filteredJobs = jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query)
        );
        renderSearchSuggestions(filteredJobs);
      }
    });
  }

  if (searchButton) {
    // Search button to filter jobs in trending section
    searchButton.addEventListener("click", function () {
      const query = searchInput.value.toLowerCase().trim();
      const filteredJobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
      renderJobs(filteredJobs, "trending-job-listings");
      suggestionsContainer.classList.add("hidden"); // Hide suggestions after search
    });
  }

  // Mobile menu toggle for index.html and feed.html
  const menuButton = document.querySelector(".md\\:hidden");
  const navLinks = document.querySelector("nav");
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
      navLinks.classList.toggle("hidden");
    });
  }
});