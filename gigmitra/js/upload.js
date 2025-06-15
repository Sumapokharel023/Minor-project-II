// Upload page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    const resumeFileInput = document.getElementById('resume-file');
    const fileInfo = document.getElementById('file-info');
    const uploadForm = document.getElementById('resume-upload-form');
    
    // File upload handling
    if (resumeFileInput) {
        resumeFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert to MB
                const fileName = file.name;
                
                // Show file info
                fileInfo.innerHTML = `
                    <div class="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-sm text-green-700">
                                <strong>${fileName}</strong> (${fileSize} MB)
                            </span>
                        </div>
                        <button type="button" class="text-green-500 hover:text-green-700" onclick="clearFile()">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                `;
                fileInfo.classList.remove('hidden');
                
                // Validate file size (10MB limit)
                if (file.size > 10 * 1024 * 1024) {
                    alert('File size must be less than 10MB');
                    clearFile();
                    return;
                }
                
                // Validate file type
                const allowedTypes = ['.pdf', '.doc', '.docx'];
                const fileExtension = '.' + fileName.split('.').pop().toLowerCase();
                if (!allowedTypes.includes(fileExtension)) {
                    alert('Please upload a PDF, DOC, or DOCX file');
                    clearFile();
                    return;
                }
            }
        });
    }
    
    // Clear file function
    window.clearFile = function() {
        resumeFileInput.value = '';
        fileInfo.classList.add('hidden');
    };
    
    // Form submission handling
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = uploadForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    field.focus();
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Check if terms are agreed
            const termsCheckbox = document.getElementById('terms-agreement');
            if (!termsCheckbox.checked) {
                alert('Please agree to the Terms & Conditions and Privacy Policy');
                termsCheckbox.focus();
                return;
            }
            
            // Simulate form submission
            const submitBtn = uploadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Uploading...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Resume uploaded successfully! You will be redirected to your profile.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                // In a real application, you would redirect to the user profile page
                // window.location.href = 'profile.html';
            }, 2000);
        });
    }
    
    // Skills textarea auto-resize
    const skillsTextarea = document.getElementById('skills');
    if (skillsTextarea) {
        skillsTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
    
    // Cover letter textarea auto-resize
    const coverLetterTextarea = document.getElementById('cover-letter');
    if (coverLetterTextarea) {
        coverLetterTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
    
    // Real-time form validation
    const inputs = uploadForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('border-red-500');
            } else {
                this.classList.remove('border-red-500');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('border-red-500') && this.value.trim()) {
                this.classList.remove('border-red-500');
            }
        });
    });
});

