export interface SupabaseUser { id: string; email: string; user_metadata?: Record<string, string> }
export interface AuthResult { user?: SupabaseUser; session?: { access_token: string } }
export function signUp(data: { email: string; password: string; [key: string]: string }): Promise<AuthResult>;
export function signIn(data: { email: string; password: string }): Promise<{user: SupabaseUser; access_token: string; refresh_token: string}>;
export function getSessionUser(): Promise<SupabaseUser | null>;
export function getToken(): string | null;
export function signOut(): Promise<void>;
export function db<T = any>(path: string, method?: string, body?: unknown): Promise<T>;
