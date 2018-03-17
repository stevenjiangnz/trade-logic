import * as request from 'request-promise-native';
import * as param from 'jquery-param';
import {BaseService} from './base.service';
import * as url from 'url';

export class UserService extends BaseService {
    constructor() {
        super();
    }

    public getToke(username: string, password: string) {
        const options = {
            method: 'POST',
            uri: url.resolve(this.baseUrl, './oauth/token'),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: param({
                username,
                password,
                grant_type: 'password'
            }),
            json: false,
            transform: function (body) {
                return body;
            }
        };

        return request(options);
    }
}

