export function decodeJwt<T = any>(token: string): T | null {
    try {
        const [, payload] = token.split('.');
        const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decodeURIComponent(escape(json)));
    } catch { return null; }
}