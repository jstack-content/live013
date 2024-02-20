import { useMutation } from "@tanstack/react-query";
import { sleep } from "../sleep";
import { IUser } from "../types";

export function useCreateUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }): Promise<IUser> => {
      await sleep();

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      return response.json();
    },
  });

  return {
    createUser: mutateAsync,
    isLoading: isPending,
  }
}
