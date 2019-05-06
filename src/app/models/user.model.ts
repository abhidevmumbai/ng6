import { Address } from './address.model';
import { Company } from './company.model';

export interface User {
    id: number;
    name: string;
    email: string;
    website: string;
}

export interface UserDetails {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}
