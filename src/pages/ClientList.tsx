import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Typography,
  Chip,
  Paper
} from "@mui/material";
import { Link } from "react-router-dom";
import { useClients } from "../hooks/useClients";
import PersonIcon from '@mui/icons-material/Person';

const ClientList = () => {
  const { data: clients, isLoading, error } = useClients();

  if (isLoading) return (
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <CircularProgress />
    </Paper>
  );

  if (error) return (
    <Paper sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
      Erro ao carregar clientes
    </Paper>
  );

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <PersonIcon /> Lista de Clientes
      </Typography>

      <List sx={{
        maxHeight: '60vh',
        overflow: 'auto',
        '& .MuiListItem-root:hover': {
          backgroundColor: 'action.hover',
          borderRadius: 2
        },
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#E3F2FD', 
          borderRadius: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c9dae6', 
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#b5c8d6', 
        }
      }}>
        {clients?.length ? (
          clients.map((client) => (
            <ListItem
              key={client.id}
              component={Link}
              to={`/client/${client.id}`}
              sx={{
                borderBottom: '1px solid #ccc', 
                paddingY: '10px', 
                '&:last-child': {
                  borderBottom: 'none', 
                },
                '&:hover': {
                  backgroundColor: 'action.hover', 
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="500">
                    {client.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {client.email}
                  </Typography>
                }
              />
              <Chip
                label="Ativo"
                color="success"
                size="small"
                variant="outlined"
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" textAlign="center" sx={{ py: 3 }}>
            Nenhum cliente encontrado
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default ClientList;
