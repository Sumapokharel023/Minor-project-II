import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me')?.checked || false;
            
            try {
                // Show loading state
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Signing In...';
                submitBtn.disabled = true;
                
                // Sign in user
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // Check if email is verified (optional - you can enable this in Firebase Console)
                // if (!user.emailVerified) {
                //     alert('Please verify your email before logging in.');
                //     return;
                // }
                
                // Get user data from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    
                    // Store user data in session or local storage based on remember me
                    const storage = rememberMe ? localStorage : sessionStorage;
                    storage.setItem('currentUser', JSON.stringify({
                        uid: user.uid,
                        email: user.email,
                        userType: userData.userType,
                        fullName: userData.fullName,
                        profileComplete: userData.profileComplete
                    }));
                    
                    alert('Login successful!');
                    
                    // Redirect based on user type
                    if (userData.userType === 'jobseeker') {
                        window.location.href = 'find-jobs.html';
                    } else {
                        window.location.href = 'employer-dashboard.html';
                    }
                } else {
                    // User exists in Auth but not in Firestore (shouldn't happen)
                    alert('User profile not found. Please contact support.');
                }
                
            } catch (error) {
                console.error("Login error:", error);
                
                // Handle specific Firebase errors
                let errorMessage = 'Login failed: ';
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/invalid-credential':
                        errorMessage += 'Invalid email or password.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage += 'Too many failed attempts. Please try again later.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage += 'This account has been disabled.';
                        break;
                    default:
                        errorMessage += error.message;
                }
                
                alert(errorMessage);
            } finally {
                // Reset button state
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Sign In';
                submitBtn.disabled = false;
            }
        });
    }
    
    // Password visibility toggle function
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
    };
});