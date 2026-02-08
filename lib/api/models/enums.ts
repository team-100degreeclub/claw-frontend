// src/lib/api/models/enums.ts

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  TRANSGENDER = "transgender",
  OTHERS = "others",
  ANY = "any",
  PREFER_NOT_TO_SAY = "Prefer not to say"
}

export enum CampStatus {
  PENDING_REVIEW = "pending_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export enum TicketStatus {
  CONFIRMED = "confirmed",
  PENDING = "pending",
  CANCELLED = "cancelled",
}

export enum CollaborationStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}

export enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum RegistrationStatus {
  LOCKED = "locked",
  PENDING_PAYMENT = "pending_payment",
  SUCCESS = "success",
  FAILED = "failed",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
}