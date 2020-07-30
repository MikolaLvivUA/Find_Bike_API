import { IBike, IUser } from '../../interfaces';

class User {
  private user: IUser

  constructor(user: IUser) {
    this.user = user;
  }

  get uuid(): string {
    return this.user.uuid;
  }

  set uuid(uuid: string) {
    this.user.uuid = uuid;
  }

  get name(): string {
    return this.user.name;
  }

  set name(name: string) {
    this.user.name = name;
  }

  get surname(): string {
    return this.user.surname;
  }

  set surname(surname: string) {
    this.user.surname = surname;
  }

  get email(): string {
    return this.user.email;
  }

  set email(email: string) {
    this.user.email = email;
  }

  get phone(): string {
    return this.user.phone;
  }

  set phone(phone: string) {
    this.user.phone = phone;
  }

  get dateOfBirth(): string {
    return this.user.dateOfBirth;
  }

  set dateOfBirth(dateOfBirth: string) {
    this.user.dateOfBirth = dateOfBirth;
  }

  get status(): string {
    return this.user.status;
  }

  set status(status: string) {
    this.user.status = status;
  }

  get role(): string {
    return this.user.role;
  }

  set role(role: string) {
    this.user.role = role;
  }

  get bikes(): IBike[] {
    return this.user.bikes;
  }

  get createdAt(): string {
    return this.user.createdAt;
  }

  set cratedAt(createdAt: string) {
    this.user.createdAt = createdAt;
  }
}

export { User };
