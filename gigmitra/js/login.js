// Login page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    // Password toggle functionality
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        const button = input.nextElementSibling;
        const icon = button.querySelector('svg');
        
        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text');
            // Change to "eye-off" icon
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
            `;
        } else {
            input.setAttribute('type', 'password');
            // Change back to "eye" icon
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            `;
        }
    };
    
    // Form submission handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email.trim()) {
                alert('Please enter your email address');
                document.getElementById('login-email').focus();
                return;
            }
            
            if (!password.trim()) {
                alert('Please enter your password');
                document.getElementById('login-password').focus();
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                document.getElementById('login-email').focus();
                return;
            }
            
            // Demo credentials check
            const demoCredentials = [
                { email: 'demo@jobseeker.com', password: 'password123', type: 'Job Seeker' },
                { email: 'demo@employer.com', password: 'password123', type: 'Employer' }
            ];
            
            const matchedDemo = demoCredentials.find(cred => 
                cred.email === email && cred.password === password
            );
            
            // Simulate form submission
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing In...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                if (matchedDemo) {
                    alert(`Welcome back! Logged in as ${matchedDemo.type}`);
                } else {
                    alert('Login successful! Welcome back to GigMitra!');
                }
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                // In a real application, you would redirect to the dashboard
                // window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
    
    // Real-time form validation
    const inputs = loginForm.querySelectorAll('input');
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
    
    // Social login buttons - Remove the alert for coming soon
    const socialButtons = document.querySelectorAll('button[type="button"]');
    socialButtons.forEach(button => {
        // Skip the password toggle button
        if (!button.closest('.relative')) {
            button.addEventListener('click', function() {
                const provider = this.textContent.trim();
                alert(`${provider} login coming soon!`);
            });
        }
    });
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('a[href="#"]');
    if (forgotPasswordLink && forgotPasswordLink.textContent.includes('Forgot password')) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Please enter your email address to reset your password:');
            if (email) {
                alert('Password reset instructions have been sent to your email address.');
            }
        });
    }
});

