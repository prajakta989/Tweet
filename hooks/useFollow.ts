import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const {data:currentUser, mutate: mutateCurrentUser} = useCurrentUser()
    const {mutate: mutateFetchedUser} = useUser(userId);

    const loginmodal = useLoginModal();
    
    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];
        return list.includes(userId)
    },[userId, currentUser?.followingIds])

    const toggleFollow = useCallback(async() => {
        if(!currentUser){
            return loginmodal.onOpen();
        }
        try{
            let request;

            if(isFollowing){
                request = () => axios.delete('/api/follow', {
                    data:{
                        userId
                    }
                })
            }
            else{
                request = () => axios.post('/api/follow',{
                    userId
                })
            }
            await request();
            mutateCurrentUser();
            mutateFetchedUser();
            toast.success("Success");

        }
        catch(err){
            toast.error("Somrthing went wrong!")
        }
    },[currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser,loginmodal])

    return {isFollowing, toggleFollow}
    

}

export default useFollow;