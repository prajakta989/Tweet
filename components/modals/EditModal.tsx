import useCurrentUser from "@/hooks/useCurrentUser"
import useEditmodal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditmodal();

    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [bio, setBio] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setBio(currentUser?.bio);
        setUsername(currentUser?.username);
        setName(currentUser?.name)
    }, [currentUser?.profileImage, currentUser?.coverImage, currentUser?.bio, currentUser?.username, currentUser?.name])

    const [isloading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.patch('/api/edit', {
                name, username, bio, profileImage, coverImage
            })
            mutateFetchedUser();
            toast.success("Updated");
            editModal.onClose();


        }
        catch (err) {
            console.log("something went wrong");

            toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false);
        }
    }, [profileImage, coverImage, bio, username, name, editModal, mutateFetchedUser])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
                value={profileImage}
                disabled={isloading}
                onChange={(image) => setProfileImage(image)}
                label="Upload Profile Image"
            />
            <ImageUpload
                value={coverImage}
                disabled={isloading}
                onChange={(image) => setCoverImage(image)}
                label="Upload Cover Image"
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isloading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isloading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isloading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isloading}
            isOpen={editModal.isOpen}
            title="Edit Your Profile"
            actionLabel="Save"
            onclose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default EditModal
