import { useQuery } from '@tanstack/react-query';
import {getApiBoardsOptions} from '../../../client/@tanstack/react-query.gen.ts';
import { useMemo } from 'react';

export const useBoardViewController = ()=>
{
  const {  isLoading, isFetching , data : boardsData } = useQuery({ ...getApiBoardsOptions(), refetchOnWindowFocus: true,});
    const boards = useMemo(() => (boardsData ? [...boardsData] : []), [boardsData]);
    return {boards, isLoading: isLoading || isFetching};
}