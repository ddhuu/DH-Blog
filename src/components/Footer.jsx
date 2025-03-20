import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4, 
        mt: 'auto',
        backgroundColor: 'white',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            {year} My Blog. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <Link href="#" color="inherit" aria-label="GitHub">
              <GitHubIcon fontSize="small" />
            </Link>
            <Link href="#" color="inherit" aria-label="Twitter">
              <TwitterIcon fontSize="small" />
            </Link>
            <Link href="#" color="inherit" aria-label="LinkedIn">
              <LinkedInIcon fontSize="small" />
            </Link>
          </Stack>
        </Stack>
        
        <Divider sx={{ my: 2 }} />
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={{ xs: 1, sm: 2 }}
          justifyContent="center"
          alignItems="center"
        >
          <Link href="#" underline="hover" color="text.secondary">
            About
          </Link>
          <Link href="#" underline="hover" color="text.secondary">
            Privacy
          </Link>
          <Link href="#" underline="hover" color="text.secondary">
            Terms
          </Link>
          <Link href="#" underline="hover" color="text.secondary">
            Contact
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
