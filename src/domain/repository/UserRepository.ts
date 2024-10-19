import { User } from "../entities/User";

export interface UserRepository {
  createUser(user: User): Promise<void>;
  getUser(id: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
}
