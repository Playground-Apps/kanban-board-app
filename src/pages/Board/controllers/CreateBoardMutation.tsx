  import { useMutation, useQueryClient} from '@tanstack/react-query';
  import {getApiBoardsOptions, getApiBoardsQueryKey, getBoardOptions, postApiBoardsMutation} from '../../../client/@tanstack/react-query.gen.ts';

  export const createBoardMutation = () => {
    const getBoardOptions = getApiBoardsOptions();
    const queryClient = useQueryClient();
 return useMutation({
      ...postApiBoardsMutation(),
       onSuccess:()=>{
        queryClient.invalidateQueries({queryKey: getBoardOptions.queryKey });
        }
    });
  };