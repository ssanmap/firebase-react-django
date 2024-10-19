// FirebaseUserRepository.ts
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { db } from "../../config/firebaseConfig"; 
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore"; 

export class FirebaseUserRepository implements UserRepository {
  async createUser(user: User): Promise<void> {
    try {
      // Accedemos a la colección usando la nueva API modular
      const usersCollection = collection(db, "users");
      await addDoc(usersCollection, {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      });
    } catch (error) {
      console.error("Error creando el usuario", error);
      throw error;
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const userDocRef = doc(db, "users", id);  // Referencia al documento por id
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          id: userDoc.id,  // Incluye el id del documento
          ...userData,
        } as User;
      } else {
        throw new Error(`No existe un usuario con el id: ${id}`);
      }
    } catch (error) {
      console.error("Error obteniendo el usuario:", error);
      throw error;
    }
  }
  async getUsers(): Promise<User[]> {
    try {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const users: User[] = querySnapshot.docs.map((doc) => ({
        name: doc.data().name,
        email: doc.data().email,
        avatarUrl: doc.data().avatarUrl,
      }));
      return users;
    } catch (error) {
      console.error("Error obteniendo los usuarios", error);
      throw error;
    }
  }
}
