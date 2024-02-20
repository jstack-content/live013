import { useQuery } from "@tanstack/react-query";
import { sleep } from "../sleep";
import { IUser } from "../types";

export function useUsers() {
  const { data, refetch, isLoading, isFetching, error } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<IUser[]> => {
      await sleep(500);
      const response = await fetch('http://localhost:3000/users');
      return response.json();
    },
  });

  return {
    users: data ?? [],
    refetch,
    isLoading,
    isFetching,
    error,
  }
}
