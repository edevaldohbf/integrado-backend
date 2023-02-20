import { hash, compare } from 'bcrypt';

export async function hashPassword(password) {
    return hash(password, 10);
}

export async function comparePassword(passwordReq, passwordDb) {
    return compare(passwordReq, passwordDb);
}

export async function generatePassword() {
    return Math.floor(Math.random()* (999999 - 100000 + 1)) + 100000;
}