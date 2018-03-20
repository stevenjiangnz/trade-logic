import { expect } from 'chai';
import { ShareController } from '../../../src/controllers/share.controller';

describe('Share Repo Description',  function () {
    this.timeout(5000);

    it('Should save share', async () => {
        const path = './fixture/asx50.csv';
        const sc = new ShareController();
        const shareList = await sc.loadAsx50(path);

        console.log(shareList);
    });
})