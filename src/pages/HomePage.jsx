import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Container, 
  Grid, 
  Card, 
  CardHeader, 
  CardMedia, 
  CardContent, 
  CardActions,
  Avatar, 
  Typography, 
  Box,
  Chip,
  IconButton,
  Divider,
  Pagination
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/Comment';

const HomePage = ({ posts }) => {
  const [page, setPage] = useState(1);
  const postsPerPage = 12; 
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const currentPosts = sortedPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );
  
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, mb: 8 }}> 
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center',
          mb: 4
        }}
      >
        Latest Posts
      </Typography>
      
      <Grid container spacing={3}>
        {currentPosts.map((post) => (
          <Grid item key={post.slug} xs={12} sm={6} md={4}> 
            <Card sx={{ 
              borderRadius: 2, 
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              height: '100%', 
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    ĐH
                  </Avatar>
                }
                title="Đoàn Đức Hữu"
                subheader={format(new Date(post.date), 'MMM d, yyyy')}
                sx={{ pb: 1 }} 
              />
              
              <CardMedia
                component="img"
                height="200"
                image={post.coverImage || "/images/default-cover.jpg"}
                alt={post.title}
                sx={{ objectFit: 'cover' }}
              />
              
              <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}> 
                <Typography variant="h6" component="h2" gutterBottom sx={{ 
                  fontWeight: 'bold',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  height: '3em', 
                }}>
                  <Link 
                    to={`/post/${post.slug}`} 
                    style={{ 
                      textDecoration: 'none', 
                      color: 'inherit',
                    }}
                  >
                    {post.title}
                  </Link>
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    height: '4.5em', 
                    mb: 1
                  }}
                >
                  {post.excerpt}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 0.5, 
                  mt: 'auto' 
                }}>
                  {post.tags && post.tags.slice(0, 2).map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      component={Link}
                      to={`/tag/${tag}`}
                      clickable
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(64, 93, 230, 0.1)',
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'rgba(64, 93, 230, 0.2)',
                        },
                        fontSize: '0.7rem',
                        height: '24px'
                      }}
                    />
                  ))}
                  {post.tags && post.tags.length > 2 && (
                    <Chip
                      label={`+${post.tags.length - 2}`}
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(64, 93, 230, 0.05)',
                        color: 'text.secondary',
                        fontSize: '0.7rem',
                        height: '24px'
                      }}
                    />
                  )}
                </Box>
              </CardContent>
              
              <Divider />
              
              <CardActions disableSpacing sx={{ p: 1, pt: 0.5, pb: 0.5 }}>
                <IconButton aria-label="like" size="small">
                  <FavoriteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="comment" size="small">
                  <CommentIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="share" size="small">
                  <ShareIcon fontSize="small" />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton aria-label="bookmark" size="small">
                  <BookmarkIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
