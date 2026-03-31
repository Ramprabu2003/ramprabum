# My Portfolio Website
Your site is live at https://ramprabu2003.github.io/ramprabum/
A modern, responsive portfolio website built with HTML, CSS, and Bootstrap 5.

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── assets/
│   ├── style.css          # Custom CSS styles
│   ├── script.js          # JavaScript interactions
│   ├── profile.jpg        # Profile picture (add your own)
│   ├── project1.jpg       # Project 1 image (add your own)
│   ├── project2.jpg       # Project 2 image (add your own)
│   └── project3.jpg       # Project 3 image (add your own)
└── README.md              # This file
```

## ✨ Features

### 🎨 Design & Layout
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Bootstrap 5**: Built on the popular Bootstrap framework for consistency and reliability
- **Modern Gradients**: Beautiful gradient backgrounds and animations
- **Smooth Animations**: Scroll animations and hover effects for smooth interactions
- **Sticky Navigation**: Navbar stays at the top while scrolling
- **Dark Theme Navigation**: Professional dark navigation bar with active link indicators

### 📑 Sections
1. **Hero/Home Section**: Eye-catching introduction with call-to-action buttons
2. **About Section**: Brief introduction with feature cards
3. **Projects Section**: Showcase your best projects with descriptions and technologies used
4. **Skills Section**: Animated progress bars showing technical proficiency
5. **Contact Section**: Functional contact form with validation
6. **Footer**: Social media links and copyright information

### 🔧 Interactive Features
- **Form Validation**: Client-side validation for the contact form
- **Smooth Scrolling**: Smooth navigation between sections
- **Scroll-to-Top Button**: Handy button to return to the top of the page
- **Active Navigation**: Nav links highlight the current section automatically
- **Progress Bar Animation**: Skill bars animate when scrolling into view
- **Intersection Observer**: Elements fade in as they come into view

### 🎯 Customization

#### Update Profile & Projects
1. Replace the image placeholders:
   - `assets/profile.jpg` - Your profile picture
   - `assets/project1.jpg` - First project screenshot
   - `assets/project2.jpg` - Second project screenshot
   - `assets/project3.jpg` - Third project screenshot

#### Edit Content
Open `index.html` in a text editor and customize:
- Your name and title in the hero section
- About section content
- Project descriptions and technologies
- Skills and proficiency levels
- Contact form
- Social media links

#### Styling Changes
All custom styles are in `assets/style.css`. Variables are defined at the top:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    /* ... more colors ... */
}
```

## 🚀 Getting Started

### Option 1: Open in Browser
Simply double-click `index.html` to open it in your default browser.

### Option 2: Use a Local Server
For better performance and to avoid CORS issues, run a local server:

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (with http-server):**
```bash
npx http-server
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## 📱 Responsive Breakpoints

The portfolio is optimized for:
- **Desktop**: 1200px and above (full features)
- **Tablet**: 768px to 1199px (optimized layout)
- **Mobile**: Below 768px (mobile-first design)

## 🎨 Color Scheme

The portfolio uses a modern purple-blue gradient:
- **Primary Gradient**: `#667eea` to `#764ba2`
- **Accent Colors**: Blues, greens, and grays from Bootstrap 5

## 🔗 External Dependencies

The portfolio uses:
- **Bootstrap 5.3.0**: CSS framework from CDN
- **Font Awesome 6.4.0**: Icon library from CDN
- **Google Fonts**: (Optional, can be added)

All external resources are loaded from CDNs, so no local installation is needed.

## 📝 Form Integration (No Backend)

This project is already configured to send contact form messages using only JavaScript via FormSubmit.

- Works on static hosting (including GitHub Pages)
- No Node.js/Python/PHP backend needed
- No `mailto:` flow, so user mail app will not open

### Current Setup

1. Contact form in `index.html` uses:
   - `id="contactForm"`
   - `data-recipient-email="your-email@example.com"`
2. `assets/script.js` sends form data with `fetch()` to:
   - `https://formsubmit.co/ajax/<recipient-email>`

### One-Time Activation (Important)

After first submit, FormSubmit sends a verification email to your recipient email.
You must verify once, then all future form submissions will arrive in your inbox.

### Change Recipient Email

In `index.html`, update this value:

```html
<form class="contact-form" id="contactForm" data-recipient-email="your-email@example.com" novalidate>
```

## 🌐 Deployment

Deploy your portfolio to:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Static hosting supported (form email works via JS + FormSubmit)
- **Traditional Hosting**: Upload files via FTP

### GitHub Pages Steps

1. Push this project to a GitHub repository.
2. In GitHub: `Settings` -> `Pages`.
3. Under `Build and deployment`, choose:
    - Source: `Deploy from a branch`
    - Branch: `main` (or your default branch), folder `/ (root)`
4. Save and wait for deployment.
5. Open your GitHub Pages URL and test contact form.

## 🎓 Learning Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)

## 📄 License

This portfolio template is free to use and customize for personal or commercial projects.

## 🤝 Support

For questions or issues:
1. Check the HTML comments in the code
2. Review Bootstrap 5 documentation
3. Consult Font Awesome docs for icon names

## 🎉 Tips for Success

1. **Keep it Fresh**: Update your projects regularly
2. **Optimize Images**: Compress images before uploading to reduce load time
3. **Test Responsiveness**: Check on different devices before deploying
4. **Add Your Content**: Replace all placeholder text and images
5. **Test Contact Form**: Make sure form validation works as expected
6. **Add Analytics**: Consider adding Google Analytics to track visitors
7. **SEO Optimization**: Add meta descriptions and keywords in the HTML head

---

Built with ❤️ using HTML, CSS & Bootstrap 5
