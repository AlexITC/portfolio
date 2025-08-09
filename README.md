# Alex Castillo - Personal Portfolio & Blog

A modern, responsive personal portfolio and blog website built with HTML, Tailwind CSS, and vanilla JavaScript. Designed for GitHub Pages deployment with a Jekyll-inspired static blog system.

## 🚀 Features

### Portfolio
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Dark/Light Mode:** System preference detection with manual toggle
- **Interactive Particles:** Mouse-following particle animation system
- **Smooth Animations:** CSS transitions and scroll-based animations
- **Professional Sections:** Hero, Projects, Talks, Testimonials, Contact

### Blog System
- **Static HTML Generation:** Jekyll-inspired workflow for GitHub Pages
- **Clean URLs:** `/blog/` index and `/blog/post-name.html` for individual posts
- **Markdown Support:** Write in Markdown, publish as HTML
- **SEO Optimized:** Proper meta tags and semantic HTML
- **Typography:** Optimized reading experience with prose styling

## 📁 Project Structure

```
/
├── index.html                    # Main portfolio page
├── style.css                     # Custom CSS styles
├── script.js                     # JavaScript functionality
├── create-post.js               # Blog post generator tool
├── README.md                    # This file
└── /blog/
    ├── index.html               # Blog listing page
    ├── first-post.md           # Markdown source (optional)
    ├── building-high-performance-blockchain-applications.html
    └── [other-posts].html
```

## 🛠️ Blog Workflow

### Creating New Posts

1. **Generate Post Files:**
   ```bash
   node create-post.js "Your Amazing Blog Post Title"
   ```
   This creates:
   - `blog/your-amazing-blog-post-title.md` (Markdown template)
   - `blog/your-amazing-blog-post-title.html` (HTML template)

2. **Write Content:**
   - Edit the `.md` file with your content
   - Or directly edit the `.html` file for full control

3. **Update Blog Index:**
   - Add your new post to `blog/index.html`
   - Update the featured posts section if needed

4. **Update Main Page (Optional):**
   - Update featured blog posts in `index.html`

### Manual Post Creation

If you prefer not to use the generator:

1. Create `/blog/your-post-name.html`
2. Copy the structure from an existing post
3. Update the content, metadata, and navigation
4. Add to blog index

## 🎨 Customization

### Colors and Theming
- Primary colors defined in Tailwind config
- Dark mode classes automatically applied
- Custom CSS variables in `style.css`

### Content Updates
- **Profile Picture:** Update GitHub URL in HTML files
- **Bio Information:** Edit hero section in `index.html`
- **Projects:** Update project cards with your repositories
- **Talks:** Add your conference presentations
- **Testimonials:** Replace with actual client feedback

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add corresponding navigation link
3. Style with Tailwind classes
4. Add scroll animations if desired

## 🚀 Deployment

### GitHub Pages
1. Push all files to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Choose source: Deploy from branch `main` `/root`
4. Your site will be available at `https://username.github.io/repository-name`

### Custom Domain
1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## 🔧 Development

### Local Development
Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

### Dependencies
- **Tailwind CSS:** Loaded via CDN
- **Marked.js:** Not used in current static setup
- **No build process required:** Everything runs in the browser

## 📝 Blog Post Format

### Markdown Template
```markdown
---
title: Your Post Title
date: 2024-12-01
author: Alex Castillo
tags: [tag1, tag2, tag3]
description: Brief description for SEO
---

# Your Post Title

Your content goes here...

## Section Header

More content...
```

### HTML Structure
- Semantic HTML5 elements
- Proper heading hierarchy
- Meta tags for SEO
- Responsive images
- Accessible navigation

## 🎯 SEO Optimizations

- Semantic HTML structure
- Meta descriptions for each page
- Open Graph tags (can be added)
- Sitemap generation (manual)
- Mobile-responsive design
- Fast loading times

## 🔒 Security & Performance

- No external dependencies beyond CDN
- Minimal JavaScript footprint
- Optimized images and assets
- CSP-friendly inline styles
- No server-side processing required

## 📊 Analytics Integration

To add analytics, insert your tracking code in the `<head>` section of:
- `index.html`
- `blog/index.html`
- Blog post template in `create-post.js`

## 🤝 Contributing

This is a personal website template, but feel free to:
- Fork and adapt for your own use
- Submit bug reports or feature suggestions
- Share improvements or optimizations

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using HTML, Tailwind CSS, and JavaScript. Perfect for developers who want a fast, modern portfolio without the complexity of a full static site generator.