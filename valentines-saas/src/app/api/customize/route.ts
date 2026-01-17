import { NextResponse } from "next/server";
import { updateProposal } from "@/lib/sheets";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { refId, creatorName, crushName, theme, customMessages } = body;

        if (!refId) {
            return NextResponse.json(
                { success: false, error: "Missing refId" },
                { status: 400 }
            );
        }

        if (!creatorName?.trim()) {
            return NextResponse.json(
                { success: false, error: "Creator name is required" },
                { status: 400 }
            );
        }

        const success = await updateProposal(refId, {
            creatorName: creatorName.trim(),
            crushName: crushName?.trim() || "",
            theme: theme || "classic",
            customMessages: customMessages || "[]",
        });

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: "Failed to update proposal" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Customize error:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
