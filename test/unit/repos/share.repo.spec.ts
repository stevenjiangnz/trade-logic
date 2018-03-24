import { expect } from 'chai';
import { ShareRepo } from '../../../src/repos/share.repo';

describe('Share Repo Description', function () {
    this.timeout(5000);

    it('Should save share',  (done) => {
        const sr = new ShareRepo();

        sr.saveShare().then(() => {
          done();
        });
    });

})