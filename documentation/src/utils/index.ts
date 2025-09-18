import { VALID_ACCESS_TOKENS } from '../constants';

export function getRandomToken(): string {
    const randomIndex = Math.floor(Math.random() * VALID_ACCESS_TOKENS.length);
    return VALID_ACCESS_TOKENS[randomIndex];
}