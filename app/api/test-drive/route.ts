import { NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  city: z.string().min(1),
  showroomId: z.string().min(1),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const data = payloadSchema.parse(json);

    // TODO: Connect email (Resend/SendGrid) or CRM webhook before production.
    // For now we only log submissions server-side.
    console.log("[test-drive]", JSON.stringify(data));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[test-drive] validation or parse error", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
