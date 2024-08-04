export default interface Shareable {
    ownerUsername: string;
    id: string;
    name: string;
    description: string;
    date: number;
    images: string[];
    price: number;
    shareCount: number;
    shareHolders: string[];
    location: string;
}
