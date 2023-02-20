import message from './responseMessage.js';

export default async function modifyResponseBody(req, res, next) {
    let oldSend = res.send;

    res.send = function (data) {
        res.send = oldSend;
        const response = {
            statusCode: data.statusCode,
            message: false,
            data: data.data
        };

        if (data.statusCode == 200) {
            response.message = 'SUCCESS';

            return res.status(response.statusCode).send(response);
        }
        else if (data.statusCode == 400) {
            response.message = 'ERROR';

            return res.status(response.statusCode).send(response);
        }
        else if (data.statusCode == 401) {
            response.message = 'ERROR';

            return res.status(response.statusCode).send(response);
        }
        else {
            response.statusCode = 404;
            response.message = 'ERROR';
            response.data = message[8];

            return res.status(response.statusCode).send(response);
        }
    };
    next();
}