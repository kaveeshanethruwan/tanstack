import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function App() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject("Error message"),
  });

  const queryClient = useQueryClient();

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  return (
    <>
      {postQuery.data.map((item) => (
        <pre key={item.id - item.name}>
          {item.id} - {item.title}
        </pre>
      ))}

      <button disabled={newPostMutation.isLoading} onClick={() => newPostMutation.mutate("new post")}>
        Add new
      </button>
    </>
  );
}

export default App;

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
