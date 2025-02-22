import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useAddClient } from "../hooks/useAddClient";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";

interface AddClientProps {
  existingClients: { name: string; email: string }[];
}

const AddClient = ({ existingClients }: AddClientProps) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();
  const mutation = useAddClient();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const validateName = (name: string) => {
    return name.trim().length >= 3 || "O nome deve ter pelo menos 3 caracteres.";
  };

  const validateEmail = (email: string) => {
    return email.includes("@") || "O e-mail deve conter '@'.";
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { name, email } = data as { name: string; email: string };

    // Normalizando para comparação sem diferenciar maiúsculas e minúsculas
    const normalizedName = name.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // Verificar se o cliente já existe pelo nome (sem diferenciar maiúsculas e minúsculas)
    const clientExistsByName = existingClients.some(
      client => client.name.trim().toLowerCase() === normalizedName
    );

    // Verificar se o email já está em uso
    const clientExistsByEmail = existingClients.some(
      client => client.email.trim().toLowerCase() === normalizedEmail
    );

    if (clientExistsByName) {
      setError("name", { type: "manual", message: "Cliente já existe." });
      return;
    }

    if (clientExistsByEmail) {
      setError("email", { type: "manual", message: "Este email já existe." });
      return;
    }

    // Adiciona o cliente e fornece feedback
    mutation.mutate({ name, email }, {
      onSuccess: () => {
        setAlertType("success");
        setAlertMessage("Cliente adicionado com sucesso!");
        setSnackbarOpen(true);
        reset();
      },
      onError: () => {
        setAlertType("error");
        setAlertMessage("Erro ao adicionar cliente.");
        setSnackbarOpen(true);
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("name", { 
            required: "Nome é obrigatório.", 
            validate: validateName 
          })}
          label="Nome"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message as string}
        />
        <TextField
          {...register("email", { 
            required: "E-mail é obrigatório.", 
            validate: validateEmail 
          })}
          label="E-mail"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
          Adicionar Cliente
        </Button>
      </form>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={alertType} 
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddClient;
