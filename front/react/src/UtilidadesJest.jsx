const getConsolaMock = function() {
    const consolaMock = {
        FalsoError: jest.fn(),
        FalsoLog: jest.fn(),
        FalsoWarning: jest.fn()
    };

    const errorOriginal = console.error;
    const logOriginal = console.log;
    const warnOriginal = console.warn;

    beforeAll(() => {
        global.console = {
            error: consolaMock.FalsoError,
            log: consolaMock.FalsoLog,
            warn: consolaMock.FalsoWarning
        };
    });

    afterAll(() => {
        console.error.mockClear();
        console.log.mockClear();
        console.warn.mockClear();
        global.console = {
            error: errorOriginal,
            log: logOriginal,
            warn: warnOriginal
        };
    });

    return consolaMock;
};

const getHistoryMock = function() {
    const historyMock = {
        push: jest.fn()
    };
    return historyMock;
};

export { getConsolaMock, getHistoryMock };
