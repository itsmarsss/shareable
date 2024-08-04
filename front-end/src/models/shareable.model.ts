export default interface Shareable {
    id: string;
    name: string;
    description: string;
    date: number;
    images: string[];
    price: number;
    shareCount: number;
    shareHolders: string[];
    location: string;
    ownerUsername: string;
}
