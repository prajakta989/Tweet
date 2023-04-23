import useSWR from 'swr';
import fetcher from '@/libs/fetcher';


//swr is going to fetch from /api/current using axios fetcher  and gis going to to store in isglobal store using useSWR

const usePost = (postId: string) => {
    const url = postId ? `/api/posts/${postId}`: null;
    const {data, error, isLoading, mutate} = useSWR(url, fetcher);
    console.log("data",data);
    
    return {
        data, 
        error,
        isLoading,
        mutate
    }
}

export default usePost;