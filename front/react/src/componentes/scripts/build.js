import esbuild from "esbuild";
// import { config } from "dotenv";
import fse from "fs-extra";
import { buildParams, carpetaProd, carpetaI18n, carpetaTemas, temaClaro, temaOscuro } from "./esbuild-config.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageJson = require("../../../package.json");

const build = async () => {
    // config();
    if (fse.existsSync(carpetaProd)) {
        // Limpiamos la carpeta sin borrarla
        await fse.emptyDir(carpetaProd);
    }
    
    // Copiamos la carpeta public a la carpeta del build
    await fse.copy("./public", carpetaProd, { dereference: true });
    
    // Copiamos la carpeta de traducciones de los componentes
    if (fse.existsSync(carpetaI18n)) {
        await fse.copy(carpetaI18n, carpetaProd + "/locales");
    }

    // Insertamos en el index.html la versión
    fse.readFile(carpetaProd + "/index.html", "utf8", function(err, data) {
        if (err) {
            return console.log("Error al leer index.html", err);
        }

        data = data.replaceAll("index.js", "index.js?v=" + packageJson.version);
        data = data.replaceAll("index.css", "index.css?v=" + packageJson.version);
        
        fse.writeFile(carpetaProd + "/index.html", data, "utf8", function(err) {
            if (err) return console.log("Error al escribir el index.html", err);
        });
    });

    if (fse.existsSync(carpetaTemas)) {
        // Insertamos ficheros de tema de devexpress
        await fse.copy(carpetaTemas + temaClaro, carpetaProd + "/" + temaClaro);
        await fse.copy(carpetaTemas + temaOscuro, carpetaProd + "/" + temaOscuro);
        await fse.copy(carpetaTemas + "icons", carpetaProd + "/icons");
    
        // Insertamos en el index.html el css
        fse.readFile(carpetaProd + "/index.html", "utf8", function(err, data) {
            if (err) {
                return console.log("Error al leer index.html", err);
            }
    
            data = data.replaceAll("</title>", `</title>
                <link rel="dx-theme" data-theme="material.blue.light.compact" href="/dx.material.blue.light.compact.css" data-active="true" />
                <link rel="dx-theme" data-theme="material.blue.dark.compact" href="/dx.material.blue.dark.compact.css" data-active="false" />
            `);
    
            fse.writeFile(carpetaProd + "/index.html", data, "utf8", function(err) {
                if (err) return console.log("Error al escribir el index.html", err);
            });
        });
    }
    
    console.log(`⚡ [esbuild] Building..`);
    // Run build
    const ctx = await esbuild.context(buildParams);
    await ctx.rebuild();
    await ctx.dispose(); // To free resources
};

build();
