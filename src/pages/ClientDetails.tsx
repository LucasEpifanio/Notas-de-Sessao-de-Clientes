import { useParams } from "react-router-dom";
import { useClients } from "../hooks/useClients";
import { useSessionNotes } from "../hooks/useSessionNotes";
import AddSessionNote from "../components/AddSessionNote";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: clients, isLoading: loadingClients, error: clientsError } = useClients();
  const { data: sessionNotes, isLoading: loadingNotes, error: notesError } = useSessionNotes();

  if (loadingClients || loadingNotes) return <Typography>Carregando...</Typography>;
  if (clientsError || notesError) return <Typography color="error">Erro ao carregar os dados.</Typography>;

  const client = clients?.find((c) => c.id === id);
  if (!client) return <Typography color="error">Cliente não encontrado</Typography>;

  const clientNotes = sessionNotes?.filter((note) => String(note.clientId) === client.id);

  return (
    <Box
      sx={{
        padding: '20px',
        margin: '0 auto',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" mb={3} sx={{
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}><PersonIcon />
        Detalhes do Cliente
      </Typography>
      <Typography variant="h6">
        {client.name}
      </Typography>
      <Typography mb={2} >
        {client.email}
      </Typography>

      <Typography mt={5}sx={{
        fontWeight: 600,
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        Nota de Sessão
      </Typography>

      <List sx={{
        maxHeight: '44vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#E3F2FD',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#1976d2',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#125a9c',
        },
      }}>
        {clientNotes?.length ? (
          clientNotes.map((note) => (
            <ListItem
              key={note.id}
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
              <ListItemText primary={note.date} secondary={note.note} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">Nenhuma nota de sessão encontrada.</Typography>
        )}
      </List>

      <AddSessionNote clientId={Number(client.id)} />
    </Box>
  );
};

export default ClientDetails;
