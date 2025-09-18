import { VALID_ACCESS_TOKENS, VALID_REFRESH_TOKEN } from '@src/constants';
import { getRandomToken } from '@src/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

function verifyToken(token: string | undefined, type: 'access' | 'refresh') {
    if (type === 'access') {
        return token && VALID_ACCESS_TOKENS.includes(token);
    }
    if (type === 'refresh') {
        return token === VALID_REFRESH_TOKEN;
    }
    return false;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;
    const { type } = req.query;

    // Add delay to simulate network latency
    const delay = Math.random() * 500 + 200;
    
    setTimeout(() => {
        if (!authorization) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authorization.replace('Bearer ', '');

        if (type === 'access') {
            if (verifyToken(token, 'access')) {
                return res.status(200).json({ 
                    message: 'Successfully accessed protected resource!',
                    timestamp: new Date().toISOString(),
                    data: { userId: 123, username: 'demo-user' }
                });
            } else {
                return res.status(401).json({ 
                    error: 'Access token expired or invalid',
                    code: 'TOKEN_EXPIRED'
                });
            }
        }

        if (type === 'refresh') {
            if (verifyToken(token, 'refresh')) {
                return res.status(200).json({ 
                    message: 'Token refreshed successfully',
                    accessToken: getRandomToken(),
                    expiresIn: 3600
                });
            } else {
                return res.status(401).json({ 
                    error: 'Invalid refresh token',
                    code: 'REFRESH_TOKEN_INVALID'
                });
            }
        }

        return res.status(400).json({ error: 'Invalid token type' });
    }, delay);
}