import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newClient: { name: string; email: string }) => {
      // Primeiro, obtenha a lista atual de clientes
      const response = await axios.get("http://localhost:3001/clients");
      const currentClients = response.data;

      // Obtenha os IDs atuais e gere o próximo ID numérico
      const currentIds = currentClients.map((client: { id: string }) => parseInt(client.id, 10));
      const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;

      // Crie o cliente com o novo ID
      const clientWithId = { id: newId.toString(), ...newClient };

      // Envie o novo cliente para o servidor
      await axios.post("http://localhost:3001/clients", clientWithId);

      return clientWithId; // Retorna o cliente adicionado
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
