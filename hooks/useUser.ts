import useSWR from 'swr';
import fetcher from '@/libs/fetcher';


//swr is going to fetch from /api/current using axios fetcher  and gis going to to store in isglobal store using useSWR

const useUser = (userId: string) => {
    const {data, error, isLoading, mutate} = useSWR(userId? `/api/users/${userId}`: null, fetcher);
    
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useUser;