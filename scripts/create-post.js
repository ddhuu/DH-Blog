import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'content', 'posts');
const logsPath = path.join(rootDir, 'Logs.md');

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: npm run create:post [tags] [title]');
  console.error('Example: npm run create:post javascript-react-frontend how-to-use-hooks-in-react');
  process.exit(1);
}

// Parse tags and title from arguments
const tagsArg = args[0];
const titleArg = args[1];

// Parse tags (split by -)
const tags = tagsArg.split('-').filter(tag => tag.trim());

// Format title for display (replace hyphens with spaces and capitalize words)
const displayTitle = titleArg
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

// Create slug from title argument (already formatted correctly)
const slug = titleArg;

// Get current date and time for filename
const now = new Date();
const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS

// Create filename with date and title
const filename = `${dateString}-${timeString}-${slug}.md`;
const filePath = path.join(postsDir, filename);

// Create frontmatter
const frontmatter = `---
title: "${displayTitle}"
date: "${now.toISOString()}"
slug: "${slug}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
excerpt: "Write your excerpt here..."
coverImage: "/images/default-cover.jpg"
---

# ${displayTitle}

Write your post content here...
`;

// Ensure posts directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Create post file
fs.writeFileSync(filePath, frontmatter);
console.log(`Post created at: ${filePath}`);

// Create tag directories and add post to each tag
tags.forEach(tag => {
  const tagDir = path.join(rootDir, 'content', 'tags', tag);
  if (!fs.existsSync(tagDir)) {
    fs.mkdirSync(tagDir, { recursive: true });
    console.log(`Created tag directory: ${tagDir}`);
  }
  
  // Create a copy of the post in the tag directory
  const tagFilePath = path.join(tagDir, filename);
  fs.writeFileSync(tagFilePath, frontmatter);
  console.log(`Added post to tag: ${tag}`);
});

// Update Logs.md
const logEntry = `\n## ${now.toLocaleString()}\n\n- Created new post: "${displayTitle}"\n- Tags: ${tags.join(', ')}\n- File: ${filename}\n`;

try {
  if (fs.existsSync(logsPath)) {
    fs.appendFileSync(logsPath, logEntry);
  } else {
    fs.writeFileSync(logsPath, `# Blog Activity Logs\n${logEntry}`);
  }
  console.log('Updated Logs.md');
} catch (error) {
  console.error('Error updating Logs.md:', error);
}

// Update Log.md with the change
const logMdPath = path.join(rootDir, 'Log.md');
const timestamp = `${now.getHours()}:${now.getMinutes()} ${now.getDate()}/${now.getMonth() + 1}`;
const logMdEntry = `\n## ${timestamp} Created new post: "${displayTitle}"\n\n### Tags\n${tags.map(tag => `- ${tag}`).join('\n')}\n\n### File\n${filename}\n`;

try {
  if (fs.existsSync(logMdPath)) {
    const logContent = fs.readFileSync(logMdPath, 'utf8');
    fs.writeFileSync(logMdPath, logContent + logMdEntry);
  }
  console.log('Updated Log.md');
} catch (error) {
  console.error('Error updating Log.md:', error);
}
