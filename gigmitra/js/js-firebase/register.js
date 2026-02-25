import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get account type
            const accountType = document.querySelector('input[name="account-type"]:checked')?.value;
            
            // Get form values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Validate terms agreement
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                alert('Please agree to the Terms & Conditions');
                return;
            }
            
            try {
                // Show loading state
                const submitBtn = signinForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Creating Account...';
                submitBtn.disabled = true;
                
                // Create user in Firebase Auth
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // Prepare user data for Firestore
                const userData = {
                    firstName: firstName,
                    lastName: lastName,
                    fullName: `${firstName} ${lastName}`,
                    email: email,
                    phone: phone,
                    userType: accountType,
                    createdAt: new Date().toISOString(),
                    uid: user.uid,
                    profileComplete: false,
                    profilePicture: '',
                    newsletter: document.getElementById('newsletter')?.checked || false
                };
                
                // Save user data to Firestore
                await setDoc(doc(db, "users", user.uid), userData);
                
                // Send verification email
                // Note: You need to enable email verification in Firebase Console
                
                alert('Registration successful! Please check your email for verification.');
                
                // Redirect based on user type
                if (accountType === 'jobseeker') {
                    window.location.href = 'upload.html?newuser=true';
                } else {
                    window.location.href = 'employer-dashboard.html?newuser=true';
                }
                
            } catch (error) {
                console.error("Registration error:", error);
                
                // Handle specific Firebase errors
                let errorMessage = 'Registration failed: ';
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage += 'Email already in use. Please use a different email or login.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage += 'Invalid email address.';
                        break;
                    case 'auth/weak-password':
                        errorMessage += 'Password should be at least 6 characters.';
                        break;
                    default:
                        errorMessage += error.message;
                }
                
                alert(errorMessage);
            } finally {
                // Reset button state
                const submitBtn = signinForm.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Create Account';
                submitBtn.disabled = false;
            }
        });
    }
    
    // Password visibility toggle function (add to global scope)
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
    };
});