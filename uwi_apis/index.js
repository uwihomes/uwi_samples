const axios = require('axios');
const crypto = require('crypto');

class UwiApi {
    constructor(clientId, secret, host) {
        this.clientId = clientId;
        this.clientSecret = secret;
        this.host = host;
    }

    getApplications(startDateTime, endDateTime) {
        const [params, token] = this.generateRequestParams({start: startDateTime, end: endDateTime}, this.clientId, this.clientSecret);

        axios.get(
                `${this.host}/v1/api-client/loan-application/list`,
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

const request = new UwiApi('your-client-id', 'your-client-secret', 'https://staging-api.uwi.ph');
request.getApplications('2023-01-01 00:00:00', '2023-01-15 00:00:00');
