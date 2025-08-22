#!/usr/bin/env -S deno run --allow-read --allow-env --unstable-kv

import { parseArgs } from "@std/cli/parse-args";
import { Spinner } from "@std/cli/unstable-spinner";
import { seedWaitlist } from "./kv.ts";

interface SeedOptions {
  clear?: boolean;
  file?: string;
  count?: boolean;
  list?: boolean;
}

async function main() {
  const args = parseArgs(Deno.args, {
    boolean: ["clear", "count", "list"],
    string: ["file"],
    alias: {
      c: "clear",
      f: "file",
      n: "count",
      l: "list",
    },
    default: {
      file: "database/seed-data.json",
    },
  });

  console.log("🌱 FartLabs Database Seeder");
  console.log("============================\n");

  try {
    // Initialize Deno KV
    const spinner = new Spinner({
      message: "Opening Deno KV database...",
      color: "yellow",
    });
    spinner.start();

    const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH")!);

    spinner.stop();
    console.log("✅ Database connection established\n");
    await seedDatabase(kv, args.file!);

    // Close the database connection
    await kv.close();
    console.log("\n✅ Database operations completed successfully");
  } catch (error) {
    console.error(
      "\n❌ Error:",
      error instanceof Error ? error.message : String(error),
    );
    Deno.exit(1);
  }
}

async function seedDatabase(kv: Deno.Kv, filePath: string) {
  // Check if file exists
  try {
    await Deno.stat(filePath);
  } catch {
    throw new Error(`Seed file not found: ${filePath}`);
  }

  const spinner = new Spinner({
    message: "Reading seed data...",
    color: "cyan",
  });
  spinner.start();

  const fileContent = await Deno.readTextFile(filePath);
  const seedData: string[] = JSON.parse(fileContent);

  spinner.stop();
  console.log(`📖 Loaded ${seedData.length} entries from ${filePath}\n`);

  // Seed the database
  spinner.message = "Seeding database...";
  spinner.start();

  await seedWaitlist(kv, seedData);

  spinner.stop();
  console.log(`🌱 Successfully seeded ${seedData.length} entries`);

  // Verify the seeding
  spinner.message = "Verifying seed data...";
  spinner.start();

  spinner.stop();
  console.log(`✅ Verification complete`);
}

// Show help if help requested
if (Deno.args.includes("--help") || Deno.args.includes("-h")) {
  console.log(`
Usage: deno run --allow-read --allow-env --unstable-kv database/seed.ts [options]

Options:
  -f, --file <path>    Seed data file (default: database/seed-data.json)
  -h, --help           Show this help message

Examples:
  deno run --allow-read --allow-env --unstable-kv database/seed.ts
  deno run --allow-read --allow-env --unstable-kv database/seed.ts --file custom-data.json
`);
  Deno.exit(0);
}

// Run the main function
if (import.meta.main) {
  main();
}
