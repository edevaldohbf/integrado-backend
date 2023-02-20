import { jwtSecret } from '../../config/env.js';
import jsonwebtoken from 'jsonwebtoken';
import { unauthorized } from './reponsePattern/responseStatusCode.js';
import message from './reponsePattern/responseMessage.js';

const { sign, decode, verify } = jsonwebtoken;

export async function generateToken(id, email, type, time) {
    const token = sign(
        {
            id,
            email,
            type
        }, jwtSecret, {
        expiresIn: time
    }
    );

    return token;
}

export async function verifyToken(req, res, next) {
    try {
        let token = req.headers.authorization;
        token = token?.split(' ')[1];

        if (!token) {
            throw {
                statusCode: unauthorized,
                message: message[3]
            };
        }

        const data = decode(token);

        if ((!data) || (data.type != 'access')) {
            throw {
                statusCode: unauthorized,
                message: message[2]
            };
        }

        try {
            verify(token, jwtSecret);
        }
        catch (e) {
            throw {
                statusCode: unauthorized,
                message: message[2]
            };
        }
    }
    catch (e) {
        return res.send({
            statusCode: e.statusCode,
            data: e.message
        });
    }

    next();
}

export async function verifyRefresh(token) {
    if (!token) {
        throw {
            statusCode: unauthorized,
            message: message[3]
        };
    }

    const data = decode(token);

    if ((!data) || (data.type != 'refresh')) {
        throw {
            statusCode: unauthorized,
            message: message[2]
        };
    }

    let isValid = verify(token, jwtSecret, function (err) {
        if (err === null) {
            return true;
        }
        else {
            return false;
        }
    });

    if (isValid) {
        return {
            status: true,
            data: data
        };
    }
    else {
        return {
            status: false,
            data: null
        };
    }
}

export async function verifyResetPassword(req, res, next) {
    try {
        let token = req.headers.authorization;
        token = token?.split(' ')[1];

        if (!token) {
            throw {
                statusCode: unauthorized,
                message: message[3]
            };
        }

        const data = decode(token);

        if ((!data) || (data.type != 'reset')) {
            throw {
                statusCode: unauthorized,
                message: message[2]
            };
        }

        try {
            verify(token, jwtSecret);
        }
        catch (e) {
            throw {
                statusCode: unauthorized,
                message: message[2]
            };
        }
    }
    catch (e) {
        return res.send({
            statusCode: e.statusCode,
            data: e.message
        });
    }

    next();
}