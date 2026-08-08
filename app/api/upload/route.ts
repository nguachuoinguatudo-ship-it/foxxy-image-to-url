import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomString } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
};

const MAX_SIZE = 4.5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Tidak ada file yang dikirim." }, { status: 400 });
    }

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "Format tidak didukung. Gunakan PNG / JPG / JPEG / GIF / WEBP / AVIF." },
        { status: 415 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File terlalu besar. Maksimal 4.5 MB (limit free tier Vercel Blob)." },
        { status: 413 }
      );
    }

    const pathname = `foxxy-${randomString(8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const blob = await put(pathname, buffer, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });

    return NextResponse.json({
      url: blob.url,
      pathname,
      direct: `/${pathname}`,
      size: file.size,
      type: file.type,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("BLOB_READ_WRITE_TOKEN")) {
      return NextResponse.json(
        { error: "Blob storage belum dikonfigurasi. Set env BLOB_READ_WRITE_TOKEN lalu deploy ulang." },
        { status: 500 }
      );
    }
    console.error("[upload]", err);
    return NextResponse.json({ error: "Upload gagal di server. Coba lagi." }, { status: 500 });
  }
}
