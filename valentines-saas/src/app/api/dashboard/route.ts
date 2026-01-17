import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findProposalByRefId } from "@/lib/sheets";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { refId, password } = body;

        if (!refId || !password) {
            return NextResponse.json(
                { success: false, error: "Missing credentials" },
                { status: 400 }
            );
        }

        const proposal = await findProposalByRefId(refId);

        if (!proposal) {
            return NextResponse.json(
                { success: false, error: "Proposal not found" },
                { status: 404 }
            );
        }

        // Verify password
        const isValid = await bcrypt.compare(password, proposal.passwordHash);

        if (!isValid) {
            return NextResponse.json(
                { success: false, error: "Invalid password" },
                { status: 401 }
            );
        }

        // Return proposal data (without password hash)
        const { passwordHash, ...safeProposal } = proposal;
        void passwordHash; // Suppress unused variable warning

        return NextResponse.json({ success: true, proposal: safeProposal });
    } catch (error) {
        console.error("Dashboard error:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
