import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_TOKEN);

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lucasrubo1@gmail.com",
      replyTo: email,
      subject: subject ? `[OS] ${subject}` : `[OS] Message from ${name}`,
      html: `
        <div style="max-width:540px;margin:40px auto;padding:32px 24px;background:#f9f6f3;border-radius:16px;box-shadow:0 4px 32px rgba(31,27,23,0.10);font-family:'Segoe UI',Arial,sans-serif;color:#1d1b17;">
          <div style="text-align:center;margin-bottom:28px;">
            <svg width="38" height="38" viewBox="0 0 30 30" fill="none" style="display:block;margin:0 auto 8px;">
              <ellipse cx="15" cy="20" rx="11" ry="8" fill="#f54e00" />
              <path d="M7 15 Q10 9 13 14 Q15 7 17 14 Q19 8 22 14" stroke="#1d1b17" stroke-width="2.5" stroke-linecap="round" fill="none" />
              <ellipse cx="20" cy="19" rx="5" ry="4.5" fill="#fcd5b1" />
              <circle cx="22" cy="17.5" r="1.5" fill="#1d1b17" />
              <circle cx="22.6" cy="17" r="0.5" fill="white" />
              <ellipse cx="24.5" cy="20" rx="1.5" ry="1" fill="#1d1b17" />
            </svg>
            <span style="display:inline-block;background:#f54e00;color:#fff;padding:8px 24px;border-radius:10px;font-size:1.15em;font-weight:700;letter-spacing:1px;box-shadow:0 2px 8px #f54e0033;">AprixOS Contact</span>
          </div>
          <div style="margin-bottom:18px;">
            <strong style="color:#f54e00;">De:</strong> <span>${name} &lt;${email}&gt;</span>
          </div>
          <div style="margin-bottom:18px;">
            <strong style="color:#f54e00;">Assunto:</strong> <span>${subject || "(nenhum)"}</span>
          </div>
          <div style="margin:28px 0 18px 0;border-top:1.5px solid #f54e00;opacity:0.12;"></div>
          <div style="font-size:1.12em;line-height:1.7;color:#1d1b17;white-space:pre-line;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <div style="margin-top:36px;text-align:center;color:#987cb0;font-size:0.98em;">
            <span>Enviado via <b>AprixOS</b> <span style='color:#f54e00'>Contact Form</span></span>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
