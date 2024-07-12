
import fs from "fs";
import path from "path"

// sarjakuvakansioiden polut:
const directories = ["./src/assets/SiivetonLepakko", "./src/assets/VelhonTaloudenhoitaja"];
const outputFilePath = "./src/generatedImageImports.ts";
const generateImageImports = () => {
    let importStatements = "";
    let exportStatements = "export const images: { [key: string]: string } = {\n";

    directories.forEach((dir, dirIndex) => {

        const files = fs.readdirSync(dir);
        files.forEach((file, fileIndex) => {
            const varName = `img${dirIndex}_${fileIndex}`;
            const filePath = path.relative("./src", path.join(dir, file));
            importStatements += `import ${varName} from './${filePath.replace(/\\/g, '/')}';\n`;
            exportStatements += `  '${file}': ${varName},\n`;
        });
    }

    );
    exportStatements += "}; \n";
    const content = `${importStatements}\n${exportStatements}`;

    fs.writeFileSync(outputFilePath, content);
}

generateImageImports();
