import { Metadata } from 'next';
import { findProposalByRefId } from '@/lib/sheets';
import ProposalClient from './ProposalClient';
import { ThemeKey } from '@/lib/themes';

interface Props {
    params: { refId: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

// Ensure dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic';

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const proposal = await findProposalByRefId(params.refId);

    if (!proposal) {
        return {
            title: 'Proposal Not Found',
        };
    }

    const title = proposal.crushName
        ? `${proposal.creatorName} has a specific question for ${proposal.crushName}...`
        : `${proposal.creatorName} has a question for you...`;

    return {
        title: title,
        description: 'Will you be my Valentine? Click to see the surprise! 💕',
        openGraph: {
            title: title,
            description: 'Will you be my Valentine? Click to see the surprise! 💕',
            type: 'website',
            images: ['/og-image.png'], // You might want to dynamize this too based on theme eventually
        },
    };
}

export default async function Page({ params }: Props) {
    const proposal = await findProposalByRefId(params.refId);

    // Convert to expected type (ThemeKey casting)
    const proposalData = proposal ? {
        ...proposal,
        theme: (proposal.theme as ThemeKey) || 'classic'
    } : null;

    return <ProposalClient proposal={proposalData} refId={params.refId} />;
}
