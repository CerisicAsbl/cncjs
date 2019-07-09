class CirqoidLineParserResultFirmware {
    static parse(line) {
        let r = line.match(/^Cirqoid firmware:.*/i);
        if (!r) {
            return null;
        }

        const payload = {};

        { // Cirqoid firmware
            const r = line.match(/Cirqoid firmware:([a-zA-Z\_\-]+(\s+[\d\.]+)?)/);
            if (r) {
                payload.firmwareName = r[1];
            }
        }

        return {
            type: CirqoidLineParserResultFirmware,
            payload: payload
        };
    }
}

export default CirqoidLineParserResultFirmware;
