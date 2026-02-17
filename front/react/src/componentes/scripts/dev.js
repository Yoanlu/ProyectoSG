import esbuild from "esbuild";
import fse from "fs-extra";
import os from "os";
import liveServer from "live-server";
import chokidar from "chokidar";

import { buildParams, carpetaDev, carpetaI18n, carpetaTemas, temaClaro, temaOscuro } from "./esbuild-config.js";
import { buscarTraducciones } from "./trad.js";

buscarTraducciones();

let puerto = 3000;
let argumentos = process.argv.slice(2);
for (const argumento of argumentos) {
    let [clave, valor] = argumento.split("=");
    if (clave === "--port") {
        puerto = parseInt(valor);
    }
}

/**
 * Live Server Params
 * @link https://www.npmjs.com/package/live-server#usage-from-node
 */
const serverParams = {
    port: puerto, // Set the server port. Defaults to 8080.
    root: carpetaDev, // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    ignore: "**.map,**.css",
    file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    // wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    // mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 0 // 0 = errors only, 1 = some, 2 = lots
    // middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

// Clean folder
if (fse.existsSync(carpetaDev)) {
    await fse.rm(carpetaDev, { recursive: true });
}

async function copiarCarpetaPublic() {
    // Copy public folder
    await fse.copy("./public", carpetaDev);

    // Copy translations from components
    if (fse.existsSync(carpetaI18n)) {
        await fse.copy(carpetaI18n, carpetaDev + "/locales");
    }

    if (fse.existsSync(carpetaTemas)) {
        // Insertamos ficheros de tema de devexpress
        await fse.copy(carpetaTemas + temaClaro, carpetaDev + "/" + temaClaro);
        await fse.copy(carpetaTemas + temaOscuro, carpetaDev + "/" + temaOscuro);
        await fse.copy(carpetaTemas + "icons", carpetaDev + "/icons");

        // Insertamos en el index.html el css
        fse.readFile(carpetaDev + "/index.html", "utf8", function(err, data) {
            if (err) {
                return console.log("Error al leer index.html", err);
            }

            data = data.replaceAll(
                "</title>",
                `</title>
            <link rel="dx-theme" data-theme="material.blue.light.compact" href="/dx.material.blue.light.compact.css" data-active="true" />
            <link rel="dx-theme" data-theme="material.blue.dark.compact" href="/dx.material.blue.dark.compact.css" data-active="false" />
        `
            );

            fse.writeFile(carpetaDev + "/index.html", data, "utf8", function(err) {
                if (err) return console.log("Error al escribir el index.html", err);
            });
        });
    }
}

function info_dist() {
    let lineaIp = "\r\n\x1b[32mSirviendo desarrollo en: \x1b[34mhttp://localhost:" + puerto;

    var networkInterfaces = os.networkInterfaces();
    for (let indice in networkInterfaces) {
        let interfaz = networkInterfaces[indice];

        for (let alias in interfaz) {
            let red = interfaz[alias];
            if (red.family === "IPv4") {
                lineaIp += ", http://" + red.address + ":" + puerto;
            }
        }
    }

    console.log(lineaIp + "\x1b[0m");
    // if (hayCambios) console.log("Listo para cambios");
}

await copiarCarpetaPublic();

var compilaciones = 0;

(async () => {
    // Build
    const ctx = await esbuild.context(buildParams);
    try {
        await ctx.rebuild();
    } catch (err) {}
    // await ctx.watch();

    // Start live server
    await liveServer.start(serverParams);

    info_dist();

    /**
     * Watch development server changes
     * ignored: ignore watch `.*` files
     */
    return chokidar.watch(["src/**/*", "public/**/*"], { ignored: /(^|[/\\])\../, ignoreInitial: true }).on("all", async (event, path) => {
        if (event === "change" && path.includes(carpetaDev)) {
            // Nothing
        } else if (event === "change" && path.includes("public")) {
            console.log(`⚡ [esbuild chokidar/public folder] ${path}`);
            try {
                await copiarCarpetaPublic();
            } catch (err) {
                console.error(err);
            }
        } else if (event === "change" && path.includes("i18n")) {
            console.log(`⚡ [esbuild chokidar/i18n folder] ${path}`);
            try {
                fse.copySync(carpetaI18n, carpetaDev + "/locales");
            } catch (err) {
                console.error(err);
            }
        } else if (event === "change") {
            console.log(`⚡ [esbuild chokidar] Rebuilding ${path}`);
            try {
                const labelTime = `⚡ [esbuild chokidar] ${++compilaciones} Done`;
                console.time(labelTime);
                await ctx.rebuild();
                console.timeEnd(labelTime);
            } catch (err) {}
        }
    });
})();
