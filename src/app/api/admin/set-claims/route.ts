export const runtime = 'nodejs';

import { adminAuth } from "@/lib/firebase-admin";

type Body = {
  targetUid: string;
  tenantId: "middleman" | "dev-sandbox";
  roles: ("Owner" | "Admin" | "Kitchen" | "Procurement")[];
};

// NOTE: For now, this route is open. Once you’re done testing,
// protect it (e.g., with an admin API key or session check).
export async function POST(req: Request) {
  const { targetUid, tenantId, roles } = (await req.json()) as Body;

  await adminAuth.setCustomUserClaims(targetUid, { tenantId, roles });

  return Response.json({ ok: true, targetUid, tenantId, roles });
}
