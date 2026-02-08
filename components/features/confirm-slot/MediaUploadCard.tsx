"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, File as FileIcon } from "lucide-react";

interface MediaUploadCardProps {
	title: string;
	onFileUpload: (file: File | null) => void;
}

export function MediaUploadCard({ title, onFileUpload }: MediaUploadCardProps) {
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		setFileName(file ? file.name : null);
		onFileUpload(file);
	};

	return (
		<Card className="bg-black"	>
			<CardContent className="p-4">
				<Label
					htmlFor={title.toLowerCase()}
					className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer"
				>
					{fileName ? (
						<div className="flex flex-col items-center text-center">
							<FileIcon className="h-8 w-8 mb-2 text-gray-500" />
							<span className="text-sm font-semibold text-gray-700">
								{fileName}
							</span>
							<span className="text-xs text-gray-500">Click to replace</span>
						</div>
					) : (
						<div className="flex flex-col items-center">
							<UploadCloud className="h-8 w-8 mb-2 text-gray-400" />
							<span className="text-sm font-semibold text-gray-600">
								Upload {title}
							</span>
							<span className="text-xs text-gray-500">
								PNG, JPG, PDF up to 10MB
							</span>
						</div>
					)}
					<Input
						id={title.toLowerCase()}
						type="file"
						className="hidden"
						onChange={handleFileChange}
						accept=".png,.jpg,.jpeg,.pdf"
					/>
				</Label>
			</CardContent>
		</Card>
	);
}
