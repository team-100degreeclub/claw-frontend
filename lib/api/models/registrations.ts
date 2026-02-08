// src/lib/api/models/registrations.ts

import { Gender, PaymentStatus } from "./enums";

export interface MissingDocument {
	id: string;
	name: string;
}

export interface PendingTravellerDetails {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	missing_documents: MissingDocument[];
	gender?: Gender | null;
	age?: number | null;
	is_existing_user: boolean;
}

export interface DocumentUpload {
	document_type_id: string;
	document_url: string;
}

export interface TravellerUpdateSchema {
	first_name: string;
	last_name: string;
	email: string;
	gender?: Gender;
	country_code?: string;
	contact_number?: string;
	date_of_birth?: string;
	city?: string;
	state?: string;
	country?: string;
	aadhaar_url?: string;
	passport_url?: string;
	profile_image_url?: string;
	documents?: DocumentUpload[];
}

export interface BookedForTraveller {
	first_name: string;
	last_name: string;
	gender: Gender;
	age: number;
	email: string;
}

export interface CampRegistrationCreate {
	camp_id: string;
	book_for_primary_user: boolean;
	other_travellers: BookedForTraveller[];
}

export interface PaymentVerificationRequest {
	razorpay_order_id: string;
	razorpay_payment_id: string;
	razorpay_signature: string;
}

export interface CampRegistrationResponse {
	id: string;
	camp_id: string;
	traveller_id: string;
	status: string;
}

export interface RazorpayOrderResponse {
	id: string;
	entity: string;
	amount: number;
	amount_paid: number;
	amount_due: number;
	currency: string;
	receipt: string | null;
	status: string;
	attempts: number;
	created_at: number;
}

export interface PaymentResponse {
	id: string;
	amount: number;
	status: PaymentStatus;
	reference: string | null;
	razorpay_order_id: string | null;
	razorpay_payment_id: string | null;
	razorpay_signature: string | null;
}

export interface CampRegistrationOrderResponse {
	registration: CampRegistrationResponse;
	payment: PaymentResponse | null;
	razorpay_order: RazorpayOrderResponse | null;
}

export interface TravellerDocumentResponse {
	id: string;
	document_type_id: string;
	document_name: string;
	document_url: string;
}

export interface TravellerRegistrationResponse {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	country_code: string;
	contact_number: string;
	date_of_birth: string;
	gender: Gender;
	city: string;
	state: string;
	country: string;
	documents: TravellerDocumentResponse[];
}

export interface RegistrationsResponse {
	id: string;
	created_at: string;
	ticket_number: string;
	traveller: TravellerRegistrationResponse;
}
