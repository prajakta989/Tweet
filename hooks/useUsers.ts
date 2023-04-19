import useSWR from 'swr';
import fetcher from '@/libs/fetcher';


//swr is going to fetch from /api/current using axios fetcher  and gis going to to store in isglobal store using useSWR

const useUsers = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/users', fetcher);
    console.log("data",data);
    
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useUsers;