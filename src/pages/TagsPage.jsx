import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Chip,
  InputBase,
  IconButton,
  Divider,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// Styled search component (Instagram-like)
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginBottom: theme.spacing(4),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  border: '1px solid #dbdbdb',
  backgroundColor: '#efefef',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

// Styled tag chip for consistent appearance
const TagChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
  padding: theme.spacing(2),
  height: 'auto',
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 0),
    fontSize: '1rem',
  },
  margin: theme.spacing(0.5),
}));

const TagsPage = ({ tags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter tags based on search term
  const filteredTags = tags.filter(tag => 
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center',
          mb: 2
        }}
      >
        Browse Tags
      </Typography>
      
      <Typography 
        variant="body1" 
        color="text.secondary" 
        paragraph
        align="center"
        sx={{ mb: 4 }}
      >
        Discover posts by topic or category
      </Typography>
      
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search tags…"
          inputProps={{ 'aria-label': 'search tags' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Search>
      
      <Divider sx={{ mb: 4 }} />
      
      <Box sx={{ py: 2 }}>
        {filteredTags.length > 0 ? (
          <Grid container spacing={2} justifyContent="center">
            {filteredTags.map(tag => (
              <Grid item key={tag}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 2, 
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Link 
                    to={`/tag/${tag}`} 
                    style={{ textDecoration: 'none' }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <LocalOfferIcon color="primary" fontSize="large" />
                      <Typography 
                        variant="h6" 
                        component="span"
                        sx={{ color: 'text.primary' }}
                      >
                        {tag}
                      </Typography>
                    </Box>
                  </Link>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No tags found matching "{searchTerm}".
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TagsPage;
