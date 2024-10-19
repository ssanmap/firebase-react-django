import { useState, useEffect } from "react";
import { User } from "../../domain/entities/User";
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from "../../config/firebaseConfig"; 

export const useUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
    const usersData: User[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as User);
    setUsers(usersData); 
    setLoading(false);
  });

  return () => unsubscribe();  
}, []);

return { users, loading };
};
