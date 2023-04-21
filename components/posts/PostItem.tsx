import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

interface postItemProps {
    data: Record<string, any>
    userId?: string
}
const PostItem: React.FC<postItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const gotoUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id])

    const gotoPost = useCallback(() => {
        router.push(`/posts/${data.id}`)
    }, [router, data.id])

    const onLike = useCallback((event: any) => {
        event.stopPropagation();
        loginModal.onOpen();
    }, [loginModal])

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data?.createdAt])
    return (
        <div className="
    border-b-[1px]
    border-neutral-800
    p-5
    cursor-pointer
    hover:bg-neutral-900
    transition
    "
            onClick={gotoPost}
        >
            <div className="
      flex
      flex-row
      items-start
      gap-3
      ">
                <Avatar userId={data.user.id} />
                <div>
                    <div className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    ">
                        <p className="text-white  font-semibold cursor-pointer hover:underline" onClick={gotoUser}>{data.user.name} </p> 
                        <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block" onClick={gotoUser}>@{data.user.username}</span>
                        <span className="text-neutral-500  text-sm">{createdAt}</span>
                    </div>
                    <div className="
                    text-white mt-1
                    ">
                        {data.body}
                    </div>
                    <div className="
                    flex 
                    flex-row
                    items-center
                    mt-3
                    gap-10
                    ">
                        <div className="
                        flex
                        flex-row
                        items-center
                        text-neutral-500
                        gap-2
                        cursor-pointer
                        transition
                        hover:text-indigo-500
                        "
                        >
                            <AiOutlineMessage size={20}/>
                            <p>{data.comments?.length || 0}</p>
                        </div>
                        <div className="
                        flex
                        flex-row
                        items-center
                        text-neutral-500
                        gap-2
                        cursor-pointer
                        transition
                        hover:text-red-500
                        "
                        onClick={onLike}
                        >
                            <AiOutlineHeart size={20}/>
                            <p>{data.comments?.length || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem
