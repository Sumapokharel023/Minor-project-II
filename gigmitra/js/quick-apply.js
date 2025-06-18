// Quick Apply page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quick-apply-form');
    const resumeInput = document.getElementById('resume');
    const resumePreview = document.getElementById('resume-preview');
    const resumeName = document.getElementById('resume-name');
    const removeResumeBtn = document.getElementById('remove-resume');

    // Resume upload functionality
    resumeInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload a PDF, DOC, or DOCX file.');
                this.value = '';
                return;
            }

            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB.');
                this.value = '';
                return;
            }

            // Show preview
            resumeName.textContent = file.name;
            resumePreview.classList.remove('hidden');
        }
    });

    // Remove resume functionality
    removeResumeBtn.addEventListener('click', function() {
        resumeInput.value = '';
        resumePreview.classList.add('hidden');
    });

    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
        });

        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            email.classList.add('border-red-500');
            isValid = false;
            alert('Please enter a valid email address.');
            return;
        }

        // Phone validation
        const phone = document.getElementById('phone');
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (phone.value && !phoneRegex.test(phone.value)) {
            phone.classList.add('border-red-500');
            isValid = false;
            alert('Please enter a valid phone number.');
            return;
        }

        if (!isValid) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Application submitted successfully! You will receive a confirmation email shortly.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // In a real application, you would redirect to a success page
            // window.location.href = 'application-success.html';
        }, 2000);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
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

    // Auto-fill demo data functionality
    const demoBtn = document.createElement('button');
    demoBtn.type = 'button';
    demoBtn.className = 'text-sm text-cyan-blue hover:text-vivid-sky-blue mb-4';
    demoBtn.textContent = 'Fill with demo data';
    demoBtn.addEventListener('click', fillDemoData);
    
    // Insert demo button after the form title
    const formTitle = document.querySelector('h1');
    formTitle.parentNode.insertBefore(demoBtn, formTitle.nextSibling);

    function fillDemoData() {
        document.getElementById('first-name').value = 'John';
        document.getElementById('last-name').value = 'Doe';
        document.getElementById('email').value = 'john.doe@example.com';
        document.getElementById('phone').value = '+977-9841234567';
        document.getElementById('current-position').value = 'Customer Service Representative';
        document.getElementById('experience').value = '1-2';
        document.getElementById('current-salary').value = '25000';
        document.getElementById('expected-salary').value = '35000';
        document.getElementById('cover-letter').value = 'I am excited to apply for the Fintech Support Specialist position at eSewa. With my background in customer service and passion for technology, I believe I would be a great fit for this role.';
        
        // Set radio buttons
        document.querySelector('input[name="availability"][value="yes"]').checked = true;
        document.querySelector('input[name="fintech-experience"][value="no"]').checked = true;
        
        // Set notice period
        document.getElementById('notice-period').value = '2-weeks';
        
        // Check terms
        document.getElementById('terms').checked = true;
    }

    // Salary range validation
    const currentSalary = document.getElementById('current-salary');
    const expectedSalary = document.getElementById('expected-salary');
    
    function validateSalaryRange() {
        const current = parseInt(currentSalary.value) || 0;
        const expected = parseInt(expectedSalary.value) || 0;
        
        if (current > 0 && expected > 0 && expected < current) {
            expectedSalary.classList.add('border-yellow-500');
            // Show warning but don't prevent submission
        } else {
            expectedSalary.classList.remove('border-yellow-500');
        }
    }
    
    currentSalary.addEventListener('input', validateSalaryRange);
    expectedSalary.addEventListener('input', validateSalaryRange);

    // Conditional notice period field
    const availabilityRadios = document.querySelectorAll('input[name="availability"]');
    const noticePeriodField = document.getElementById('notice-period').parentElement;
    
    availabilityRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'no') {
                noticePeriodField.style.display = 'block';
                document.getElementById('notice-period').setAttribute('required', 'required');
            } else {
                noticePeriodField.style.display = 'none';
                document.getElementById('notice-period').removeAttribute('required');
                document.getElementById('notice-period').value = '';
            }
        });
    });

    // Initially hide notice period field
    noticePeriodField.style.display = 'none';
});

