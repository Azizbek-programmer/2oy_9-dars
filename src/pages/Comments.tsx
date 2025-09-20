import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memo, useState, type FormEvent } from "react";
import { api } from "../api";

const Comments = () => {
  const [text, setText] = useState("");
  const client = useQueryClient()

  const { data, isLoading, } = useQuery({
    queryKey: ["commentKey"],
    queryFn: () => api.get("commnet").then((res) => res.data),
  });

  const createComment = useMutation({
    mutationFn: (body: any) =>
      api.post("commnet", body).then((res) => res.data),
    onSuccess: (res) => {
      client.invalidateQueries({queryKey: ["commentKey"]})
    },
    onError: (err) => {
      console.log(err);
    },
  });
  
  const deleteComment = useMutation({
    mutationFn: (id: any) =>
      api.delete(`commnet/${id}`).then((res) => res.data),
    onSuccess: (res) => {
      client.invalidateQueries({queryKey: ["commentKey"]})
    },
    onError: (err) => {
      console.log(err);
      
    },
  });
  
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = {text}
    createComment.mutate(comment)
  };
  
  const handleDelete = (id: number) =>{
    deleteComment.mutate(id)
  }


  return (
    <div className="Comments">
      <form onSubmit={handleSubmit} action="">
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          type="text"
        />
        <button>submit</button>
      </form>
      <ul>
        {data?.map((item: any) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <button onClick={() => handleDelete(item.id)}>delete</button>
            <button>update</button>
          </li>
        ))}
      </ul>
      {isLoading && <h1>Loading...</h1>}
    </div>
  );
};

export default memo(Comments);