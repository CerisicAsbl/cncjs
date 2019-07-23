// Cirqoid
export const CIRQOID = 'Cirqoid';

export const CIRQOID_ACTIVE_STATE_IDLE = 'Idle';
export const CIRQOID_ACTIVE_STATE_BUSY = 'Busy';

export const CIRQOID_MODAL_GROUPS = [
    { // Motion Mode (Defaults to G0)
        group: 'motion',
        modes: ['G0', 'G1']
    },
    { // Work Coordinate System Select (Defaults to G54)
        group: 'wcs',
        modes: ['G53', 'G54']
    },
    { // Spindle State (Defaults to M5)
        group: 'spindle',
        modes: ['M3', 'M4', 'M5']
    }
];
