import styled from "styled-components";
import AddClientComponent from '../components/AddClient';
import { useClients } from '../hooks/useClients'; 
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; 

const StyledPaper = styled(Paper)`
  position: sticky;
  top: 20px;
  margin: 0 auto;
  border-radius: 8px!important;
  padding: 20px;
  width: 30rem;
  box-shadow: 3;

  @media (max-width: 500px) {
    width: 20rem; 
  }
`;

const AddClientPage = () => {
  // Usa o hook personalizado para obter a lista de clientes existentes
  const { data: existingClients = [], isLoading, error } = useClients();

  // Verifica se está carregando ou se houve um erro
  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px', color: 'error.main' }}>
        <Typography>Erro ao carregar clientes: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <StyledPaper>
       <Typography variant="h5" component="h2" gutterBottom sx={{
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>   
      <PersonAddIcon />
        Adicionar Cliente
      </Typography>
      <AddClientComponent existingClients={existingClients} />
    </StyledPaper>
  );
};

export default AddClientPage;
