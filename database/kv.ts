export interface WaitlistEntry {
  email: string;
  created_at: string;
}

export async function checkEmailExists(
  kv: Deno.Kv,
  email: string,
): Promise<boolean> {
  const entry = await kv.get(["waitlist", email]);
  return entry.value !== null;
}

export async function addToWaitlist(kv: Deno.Kv, email: string): Promise<void> {
  const entry: WaitlistEntry = {
    email,
    created_at: new Date().toISOString(),
  };

  await kv.set(["waitlist", email], entry);
}

export async function seedWaitlist(
  kv: Deno.Kv,
  entries: WaitlistEntry[],
): Promise<void> {
  const batchOp = kv.atomic();
  for (const entry of entries) {
    batchOp.set(["waitlist", entry.email], entry);
  }

  await batchOp.commit();
}
