import { readdirSync, createReadStream, createWriteStream } from "fs";
import { resolve } from "path";
import { createRequire } from 'module'

const __dirname = resolve();

const require = createRequire(import.meta.url)

const binDir = resolve(require.resolve("@nodegui/nodegui"), "../../build/Release");


function copy(src, dst) {
    createReadStream(src).pipe(createWriteStream(dst));
}


readdirSync(binDir).forEach((file) => {
    const src = resolve(binDir, file);
    copy(src, resolve(__dirname, `./dist/${file}`))
})

