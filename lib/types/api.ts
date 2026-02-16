import { ProfileGender } from "./enums";
export interface EmailRequest {
  email: string;
}

export interface OTPVerifyRequest {
  email: string;
  otp: string;
  first_name?: string | null;
  last_name?: string | null;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  TRANSGENDER = "transgender",
  OTHERS = "others",
  ANY = "any",
}


// From app/schemas/partner_profile.py
export interface PartnerProfileUpdate {
  first_name?: string | null;
  last_name?: string | null;
  gender?: Gender | null;
  country_code?: string | null;
  contact_number?: string | null;
  bio?: string | null;
}

export interface PartnerProfileResponse {
  id: string;
  profile_code?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  profile_image_url?: string | null;
  email: string;
  gender?: ProfileGender | null;
  country_code?: string | null;
  contact_number?: string | null;
  bio?: string | null;
  aadhaar_url?: string | null;
  passport_url?: string | null;
}

export interface CollaborationsPartnerResponse{
  collabId: string | null;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

export enum CampStatus {
  PENDING_REVIEW = "pending_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  COMPLETED = "completed"
}


export enum PaymentStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}


// From app/schemas/camp.py
export interface CampPitchCreate {
  yt_video_url: string;
  camp_brief: string;
  camp_checklist: string;
}

export interface CampBankAccountCreate {
  bank_name: string;
  ifsc: string;
  account_holder_name: string;
  account_number: string;
}

export interface CampDocumentRequiredCreate {
  document_type_id: string | null; // UUID
  name?: string;
}

export interface CampCollaborationCreate {
  camp_id: string;
  partner_email: string; // UUID
}

export interface CampCompletion {
    message: string;
    attachments?: {
        video?: any; // File or string URL
        image?: string; // URL
    };
}

export interface CampCreate {
  name: string;
  location: string;
  camp_location_gmaps_url: string;
  meetup_datetime: string; // datetime
  meetup_location_address: string;
  meetup_location_gmaps_url: string;
  price_per_seat: number;
  total_seats: number;
  gender: Gender;
  min_age: number;
  max_age: number;
  registration_last_date: string; // date
  start_date: string; // date
  end_date: string; // date
  is_free: boolean;
  privacy_refund_policy_agreed: boolean;
  pitch: CampPitchCreate;
  bank_account: CampBankAccountCreate;
  required_documents?: CampDocumentRequiredCreate[] | null;
  collaborators?: CampCollaborationCreate[] | null;
}

export interface CampResponse {
  id: string; // UUID
  name: string;
  status: CampStatus;
}

export interface CampListItem {
    id: string; // UUID
    name: string;
    location: string;
    duration: number;
    spots_left: number;
    cost: number;
    is_free?: boolean | null;
    video_url?: string | null;
    // thumbnail_url?: string | null;
    registration_last_date: string; // date
    status: string;
}

// From app/schemas/traveller_profile.py
export interface DocumentUpload {
    document_type_id: string;
    document_url: string;
}

export interface TravellerProfileUpdate {
    first_name?: string | null;
    last_name?: string | null;
    country_code?: string | null;
    contact_number?: string | null;
    date_of_birth?: string | null; // date
    gender?: Gender | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    aadhaar_url?: string | null;
    passport_url?: string | null;
    profile_image_url?: string | null;
    documents: DocumentUpload[];
}

// From app/schemas/camp_registration.py
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

export interface RazorpayOrderResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt?: string | null;
    status: string;
    attempts: number;
    created_at: number;
}

export interface PaymentResponse {
    id: string;
    amount: number;
    status: PaymentStatus;
    reference?: string | null;
    razorpay_order_id?: string | null;
    razorpay_payment_id?: string | null;
    razorpay_signature?: string | null;
}

export interface CampRegistrationResponse {
    id: string;
    camp_id: string;
    traveller_id: string;
    status: string;
}

export interface CampRegistrationOrderResponse {
    registration: CampRegistrationResponse;
    payment: PaymentResponse;
    razorpay_order: RazorpayOrderResponse;
}

export interface PaymentVerificationRequest {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

// From app/schemas/camp.py
export interface CampPartnerInfo {
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    profile_image_url?: string | null;
    bio?: string | null;
}

export interface CampDBView {
    id: string; // Assuming id is returned
    camp_name: string;
    partners: CampPartnerInfo[];
    status: CampStatus;
    traveller_data_url: string;
}

// From app/schemas/traveller_profile.py
export interface TravellerProfileResponse {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  country_code?: string | null;
  contact_number?: string | null;
  date_of_birth?: string | null;
  gender?: Gender | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  aadhaar_url?: string | null;
  passport_url?: string | null;
  profile_image_url?: string | null;
  payments: unknown[];
  refunds: unknown[];
  support_tickets: unknown[];
}

export interface ScheduleItem {
  fromDate: Date;
  toDate: Date;
  fromTime: string;
  toTime: string;
  activityInfo: string;
}

// "id": str(registration.id),
//                 "created_at": str(registration.created_at),
//                 "traveller": [
//                     {
//                         "id": str(traveller.id),
//                         "email": traveller.email,
//                         "first_name": traveller.first_name,
//                         "last_name": traveller.last_name,
//                         "country_code": traveller.country_code,
//                         "contact_number": traveller.contact_number,
//                         "date_of_birth": traveller.date_of_birth,
//                         "gender": traveller.gender,
//                         "city": traveller.city,
//                         "state": traveller.state,
//                         "country": traveller.country,
//                         "documents": [
//                             {
//                                 "id": str(document.id),
//                                 "document_name": document.document_type.document_name,
//                                 "document_url": document.document_url

export interface TravellerDocuments {
    id: string;
    document_name: string;
    document_url: string;
}

export interface TravellerDataForRegistration{
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
    documents: TravellerDocuments[];
}

export interface TravellerRegistrationInfo{
    id: string;
    created_at: Date;
    traveller: TravellerDataForRegistration;
}

export interface Registration {
    id: string;
    created_at: Date;
    ticket_number: string;
    traveller: TravellerDataForRegistration;
}

// Placeholder for Camp type used in frontend forms (will be refined)
export interface Camp {
    id?: string;
    campName: string;
    startDate: Date;
    endDate: Date;
    lastDate: Date;
    campLocationText: string;
    googleMapsUrl?: string;
    gender: Gender | "Any";
    age?: [number, number] | [18, 40];
    min_age?: number;
    max_age?: number;
    seats: number;
    cost: string;
    isFree?: boolean;
    address: string;
    meetupDate: Date;
    meetupTime: string;
    meetupAddress: string;
    meetupGoogleMapsUrl?: string;
    partners?: CollaborationsPartnerResponse[];
    status?: CampStatus;
    pitchVideo?: File;
    // thumbnailFile?: File;
    pitch?: { campBrief: string; checkList: string; yt_video_url?: string; /* thumbnail_url?: string */ };
    paperwork?: unknown[];
    paperwork_data: Paperwork[];
    bankDetails?: CampBankAccountCreate;
    privacy?: { agreed: boolean };
    schedule?: ScheduleItem[];
    shareUrl?: string;
    travelers?: BookedForTraveller[];
    requiredDocuments?: CampDocumentRequiredCreate[];
    cancellation?: unknown; 
    completion?: CampCompletion; 
    deleteConfirmation?: { agreed: boolean }; 
    createdAt?: Date;
    paperwork_files?: FileList | File[];
}

export interface CampScheduleAnalytics {
  meetupDate: string; // ISO date
  status: "Pending" | "Active" | "Completed" | "Cancelled";
}

export interface TicketsSummaryAnalytics {
  totalTravellers: number;
  seatsConfirmed: number;
  confirmedTickets: number;
  basePrice: number;
}

export interface NationalPaymentBreakdown {
  date: string; // ISO date
  totalTicketsSold: number;

  baseAmount: number;        // in paise
  gst: number;               // in paise
  grossAmount: number;
  gatewayCharges: number;    // in paise
  softwareCharges: number;   // in paise
  totalDeductions: number;
  netAmount: number;         // in paise
}

export interface InternationalPaymentBreakdown {
  date: string; // ISO date
  ticketsSold: number;

  baseAmount: number;        // in paise
  gst: number;
  grossAmount: number;
  cardFee: number;           // in paise
  gstOnCardFee: number;      // in paise
  conversionFee: number;     // in paise
  gatewayFee: number;        // in paise
  softwareCost: number;      // in paise
  totalDeductions: number;
  netAmount: number;         // in paise
}


export interface PaymentBreakdownAnalytics {
  national: NationalPaymentBreakdown[];
  international: InternationalPaymentBreakdown[];
}

export interface NetPaymentSummary {
  national: NetPaymentCategory;
  international: NetPaymentCategory;
  total: NetPaymentCategory;
}

export interface NetPaymentCategory {
  tickets: number;
  netAmount: number; // in paise
}

export interface PaymentSettlementAnalytics {
  toPlatform: Settlement;
  toCamp: Settlement;
}

export interface Settlement {
  amount: number;       // in paise
  date: string;         // ISO date
  settlementId: string;
}

export interface RefundAnalytics {
  initiated: RefundSettlement;
  local: number;         // in paise
  international: number; // in paise
  toTravellers: number;  // in paise
}

export interface RefundSettlement {
  amount: number;       // in paise
  date: string;         // ISO date
  settlementId: string;
}

export interface AgeAnalysis {
  high: number;
  average: number;
  low: number;
}

export interface GenderRatio {
  male: number;
  female: number;
  trans: number;
  preferNotToSay: number;
}

export interface TravellerTraffic {
  rank: number;

  city: string;
  state: string;
  country: string;

  ageGroup: string;       // "25-30"
  genderRatio: string;    // "M:F:T:O - 6:4:2:1"

  count: number;
}



export interface CampAnalytics {
  schedule: CampScheduleAnalytics;
  ticketsSummary: TicketsSummaryAnalytics;
  paymentBreakdown: PaymentBreakdownAnalytics;
  netPaymentSummary: NetPaymentSummary;
  settlements: PaymentSettlementAnalytics;
  refunds: RefundAnalytics;
  ageAnalysis: AgeAnalysis;
  genderRatio: GenderRatio;
  maxTravellerTraffic: TravellerTraffic[];
}


export interface CampFormValues {
  id?: string | undefined
  slug?: string | undefined
  campName: string
  startDate: Date | undefined
  endDate: Date | undefined
  lastDate: Date | undefined
  gender: Gender | "Any"
  age: [number, number] | [18, 40]
  min_age: number | null
  max_age: number | null
  seats: number | null
  cost: string | number
  isFree: boolean
  address: string
  googleMapsUrl?: string
  meetupDate: Date | undefined
  meetupTime: string
  meetupAddress: string
  meetupGoogleMapsUrl?: string
  partners?: CollaborationsPartnerResponse[];
  status?: CampStatus

  pitch?: {
    campBrief: string
    checkList: string
    yt_video_url?: string
    thumbnail_url?: string
  }

  bankDetails?: CampBankAccountCreate

  collaborators?: CollaborationsPartnerResponse[]
  requiredDocuments?: CampDocumentRequiredCreate[];
  // required_documents?: CampDocumentRequiredCreate[]

  privacy: { agreed: boolean }

  paperwork?: Paperwork[]
  paperwork_files?: PaperworkUpload[];
  // thumbnailFile?: File
  pitchVideo?: File

  travellers: Registration[]

  analytics?: CampAnalytics

  cancellation_video_url?: string
  cancellation_message?: string

  post_camp_video_url?: string | undefined
  post_camp_photo_url?: string | undefined
  post_camp_message?: string | undefined
  createdAt?: Date | undefined
  updated_at?: Date | undefined
}

export interface PaperworkUploadedBy {
  first_name: string;
  last_name: string;
  profile_code: string;
  profile_image_url: string | null;
  bio: string | null;
}


export interface Paperwork{
  id: string;
  document_url: string;
  uploaded_by: PaperworkUploadedBy;
  uploaded_at: Date;
}

export interface CampRequestCallback {
  camp_id: string;
}



export interface PaperworkUpload {
  id: string;
  file: File;
  title: string;
}