import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Check authentication state on every page
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        console.log('User is logged in:', user.email);
        
        // Update UI for logged-in users
        updateUIForLoggedInUser(user);
        
        // Fetch user data from Firestore
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                window.currentUserData = userDoc.data();
                // Dispatch event for other scripts to use
                window.dispatchEvent(new CustomEvent('userDataLoaded', { 
                    detail: userDoc.data() 
                }));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        // User is signed out
        console.log('User is logged out');
        
        // Update UI for logged-out users
        updateUIForLoggedOutUser();
    }
});

// Update UI elements based on auth state
function updateUIForLoggedInUser(user) {
    // Hide login/signup buttons
    const signUpButtons = document.querySelectorAll('a[href="signin.html"]');
    const signInButtons = document.querySelectorAll('a[href="login.html"]');
    const forEmployerLinks = document.querySelectorAll('a[href="employer-dashboard.html"]');
    
    signUpButtons.forEach(btn => {
        if (btn.closest('button')) {
            btn.closest('button').style.display = 'none';
        } else {
            btn.style.display = 'none';
        }
    });
    
    signInButtons.forEach(btn => {
        if (btn.closest('button')) {
            btn.closest('button').style.display = 'none';
        } else {
            btn.style.display = 'none';
        }
    });
    
    // Show user profile dropdown or logout button
    addUserMenu(user);
}

function updateUIForLoggedOutUser() {
    // Show login/signup buttons
    const signUpButtons = document.querySelectorAll('a[href="signin.html"]');
    const signInButtons = document.querySelectorAll('a[href="login.html"]');
    
    signUpButtons.forEach(btn => {
        if (btn.closest('button')) {
            btn.closest('button').style.display = 'block';
        } else {
            btn.style.display = 'block';
        }
    });
    
    signInButtons.forEach(btn => {
        if (btn.closest('button')) {
            btn.closest('button').style.display = 'block';
        } else {
            btn.style.display = 'block';
        }
    });
    
    // Remove user menu if exists
    const userMenu = document.getElementById('user-menu-container');
    if (userMenu) {
        userMenu.remove();
    }
}

function addUserMenu(user) {
    // Check if user menu already exists
    if (document.getElementById('user-menu-container')) return;
    
    // Get the header right section
    const headerRight = document.querySelector('.flex.items-center.space-x-2');
    if (!headerRight) return;
    
    // Create user menu container
    const userMenuContainer = document.createElement('div');
    userMenuContainer.id = 'user-menu-container';
    userMenuContainer.className = 'relative';
    
    // Get user initials
    const email = user.email;
    const initials = email.substring(0, 2).toUpperCase();
    
    userMenuContainer.innerHTML = `
        <button id="user-menu-button" class="flex items-center space-x-2 bg-electric-blue text-white px-4 py-2 rounded hover:bg-azure-blue">
            <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span class="text-electric-blue font-semibold text-sm">${initials}</span>
            </div>
            <span class="hidden md:block">${email.split('@')[0]}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        
        <div id="user-menu-dropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden z-50">
            <div class="py-2">
                <div class="px-4 py-2 border-b border-gray-200">
                    <p class="text-sm font-medium text-gray-900">${email}</p>
                </div>
                <a href="profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span>My Profile</span>
                    </div>
                </a>
                <a href="settings.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>Settings</span>
                    </div>
                </a>
                <div class="border-t border-gray-200 mt-2 pt-2">
                    <button id="logout-btn" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            <span>Sign Out</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    headerRight.appendChild(userMenuContainer);
    
    // Add event listeners for dropdown
    const menuButton = document.getElementById('user-menu-button');
    const dropdown = document.getElementById('user-menu-dropdown');
    
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userMenuContainer.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
    
    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
            alert('Error logging out: ' + error.message);
        }
    });
}

// Export for use in other files
export const getCurrentUser = () => {
    return auth.currentUser;
};