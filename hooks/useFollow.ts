import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
    const {data:currentUser, mutate: mutateCurrentUser} = useCurrentUser()
    const {mutate: mutateFetchedUser} = useUser(userId);

    const loginmodal = useLoginModal();

    

}