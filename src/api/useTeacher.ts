import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "."

export const useTeacher = () =>{
    const client = useQueryClient()

    const getTeacher = () =>{
        useQuery<any, any>({
            queryKey: ["teacherKey"],
            queryFn: () => api.get("teacher").then((res) => res.data),
        })
    }

      const createteacher = useMutation({
    mutationFn: (body: any) =>
      api.post("teacher", body).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ["teacherKey"]})
    },
    onError: (err) => {
      console.log(err);
    },
  });


    const deleteteacher = useMutation({
      mutationFn: (id: any) =>
        api.delete(`commnet/${id}`).then((res) => res.data),
      onSuccess: () => {
        client.invalidateQueries({queryKey: ["teacherKey"]})
      },
      onError: (err) => {
        console.log(err);
        
      },
    });
    return {getTeacher, createteacher, deleteteacher }
}