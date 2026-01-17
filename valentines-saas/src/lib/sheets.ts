import { google } from 'googleapis';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
const SHEET_NAME = 'proposals';

export interface Proposal {
    refId: string;
    passwordHash: string;
    displayName: string;
    creatorName: string;
    crushName: string;
    theme: string;
    customMessages: string;
    status: string;
    noClicks: number;
    createdAt: string;
    openedAt: string;
    yesAt: string;
}

// Get all proposals (as rows)
async function getAllRows(): Promise<string[][]> {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:L`,
        });
        return response.data.values || [];
    } catch (error) {
        console.error('Error getting rows:', error);
        return [];
    }
}

// Find proposal by refId
export async function findProposalByRefId(refId: string): Promise<Proposal | null> {
    const rows = await getAllRows();

    for (let i = 1; i < rows.length; i++) { // Skip header
        if (rows[i][0] === refId) {
            return {
                refId: rows[i][0] || '',
                passwordHash: rows[i][1] || '',
                displayName: rows[i][2] || '',
                creatorName: rows[i][3] || '',
                crushName: rows[i][4] || '',
                theme: rows[i][5] || 'classic',
                customMessages: rows[i][6] || '[]',
                status: rows[i][7] || 'pending',
                noClicks: parseInt(rows[i][8] || '0'),
                createdAt: rows[i][9] || '',
                openedAt: rows[i][10] || '',
                yesAt: rows[i][11] || '',
            };
        }
    }
    return null;
}

// Create new proposal
export async function createProposal(data: {
    refId: string;
    passwordHash: string;
    displayName: string;
}): Promise<boolean> {
    try {
        const now = new Date().toISOString();
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:L`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    data.refId,
                    data.passwordHash,
                    data.displayName,
                    '', // creatorName (filled later)
                    '', // crushName
                    'classic', // theme
                    '[]', // customMessages
                    'pending', // status
                    '0', // noClicks
                    now, // createdAt
                    '', // openedAt
                    '', // yesAt
                ]],
            },
        });
        return true;
    } catch (error) {
        console.error('Error creating proposal:', error);
        return false;
    }
}

// Update proposal by refId
export async function updateProposal(refId: string, updates: Partial<Proposal>): Promise<boolean> {
    try {
        const rows = await getAllRows();
        let rowIndex = -1;

        for (let i = 1; i < rows.length; i++) {
            if (rows[i][0] === refId) {
                rowIndex = i + 1; // Sheets are 1-indexed
                break;
            }
        }

        if (rowIndex === -1) return false;

        // Get current row
        const current = await findProposalByRefId(refId);
        if (!current) return false;

        // Merge updates
        const updated = { ...current, ...updates };

        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A${rowIndex}:L${rowIndex}`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    updated.refId,
                    updated.passwordHash,
                    updated.displayName,
                    updated.creatorName,
                    updated.crushName,
                    updated.theme,
                    updated.customMessages,
                    updated.status,
                    updated.noClicks.toString(),
                    updated.createdAt,
                    updated.openedAt,
                    updated.yesAt,
                ]],
            },
        });
        return true;
    } catch (error) {
        console.error('Error updating proposal:', error);
        return false;
    }
}

// Generate unique ref ID
export function generateRefId(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
