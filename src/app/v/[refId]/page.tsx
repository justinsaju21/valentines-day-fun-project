import { Metadata } from 'next';
import { findProposalByRefId } from '@/lib/sheets';
import ProposalClient from './ProposalClient';
import { ThemeKey } from '@/lib/themes';

interface Props {
    params: Promise<{ refId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Ensure dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic';

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { refId } = await params;
    const proposal = await findProposalByRefId(refId);

    if (!proposal) {
        return {
            title: 'Proposal Not Found',
        };
    }

    const title = proposal.crushName
        ? `${proposal.creatorName} has a question for ${proposal.crushName}...`
        : `${proposal.creatorName} has a question for you...`;

    return {
        title: title,
        description: 'Will you be my Valentine? Click to see the surprise! 💕',
        openGraph: {
            title: title,
            description: 'Will you be my Valentine? Click to see the surprise! 💕',
            type: 'website',
            images: ['/og-image.png'],
        },
    };
}

export default async function Page({ params }: Props) {
    const { refId } = await params;
    const proposal = await findProposalByRefId(refId);

    // Convert to expected type (ThemeKey casting)
    const proposalData = proposal ? {
        ...proposal,
        theme: (proposal.theme as ThemeKey) || 'classic'
    } : null;

    return <ProposalClient proposal={proposalData} refId={refId} />;
}
