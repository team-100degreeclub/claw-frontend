"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PolicyDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function PolicyDialog({ isOpen, onClose }: PolicyDialogProps) {
	const policyContent = `
    <h2>100degree.club Camp Policy</h2>

    <h3>1. Registration and Payment</h3>
    <p>All participants must complete the online registration form and submit the required payment by the specified deadline. A non-refundable deposit may be required to secure your spot.</p>

    <h3>2. Cancellation and Refunds</h3>
    <p>Cancellations made 30 days or more before the camp start date will receive a 75% refund. Cancellations made between 15-29 days will receive a 50% refund. No refunds will be issued for cancellations made less than 15 days before the camp start date. In case of camp cancellation by 100degree.club due to unforeseen circumstances, a full refund will be provided.</p>

    <h3>3. Health and Safety</h3>
    <p>Participants are required to disclose any medical conditions or allergies during registration. 100degree.club staff will take all reasonable precautions to ensure participant safety. In case of a medical emergency, participants authorize 100degree.club to seek necessary medical attention.</p>

    <h3>4. Code of Conduct</h3>
    <p>All participants are expected to adhere to a respectful and inclusive code of conduct. Any behavior deemed disruptive, harmful, or inappropriate by 100degree.club staff may result in immediate dismissal from the camp without refund.</p>

    <h3>5. Photography and Media</h3>
    <p>By participating in the camp, you grant 100degree.club permission to use photographs and videos taken during the camp for promotional and archival purposes. If you do not wish to be photographed or videoed, please inform the camp organizers in writing.</p>

    <h3>6. Personal Belongings</h3>
    <p>100degree.club is not responsible for lost, stolen, or damaged personal belongings. Participants are advised to keep valuables secure and to bring only necessary items.</p>

    <h3>7. Changes to Itinerary</h3>
    <p>100degree.club reserves the right to make changes to the camp itinerary, activities, or schedule due to weather conditions, safety concerns, or other unforeseen circumstances.</p>

    <h3>8. Age and Eligibility</h3>
    <p>Participants must meet the age and eligibility requirements specified for each camp. 100degree.club reserves the right to deny participation to individuals who do not meet these criteria.</p>

    <h3>9. Contact Information</h3>
    <p>For any questions or concerns regarding the camp policy, please contact 100degree.club at support@100degree.club.</p>
    `;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px] bg-white text-gray-900 rounded-lg">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">Camp Policy</DialogTitle>
					<DialogDescription>Please read our camp policies carefully before booking.</DialogDescription>
				</DialogHeader>
				<ScrollArea className="h-[400px] p-4 pr-6 -mr-4">
					<div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: policyContent }} />
				</ScrollArea>
				<DialogFooter>
					<Button onClick={onClose}>Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
