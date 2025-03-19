// Toggle Dark/Light Mode
document.getElementById('mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const mode = document.body.classList.contains('dark-mode') ? '🌙 Dark Mode' : '☀ Light Mode';
    this.textContent = mode;
});

// Store blog posts in localStorage
let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

function saveBlogs() {
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

// Render Blog Posts
function renderBlogs() {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = ''; // Clear current posts

    blogs.forEach((blog, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <img src="${blog.image}" alt="Blog Image">
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        blogList.appendChild(postDiv);
    });
}

// Add New Blog Post
function addPostForm() {
    document.getElementById('post-form-container').classList.remove('hidden');
}

// Close the form
function closePostForm() {
    document.getElementById('post-form-container').classList.add('hidden');
}

// Create a New Blog Post
function createPost(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').value || 'https://via.placeholder.com/800x400';

    const newPost = { title, content, image };
    blogs.push(newPost);
    saveBlogs();
    renderBlogs();
    closePostForm();
}

// Edit a Blog Post
function editPost(index) {
    const blog = blogs[index];
    document.getElementById('post-title').value = blog.title;
    document.getElementById('post-content').value = blog.content;
    document.getElementById('post-image').value = blog.image;
    addPostForm();
    deletePost(index); // Delete to avoid duplicates after editing
}

// Delete a Blog Post
function deletePost(index) {
    blogs.splice(index, 1);
    saveBlogs();
    renderBlogs();
}

// Search Blogs
function searchBlogs() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery) ||
        blog.content.toLowerCase().includes(searchQuery)
    );

    renderFilteredBlogs(filteredBlogs);
}

// Render Filtered Blogs
function renderFilteredBlogs(filteredBlogs) {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = '';
    filteredBlogs.forEach((blog, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <img src="${blog.image}" alt="Blog Image">
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        blogList.appendChild(postDiv);
    });
}

// Initial Render
renderBlogs();
