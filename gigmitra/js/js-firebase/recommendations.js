import { db } from "./firebase-config.js";
import { collection, query, where, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// For Job Seekers: Find matching jobs
export async function findJobsForJobSeeker(userId) {
    try {
        // Get job seeker's profile
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
            console.error("User not found");
            return [];
        }
        
        const userData = userSnap.data();
        
        if (userData.userType !== 'jobseeker') {
            console.error("User is not a job seeker");
            return [];
        }
        
        // Get all jobs from Firestore
        const jobsRef = collection(db, "jobs");
        const jobsSnap = await getDocs(jobsRef);
        
        const recommendations = [];
        
        jobsSnap.forEach((jobDoc) => {
            const jobData = jobDoc.data();
            let score = 0;
            let matchReasons = [];
            
            // Skip if job is expired
            if (jobData.expiresAt && new Date(jobData.expiresAt) < new Date()) {
                return;
            }
            
            // Calculate match score based on skills
            if (userData.skills && jobData.requiredSkills) {
                const userSkills = Array.isArray(userData.skills) ? userData.skills : 
                                  (userData.skills ? userData.skills.split(',').map(s => s.trim().toLowerCase()) : []);
                const jobSkills = Array.isArray(jobData.requiredSkills) ? jobData.requiredSkills :
                                 (jobData.requiredSkills ? jobData.requiredSkills.split(',').map(s => s.trim().toLowerCase()) : []);
                
                const commonSkills = userSkills.filter(skill => 
                    jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
                );
                
                if (commonSkills.length > 0) {
                    score += commonSkills.length * 15; // 15 points per matching skill
                    matchReasons.push(`${commonSkills.length} matching skills`);
                }
            }
            
            // Match based on experience
            if (userData.experience && jobData.minExperience) {
                const userExp = parseInt(userData.experience) || 0;
                const jobMinExp = parseInt(jobData.minExperience) || 0;
                
                if (userExp >= jobMinExp) {
                    score += 20;
                    matchReasons.push('Meets experience requirement');
                } else if (userExp >= jobMinExp - 1) {
                    score += 10;
                    matchReasons.push('Close to experience requirement');
                }
            }
            
            // Match based on job type
            if (userData.preferredJobType && jobData.jobType) {
                if (userData.preferredJobType.toLowerCase() === jobData.jobType.toLowerCase()) {
                    score += 15;
                    matchReasons.push('Preferred job type');
                }
            }
            
            // Match based on location
            if (userData.preferredLocation && jobData.location) {
                if (userData.preferredLocation.toLowerCase().includes(jobData.location.toLowerCase()) ||
                    jobData.location.toLowerCase().includes(userData.preferredLocation.toLowerCase())) {
                    score += 10;
                    matchReasons.push('Location match');
                }
            }
            
            // Match based on industry
            if (userData.industry && jobData.industry) {
                if (userData.industry.toLowerCase() === jobData.industry.toLowerCase()) {
                    score += 10;
                    matchReasons.push('Industry match');
                }
            }
            
            // Only include jobs with minimum score
            if (score >= 20) {
                recommendations.push({
                    jobId: jobDoc.id,
                    ...jobData,
                    matchScore: score,
                    matchReasons: matchReasons,
                    isRecommended: true
                });
            }
        });
        
        // Sort by match score (highest first)
        return recommendations.sort((a, b) => b.matchScore - a.matchScore);
        
    } catch (error) {
        console.error("Error finding jobs for job seeker:", error);
        return [];
    }
}

// For Employers: Find matching job seekers for a specific job
export async function findJobSeekersForJob(jobId) {
    try {
        // Get job details
        const jobRef = doc(db, "jobs", jobId);
        const jobSnap = await getDoc(jobRef);
        
        if (!jobSnap.exists()) {
            console.error("Job not found");
            return [];
        }
        
        const jobData = jobSnap.data();
        
        // Get all job seekers
        const seekersRef = collection(db, "users");
        const seekersQuery = query(seekersRef, where("userType", "==", "jobseeker"));
        const seekersSnap = await getDocs(seekersQuery);
        
        const recommendations = [];
        
        seekersSnap.forEach((seekerDoc) => {
            const seekerData = seekerDoc.data();
            let score = 0;
            let matchReasons = [];
            
            // Calculate match score based on skills
            if (seekerData.skills && jobData.requiredSkills) {
                const seekerSkills = Array.isArray(seekerData.skills) ? seekerData.skills :
                                    (seekerData.skills ? seekerData.skills.split(',').map(s => s.trim().toLowerCase()) : []);
                const jobSkills = Array.isArray(jobData.requiredSkills) ? jobData.requiredSkills :
                                 (jobData.requiredSkills ? jobData.requiredSkills.split(',').map(s => s.trim().toLowerCase()) : []);
                
                const commonSkills = seekerSkills.filter(skill => 
                    jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
                );
                
                if (commonSkills.length > 0) {
                    score += commonSkills.length * 15;
                    matchReasons.push(`${commonSkills.length} matching skills`);
                }
            }
            
            // Match based on experience
            if (seekerData.experience && jobData.minExperience) {
                const seekerExp = parseInt(seekerData.experience) || 0;
                const jobMinExp = parseInt(jobData.minExperience) || 0;
                
                if (seekerExp >= jobMinExp) {
                    score += 20;
                    matchReasons.push('Meets experience requirement');
                }
            }
            
            // Match based on education
            if (jobData.requiredEducation && seekerData.education) {
                if (seekerData.education.toLowerCase().includes(jobData.requiredEducation.toLowerCase())) {
                    score += 10;
                    matchReasons.push('Education match');
                }
            }
            
            // Only include seekers with minimum score
            if (score >= 20) {
                recommendations.push({
                    seekerId: seekerDoc.id,
                    seekerData: seekerData,
                    matchScore: score,
                    matchReasons: matchReasons,
                    isRecommended: true
                });
            }
        });
        
        return recommendations.sort((a, b) => b.matchScore - a.matchScore);
        
    } catch (error) {
        console.error("Error finding job seekers for job:", error);
        return [];
    }
}

// Display recommendations on job seeker dashboard
export async function displayJobRecommendations(userId) {
    const recommendations = await findJobsForJobSeeker(userId);
    
    // Find the recommendations container in your HTML
    const container = document.getElementById('recommended-jobs');
    if (!container) return;
    
    if (recommendations.length === 0) {
        container.innerHTML = '<p class="text-gray-600">No job recommendations available yet. Complete your profile to get better matches!</p>';
        return;
    }
    
    // Display top 5 recommendations
    const topRecommendations = recommendations.slice(0, 5);
    
    container.innerHTML = topRecommendations.map(job => `
        <div class="bg-white p-6 rounded-lg shadow-lg mb-4 border-l-4 border-electric-blue">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-xl font-semibold text-midnight-blue mb-2">${job.title}</h3>
                    <p class="text-gray-600 mb-1">${job.company} • ${job.location}</p>
                    <p class="text-gray-600 mb-2">${job.salary} • ${job.jobType}</p>
                    <div class="flex flex-wrap gap-2 mb-3">
                        ${job.matchReasons.map(reason => 
                            `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">${reason}</span>`
                        ).join('')}
                    </div>
                    <p class="text-sm text-gray-500">Match Score: ${job.matchScore}%</p>
                </div>
                <div class="text-right">
                    <span class="bg-electric-blue text-white px-3 py-1 rounded-full text-sm">Recommended</span>
                </div>
            </div>
            <button class="mt-4 bg-cyan-blue text-white px-4 py-2 rounded-lg hover:bg-vivid-sky-blue view-job-btn" data-job-id="${job.jobId}">
                View Job Details
            </button>
        </div>
    `).join('');
    
    // Add event listeners to view job buttons
    container.querySelectorAll('.view-job-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const jobId = btn.dataset.jobId;
            window.location.href = `view-details.html?jobId=${jobId}`;
        });
    });
}