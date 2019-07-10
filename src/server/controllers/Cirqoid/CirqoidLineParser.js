import _ from 'lodash';
// import CirqoidLineParserResultEcho from './CirqoidLineParserResultEcho';
import CirqoidLineParserResultError from './CirqoidLineParserResultError';
import CirqoidLineParserResultFirmware from './CirqoidLineParserResultFirmware';
import CirqoidLineParserResultOk from './CirqoidLineParserResultOk';
// import CirqoidLineParserResultPosition from './CirqoidLineParserResultPosition';
// import CirqoidLineParserResultStart from './CirqoidLineParserResultStart';
// import CirqoidLineParserResultTemperature from './CirqoidLineParserResultTemperature';

class CirqoidLineParser {
    parse(line) {
        const parsers = [

            // FIRMWARE_NAME:Cirqoid
            CirqoidLineParserResultFirmware,

            // ok
            CirqoidLineParserResultOk,

            // Error:Printer halted. kill() called!
            CirqoidLineParserResultError
        ];

        for (let parser of parsers) {
            const result = parser.parse(line);
            if (result) {
                _.set(result, 'payload.raw', line);
                return result;
            }
        }

        return {
            type: null,
            payload: {
                raw: line
            }
        };
    }
}

export default CirqoidLineParser;
