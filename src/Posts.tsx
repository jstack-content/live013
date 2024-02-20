import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useUsers } from "./hooks/useUsers";
import { sleep } from "./sleep";
import { IUser } from "./types";

export function Posts() {
  const queryClient = useQueryClient();

  const { data, refetch, isLoading, isFetching, error } = useUsers();

  function handleMouseEnter() {
    queryClient.prefetchQuery({
      queryKey: ['users'],
      queryFn: async (): Promise<IUser[]> => {
        // throw new Error('Deu erro!');
        await sleep(500);
        const response = await fetch('http://localhost:3000/users');
        return response.json();
      },
    });
  }

  return (
    <pre>
      Posts

      <br /><br />
      <Link to="/" onMouseEnter={handleMouseEnter}>
        Ir para os usuários
      </Link>
    </pre>
  );
}
