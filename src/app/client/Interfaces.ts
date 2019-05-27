import {ApiAiConstants} from "./ApiAiConstants";

export interface IRequestOptions {
    message?: string;
    event?: {name: string, data?: IStringMap};
    uuid?: string;
    lang?: ApiAiConstants.AVAILABLE_LANGUAGES;
}

export interface IServerResponse {
    id?: string;
    result?: {
        action: string,
        resolvedQuery: string,
        speech: string;
        fulfillment?: {
            speech: string
        }
    };
    status: {
        code: number,
        errorDetails?: string,
        errorID?: string,
        errorType: string
    };
}

export interface IStringMap { [s: string]: string; }

export interface IApiClientOptions {
    lang?: ApiAiConstants.AVAILABLE_LANGUAGES;
    version?: string;
    baseUrl?: string;
    uuid?: string;
    streamClientClass?: IStreamClientConstructor;
    accessToken: string;
}

export interface IStreamClientConstructor {
    new (options: IStreamClientOptions): IStreamClient;
}

export interface IStreamClient {
    init(): void;
    open(): void;
    close(): void;
    startListening(): void;
    stopListening(): void;
}

export interface IStreamClientOptions {
    server?: string;
    token?: string;
    uuid?: string;
    lang?: ApiAiConstants.AVAILABLE_LANGUAGES;
    contentType?: string;
    readingInterval?: string;
    onOpen?: () => void;
    onClose?: () => void;
    onInit?: () => void;
    onStartListening?: () => void;
    onStopListening?: () => void;
    onResults?: (data: IServerResponse) => void;
}

