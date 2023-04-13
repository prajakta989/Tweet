import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
    const loginModal= useLoginModal();
    const registerModal= useRegisterModal();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }
        loginModal.onClose();
        registerModal.onOpen();
        
    },[isLoading,registerModal,loginModal])

    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);
            // todo 'Add Login'

            loginModal.onClose()
        }
        catch(err){
            console.log(err);
        }
        finally{
            setIsLoading(false)
        }
    },[loginModal])

    const bodyContent= (
        <div className="flex flex-col gap-4">
            <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled= {isLoading}
            />

            <Input
            placeholder="Password"
            onChange={(e) =>setPassword(e.target.value)}
            value={password}
            disabled= {isLoading}
            />
        </div>
        
    )
    const footerContent = (
        <div className="
        text-neutral-400 
        text-center 
        mt-4
        ">
            <p>First time using Twitter? 
                <span className="
                text-white
                cursor-pointer
                hover:underline
                "
                onClick={onToggle}
                >Create an Account</span>
            </p>
        </div>
    )
  return (
    <div>
      <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign In"
      onclose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
      
      />
    </div>
  )
}

export default LoginModal
