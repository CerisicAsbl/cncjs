import events from 'events';
import _ from 'lodash';
import CirqoidLineParser from './CirqoidLineParser';
//import CirqoidLineParserResultStart from './CirqoidLineParserResultStart';
import CirqoidLineParserResultFirmware from './CirqoidLineParserResultFirmware';
//import CirqoidLineParserResultPosition from './CirqoidLineParserResultPosition';
import CirqoidLineParserResultOk from './CirqoidLineParserResultOk';
//import CirqoidLineParserResultEcho from './CirqoidLineParserResultEcho';
import CirqoidLineParserResultError from './CirqoidLineParserResultError';
//import CirqoidLineParserResultTemperature from './CirqoidLineParserResultTemperature';

class CirqoidRunner extends events.EventEmitter {
    state = {
        status: {
            activeState: '',
            mpos: {
                x: '0.000',
                y: '0.000',
                z: '0.000'
            },
            wpos: {
                x: '0.000',
                y: '0.000',
                z: '0.000'
            },
            wco: {
                x: '0.000',
                y: '0.000',
                z: '0.000'
            },
            minpos: {
                x: '0.000',
                y: '0.000',
                z: '-26.000'
            },
            maxpos: {
                x: '103.000',
                y: '225.000',
                z: '0.000'
            },
            ov: []
        },
        parserstate: {
            modal: {
                motion: 'G0', // G0, G1, G2, G3, G38.2, G38.3, G38.4, G38.5, G80
                wcs: 'G53', // G53, G54, G55, G56, G57, G58, G59
                plane: 'G17', // G17: xy-plane, G18: xz-plane, G19: yz-plane
                units: 'G21', // G20: Inches, G21: Millimeters
                distance: 'G90', // G90: Absolute, G91: Relative
                feedrate: 'G94', // G93: Inverse time mode, G94: Units per minute
                program: 'M0', // M0, M1, M2, M30
                spindle: 'M5', // M3: Spindle (cw), M4: Spindle (ccw), M5: Spindle off
                coolant: 'M9' // M7: Mist coolant, M8: Flood coolant, M9: Coolant off, [M7,M8]: Both on
            },
            tool: '',
            feedrate: '',
            rapidFeedrate: '',
            spindle: ''
        }
    };

    settings = {
    };

    parser = new CirqoidLineParser();

    parse(data) {
        data = ('' + data).replace(/\s+$/, '');
        if (!data) {
            return;
        }

        this.emit('raw', { raw: data });

        const result = this.parser.parse(data) || {};
        const { type, payload } = result;

        if (type === CirqoidLineParserResultFirmware) {
            const {
                firmwareName,
                protocolVersion,
                machineType,
                extruderCount,
                uuid
            } = payload;
            const nextSettings = {
                ...this.settings,
                firmwareName,
                protocolVersion,
                machineType,
                extruderCount,
                uuid
            };
            if (!_.isEqual(this.settings, nextSettings)) {
                this.settings = nextSettings; // enforce change
            }

            this.emit('firmware', payload);
            return;
        }
        if (type === CirqoidLineParserResultOk) {
            this.emit('ok', payload);
            return;
        }
        if (type === CirqoidLineParserResultError) {
            this.emit('error', payload);
            return;
        }
        if (data.length > 0) {
            this.emit('others', payload);
            return;
        }
    }

    getMachinePosition(state = this.state) {
        return _.get(state, 'status.mpos', {});
    }

    getWorkPosition(state = this.state) {
        return _.get(state, 'status.wpos', {});
    }

    getModalGroup(state = this.state) {
        return _.get(state, 'parserstate.modal', {});
    }

    getTool(state = this.state) {
        // Not supported
        return 0;
    }

    isAlarm() {
        // Not supported
        return false;
    }

    isIdle() {
        // Not supported
        return false;
    }
}

export default CirqoidRunner;
