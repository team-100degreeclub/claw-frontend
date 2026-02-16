"use client";

import React from "react";
import { TravelerTable } from "../TravelerTable"
import { Gender } from "@/lib/types/api";
import { Registration } from "@/lib/types/api";

export type Traveler = {
  id: string;
  ticketNumber: string;
  name: string;
  avatarUrl: string;
  gender: "Male" | "Female" | "Transgender" | "Others";
  age: number;
  email: string;
  phone: string;
  bookingDate: Date;
  location: string;
  identificationDocuments: {
    name: string;
    url: string;
  }[];
};

interface TravelersInfoSectionProps {
  registrations: Registration[] | [];
}

export function TravelersInfoSection({
  registrations,
}: TravelersInfoSectionProps) {
  // const travelers: Traveler[] = React.useMemo(
  //   () =>
  //     registrations.map((registration) => {
  //       const traveller = registration.traveller;

  //       const age =
  //         new Date().getFullYear() -
  //         new Date(traveller.date_of_birth).getFullYear();

  //       return {
  //         id: registration.id,
  //         ticketNumber: registration.ticket_number,
  //         name: `${traveller.first_name} ${traveller.last_name}`,
  //         avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${traveller.first_name}%20${traveller.last_name}&backgroundColor=f3f4f6`,
  //         gender:
  //           traveller.gender === Gender.MALE
  //             ? "Male"
  //             : traveller.gender === Gender.FEMALE
  //               ? "Female"
  //               : traveller.gender === Gender.TRANSGENDER
  //                 ? "Transgender"
  //                 : "Others",
  //         age,
  //         email: traveller.email,
  //         phone: `${traveller.country_code}${traveller.contact_number}`,
  //         bookingDate: new Date(registration.created_at),
  //         location: `${traveller.city}, ${traveller.country}`,
  //         identificationDocuments: traveller.documents.map((doc) => ({
  //           name: doc.document_name,
  //           url: doc.document_url,
  //         })),
  //       };
  //     }),
  //   [registrations]
  // );

  const travelers: Traveler[] = [
    {
        id: "1",
        ticketNumber: "100DC-AX-2024-001",
        name: "Arjun Malhotra",
        age: 28,
        gender: "Male",
        email: "arjun.m@example.com",
        phone: "+91 98765 43210",
        location: "Mumbai, Maharashtra",
        identificationDocuments: [
            { name: "Aadhar Card", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
            { name: "Passport", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
        ],
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun%20Malhotra&backgroundColor=f3f4f6",
        bookingDate: new Date()
    },
    {
        id: "2",
        ticketNumber: "100DC-AX-2024-002",
        name: "Sarah Jenkins",
        age: 32,
        gender: "Female",
        email: "sarah.j@globaltravel.com",
        phone: "+1 415 555 0199",
        location: "San Francisco, USA",
        identificationDocuments: [
            { name: "Travel Visa", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
            { name: "Health Insurance", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
        ],
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun%20Malhotra&backgroundColor=f3f4f6",
        bookingDate: new Date()
    },
    {
        id: "3",
        ticketNumber: "100DC-AX-2024-003",
        name: "Vikram Singh",
        age: 24,
        gender: "Male",
        email: "v.singh@outlook.com",
        phone: "+91 91234 56789",
        location: "Bangalore, Karnataka",
        identificationDocuments: [
            { name: "Driving License", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
        ],
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun%20Malhotra&backgroundColor=f3f4f6",
        bookingDate: new Date()
    }
];
  return (
    <div className="bg-zinc-950 mb-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 ">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Travellers Information
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          View all registered travellers and their submitted documents.
        </p>
      </div>

      {/* Traveller Table */}
      <TravelerTable travelers={travelers} />
    </div>
  );
}
