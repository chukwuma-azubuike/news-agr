export interface IGuardianPayload {
    q: string;
    'api-key': string;
    'from-date'?: string; // 2014-02-16
    'to-date'?: string; // 2014-02-16
}
interface IGuardianResult {
    id: string;
    type: string;
    apiUrl: string;
    sectionId: string;
    sectionName: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
    webTitle: string;
    webUrl: string;
    webPublicationDate: string; // '2025-02-18T21:22:22Z';
}

export interface IGuardianResponse {
    response: {
        status: string;
        userTier: string;
        total: number;
        startIndex: number;
        pageSize: number;
        currentPage: number;
        pages: number;
        results: Array<IGuardianResult>;
        orderBy: 'newest' | 'oldest' | 'relevance';
    };
}
