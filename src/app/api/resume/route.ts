import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const country = (request as any).geo?.country;

  let resume = "/resume/cal-resume-gl.pdf";

  switch (country) {
    case "IN":
      resume = "/resume/cal-resume-in.pdf";
      break;
    case "AE":
      resume = "/resume/cal-resume-ae.pdf";
      break;
  }

  return NextResponse.redirect(new URL(resume, request.url));
}
