export const runtime = 'nodejs';

import { adminDb } from "@/lib/firebase-admin";

export async function POST() {
  const tenants = [
    {
      id: "middleman",
      name: "Middleman Kitchen",
      outlet: {
        id: "alsut-1",
        name: "Kyai Maja #4",
        address:
          "Jl. Kyai Maja No. 4, Kel. Panunggangan, Kec. Pinang, Kota Tangerang, Banten, 15143",
        tz: "Asia/Jakarta",
      },
    },
    {
      id: "dev-sandbox",
      name: "Dev Sandbox",
      outlet: { id: "dev-1", name: "Sandbox Outlet", address: "N/A", tz: "Asia/Jakarta" },
    },
  ];

  for (const t of tenants) {
    await adminDb.doc(`/tenants/${t.id}`).set(
      { name: t.name, plan: "core", createdAt: new Date() },
      { merge: true }
    );

    await adminDb.doc(`/tenants/${t.id}/outlets/${t.outlet.id}`).set({
      ...t.outlet,
      isActive: true,
      createdAt: new Date(),
    });

    // Runtime lock & feature flags
    await adminDb.doc(`/tenants/${t.id}/settings/runtime`).set(
      { writeLocked: false, allowDangerousOps: false, updatedAt: new Date() },
      { merge: true }
    );

    await adminDb.doc(`/tenants/${t.id}/settings/features`).set(
      {
        orders: true,
        inventory: true,
        purchasing: true,
        kds: false,
        ai_ocr: false,
        menu_engineering: false,
      },
      { merge: true }
    );

    // Loyalty config (L3 is >32 => 33+)
    await adminDb.doc(`/tenants/${t.id}/loyaltyConfigs/default`).set(
      {
        leveling: {
          L1: { min: 1, max: 16 },
          L2: { min: 17, max: 32 },
          L3: { minExclusive: 32 },
        },
        benefitsByLevel: {
          L1: {},
          L2: { discountPct: 5, freeDrink: true },
          L3: { discountPct: 8, freeDrink: true, freeDeliveryThreshold: 60000 },
        },
        updatedAt: new Date(),
      },
      { merge: true }
    );
  }

  return Response.json({ ok: true, tenants: tenants.map((t) => t.id) });
}
