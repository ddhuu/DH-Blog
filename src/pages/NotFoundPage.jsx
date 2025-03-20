import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const NotFoundPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          borderRadius: 2,
          textAlign: 'center',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <SentimentDissatisfiedIcon 
          sx={{ 
            fontSize: 100, 
            color: 'primary.main',
            mb: 2
          }} 
        />
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          404
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </Typography>
        
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          color="primary"
          startIcon={<HomeIcon />}
          size="large"
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
