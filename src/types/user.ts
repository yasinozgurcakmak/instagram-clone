export interface User {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: User1;
}
export interface User1 {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    confirmation_sent_at: string;
    confirmed_at: string;
    last_sign_in_at: string;
    app_metadata: AppMetadata;
    user_metadata: IdentityDataOrUserMetadata;
    identities?: (IdentitiesEntity)[] | null;
    created_at: string;
    updated_at: string;
    is_anonymous: boolean;
}
export interface AppMetadata {
    provider: string;
    providers?: (string)[] | null;
}
export interface IdentityDataOrUserMetadata {
    email: string;
    email_verified: boolean;
    name: string;
    phone_verified: boolean;
    sub: string;
    username: string;
    profile_image?:string;
}
export interface IdentitiesEntity {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: IdentityDataOrUserMetadata;
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    email: string;
}