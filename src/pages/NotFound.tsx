
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

const NotFound = () => {
  return (
      <Container maxWidth="md" sx={{ mt: 4, py: 3 }}>
         <Box 
        sx={{
          textAlign: 'center',
          padding: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      <Typography variant="h4" color="error">404 - Página Não Encontrada</Typography>
      <Typography variant="body1">Desculpe, a página que você está procurando não existe.</Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Voltar para a Home
      </Button>
      </Box>
      </Container>
  );
};

export default NotFound;
