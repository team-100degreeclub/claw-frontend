// src/lib/api/models/payments.ts

export enum PaymentStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
    REFUNDED = "refunded",
}

export interface PaymentResponse {
    id: string;
    registration_id: string;
    traveller_id: string;
    amount: number;
    status: PaymentStatus;
    transaction_id: string | null;
    payment_method: string | null;
    payment_date: string; // ISO 8601 datetime string
}
