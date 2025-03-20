import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '../..')
const postsDir = path.join(rootDir, 'content', 'posts')
const tagsDir = path.join(rootDir, 'content', 'tags')

/**
 * Parse a markdown file and extract frontmatter and content
 * @param {string} filePath - Path to the markdown file
 * @returns {Object} - Parsed markdown file with frontmatter and content
 */
export const parseMarkdownFile = (filePath) => {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    ...data,
    content,
  }
}

/**
 * Get all markdown files from a directory
 * @param {string} dir - Directory to search for markdown files
 * @returns {Array} - Array of file paths
 */
export const getMarkdownFiles = (dir) => {
  if (!fs.existsSync(dir)) {
    return []
  }
  
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(dir, file))
}

/**
 * Get all posts
 * @returns {Array} - Array of parsed posts
 */
export const getAllPosts = () => {
  const files = getMarkdownFiles(postsDir)
  
  return files.map(file => {
    const post = parseMarkdownFile(file)
    return post
  })
}

/**
 * Get all tags
 * @returns {Array} - Array of tag names
 */
export const getAllTags = () => {
  if (!fs.existsSync(tagsDir)) {
    return []
  }
  
  return fs.readdirSync(tagsDir)
    .filter(file => {
      const filePath = path.join(tagsDir, file)
      return fs.statSync(filePath).isDirectory()
    })
}

/**
 * Get all posts for a specific tag
 * @param {string} tag - Tag name
 * @returns {Array} - Array of parsed posts
 */
export const getPostsByTag = (tag) => {
  const tagDir = path.join(tagsDir, tag)
  
  if (!fs.existsSync(tagDir)) {
    return []
  }
  
  const files = getMarkdownFiles(tagDir)
  
  return files.map(file => {
    const post = parseMarkdownFile(file)
    return post
  })
}
