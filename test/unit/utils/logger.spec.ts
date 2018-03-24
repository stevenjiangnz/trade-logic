import { expect } from 'chai';
import { Logger } from '../../../src/utils/logger';

describe('Logger Description', function () {

    it('Should retrun a log object', function () {
        const logger: any = new Logger();
        expect(Logger).not.null;

        logger.debug('debug message from unit test');
        logger.info('info message from unit test');
        logger.error('error message here');
    });

})