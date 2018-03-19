import { expect } from 'chai';
import * as config from 'config';
import { UserService } from '../../../src/services/user.service';

describe('User Service Description', function () {
    this.timeout(5000);
    it('Should return a token', async () => {
        const ts = new UserService();
        let result;

        const username = config.get('settings.serviceAccount.username');
        const password = config.get('settings.serviceAccount.password');
        result = await ts.getToke(username, password);
        expect(result).to.not.null;
        expect(result.access_token.length).to.gt(10);
    });


    it('Should return a token for the detaul user', async () => {
        const ts = new UserService();
        let result;

        result = await ts.getTokenDefaultUser();
        expect(result).to.not.null;
        expect(result.access_token.length).to.gt(10);
    });
})