import fs from "fs";

// Lee el contenido de package.json
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

// Extrae solo las dependencias
const packageDeps = {
    dependencies: packageJson.dependencies
};

// Escribe el contenido en package-deps.json
fs.writeFileSync("package-pro-deps.json", JSON.stringify(packageDeps, null, 2));
