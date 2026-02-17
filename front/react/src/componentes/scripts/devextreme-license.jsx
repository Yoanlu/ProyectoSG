try {
    let config = await import("devextreme/core/config");

    const clave =
        "ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjUwMzc1NDdmLTJlNTMtNDUyZC05MTRkLTY5NjYxN2ZmZWYyNyIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjQxCn0=.hE7Tvt+AeFjYJV3/z8XSu+veKM8bylhHLzcbva3k+LDoYR4j16X+E+rGYdfW/lS1hT3BgjPsI5mxpYeZvBf1tnxkfKCV2DJzCSDIxSmUZ63jrUAz003WftmVhI6k9pUNDHyrpw==";

    config.default({
        licenseKey: clave
    });
} catch (error) {}
