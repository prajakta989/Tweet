import useSWR from 'swr';
import fetcher from '@/libs/fetcher';


//swr is going to fetch from /api/current using axios fetcher  and gis going to to store in isglobal store using useSWR

const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/current', fetcher);
    console.log(data);
    
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;