export default interface User {
    username: string; // unique
    displayName: string;
    profileB64: string; // base 64
    network: string[]; // string of usernames
}