import { useCreateUser } from './hooks/useCreateUser';
import { useUsers } from './hooks/useUsers';

export function Users() {
  const { users, refetch, isLoading: isUsersLoading, isFetching, error: usersError } = useUsers();
  const { createUser, isLoading } = useCreateUser();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
    }

    try {
      const { id } = await createUser({
        name: elements.name.value,
        email: elements.email.value,
      });

      console.log(`Redireciona para: /users/${id}`);
    } catch (error) {
      console.log((error as any).toString())
    } finally {
      console.log('terminou de rodar')
    }
  }

  return (
    <div className="p-4">
      <div className='mb-10'>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className="outline-none p-1 rounded-md text-zinc-900"
            placeholder="Nome"
            name="name"
          />

          <input
            className="outline-none p-1 rounded-md text-zinc-900"
            placeholder="E-mail"
            name="email"
          />

          <button className='bg-blue-400 py-2 text-zinc-950 rounded-md'>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>

      <button
        type="button"
        className="bg-white text-black px-4 py-2 rounded-lg"
        onClick={() => refetch()}
      >
        Listar usuários
      </button>

      {isUsersLoading && <h1>Carregando...</h1>}
      {!isUsersLoading && isFetching && <small>Fetching...</small>}
      {usersError && <h1 className="text-red-400">{usersError.toString()}</h1>}

      {users.map(user => (
        <div key={user.id}>
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
