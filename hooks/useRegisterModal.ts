import {create} from 'zustand'

interface RegisterMoadlStore{
    isOpen: boolean
    onOpen : ()=> void
    onClose: () => void
}

const useRegisterModal = create<RegisterMoadlStore>((set) => ({
    isOpen:false,
    onOpen:() => set({isOpen:true}),
    onClose:() => set({isOpen:false})
}))

export default useRegisterModal;