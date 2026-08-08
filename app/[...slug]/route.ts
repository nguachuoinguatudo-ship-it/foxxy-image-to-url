import { NextRequest, NextResponse } from "next/server";
import { head, BlobNotFoundError } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const path = params.slug.join("/");

  if (!path || path.includes("..") || path.includes("%")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const blob = await head(path);
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok || !res.body) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return new Response(res.body, {
      status: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": res.headers.get("content-length") ?? "",
        "Access-Control-Allow-Origin": "*",
        "X-Powered-By": "FOXXY by Wanz",
      },
    });
  } catch (err) {
    if (!(err instanceof BlobNotFoundError)) {
      console.error("[proxy]", err);
    }
    return NextResponse.redirect(new URL("/", req.url));
  }
}
