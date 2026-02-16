"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateCampSidebar } from "./CreateCampSidebar";
import { CampDetailsForm } from "./forms/CampDetailsForm";
import { CollaboratorInvite } from "./forms/CollaboratorInvite";
import { PitchForm } from "./forms/PitchForm";
import { PaperworkSection, PaperworkDocument } from "./forms/PaperworkSection";
import { BankDetailsForm } from "./forms/BankDetailsForm";
import { PrivacyRefundSection } from "./forms/PrivacyRefundSection";
import { GoViralSection } from "./forms/GoViralSection";
import { TravelersInfoSection } from "./forms/TravelersInfoSection";
import { CampStatusTab } from "./CampStatusTab";
import { LettersTab } from "./LettersTab";
import { DocumentsRequiredSection } from "./forms/DocumentsRequiredSection";
import { CampAnalyticsTab } from "./CampAnalyticsTab";
import { Camp, CampStatus, Gender, PaperworkUpload } from "@/lib/types/api";
import React from "react";
import campService from "@/lib/services/campService";
import { handleFileUpload } from "@/lib/services/videoService";
import { z } from "zod";
import { toast } from "sonner";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CampFormValues } from "@/lib/types/api";

const allSections = ["Camp Details", "Collaborate", "Pitch", "Paper Work", "Documents Required", "Bank Detail", "Privacy & Refund", "Camp's Status", "Go Viral", "Camp Analytics", "Traveller's Info", "Letters"];

const dummyCampFormValues: CampFormValues = {
  id: "dummy-camp-id",
  slug: "dummy-camp-slug",
  campName: "Dummy Camp Adventure",
  startDate: new Date("2024-03-10T00:00:00.000Z"),
  endDate: new Date("2024-03-15T00:00:00.000Z"),
  lastDate: new Date("2024-03-05T00:00:00.000Z"),
  gender: Gender.ANY,
  age: [18, 40],
  min_age: 18,
  max_age: 40,
  seats: 50,
  cost: "1500",
  isFree: false,
  address: "123 Adventure Lane, Wilderness, CA",
  googleMapsUrl: "https://maps.google.com/?q=Dummy+Camp+Adventure",
  meetupDate: new Date("2024-03-09T00:00:00.000Z"),
  meetupTime: "09:00",
  meetupAddress: "456 Gathering Point, City, State",
  meetupGoogleMapsUrl: "https://maps.google.com/?q=Dummy+Meetup+Point",
  partners: [],
  status: CampStatus.PENDING_REVIEW,
  pitch: {
    campBrief: "This is a dummy camp brief about an exciting adventure.",
    checkList: "Sleeping bag, hiking boots, positive attitude",
    yt_video_url: "https://www.youtube.com/watch?v=H9-OOl_9r6I",
    thumbnail_url: "https://example.com/dummy-thumbnail.jpg",
  },
  bankDetails: {
    bank_name: "Dummy Bank",
    ifsc: "DUMMY000001",
    account_holder_name: "Dummy Account Holder",
    account_number: "1234567890",
  },
  collaborators: [
    {
      collabId: "collab-id-1",
      name: "Dummy Collaborator 1",
      email: "collab1@example.com",
      status: "approved",
      created_at: new Date().toISOString(),
    },
  ],
  requiredDocuments: [
    {
      document_type_id: "doc-type-id-1",
      name: "Dummy ID Proof",
    },
  ],
  privacy: { agreed: true },
  paperwork: [],
  paperwork_files: [],
  travellers: [],
  analytics: {
    schedule: {
      meetupDate: new Date().toISOString(),
      status: "Active",
    },
    ticketsSummary: {
      totalTravellers: 10,
      seatsConfirmed: 8,
      confirmedTickets: 8,
      basePrice: 1000,
    },
    paymentBreakdown: {
      national: [],
      international: [],
    },
    netPaymentSummary: {
      national: { tickets: 5, netAmount: 500000 },
      international: { tickets: 3, netAmount: 300000 },
      total: { tickets: 8, netAmount: 800000 },
    },
    settlements: {
      toPlatform: { amount: 100000, date: new Date().toISOString(), settlementId: "settle-1" },
      toCamp: { amount: 700000, date: new Date().toISOString(), settlementId: "settle-2" },
    },
    refunds: {
      initiated: { amount: 50000, date: new Date().toISOString(), settlementId: "refund-1" },
      local: 25000,
      international: 25000,
      toTravellers: 50000,
    },
    ageAnalysis: {
      high: 35,
      average: 28,
      low: 20,
    },
    genderRatio: {
      male: 6,
      female: 4,
      trans: 0,
      preferNotToSay: 0,
    },
    maxTravellerTraffic: [
      {
        rank: 1,
        city: "Dummy City",
        state: "Dummy State",
        country: "Dummy Country",
        ageGroup: "25-30",
        genderRatio: "M:F:T:O - 6:4:2:1",
        count: 5,
      },
    ],
  },
  cancellation_video_url: "https://www.youtube.com/watch?v=dummycancel",
  cancellation_message: "Camp cancelled due to unforeseen circumstances.",
  post_camp_video_url: "https://www.youtube.com/watch?v=dummypostcampvideo",
  post_camp_photo_url: "https://example.com/dummypostcampphoto.jpg",
  post_camp_message: "What an amazing camp experience!",
  createdAt: new Date("2024-03-01T00:00:00.000Z"),
  updated_at: new Date("2024-03-01T00:00:00.000Z"),
};

export function CreateCampDialog({ initialData, isOpen, onClose }: { initialData?: Partial<CampFormValues>; isOpen?: boolean; onClose?: () => void }) {
	initialData = dummyCampFormValues;
	const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0);
	const [enabledSections, setEnabledSections] = React.useState<string[]>(initialData ? allSections : ["Camp Details"]);
	const [isUpdatable, setIsUpdatable] = React.useState(false);
	// const [campDraft, setCampDraft] = React.useState<Partial<Camp>>(() => initialData ?? {});
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const refetchCamp = () => {
		campService
			.getCampById(initialData?.id ?? "")
			.then((data) => {
				setIsUpdatable(data.status === CampStatus.PENDING_REVIEW || data.status === CampStatus.APPROVED);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	var isUpdateMode = initialData != null;

	const form = useForm<CampFormValues>({
		mode: "onChange",
		defaultValues: {
			campName: "",
			age: [18, 35],
			gender: Gender.ANY,
			isFree: false,
			cost: 0,
			seats: null,
		},
	});

	const EMPTY_DEFAULTS: CampFormValues = {
		campName: "",
		startDate: undefined,
		endDate: undefined,
		lastDate: undefined,
		gender: Gender.ANY,
		age: [18, 40],
		min_age: null,
		max_age: null,
		seats: null,
		cost: 0,
		isFree: false,
		address: "",
		googleMapsUrl: "",
		meetupDate: undefined,
		meetupTime: "",
		meetupAddress: "",
		meetupGoogleMapsUrl: "",
		pitch: {
			campBrief: "",
			checkList: "",
			yt_video_url: "",
			// thumbnail_url: "",
		},
		bankDetails: {
			bank_name: "",
			ifsc: "",
			account_holder_name: "",
			account_number: "",
		},
		collaborators: [],
		paperwork_files: [],
		requiredDocuments: [],
		privacy: { agreed: false },
		travellers: [],
		paperwork: [],
	};

	React.useEffect(() => {
		if (initialData) {
			console.log("Initial data found");
			form.reset({
				campName: initialData.campName,
				startDate: initialData.startDate ? new Date(initialData.startDate) : undefined,
				endDate: initialData.endDate ? new Date(initialData.endDate) : undefined,
				lastDate: initialData.lastDate ? new Date(initialData.lastDate) : undefined,
				gender: initialData.gender ?? Gender.ANY,
				age: [initialData.min_age || null || undefined, initialData.max_age || null || undefined],
				min_age: initialData.min_age ?? null,
				max_age: initialData.max_age ?? null,
				seats: initialData.seats ?? null,
				cost: initialData.cost ?? 0,
				isFree: initialData.isFree ?? false,
				address: initialData.address ?? "",
				googleMapsUrl: initialData.googleMapsUrl ?? "",
				meetupDate: initialData.meetupDate ? new Date(initialData.meetupDate) : undefined,
				meetupTime: initialData.meetupTime ?? "",
				meetupAddress: initialData.meetupAddress ?? "",
				meetupGoogleMapsUrl: initialData.meetupGoogleMapsUrl ?? "",
				pitch: initialData.pitch,
				bankDetails: initialData.bankDetails ?? EMPTY_DEFAULTS.bankDetails,
				collaborators: initialData.partners ?? [],
				requiredDocuments: initialData.requiredDocuments ?? [],
				paperwork: initialData.paperwork ?? [],
				privacy: { agreed: true },
				status: initialData.status ?? CampStatus.PENDING_REVIEW,
				cancellation_video_url: initialData.cancellation_video_url ?? "",
				cancellation_message: initialData.cancellation_message ?? "",
				post_camp_message: initialData.post_camp_message ?? "",
				post_camp_photo_url: initialData.post_camp_photo_url ?? "",
				post_camp_video_url: initialData.post_camp_video_url ?? "",
				updated_at: initialData.updated_at ? new Date(initialData.updated_at) : undefined,
				createdAt: initialData.createdAt ? new Date(initialData.createdAt) : undefined,
				analytics: initialData.analytics ?? undefined,
				// paperwork_files: initialData.paperwork_files ?? [],
			});

			isUpdateMode = true;
		}
		else {
			isUpdateMode = false;
			console.log("Initial data not found");
			form.reset(EMPTY_DEFAULTS);
		}
	}, [initialData?.id]);


	// const sections = initialData ? allSections : allSections.filter((s) => !["Go Viral", "Traveller's Info", "Camp's Status", "Letters", "Camp Analytics"].includes(s));
	const sections = allSections
	const currentSection = sections[currentSectionIndex];
	const currentFormId = `${currentSection.replace(/ /g, "-").toLowerCase()}-form`;

	const handlePrevious = () => {
		setCurrentSectionIndex((i) => Math.max(0, i - 1));
	};

	const advanceToNextSection = () => {
		const next = currentSectionIndex + 1;
		if (next < sections.length) {
			setEnabledSections((prev) => [...prev, sections[next]]);
			setCurrentSectionIndex(next);
		}
	};

	// const campCreateSchema = z.object({
	// 	name: z.string().min(1, "Camp name is required."),
	// 	location: z.string().min(1, "Camp location is required."),
	// 	camp_location_gmaps_url: z.string().url("Must be a valid Google Maps URL for camp location.").optional().or(z.literal("")),
	// 	meetup_datetime: z.string().min(1, "Meetup date and time are required."),
	// 	meetup_location_address: z.string().min(1, "Meetup address is required."),
	// 	meetup_location_gmaps_url: z.string().url("Must be a valid Google Maps URL for meetup location.").optional().or(z.literal("")),
	// 	price_per_seat: z.number().min(0, "Price per seat cannot be negative."),
	// 	total_seats: z.number().min(1, "Total seats must be at least 1."),
	// 	gender: z.enum(["male", "female", "transgender", "others", "any"]).default("any"),
	// 	min_age: z.number().min(0, "Minimum age cannot be negative."),
	// 	max_age: z.number().min(0, "Maximum age cannot be negative."),
	// 	registration_last_date: z.string().min(1, "Registration last date is required."),
	// 	start_date: z.string().min(1, "Start date is required."),
	// 	end_date: z.string().min(1, "End date is required."),
	// 	is_free: z.boolean().default(false),
	// 	privacy_refund_policy_agreed: z.boolean().refine((val) => val === true, {
	// 		message: "You must agree to the privacy and refund policy.",
	// 	}),
	// 	pitch: z.object({
	// 		camp_brief: z.string().min(1, "Camp brief is required."),
	// 		camp_checklist: z.string().min(1, "Camp checklist is required."),
	// 	}),
	// 	bank_account: z.object({
	// 		bank_name: z.string().min(1, "Bank name is required."),
	// 		ifsc: z.string().min(1, "IFSC code is required."),
	// 		account_holder_name: z.string().min(1, "Account holder name is required."),
	// 		account_number: z.string().min(1, "Account number is required."),
	// 	}),
	// 	required_documents: z.array(z.object({
	// 		document_type_id: z.string().min(1, "Document type is required."),
	// 	})).optional().nullable().default([]),
	// 	collaborators: z.array(z.object({
	// 		partner_id: z.string().min(1, "Partner ID is required."),
	// 	})).optional().nullable().default([]),
	// });


	const genderEnum = z.enum(Gender)

	const campSubmitSchema = z.object({
		name: z.string().min(1, "Camp name is required"),

		registration_last_date: z
			.string()
			.min(1, "Registration last date is required"),

		start_date: z
			.string()
			.min(1, "Start date is required"),

		end_date: z
			.string()
			.min(1, "End date is required"),

		gender: z.enum(genderEnum.enum)
			.refine(data => {
				return genderEnum.safeParse(data).success
			}, {
				error: "Invalid gender selected",
			}),

		min_age: z
			.number()
			.int()
			.nonnegative("Minimum age is required"),

		max_age: z
			.number()
			.int()
			.nonnegative("Maximum age is required"),

		total_seats: z
			.number()
			.int("Total seats must be an integer")
			.positive("Total seats must be greater than 0"),

		price_per_seat: z
			.number("Enter a valid price per seat").refine((val) => {
				return form.getValues("isFree") || val > 0
			}, {
				error: "Price per seat must be greater than 0 if not free"
			}),

		is_free: z.boolean(),

		location: z.string().min(1, "Camp location is required"),

		camp_location_gmaps_url: z
			.string()
			.url("Camp location Google Maps URL must be valid"),

		meetup_datetime: z
			.string()
			.min(1, "Meetup date and time is required"),

		meetup_location_address: z
			.string()
			.min(1, "Meetup location address is required"),

		meetup_location_gmaps_url: z
			.string()
			.url("Meetup location Google Maps URL must be valid"),

		pitch: z.object({
			camp_brief: z.string().min(1, "Camp brief is required"),
			camp_checklist: z.string().min(1, "Camp checklist is required"),
		}),


		bank_account: z.object({
			bank_name: z.string().min(1, "Bank name is required"),
			ifsc: z.string().min(1, "IFSC code is required"),
			account_holder_name: z
				.string()
				.min(1, "Account holder name is required"),
			account_number: z.string().min(1, "Account number is required"),
		}),

		privacy_refund_policy_agreed: z.literal(true, {
			message: "You must agree to the privacy & refund policy",
		}),

		required_documents: z.array(z.object({
			document_type_id: z.string().min(32, "Please select a valid document ID."),
		})),
		collaborators: z.any().optional(),
		paperwork: z.any().optional(),
	});

	const handleSubmit = async (values: CampFormValues) => {
		setIsLoading(true);
		setError(null);
		console.log("Handling submit", values);

		// Prepare data for validation and API call
		const transformedData = {
			name: values.campName,
			location: values.address,
			camp_location_gmaps_url: values.googleMapsUrl,
			meetup_datetime: values.meetupDate && values.meetupTime
				? new Date(
					Date.UTC(
						values.meetupDate.getFullYear(),
						values.meetupDate.getMonth(),
						values.meetupDate.getDate(),
						parseInt(values.meetupTime.split(":")[0]),
						parseInt(values.meetupTime.split(":")[1])
					)
				).toISOString()
				: "",
			meetup_location_address: values.meetupAddress,
			meetup_location_gmaps_url: values.meetupGoogleMapsUrl,
			price_per_seat: Number(values.cost),
			total_seats: values.seats,
			gender: values.gender,
			min_age: values.age ? values.age[0] : undefined,
			max_age: values.age ? values.age[1] : undefined,
			registration_last_date: values.lastDate
				? new Date(
					Date.UTC(
						values.lastDate.getFullYear(),
						values.lastDate.getMonth(),
						values.lastDate.getDate()
					)
				).toISOString()
				: "",
			start_date: values.startDate
				? new Date(
					Date.UTC(
						values.startDate.getFullYear(),
						values.startDate.getMonth(),
						values.startDate.getDate()
					)
				).toISOString()
				: "",
			end_date: values.endDate
				? new Date(
					Date.UTC(
						values.endDate.getFullYear(),
						values.endDate.getMonth(),
						values.endDate.getDate()
					)
				).toISOString()
				: "",
			is_free: values.isFree,
			privacy_refund_policy_agreed: values.privacy?.agreed,
			pitch: {
				camp_brief: values.pitch?.campBrief,
				camp_checklist: values.pitch?.checkList,
			},
			bank_account: values.bankDetails,
			required_documents: values.requiredDocuments || [],
			collaborator_emails: values.collaborators?.map(partner => partner.email) || [],
			paperwork: values.paperwork,
			// paperwork_files: values.paperwork_files
		};
		console.log(transformedData);

		try {
			console.log("Trying submit")
			campSubmitSchema.parse(transformedData);
		} catch (err) {
			if (err instanceof z.ZodError) {
				const firstError = err.issues[0];

				setError(firstError.message);

				toast.error("Validation Error", {
					description: firstError.message,
				});
				console.error("ZodError with empty issues array:", err);
			} else {
				toast.error("Validation Error", {
					description: "Invalid input. Please review all fields.",
				});
			}

			setIsLoading(false);
			return;
		}

		// Validate data
		// try {
		// 	campCreateSchema.parse(transformedData);
		// } catch (validationError: unknown) {
		// 	console.log(validationError);
		// 	if (validationError instanceof z.ZodError) {
		// 		if (validationError.issues.length > 0) {
		// 			const firstError = validationError.issues[0];
		// 			setError(firstError.message);
		// 			toast.error("Validation Error", {
		// 				description: firstError.message,
		// 			});
		// 		} else {
		// 			setError("An unknown validation error occurred.");
		// 			console.error("ZodError with empty issues array:", validationError);
		// 		}
		// 	} else {
		// 		setError("An unexpected validation error occurred.");
		// 		console.error(validationError);
		// 	}
		// 	setIsLoading(false);
		// 	return;
		// }

		const finalFormData = new FormData();

		finalFormData.append("update_data", JSON.stringify(transformedData));
		finalFormData.append("camp_data", JSON.stringify(transformedData));

		// if (campDraft.paperwork) {
		// 	(campDraft.paperwork as PaperworkDocument[]).forEach(doc => {
		// 		if (doc.file) {
		// 			finalFormData.append('paperwork_files', doc.file);
		// 		}
		// 	});
		// }

		values.paperwork_files?.forEach(doc => {
			if (doc) finalFormData.append("paperwork_files", doc.file);
		});

		// if (values.thumbnailFile) {
		// 	finalFormData.append('thumbnail_file', values.thumbnailFile);
		// }
		// else if (!isUpdateMode) {
		// 	toast.error("Thumbnail is required");
		// 	setIsLoading(false);
		// 	return;
		// }
		// Append all fields to formData, handling existing paperworkFormData
		// for (const key in transformedData) {
		// 	const value = transformedData[key as keyof typeof transformedData];

		// 	if (value !== undefined && value !== null) {
		// 		if (typeof value === "boolean") {
		// 			finalFormData.append(key, value ? "true" : "false");
		// 		} else if (Array.isArray(value) || (typeof value === "object" && !(value instanceof File))) {
		// 			finalFormData.append(key, JSON.stringify(value));
		// 		} else {
		// 			finalFormData.append(key, String(value));
		// 		}
		// 	}
		// }

		if (isUpdateMode && initialData?.id) {
			finalFormData.delete("camp_data")
			console.log("initialData", finalFormData);
			try{
				const res = await campService.updateCamp(initialData.id, finalFormData);
				if (res) {
					toast.success("Camp updated successfully");
					onClose?.();
				}
			}
			catch (err) {
				setIsLoading(false);
				toast.error("Failed to update camp.");
				return;
			}
		}
		else {
			try {
				finalFormData.delete("update_data");
				const createdCamp = await campService.createCamp(finalFormData);
				// const createdCamp = await campService.createCamp(transformedData);
				toast.success("Camp created successfully", {
					description: "Your camp has been submitted for review and will go live shortly.",
				});

				if (values.pitchVideo) {
					toast.info("Uploading video...", {
						description: "Please wait while we upload your pitch video.",
					});
					await handleFileUpload(values.pitchVideo, (createdCamp as any)["data"].id, (progress) => {
						console.log(`Upload Progress: ${progress}%`);
					});
					toast.success("Video uploaded successfully!");
				}
				else {
					toast.error("Pitch video is required to submit camp.")
					return;
				}

				onClose?.();
			} catch (err) {
				setError("Failed to create camp.");
				console.error(err);
				toast.error("Failed to create camp.", {
					description: "There was an error submitting your camp. Please try again.",
				});
			} finally {
				setIsLoading(false);
			}
		}
	};
	// }
	// const handleUpdateCamp = async (finalDraft: Partial<Camp>) => {
	// 	console.log("Updating data: ", finalDraft);

	// TODO: transform + send to backend
	// await campService.updateCamp(initialData!.id!, finalDraft);
	// };

	// const mergeDraft = (patch: Partial<Camp>) => {
	// 	const merged = { ...campDraft, ...patch };
	// 	setCampDraft(merged);
	// 	return merged;
	// };


	const status = useWatch({ control: form.control, name: "status" });
	const isDisabled = isUpdateMode && status !== CampStatus.PENDING_REVIEW;

	return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <FormProvider {...form}>
            <DialogContent className="!w-[75vw] !max-w-none h-[85vh] flex flex-col bg-zinc-950 border-zinc-900 rounded-xl shadow-2xl overflow-hidden p-0">
                {/* Header */}
                <DialogHeader className="flex-shrink-0 px-8 pt-6 pb-4 border-b border-zinc-900 bg-zinc-950">
                    <DialogTitle className="text-2xl font-bold text-white tracking-tight">
                        {isUpdateMode ? form.getValues("campName") : "Create New Camp"}
                    </DialogTitle>
                </DialogHeader>

                {/* Main Layout */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-1/4 bg-zinc-900/30 border-r border-zinc-900 p-6 overflow-y-auto mb-16">
                        <CreateCampSidebar 
                            currentSection={currentSection} 
                            setCurrentSection={setCurrentSectionIndex} 
                            sections={sections} 
                            enabledSections={enabledSections} 
                            isUpdateMode={isUpdateMode} 
                        />
                    </div>

                    {/* Form Content */}
                    <div className="w-3/4 px-8 pt-8 mb-16 overflow-y-auto bg-zinc-950 scrollbar-thin scrollbar-thumb-zinc-800">
                        <div className={currentSection === "Camp Details" ? "block" : "hidden"}>
                            <fieldset disabled={isDisabled} className="space-y-4">
                                <CampDetailsForm
                                    key={initialData?.id}
                                    isUpdateMode={isUpdateMode}
                                    isUpdatable={isUpdatable}
                                />
                            </fieldset>
                        </div>
                        <div className={currentSection === "Collaborate" ? "block" : "hidden"}>
                            <fieldset disabled={isDisabled}>
                                <CollaboratorInvite
                                    key={initialData?.id}
                                    isUpdateMode={isUpdateMode}
                                    isUpdatable={isUpdatable}
                                    campId={initialData?.id}
                                />
                            </fieldset>
                        </div>
                        <div className={currentSection === "Pitch" ? "block" : "hidden"}>
                            <PitchForm />
                        </div>
                        <div className={currentSection === "Paper Work" ? "block" : "hidden"}>
                            <fieldset disabled={isDisabled}>
                                <PaperworkSection />
                            </fieldset>
                        </div>
                        <div className={currentSection === "Documents Required" ? "block" : "hidden"}>
                            <fieldset disabled={isDisabled}>
                                <DocumentsRequiredSection />
                            </fieldset>
                        </div>
                        <div className={currentSection === "Bank Detail" ? "block" : "hidden"}>
                            <fieldset disabled={isDisabled}>
                                <BankDetailsForm />
                            </fieldset>
                        </div>
                        <div className={currentSection === "Privacy & Refund" ? "block" : "hidden"}>
                            <PrivacyRefundSection
                                onCreateCamp={form.handleSubmit(handleSubmit)}
                                isLoading={isLoading}
                                isUpdateMode={isUpdateMode}
                            />
                        </div>
                        <div className={currentSection === "Go Viral" ? "block" : "hidden"}>
                            <GoViralSection campId={initialData?.id} campSlug={initialData?.slug} />
                        </div>
                        <div className={currentSection === "Traveller's Info" ? "block" : "hidden"}>
                            <TravelersInfoSection
                                registrations={initialData?.travellers || []}
                            />
                        </div>
                        <div className={currentSection === "Camp's Status" ? "block" : "hidden"} >
                            <fieldset disabled={!isDisabled}>
                                <CampStatusTab
                                    campId={initialData?.id}
                                    status={initialData?.status}
                                    onStatusUpdated={refetchCamp}
                                />
                            </fieldset>
                        </div>
                        <div className={currentSection === "Letters" ? "block" : "hidden"}>
                            <LettersTab
                                campId={initialData?.id}
                                status={initialData?.status}
                                onLetterSubmitted={refetchCamp}
                            />
                        </div>
                        <div className={currentSection === "Camp Analytics" ? "block" : "hidden"}>
                            <CampAnalyticsTab initialData={initialData} />
                        </div>
                    </div>
                </div>

                {/* Sticky Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800 p-4 shadow-2xl z-20">
                    <div className="flex justify-end items-center px-4">
                        <div className="flex gap-3">
                            <Button 
                                variant="ghost" 
                                onClick={onClose} 
                                className="text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors px-6"
                            >
                                Cancel
                            </Button>
                            
                            {(form.getValues("status") === CampStatus.PENDING_REVIEW || isUpdateMode) && (
                                <Button 
                                    className="bg-white text-black hover:bg-zinc-200 px-8 font-bold transition-all shadow-lg shadow-white/5" 
                                    onClick={form.handleSubmit(handleSubmit)} 
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Updating..." : "Update"}
                                </Button>
                            )} 
                        </div>
                    </div>
                </div>
            </DialogContent>
        </FormProvider>
    </Dialog>
);
}
// }