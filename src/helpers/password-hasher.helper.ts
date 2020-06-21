import * as bcrypt from 'bcrypt';

export const HASH_PASSWORD = (password: string): Promise<string> => bcrypt.hash(password, 10);
export const CHECK_PASSWORD = (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash);
