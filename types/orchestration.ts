import { IGuardianPayload, IGuardianResponse } from './guardian';
import { INewApiPayload, INewsApiResponse } from './news-api';
import { INYTimesPayload, INYTimesResponse } from './ny-times';

export interface INewsQueryParams {
    keyword: string;
    sources?: string[];
    category?: string;
    toDate?: string; // ISO format
    fromDate?: string; // ISO format
}

export type INewsQueryMapper<A = unknown> = (arg: INewsQueryParams) => A;

export interface IQueryMapper {
    [SOURCES.newsAPI]: INewsQueryMapper<INewApiPayload>;
    [SOURCES.nyTimes]: INewsQueryMapper<INYTimesPayload>;
    [SOURCES.guardian]: INewsQueryMapper<IGuardianPayload>;
}

export interface INormalisedNewsArticle {
    title: string;
    description: string;
    url: string;
    image: string | null;
    source: string;
    publishedAt: string;
}

export type IDefaultNewsResponse = Array<INewsApiResponse> | Array<IGuardianResponse> | INYTimesResponse;

export enum SOURCES {
    newsAPI = 'News API',
    nyTimes = 'NY Times',
    guardian = 'Guardian',
}
