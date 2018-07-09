// This defines the state that will used for the login page
export interface AuthStore {
    email: string,
    password: string,
    user: any,
    error: string,
    loading: boolean
}
