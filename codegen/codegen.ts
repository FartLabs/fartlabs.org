import { copy, exists } from "@std/fs";
import { generateHTML } from "./html.tsx";
import { generateFeed } from "./feed.ts";

if (import.meta.main) {
  await generateFiles("generated");
}

async function generateFiles(directory: string) {
  await removeGeneratedFiles(directory);
  await copyFiles(directory);
  await generateHTML(directory);
  await generateFeed(directory);
}

async function removeGeneratedFiles(directory: string) {
  if (!(await exists(directory))) {
    return;
  }

  await Deno.remove(directory, { recursive: true });
}

async function copyFiles(directory: string) {
  await Deno.mkdir(directory, { recursive: true });

  await copy("deno.json", `${directory}/deno.json`, { overwrite: true });
  await copy("static", directory, { overwrite: true });

  const sourceFiles = ["main.ts", "database/kv.ts"];
  for await (const sourceFile of sourceFiles) {
    try {
      // Create the destination directory structure if it doesn't exist.
      const destPath = `${directory}/${sourceFile}`;
      const destDir = destPath.substring(0, destPath.lastIndexOf("/"));
      if (destDir !== directory) {
        await Deno.mkdir(destDir, { recursive: true });
      }

      await Deno.copyFile(sourceFile, destPath);
    } catch (error) {
      console.error(`Failed to copy ${sourceFile}:`, error);
      throw error;
    }
  }
}
