/**
 * Client-side utility for constructing API endpoint URLs
 * This should match the SERVER_BASE_URL used in dev_facing/server.ts
 */
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL ?? "/api";

export function makeEndpointURL(endpointName: string): string {
	return `${SERVER_BASE_URL}/${endpointName}`;
}

