export interface INYTimesPayload {
    'api-key': string;
    source?: string;
    begin_date?: string;
    end_date?: string;
    fq?: string;
    q?: string;
}

export interface INYTimesResponse {
    status: string;
    copyright: string;
    response: {
        docs: NYTArticle[];
        meta: {
            hits: number;
            offset: number;
            time: number;
        };
    };
}

interface NYTArticle {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    print_section?: string;
    print_page?: string;
    source: string;
    multimedia: NYTMultimedia[];
    headline: {
        main: string;
        kicker?: string;
        content_kicker?: string;
        print_headline?: string;
        name?: string;
        seo?: string;
        sub?: string;
    };
    keywords: NYTKeyword[];
    pub_date: string;
    document_type: string;
    news_desk?: string;
    section_name?: string;
    subsection_name?: string;
    byline?: {
        original?: string;
        person?: NYTBylinePerson[];
        organization?: string;
    };
    type_of_material?: string;
    _id: string;
    word_count?: number;
    uri: string;
}

interface NYTMultimedia {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption?: string;
    copyright?: string;
}

interface NYTKeyword {
    name: string;
    value: string;
    rank?: number;
    major?: string;
}

interface NYTBylinePerson {
    firstname?: string;
    middlename?: string;
    lastname?: string;
    qualifier?: string;
    title?: string;
    role?: string;
    organization?: string;
    rank?: number;
}
