import { fileURLToPath } from "url";
import { dirname } from "path";

/**
 * DirName is used to get \_\_dirname and \_\_filename because they are not available in ESM modules
 * @function
 * @param {string} currentFile - Use import.meta.url
 * @return {{__dirname: string, __filename: string}}
 */
export default function DirName(currentFile) {
	const __filename = fileURLToPath(currentFile);
	const __dirname = dirname(__filename);

	return { __dirname, __filename };
}
