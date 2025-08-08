import { copy, exists, expandGlob } from "@std/fs";
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

  for await (const file of expandGlob("*.ts")) {
    await copy(file.path, `${directory}/${file.name}`, { overwrite: true });
  }
}
