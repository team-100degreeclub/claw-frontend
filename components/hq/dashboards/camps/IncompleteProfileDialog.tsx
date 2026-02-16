"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface IncompleteProfileDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export function IncompleteProfileDialog({ isOpen, onClose }: IncompleteProfileDialogProps) {
	const router = useRouter();

	const handleRedirect = () => {
		router.push("/profile");
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Complete Your Profile</AlertDialogTitle>
					<AlertDialogDescription>
						To create a camp, you need to complete your profile first. Please update your profile with all the required information.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleRedirect}>Complete My Profile</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
