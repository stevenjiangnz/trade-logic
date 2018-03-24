import { expect } from 'chai';
import { ShareController } from '../../../src/controllers/share.controller';

describe('Share Repo Description',  function () {
    this.timeout(15000);
    const path = './fixture/asx50.csv';

    it('Should load asx 50 from the disk', async () => {
        const sc = new ShareController();
        const shareList = await sc.loadAsx50FromDisk(path);
        expect(shareList.length).to.gt(0);
    });

    it.only('Should load ASX list full', async () => {
      const sc = new ShareController();
      const shareList = await sc.loadAsx50ListFull(path);

      expect(shareList.length).to.gt(10);
  });

})