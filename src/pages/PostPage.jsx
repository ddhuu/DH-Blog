import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardHeader,
  CardMedia, 
  CardContent, 
  CardActions,
  Avatar, 
  Chip,
  Divider,
  IconButton,
  Button,
  Grid,
  TextField,
  Paper
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

const PostPage = ({ posts }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  
  // Find the current post by slug
  const post = posts.find(p => p.slug === slug);
  
  // Find related posts (posts with at least one matching tag)
  const relatedPosts = post ? posts.filter(p => 
    p.slug !== post.slug && // Not the current post
    p.tags && post.tags && 
    p.tags.some(tag => post.tags.includes(tag))
  ).slice(0, 3) : []; // Limit to 3 related posts
  
  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Post not found
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
        >
          Back to Home
        </Button>
      </Container>
    );
  }
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  
  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app, this would send the comment to a backend
      console.log('Comment submitted:', comment);
      setComment('');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, mb: 8 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>
      
      <Card sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        mb: 4
      }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              ĐH
            </Avatar>
          }
          title="Đoàn Đức Hữu"
          subheader={format(new Date(post.date), 'MMMM d, yyyy')}
        />
        
        <CardMedia
          component="img"
          height="400"
          image={post.coverImage || "/images/default-cover.jpg"}
          alt={post.title}
          sx={{ objectFit: 'cover' }}
        />
        
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {post.title}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {post.tags && post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                component={Link}
                to={`/tag/${tag}`}
                clickable
                sx={{ 
                  backgroundColor: 'rgba(64, 93, 230, 0.1)',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(64, 93, 230, 0.2)',
                  }
                }}
              />
            ))}
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
        </CardContent>
        
        <Divider />
        
        <CardActions disableSpacing sx={{ p: 2 }}>
          <IconButton 
            aria-label="like" 
            onClick={handleLike}
            color={liked ? 'primary' : 'default'}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            {liked ? '1 like' : '0 likes'}
          </Typography>
          
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            0 comments
          </Typography>
          
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <IconButton 
            aria-label="bookmark" 
            onClick={handleBookmark}
            color={bookmarked ? 'primary' : 'default'}
          >
            {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </CardActions>
      </Card>
      
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Leave a comment
        </Typography>
        
        <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            ĐH
          </Avatar>
          <TextField
            fullWidth
            placeholder="Write a comment..."
            multiline
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            size="small"
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={!comment.trim()}
            endIcon={<SendIcon />}
          >
            Post
          </Button>
        </Box>
      </Paper>
      
      {relatedPosts.length > 0 && (
        <>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6, mb: 3, fontWeight: 'bold' }}>
            Related Posts
          </Typography>
          
          <Grid container spacing={3}>
            {relatedPosts.map((relatedPost) => (
              <Grid item key={relatedPost.slug} xs={12} sm={4} md={4}>
                <Card sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={relatedPost.coverImage || "/images/default-cover.jpg"}
                    alt={relatedPost.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      <Link 
                        to={`/post/${relatedPost.slug}`} 
                        style={{ 
                          textDecoration: 'none', 
                          color: 'inherit',
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }}
                      >
                        {relatedPost.title}
                      </Link>
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2
                      }}
                    >
                      {relatedPost.excerpt}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', mt: 'auto' }}>
                      <Typography variant="caption" color="text.secondary">
                        {format(new Date(relatedPost.date), 'MMM d, yyyy')}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default PostPage;
