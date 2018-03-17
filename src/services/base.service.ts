import * as config from 'config';

export class BaseService {
    protected baseUrl;
    constructor() {
        if (!this.baseUrl) {
            this.baseUrl = config.get('settings.serviceBaseUrl');
            console.log('base url', this.baseUrl);
        }
    }
}