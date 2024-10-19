// CreateUser.ts
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<void> {
    await this.userRepository.createUser(user);
  }
}
