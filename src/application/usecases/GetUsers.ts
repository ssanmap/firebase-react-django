import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class GetUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }
}
