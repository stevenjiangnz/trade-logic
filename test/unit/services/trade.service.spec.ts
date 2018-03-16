import { expect } from 'chai';
import * as config from 'config';
import {TradeService} from '../../../src/services/trade.service';

describe('Trade Service Description', function () {

    it.only('Should return a token', function () {
        const ts = new TradeService();
        const token = ts.getToke();
        console.log('token', token);

        console.log(config.get('Customer.dbConfig'));
        expect(token).to.eq('token');
    });

})