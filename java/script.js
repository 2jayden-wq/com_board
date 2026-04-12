// --- 1. POST MANAGEMENT ---
// We use localStorage so your posts don't disappear when you refresh!
let posts = JSON.parse(localStorage.getItem('communityPosts')) || [
    { author: "Admin", text: "Welcome to the Community Hub!", date: "2026-04-12" },
    { author: "Neighbor Jane", text: "Does anyone know a good plumber?", date: "2026-04-11" }
];

// Function to display posts on index.html
function displayPosts() {
    const postContainer = document.getElementById('postFeed');
    if (!postContainer) return; // Only run if we are on the index page

    postContainer.innerHTML = ''; // Clear existing posts

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-header">@${post.author} <small style="float:right; color:gray;">${post.date}</small></div>
            <p>${post.text}</p>
        `;
        postContainer.appendChild(postDiv);
    });
}

// Function to add a new post
function createNewPost() {
    const content = prompt("What's on your mind?");
    
    if (content && content.trim() !== "") {
        const newPost = {
            author: "You",
            text: content,
            date: new Date().toLocaleDateString()
        };
        
        posts.unshift(newPost); // Add to the start of the array
        localStorage.setItem('communityPosts', JSON.stringify(posts)); // Save to memory
        displayPosts(); // Refresh the list
    }
}

// --- 2. AUTHENTICATION LOGIC ---
// This handles the "Login" and "Sign Up" actions
function handleAuth(event, type) {
    event.preventDefault(); // Stop the page from reloading instantly
    
    // In a real app, you'd send this to a server. 
    // Here, we just simulate a successful login.
    alert(`${type} successful! Redirecting to the board...`);
    window.location.href = 'index.html';
}

// --- 3. INITIALIZATION ---
// Run this code as soon as the window loads
window.onload = () => {
    displayPosts();

    // Attach events to buttons if they exist on the current page
    const postBtn = document.getElementById('newPostBtn');
    if (postBtn) {
        postBtn.onclick = createNewPost;
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (e) => handleAuth(e, 'Login');
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.onsubmit = (e) => handleAuth(e, 'Registration');
    }
};