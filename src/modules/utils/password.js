import { hash, compare } from 'bcrypt';

export async function hashPassword(password) {
    return hash(password, 10);
}
export async function comparePassword(passwordReq, passwordDb) {
    return compare(passwordReq, passwordDb);
}