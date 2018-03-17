import { expect } from 'chai';
import * as config from 'config';
import { UserService } from '../../../src/services/user.service';

describe.only('User Service Description', () => {

    it('Should return a token', async () => {
        const ts = new UserService();
        let result;

        const username = config.get('settings.serviceAccount.username');
        const password = config.get('settings.serviceAccount.password');
        result = await ts.getToke(username, password);
        console.log(result);
        expect(result).to.not.null;
        expect(result.length).to.gt(10);
    });

})