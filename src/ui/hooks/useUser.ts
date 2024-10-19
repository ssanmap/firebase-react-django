import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { storage, db } from "../../config/firebaseConfig"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { doc, setDoc } from "firebase/firestore"; 

export const useUser = (onUserCreated?: () => void) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

    const handleAvatarChange = (file: File | null) => {
      setAvatar(file);
    };

  const createUser = async () => {
    setLoading(true);
    const auth = getAuth();
    const newUser = { id: new Date().getTime().toString(), name, email, avatarUrl: "" };


    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      newUser.id = firebaseUser.uid;  

      if (avatar) {
        const storageRef = ref(storage, `avatars/${email}/${avatar.name}`); 
        await uploadBytes(storageRef, avatar);  
        const avatarUrl = await getDownloadURL(storageRef);  
        newUser.avatarUrl = avatarUrl;
      }

      await setDoc(doc(db, "users", newUser.id), newUser);
      alert("Usuario creado con éxito");
      if (onUserCreated) {  
        onUserCreated();
      }
    } catch (error) {
      console.error("Error creando el usuario", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    avatar,  
    setName,
    setEmail,
    handleAvatarChange,  
    createUser,
    setAvatar,
    password, 
    setPassword,
    loading,
  };
};
