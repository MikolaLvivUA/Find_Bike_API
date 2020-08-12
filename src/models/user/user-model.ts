import { UserStatusEnum } from '../../constants';
import { IBike } from '../../interfaces';

class User {
    private uuid: string
    private name: string
    private surname: string
    private email: string
    private phone: string
    private dateOfBirth: string
    private status: string
    private bikes: IBike[]
    private createdAt: Date

    constructor(uuid: string, name: string, surname: string, email: string, phone: string, dateOfBirth: string,
      status = UserStatusEnum.ACTIVE_STATUS, bikes = [], createdAt = new Date()) {
      this.uuid = uuid;
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.phone = phone;
      this.phone = phone;
      this.dateOfBirth = dateOfBirth;
      this.status = status;
      this.bikes = bikes;
      this.createdAt = createdAt;
    }

    get userUuid(): string {
      return this.uuid;
    }

    set userUuid(uuid: string) {
      this.uuid = uuid;
    }

    get userName(): string {
      return this.name;
    }

    set userName(name: string) {
      this.name = name;
    }

    get userSurname(): string {
      return this.surname;
    }

    set userSurname(surname: string) {
      this.surname = surname;
    }

    get userEmail(): string {
      return this.email;
    }

    set userEmail(email: string) {
      this.email = email;
    }

    get userPhone(): string {
      return this.phone;
    }

    set userPhone(phone: string) {
      this.phone = phone;
    }

    get userDateOfBirth(): string {
      return this.dateOfBirth;
    }

    set userDateOfBirth(dateOfBirth: string) {
      this.dateOfBirth = dateOfBirth;
    }

    get userStatus(): string {
      return this.status;
    }

    set userStatus(status: string) {
      this.status = status;
    }

    get userBikes(): IBike[] {
      return this.bikes;
    }

    get userCreatedAt(): Date {
      return this.createdAt;
    }

    set userCreatedAt(createdAt: Date) {
      this.createdAt = createdAt;
    }
}

export { User };
