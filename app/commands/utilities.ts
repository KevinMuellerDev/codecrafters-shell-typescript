import fs from "fs"

export async function checkPath(input: string) {
    const pathEnvContent = process.env.PATH;
    const pathDirs = pathEnvContent?.split(":") || [];
    console.log(pathDirs)
    for (const dir of pathDirs) {
        try {
            const files = await fs.promises.readdir(dir);
            if (files.includes(input)) {
                try {
                    await fs.promises.access(`${dir}/${input}`, fs.constants.X_OK);
                    return (`${dir}/${input}`)
                } catch (_err) {
                    continue;
                }

            }
        } catch (_err) {
            continue;
        }
    }

    return undefined;
}