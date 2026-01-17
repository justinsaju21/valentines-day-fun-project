import { NextResponse } from "next/server";
import { findProposalByRefId, updateProposal } from "@/lib/sheets";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { refId, action } = body;

        if (!refId) {
            return NextResponse.json(
                { success: false, error: "Missing refId" },
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

        const now = new Date().toISOString();

        switch (action) {
            case "open":
                // Mark as opened if still pending
                if (proposal.status === "pending") {
                    await updateProposal(refId, {
                        status: "opened",
                        openedAt: now,
                    });
                }
                break;

            case "no_click":
                // Increment no clicks
                await updateProposal(refId, {
                    noClicks: proposal.noClicks + 1,
                });
                break;

            case "yes":
                // Mark as yes!
                await updateProposal(refId, {
                    status: "yes",
                    yesAt: now,
                });
                break;

            default:
                return NextResponse.json(
                    { success: false, error: "Invalid action" },
                    { status: 400 }
                );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Track error:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
