import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createProposal, generateRefId, findProposalByRefId } from "@/lib/sheets";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { displayName, password } = body;

        if (!password || password.length < 4) {
            return NextResponse.json(
                { success: false, error: "Password must be at least 4 characters" },
                { status: 400 }
            );
        }

        // Generate unique refId
        let refId = generateRefId();

        // Make sure it's unique (very unlikely to collide, but let's be safe)
        let attempts = 0;
        while (await findProposalByRefId(refId) && attempts < 10) {
            refId = generateRefId();
            attempts++;
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create the proposal in Google Sheets
        const success = await createProposal({
            refId,
            passwordHash,
            displayName: displayName || "",
        });

        if (success) {
            return NextResponse.json({ success: true, refId });
        } else {
            return NextResponse.json(
                { success: false, error: "Failed to create proposal" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Create error:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
