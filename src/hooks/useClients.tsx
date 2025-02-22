import { useQuery } from "@tanstack/react-query";
import { getClients } from "../services/api";
import { Client } from "../types";

export const useClients = () => {
  return useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: getClients,
  });
};
