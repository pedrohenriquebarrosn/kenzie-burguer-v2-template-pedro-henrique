// Supabase project public URL and publishable key: safe for client applications.
// All user data is protected by PostgreSQL Row Level Security.
const BASE = import.meta.env.VITE_SUPABASE_URL || "https://bzhappkbfjzggghcpxht.supabase.co";
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_T02uB_fBFkzZ_H1u_thK9Q_l_bA0XYT";
const STORAGE = 'kenzie_APP_auth_v1';
const authHeaders = (token) => ({
  apikey: KEY,
  'Content-Type': 'application/json',
  ...(token ? { Authorization: 'Bearer ' + token } : {}),
});
const readSession = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE) || 'null'); }
  catch { return null; }
};
const writeSession = (data) => {
  if (data && data.access_token) localStorage.setItem(STORAGE, JSON.stringify(data));
  else localStorage.removeItem(STORAGE);
};
async function request(path, { method = 'GET', token, body, headers = {} } = {}) {
  const response = await fetch(BASE + path, {
    method,
    headers: { ...authHeaders(token), ...headers },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.msg || payload?.message || payload?.error_description || payload?.error || 'Servidor indisponível');
    error.status = response.status;
    throw error;
  }
  return payload;
}
export async function signUp({ email, password, ...metadata }) {
  return request('/auth/v1/signup', {
    method: 'POST', body: { email, password, data: metadata }
  });
}
export async function signIn({ email, password }) {
  const session = await request('/auth/v1/token?grant_type=password', { method: 'POST', body: { email, password } });
  writeSession(session);
  return session;
}
export async function getSessionUser() {
  let session = readSession();
  if (!session?.access_token) return null;
  try {
    const user = await request('/auth/v1/user', { token: session.access_token });
    return user;
  } catch (error) {
    if (error.status !== 401) throw error;
    if (!session.refresh_token) { writeSession(null); return null; }
    try {
      session = await request('/auth/v1/token?grant_type=refresh_token', {method:'POST', body:{refresh_token:session.refresh_token}});
      writeSession(session);
      return request('/auth/v1/user', {token:session.access_token});
    } catch { writeSession(null); return null; }
  }
}
export function getToken() { return readSession()?.access_token || null; }
export async function signOut() {
  const token = getToken();
  writeSession(null);
  if (token) await request('/auth/v1/logout', {method:'POST',token}).catch(()=>{});
}
export async function db(path, method = 'GET', body) {
  let token = getToken();
  if (!token) throw new Error('Faça login para acessar seus dados');
  try { return await request('/rest/v1/' + path, {method,token,body,headers:{Prefer:'return=representation'}}); }
  catch(e) {
    if (e.status !== 401) throw e;
    const user=await getSessionUser();
    if (!user) throw new Error('Sessão expirada. Faça login novamente.');
    token=getToken();
    return request('/rest/v1/' + path, {method,token,body,headers:{Prefer:'return=representation'}});
  }
}
