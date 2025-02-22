import { Button, Container, Grid, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, py: 3 }}>
      <Box 
        sx={{
          textAlign: 'center',
          padding: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Notas de Sessão de Clientes
        </Typography>
        
        <Typography variant="h6" color="text.secondary">
          Gerencie notas de sessão e informações de clientes de forma eficiente
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
              <PeopleIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/add-client"
                size="large"
                sx={{ py: 1.5 }}
              >
                Novo Cliente
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
              <NoteAddIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/clients"
                size="large"
                sx={{ py: 1.5, borderWidth: 2 }}
              >
                Ver Clientes
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
