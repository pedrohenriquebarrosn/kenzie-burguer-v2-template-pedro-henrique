// Supabase project public URL and publishable key: safe for client applications.
// All user data is protected by PostgreSQL Row Level Security.
const BASE = import.meta.env.VITE_SUPABASE_URL || "https://bzhappkbfjzggghcpxht.supabase.co";
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_T02uB_fBFkzZ_H1u_thK9Q_l_bA0XYT";
const STORAGE = 'kenzie_burger_auth_v1';
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
  // Confirmation emails must return to THIS app; add its origin to Supabase Auth
  // > URL Configuration > Redirect URLs before onboarding external users.
  const redirect = encodeURIComponent(window.location.origin + '/');
  return request('/auth/v1/signup?redirect_to=' + redirect, {
    method: 'POST', body: { email, password, data: metadata }
  });
}
export async function signIn({ email, password }) {
  const session = await request('/auth/v1/token?grant_type=password', { method: 'POST', body: { email, password } });
  writeSession(session);
  return session;
}
export async function getSessionUser() {
  // GoTrue email confirmations may redirect back with session tokens in a
  // URL fragment. Store them for the app and scrub them from browser history.
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const redirectedToken = fragment.get('access_token');
  const redirectedRefresh = fragment.get('refresh_token');
  if (redirectedToken && redirectedRefresh) {
    writeSession({access_token: redirectedToken, refresh_token: redirectedRefresh});
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
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
