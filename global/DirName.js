import { fileURLToPath } from "url";
import { dirname } from "path";

export default function DirName(currentFile) {
	const __filename = fileURLToPath(currentFile);
	const __dirname = dirname(__filename);

	return { __filename, __dirname };
}
