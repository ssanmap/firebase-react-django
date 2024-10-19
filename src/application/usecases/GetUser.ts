import { UserRepository } from "../../domain/repository/UserRepository";
import { User } from "../../domain/entities/User";

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return await this.userRepository.getUser(id);
  }
}
