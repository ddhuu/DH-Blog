import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import TagsPage from './pages/TagsPage'
import TagPostsPage from './pages/TagPostsPage'
import NotFoundPage from './pages/NotFoundPage'

// Create a theme instance (Instagram-inspired)
const theme = createTheme({
  palette: {
    primary: {
      main: '#405DE6', // Instagram blue
      light: '#5B7AF0',
      dark: '#2C41B0',
    },
    secondary: {
      main: '#E1306C', // Instagram gradient pink/purple
      light: '#F56040', // Instagram gradient orange
      dark: '#C13584', // Instagram gradient purple
    },
    background: {
      default: '#FAFAFA', // Instagram light gray background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#262626', // Instagram text color
      secondary: '#8e8e8e', // Instagram secondary text
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.9rem',
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
        
        body {
          background-color: #fafafa;
        }
        
        a {
          text-decoration: none;
          color: inherit;
        }
      `
    },
  },
});

function App() {
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch posts from the content directory
    // For now, we'll use dummy data until we can set up proper file loading
    const dummyPosts = [
      {
        title: "Welcome to My Blog",
        date: "2025-03-20T15:28:00+07:00",
        slug: "welcome-to-my-blog",
        tags: ["introduction", "react", "markdown"],
        excerpt: "Welcome to my new blog built with React and Vite. This is a sample post to demonstrate how the blog works.",
        coverImage: "/images/default-cover.jpg",
        content: "# Welcome to My Blog!\n\nThis is a sample blog post to demonstrate how the blog works."
      },
      {
        title: "Async Await In Net",
        date: "2025-03-20T15:38:18+07:00",
        slug: "async-await-in-net",
        tags: ["asynchronous", "async_await", "net"],
        excerpt: "Learn about async/await in .NET and how to use it effectively.",
        coverImage: "/images/default-cover.jpg",
        content: "# Async Await In Net\n\nWrite your post content here..."
      }
    ];
    
    setPosts(dummyPosts);
    
    // Extract unique tags
    const allTags = dummyPosts.reduce((acc, post) => {
      if (post.tags) {
        post.tags.forEach(tag => {
          if (!acc.includes(tag)) {
            acc.push(tag);
          }
        });
      }
      return acc;
    }, []);
    
    setTags(allTags.sort());
    setIsLoading(false);
    
    // Note: For production, you would need to set up a proper build process
    // that converts markdown files to JSON or another format that can be
    // easily imported in the browser. The current approach of using import.meta.glob
    // directly in the browser can cause syntax errors.
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <main className="main-content">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage posts={posts} />} />
              <Route path="/post/:slug" element={<PostPage posts={posts} />} />
              <Route path="/tags" element={<TagsPage tags={tags} />} />
              <Route path="/tag/:tag" element={<TagPostsPage posts={posts} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
