import { NextRequest, NextResponse } from "next/server";
import { list, del } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LIMIT = 60;

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const limit = Math.min(Math.max(parseInt(sp.get("limit") || "20", 10) || 20, 1), MAX_LIMIT);
    const cursor = sp.get("cursor") || undefined;

    const { blobs, cursor: nextCursor, hasMore } = await list({
      mode: "folded",
      limit,
      cursor,
      prefix: "foxxy-",
    });

    return NextResponse.json({
      blobs: blobs.map((b) => ({
        url: b.url,
        pathname: b.pathname,
        size: b.size,
        uploadedAt: b.uploadedAt,
      })),
      cursor: nextCursor ?? null,
      hasMore,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("BLOB_READ_WRITE_TOKEN")) {
      return NextResponse.json(
        { error: "Blob storage belum dikonfigurasi. Set env BLOB_READ_WRITE_TOKEN." },
        { status: 500 }
      );
    }
    console.error("[list]", err);
    return NextResponse.json({ error: "Gagal memuat gallery." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const path = req.nextUrl.searchParams.get("path");
    if (!path) {
      return NextResponse.json({ error: "Param 'path' wajib diisi." }, { status: 400 });
    }
    if (!path.startsWith("foxxy-")) {
      return NextResponse.json({ error: "Path tidak valid." }, { status: 400 });
    }
    await del(path);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[delete]", err);
    return NextResponse.json({ error: "Gagal menghapus file." }, { status: 500 });
  }
}
