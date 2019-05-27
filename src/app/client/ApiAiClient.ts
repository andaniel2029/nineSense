import { ApiAiConstants } from "./ApiAiConstants";
import TextRequest from "./TextRequest";
import { ApiAiClientConfigurationError } from "./Errors";


import { IApiClientOptions, IRequestOptions, IServerResponse } from "./Interfaces";

export * from "./Interfaces";
export {ApiAiConstants} from "./ApiAiConstants";

export class ApiAiClient {

    private apiLang: ApiAiConstants.AVAILABLE_LANGUAGES;
    private apiVersion: string;
    private apiBaseUrl: string;
    private uuid: string;
    private accessToken: string;

    constructor(options: IApiClientOptions) {

        if (!options || !options.accessToken) {
            throw new ApiAiClientConfigurationError("Access token is required for new ApiAi.Client instance");
        }

        this.accessToken = options.accessToken;
        this.apiLang = options.lang || ApiAiConstants.DEFAULT_CLIENT_LANG;
        this.apiVersion = options.version || ApiAiConstants.DEFAULT_API_VERSION;
        this.apiBaseUrl = options.baseUrl || ApiAiConstants.DEFAULT_BASE_URL;
        this.uuid = options.uuid || this.guid();
    }

    public textRequest(query, options: IRequestOptions = {}): Promise<IServerResponse> {
        if (!query) {
            throw new ApiAiClientConfigurationError("Query should not be empty");
        }
        options.message = query;
        return new TextRequest(this, options).perform();
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public getApiVersion(): string {
        return (this.apiVersion) ? this.apiVersion : ApiAiConstants.DEFAULT_API_VERSION;
    }

    public getApiLang(): ApiAiConstants.AVAILABLE_LANGUAGES {
        return (this.apiLang) ? this.apiLang : ApiAiConstants.DEFAULT_CLIENT_LANG;
    }

    public getApiBaseUrl(): string {
        return (this.apiBaseUrl) ? this.apiBaseUrl : ApiAiConstants.DEFAULT_BASE_URL;
    }

    public setuuid(uuid: string) {
        this.uuid = uuid;
    }

    public getuuid(): string {
        return this.uuid;
    }

    /**
     * generates new random uuid
     * @returns {string}
     */
    private guid(): string {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
            s4() + "-" + s4() + s4() + s4();
    }
}
