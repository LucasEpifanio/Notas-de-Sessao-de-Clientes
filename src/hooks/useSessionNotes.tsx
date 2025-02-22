import { useQuery } from "@tanstack/react-query";
import { getSessionNotes } from "../services/api";
import { SessionNote } from "../types";

export const useSessionNotes = () => {
  return useQuery<SessionNote[]>({
    queryKey: ["sessionNotes"],
    queryFn: getSessionNotes,
  });
};
