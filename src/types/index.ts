export type UserProps = {
    uid: string;
    displayName?: string;
    email?: string;
    emailVerified?: string;
    phoneNumber?: string;
};

export type BankProps = {
    id: number;
    name: string;
    shortName: string;
    code: string;
    bin: string;
    logo: string;
    transferSupported: number;
    lookupSupported: number;
};
