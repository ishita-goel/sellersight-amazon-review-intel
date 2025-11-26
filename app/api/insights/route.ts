import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "data");

    const featureSentimentPath = path.join(
      dataDir,
      "feature_sentiment.csv"
    );
    const prioritizedFixesPath = path.join(
      dataDir,
      "prioritized_fixes.json"
    );

    // Read files asynchronously
    const [featureSentimentCsv, prioritizedFixesRaw] = await Promise.all([
      fs.readFile(featureSentimentPath, "utf-8"),
      fs.readFile(prioritizedFixesPath, "utf-8"),
    ]);

    const prioritizedFixes = JSON.parse(prioritizedFixesRaw);

    return NextResponse.json(
      {
        featureSentimentCsv,
        prioritizedFixes,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in /api/insights:", err);
    return NextResponse.json(
      {
        error: "Failed to load insights data",
        details: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Optional: ensure this always runs on the server
export const dynamic = "force-dynamic";
