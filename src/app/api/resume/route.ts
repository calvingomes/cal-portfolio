import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country");

  let resume = "/resume/cal-resume-gl.pdf";

  if (country === "IN") {
    resume = "/resume/cal-resume-in.pdf";
  } else if (country === "AE") {
    resume = "/resume/cal-resume-ae.pdf";
  }

  return NextResponse.redirect(new URL(resume, request.nextUrl));
}
