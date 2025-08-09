#!/usr/bin/env node

/**
 * Blog Post Generator - A Jekyll-like tool for creating static blog posts
 * 
 * Usage: node create-post.js "Post Title"
 * 
 * This script:
 * 1. Creates a new Markdown file with frontmatter
 * 2. Generates the corresponding HTML file from a template
 * 3. Updates the blog index with the new post
 */

const fs = require('fs');
const path = require('path');

// Get post title from command line arguments
const postTitle = process.argv[2];

if (!postTitle) {
    console.error('Usage: node create-post.js "Your Post Title"');
    process.exit(1);
}

// Generate slug from title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

// Format date
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Generate frontmatter
function generateFrontmatter(title) {
    const date = new Date();
    return `---
title: ${title}
date: ${formatDate(date)}
author: Alex Castillo
tags: []
description: A brief description of this post
---

# ${title}

Your post content goes here...

## Introduction

Start writing your blog post content here.

## Conclusion

Wrap up your thoughts here.

---

*Have thoughts on this topic? Feel free to reach out to me through [GitHub](https://github.com/AlexITC) or LinkedIn.*
`;
}

// HTML template for blog posts
function generateHTMLTemplate(title, slug, content, date) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Alex Castillo</title>
    <meta name="description" content="A brief description of this post">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#eff6ff',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            900: '#1e3a8a'
                        }
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="../style.css">
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <div class="text-xl font-bold text-primary-600 dark:text-primary-400">
                    <a href="../index.html">Alex Castillo</a>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="../index.html#home" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</a>
                    <a href="/blog/" class="text-primary-600 dark:text-primary-400 font-semibold">Blog</a>
                    <a href="../index.html#projects" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Projects</a>
                    <a href="../index.html#talks" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Talks</a>
                    <a href="../index.html#testimonials" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Testimonials</a>
                </div>
                <button id="theme-toggle" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </nav>
    </header>

    <main class="pt-24 pb-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Back to Blog Link -->
            <div class="mb-8">
                <a href="/blog/" class="text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Blog
                </a>
            </div>

            <!-- Blog Post Content -->
            <article>
                <!-- Post metadata -->
                <div class="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                    <h1 class="text-3xl md:text-4xl font-bold mb-4">${title}</h1>
                    <div class="flex items-center text-gray-600 dark:text-gray-300">
                        <img src="https://github.com/AlexITC.png" alt="Alex Castillo" class="w-10 h-10 rounded-full mr-3">
                        <div>
                            <p class="font-semibold">Alex Castillo</p>
                            <div class="flex items-center text-sm">
                                <time datetime="${date}">${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                <span class="mx-2">•</span>
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Post body -->
                <div class="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900">
                    
                    <!-- CONTENT PLACEHOLDER - Replace this with your processed markdown content -->
                    ${content}
                    
                </div>
            </article>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-2xl font-bold mb-4">Get In Touch</h2>
                <p class="text-gray-300 mb-8">Open to interesting conversations and collaboration opportunities</p>
                <div class="flex justify-center space-x-6 mb-8">
                    <a href="https://github.com/AlexITC" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </a>
                </div>
                <p class="text-gray-400 text-sm">
                    © 2024 Alex Castillo. Built with HTML, Tailwind CSS, and JavaScript.
                </p>
            </div>
        </div>
    </footer>

    <script src="../script.js"></script>
</body>
</html>`;
}

// Main execution
const slug = generateSlug(postTitle);
const date = new Date();
const dateString = formatDate(date);

// Create markdown file
const markdownContent = generateFrontmatter(postTitle);
const markdownPath = path.join(__dirname, 'blog', `${slug}.md`);

try {
    fs.writeFileSync(markdownPath, markdownContent);
    console.log(`✅ Created markdown file: ${markdownPath}`);
    
    // Create HTML file (with placeholder content)
    const htmlContent = generateHTMLTemplate(
        postTitle, 
        slug, 
        '<p class="text-lg text-gray-600 dark:text-gray-300 mb-8">Please edit this HTML file and replace this placeholder with your actual blog post content.</p>',
        dateString
    );
    const htmlPath = path.join(__dirname, 'blog', `${slug}.html`);
    
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`✅ Created HTML file: ${htmlPath}`);
    
    console.log(`\n📝 Next steps:`);
    console.log(`1. Edit ${slug}.md with your blog post content`);
    console.log(`2. Convert the markdown to HTML and update ${slug}.html`);
    console.log(`3. Update /blog/index.html to include your new post`);
    console.log(`4. Update the main index.html featured posts if needed`);
    
} catch (error) {
    console.error('Error creating blog post files:', error.message);
    process.exit(1);
}