import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addTodo, fetchTodos } from "./api";
// import TodoCard from "./components/TodoCard";

export default function Demo() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos", { search }], // every parameters which are passing to fetch func should include to query key as sub items
    queryFn: () => fetchTodos(search),
    // staleTime: Infinity, // stop background refetching when component got unmounted and mounted
    // cacheTime: 0, // disable cache
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // 2 . usually after adding new element manually we have to re-fetch. by invalidating query key this will automatically call and set new data
      // while invalidating root key is enough. no need sub items like search
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button
          onClick={async () => {
            try {
              await addTodoMutation({ title }); // 1. adding new item to database
              setTitle("");
            } catch (e) {
              console.log(e);
            }
          }}>
          Add Todo
        </button>
      </div>
      {todos?.map((todo) => (
        <div key={todo.id}>{JSON.stringify(todo)}</div>
      ))}
    </div>
  );
}
