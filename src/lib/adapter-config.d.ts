// Augments the globally declared ioBroker types with everything this adapter adds.
// Keep in sync with `native` in io-package.json and with admin/jsonConfig.json.
declare global {
    namespace ioBroker {
        interface AdapterConfig {
            /** CallMeBot API key. Stored as string (the old HTML admin saved the input value as text) */
            apikey: string;
            /** Phone number used when no recipient is given (international format, e.g. +49123456789) */
            defaultPhone: string;
        }
    }
}

export {};
