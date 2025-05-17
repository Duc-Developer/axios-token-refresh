import type { NextApiRequest, NextApiResponse } from 'next';

const VALID_ACCESS_TOKEN = 'valid-access-token';
const VALID_REFRESH_TOKEN = 'valid-refresh-token';

function verifyToken(token: string | undefined, type: 'access' | 'refresh') {
    if (type === 'access') {
        return token === VALID_ACCESS_TOKEN;
    }
    if (type === 'refresh') {
        return token === VALID_REFRESH_TOKEN;
    }
    return false;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;
    const { type } = req.query;

    if (!authorization) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authorization.replace('Bearer ', '');

    if (type === 'access') {
        if (verifyToken(token, 'access')) {
            return res.status(200).json({ message: 'Access token is valid' });
        } else {
            return res.status(401).json({ error: 'Invalid access token' });
        }
    }

    if (type === 'refresh') {
        if (verifyToken(token, 'refresh')) {
            // Optionally, issue new tokens here
            return res.status(200).json({ message: 'Refresh token is valid' });
        } else {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }
    }

    return res.status(400).json({ error: 'Invalid token type' });
}