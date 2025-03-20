import { Link } from 'react-router-dom'
import { format } from 'date-fns'

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      {post.coverImage && (
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="post-card-image" 
        />
      )}
      <div className="post-card-content">
        <div className="post-card-date">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </div>
        <h2 className="post-card-title">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-tags">
          {post.tags && post.tags.map(tag => (
            <Link to={`/tag/${tag}`} key={tag} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostCard
