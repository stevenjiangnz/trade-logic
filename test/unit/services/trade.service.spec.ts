import { expect } from 'chai';
import { TradeService } from '../../../src/services/trade.service';

describe('Trade Service Description', function () {

    it('Should return a token', function () {
        const ts = new TradeService();
        const token = ts.getToke();
        // console.log(config.get('Customer.dbConfig'));
        expect(token).to.eq('token');
    });

})