export default interface User {
    displayName: string;
    username: string;
    hashedPassword: string;
    profileB64: string;
    token: string;
    network: string[];
    shareables: string[];
    pending: string[];
}
