export namespace ApiAiConstants {
  export enum AVAILABLE_LANGUAGES {
    EN = "en" as any, DE = "de" as any, ES = "es" as any, PT_BR = "pt-BR" as any, ZH_HK = "zh-HK" as any,
    ZH_CN = "zh-CN" as any, ZH_TW = "zh-TW" as any, NL = "nl" as any, FR = "fr" as any, IT = "it" as any,
    JA = "ja" as any, KO = "ko" as any, PT = "pt" as any, RU = "ru" as any, UK = "uk" as any
  }

  export const DEFAULT_BASE_URL: string = "http://192.168.1.142:5000/webhooks/chatroom/conversations/";
  export const DEFAULT_API_VERSION: string = "20190707";
  export const DEFAULT_CLIENT_LANG: AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES.EN;
}
