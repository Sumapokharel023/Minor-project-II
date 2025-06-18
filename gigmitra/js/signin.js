// Sign-in page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form');
    const accountTypeRadios = document.querySelectorAll('input[name="account-type"]');
    
    // Account type selection styling
    accountTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove selected styling from all cards
            document.querySelectorAll('.account-type-card').forEach(card => {
                card.classList.remove('border-cyan-blue', 'bg-cyan-50');
                card.classList.add('border-gray-300');
            });
            
            // Add selected styling to chosen card
            const selectedCard = this.closest('label').querySelector('.account-type-card');
            selectedCard.classList.remove('border-gray-300');
            selectedCard.classList.add('border-cyan-blue', 'bg-cyan-50');
        });
    });
    
    // Initialize first option as selected
    const firstRadio = document.querySelector('input[name="account-type"]:checked');
    if (firstRadio) {
        const firstCard = firstRadio.closest('label').querySelector('.account-type-card');
        firstCard.classList.remove('border-gray-300');
        firstCard.classList.add('border-cyan-blue', 'bg-cyan-50');
    }
    
    // Password toggle functionality
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
    };
    
    // Form submission handling
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = signinForm.querySelectorAll('[required]');
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
            
            // Password validation
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                document.getElementById('password').focus();
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                document.getElementById('confirm-password').focus();
                return;
            }
            
            // Email validation
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                document.getElementById('email').focus();
                return;
            }
            
            // Terms validation
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                alert('Please agree to the Terms & Conditions and Privacy Policy');
                termsCheckbox.focus();
                return;
            }
            
            // Simulate form submission
            const submitBtn = signinForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Account created successfully! Welcome to GigMitra!');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Get selected account type
                const selectedAccountType = document.querySelector('input[name="account-type"]:checked').value;
                
                // Redirect based on account type
                if (selectedAccountType === 'employer') {
                    window.location.href = 'employer-dashboard.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 2000);
        });
    }
    
    // Real-time form validation
    const inputs = signinForm.querySelectorAll('input, select');
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
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('button[type="button"]');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.textContent.trim();
            alert(`${provider} login coming soon!`);
        });
    });
});

