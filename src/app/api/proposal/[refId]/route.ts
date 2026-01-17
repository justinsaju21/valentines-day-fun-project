import { NextResponse } from "next/server";
import { findProposalByRefId } from "@/lib/sheets";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ refId: string }> }
) {
    try {
        const { refId } = await params;

        if (!refId) {
            return NextResponse.json(
                { success: false, error: "Missing refId" },
                { status: 400 }
            );
        }

        const proposal = await findProposalByRefId(refId);

        if (proposal) {
            // Don't expose password hash
            const { passwordHash, ...safeProposal } = proposal;
            void passwordHash; // Suppress unused variable warning
            return NextResponse.json({ success: true, proposal: safeProposal });
        } else {
            return NextResponse.json(
                { success: false, error: "Proposal not found" },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Get proposal error:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
