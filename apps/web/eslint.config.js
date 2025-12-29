import {defineConfig, globalIgnores} from "eslint/config";
import {config as reactConfig} from "@azit/eslint/react";

export default defineConfig([globalIgnores(["dist"]), ...reactConfig]);
