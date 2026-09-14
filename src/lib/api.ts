export function getProductsApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_FAKESTORE_API?.trim() ||
    "https://fakestoreapi.com/products";

  // Trim whitespace that .env files may sneak in (e.g. `KEY= value`).
  return apiUrl.trim().replace(/\/+$/, "");
}

/**
 * Sends a login request to the `/api/auth/login` route handler, which proxies
 * the credentials to the upstream auth provider and stores the resulting
 * access token in an HttpOnly cookie on the server.
 *
 * Throws an Error (with the server-provided message) on failure.
 */
export async function loginToApi(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data: { error?: string; success?: boolean } =
    await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || `Login failed (status ${response.status})`);
  }

  return data;
}
