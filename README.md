# DH Blog - Modern React Blog Platform

![DH Blog](https://img.shields.io/badge/DH%20Blog-Modern%20React%20Blog-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![Material UI](https://img.shields.io/badge/Material%20UI-5.x-0081CB)

DH Blog is a modern, Instagram-inspired blog platform built with React and Material UI. It features a clean, responsive design with a tag-based organization system and markdown content support.

[**Visit the Live Blog**](https://dh-blog-kohl.vercel.app/)

## 🚀 Features

- **Modern UI**: Instagram-inspired interface with Material UI components
- **Responsive Design**: Optimized for all screen sizes
- **Tag-Based Organization**: Filter posts by tags with an intuitive interface
- **Markdown Support**: Write content in Markdown format
- **Plugin-like Tag System**: Adding a folder in the tags directory creates a new tag in the UI
- **Command-line Post Creation**: Create posts with a simple command
- **Automatic Organization**: Posts are stored in both the main posts directory and relevant tag directories

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/dh-blog.git
cd dh-blog
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**

Visit `http://localhost:5173` to see the blog in action.

## 📝 Creating Blog Posts

### Using the Command Line Tool

The blog comes with a command-line tool to create new posts:

```bash
npm run create:post [tags] [title]
```

- `[tags]`: A hyphen-separated list of tags (e.g., `react-javascript-tutorial`)
- `[title]`: A hyphen-separated title (e.g., `how-to-use-react-hooks`)

**Example:**

```bash
npm run create:post javascript-react-hooks understanding-react-hooks
```

This will:
1. Create a new markdown file with the current date and time in the filename
2. Add the specified tags to the post metadata
3. Format the title properly
4. Place the post in the main posts directory
5. Create copies in each tag directory

### Post File Structure

Posts are stored as markdown files with the following format:

```markdown
---
title: Understanding React Hooks
date: 2025-03-20T16:00:00
tags: javascript, react, hooks
---

Your post content here...
```

## 🗂️ Project Structure

```
dh-blog/
├── content/
│   ├── posts/           # All blog posts
│   └── tags/            # Tag-specific directories with post copies
├── public/              # Static assets
├── scripts/             # Utility scripts
│   └── create-post.js   # Post creation script
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   └── utils/           # Utility functions
├── .gitignore
├── package.json
└── README.md
```

## 🔄 Workflow

### Adding a New Post

1. Run the create post command:
   ```bash
   npm run create:post [tags] [title]
   ```

2. Edit the generated markdown file in the `content/posts` directory to add your content.

### Deleting a Post

1. Delete the post file from the `content/posts` directory.
2. Delete the corresponding files from each tag directory in `content/tags`.

### Adding a New Tag

Simply create a new directory in the `content/tags` folder. The tag will automatically appear in the UI.

## 🚢 Deployment

The blog is configured for easy deployment to Vercel:

1. Push your repository to GitHub.
2. Connect your repository to Vercel.
3. Vercel will automatically deploy your blog.

## 🧩 Customization

### Changing the Theme

Edit the theme in `src/App.jsx`:

```jsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#405de6', // Change this to your preferred color
    },
    // ...
  },
  // ...
});
```

### Modifying the Layout

The main layout components are:
- `src/components/Header.jsx`
- `src/components/Footer.jsx`
- `src/pages/HomePage.jsx`

Edit these files to customize the layout to your preferences.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)

---

Made with ❤️ by [Đoàn Đức Hữu](https://github.com/ddhuu)
