/**
 * @module DirName
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { fileURLToPath } from "url";
import { dirname } from "path";

/**
 * DirName is used to get `__dirname` and `__filename`, because they are not available in ESM modules.
 * @function
 *
 * @param {string} currentFile - Use import.meta.url
 * @return {{__dirname: string, __filename: string}}
 *
 * @example
 * const currentFile = DirName(import.meta.url);
 * console.log(currentFile.__dirname); // --> "/path/to/dir"
 * console.log(currentFile.__filename); // --> "file.js"
 */
function DirName(currentFile) {
	const __filename = fileURLToPath(currentFile);
	const __dirname = dirname(__filename);

	return { __dirname, __filename };
}

export default DirName;
