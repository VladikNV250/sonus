export class ApiClient {
    private static BASE_URL =
        (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000/api'

    static async get<T>(path: string): Promise<T> {
        const response = await fetch(`${this.BASE_URL}${path}`)
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`)
        }
        return (await response.json()) as T
    }

    static async post<T>(path: string, body: unknown): Promise<T> {
        const response = await fetch(`${this.BASE_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`)
        }
        return (await response.json()) as T
    }

    static async delete<T>(path: string): Promise<T> {
        const response = await fetch(`${this.BASE_URL}${path}`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`)
        }
        if (response.status === 204) {
            return {} as T
        }
        return (await response.json()) as T
    }
}
