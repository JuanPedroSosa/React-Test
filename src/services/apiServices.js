import { useMutation, useQuery, useQueryClient } from "react-query";
import { requestAuthorization, requestLogin, requestRegister } from "../api/serverQuery";

const key = "services";

export const useMutateAuthoriation = () =>  {
  const queryClient = useQueryClient();

  return useMutation(requestAuthorization, {
    onSuccess: (post) => {
      queryClient.setQueryData([key], post/*(prevPosts) => prevPosts.concat(post)*/);
      queryClient.invalidateQueries([key]);
    },
  });
}

export const useMutateLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(requestLogin, {
    onSuccess: (post) => {
      queryClient.setQueryData([key], post/*(prevPosts) => prevPosts.concat(post)*/);
      queryClient.invalidateQueries([key]);
    },
  });
}

export const useMutateRegister = () => {
  const queryClient = useQueryClient();

  return useMutation(requestRegister, {
    onSuccess: (post) => {
      queryClient.setQueryData([key],post/* (prevPosts) => prevPosts.concat(post)*/);
      queryClient.invalidateQueries([key]);
    },
  });
}
