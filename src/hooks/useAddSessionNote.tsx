import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddSessionNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNote: { clientId: number; note: string; date?: string }) => {
      // Primeiro, obtenha a lista atual de notas de sessão
      const response = await axios.get("http://localhost:3001/sessionNotes");
      const currentNotes = response.data;

      // Obtenha os IDs atuais e gere o próximo ID numérico
      const currentIds = currentNotes.map((note: { id: string }) => parseInt(note.id, 10));
      const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;

      // Crie a nota com o novo ID
      const noteWithId = { id: newId.toString(), ...newNote };

      // Envie a nova nota para o servidor
      await axios.post("http://localhost:3001/sessionNotes", noteWithId);

      return noteWithId; // Retorna a nota adicionada
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessionNotes"] });
    },
  });
};
