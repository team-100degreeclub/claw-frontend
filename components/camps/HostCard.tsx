"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

interface HostCardProps {
  collaboration_id: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_image_url?: string;
}

export const HostCard = ({ host }: { host: HostCardProps }) => {
	const [isExpanded, setIsExpanded] = React.useState(false);

	return (
		<Card className="p-6 border-zinc-900 bg-zinc-950 flex flex-col sm:flex-row items-start gap-6 group transition-all duration-300 rounded-none">
  {/* Avatar Section */}
  <Avatar className="h-20 w-20 shadow-2xl ring-2 ring-white shrink-0 rounded-full">
    <AvatarImage src={host.profile_image_url} className="object-top-0"/>
    <AvatarFallback className="bg-zinc-900 text-zinc-400 text-lg font-bold">
      {host.first_name?.[0]}
    </AvatarFallback>
  </Avatar>

  {/* Content Section */}
  <div className="flex-1 space-y-2 w-full">
    <div className="flex items-center justify-between">
      <h4 className="font-bold text-lg text-white">
        {host.first_name} {host.last_name}
      </h4>
    </div>

    {/* Bio Section with Clamp Logic */}
    <div className="relative">
      <p className={cn(
        "text-sm leading-relaxed text-zinc-400 transition-all duration-300",
        !isExpanded ? "line-clamp-3" : "line-clamp-none"
      )}>
        {host.bio || "Experience Collaborator"}
      </p>

      {/* Expand/Collapse Toggle */}
      {host.bio && host.bio.length > 150 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 hover:text-blue-500 transition-colors"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Read Bio <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}
    </div>
  </div>
</Card>
	);
};

// export function HostCard({ name, role, img, bio, specialization }: HostCardProps) {
//   return (
//     <div className="group relative flex flex-col bg-zinc-950 border border-zinc-900 overflow-hidden rounded-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] h-130 w-80">
//       {/* 1. Image Container with Grayscale Effect */}
//       <div className="relative aspect-[4/5] overflow-hidden">
//         <Image
//           src={img}
//           alt={name}
//           fill
//           className="object-cover object-top transition-all duration-700 ease-in-out group-hover:scale-110"
//         />
//         {/* Tactical Overlay */}
//         {/* <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" /> */}
        
//         {/* Role Badge */}
//         {/* <div className="absolute top-4 left-4">
//           <span className="bg-black/60 backdrop-blur-md border border-zinc-800 px-3 py-1 text-[9px] font-black tracking-widest text-zinc-300">
//             {role}
//           </span>
//         </div> */}
//       </div>

//       {/* 2. Content Section */}
//       <div className="p-6 space-y-3 relative z-10 -mt-10 bg-zinc-950">
//         <h4 className="text-2xl font-black tracking-tighter text-white transition-colors">
//           {name}
//         </h4>
        
//         {/* Specialization Tags */}
//         <div className="flex flex-wrap gap-2">
//           {
//             <span key={specialization && specialization[0]} className="text-sm font-bold">
//               {specialization && specialization[0]}
//             </span>
//           }
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {specialization && specialization[1]}
//         </div>

//         <p className="text-sm text-zinc-400 leading-relaxed font-medium line-clamp-3">
//           {bio}
//         </p>

//         {/* View Profile Link */}
//         {/* <button className="pt-4 text-[10px] font-black tracking-[0.3em] text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
//           View Dossier <span className="h-[1px] w-4 bg-zinc-800 group-hover:w-8 group-hover:bg-red-600 transition-all" />
//         </button> */}
//       </div>
//     </div>
//   );
// }