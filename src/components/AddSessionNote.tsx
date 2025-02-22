import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useAddSessionNote } from "../hooks/useAddSessionNote";
import { TextField, Button, Box, Typography } from "@mui/material";
import "../index.css";

const AddSessionNote = ({ clientId }: { clientId: number }) => {
  const { register, handleSubmit, reset } = useForm();
  const mutation = useAddSessionNote();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const note = data.note as string;
    const currentDate = new Date().toISOString().split("T")[0];

    mutation.mutate({ clientId, note, date: currentDate });
    reset();
  };

  return (
    <Box
      sx={{
        width: "90%",
        margin: "20px auto", 
        padding: "10px", 
        borderRadius: "8px", 
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" gutterBottom textAlign="left">
        Adicionar Nova Nota
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("note", { required: true })}
          label="Nova Nota"
          fullWidth
          multiline 
          rows={3} 
          variant="outlined"
          sx={{
            marginBottom: "1rem",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Adicionar Nota
        </Button>
      </form>
    </Box>
  );
};

export default AddSessionNote;
