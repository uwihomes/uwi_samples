const axios = require('axios');
const crypto = require('crypto');

class HTTPRequest {
    constructor(clientId, secret, startDateTime, endDateTime) {
        this.clientId = clientId;
        this.clientSecret = secret;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    makeRequest() {
        const [params, token] = this.generateRequestParams({start: this.startDateTime, end: this.endDateTime}, this.clientId, this.clientSecret);

        axios.get(
                'http://localhost:3000/v1/api-client/loan-application/list',
                {
                    params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
        )
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    generateRequestParams(
        params,
        clientId,
        clientSecret
    ) {
        params.nonce = new Date().getTime();
        params.clientId = clientId;

        const paramKeys = Object.keys(params);
        paramKeys.sort((firstEl, secondEl) => firstEl.localeCompare(secondEl));

        let tmpStr = '';
        paramKeys.forEach((paramKey) => {
            if (Object.prototype.hasOwnProperty.call(params, paramKey)) {
                tmpStr += `${paramKey}=${params[paramKey]}`;
            }
        });

        const hash = crypto.createHmac('sha512', clientSecret);
        hash.update(tmpStr);

        return [params, hash.digest('hex')];
    }
}

const request = new HTTPRequest('your-client-id', 'your-client-secret', 'start-date-time', 'end-date-time');
request.makeRequest();
