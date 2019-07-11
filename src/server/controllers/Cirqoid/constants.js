// Cirqoid
export const CIRQOID = 'Cirqoid';

// export const QUERY_TYPE_POSITION = 'position';
// export const QUERY_TYPE_TEMPERATURE = 'temperature';
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
