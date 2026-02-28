"use client";

import * as React from "react";
import {
  ArrowLeft, Camera, Upload, Shield,
  LifeBuoy, LogOut, Phone, Mail, CheckCircle2, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { CountryCodePicker } from "@/components/CountryCodePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { authService } from "@/lib/api/services/auth";
import { profileService } from "@/lib/api/services/profile";
import { TravellerProfileResponse } from "@/lib/api/models/auth";
import { toast } from "sonner";
import { TravellerProfileUpdate, DocumentType } from "@/lib/api/models/profile";
import { Gender } from "@/lib/api/models/enums";
import { cn } from "@/lib/utils";
import PolicySheet from "@/components/profile/PolicySheet";
import SupportSheet from "@/components/SupportSheet";

// ─── Schema ───────────────────────────────────────────────────────────────────

const profileFormSchema = z.object({
  first_name: z.string().min(2, { message: "At least 2 characters." }),
  last_name: z.string().min(2, { message: "At least 2 characters." }),
  country_code: z.string().nonempty({ message: "Required." }),
  contact_number: z.string().min(10, { message: "At least 10 digits." }),
  date_of_birth: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})$/, { message: "Use YYYY-MM-DD format." }),
  gender: z.nativeEnum(Gender).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  profile_image: z.instanceof(File).optional(),
  aadhaarFile: z.instanceof(File).optional(),
  passportFile: z.instanceof(File).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// ─── Field wrapper ────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold text-zinc-500">
      {children}
    </span>
  );
}

const inputBase =
  "bg-[#0d0c0a] border-white/[0.07] rounded-xl h-11 text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-blue-500/50 transition-colors";

// ─── Section card ─────────────────────────────────────────────────────────────

function Section({
  title, children, className,
}: {
  title?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.06] overflow-hidden",
        className
      )}
      style={{ background: "linear-gradient(135deg, rgba(18,16,12,0.98) 0%, rgba(12,11,9,1) 100%)" }}
    >
      {title && (
        <div className="px-8 py-5 border-b border-white/[0.05] flex items-center gap-3">
          <div className="w-0.5 h-4 bg-blue-500 rounded-full" />
          <span className="text-xs font-semibold text-zinc-400">{title}</span>
        </div>
      )}
      <div className="p-8">{children}</div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter();
  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const [userProfile, setUserProfile] = React.useState<TravellerProfileResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [documentTypes, setDocumentTypes] = React.useState<DocumentType[]>([]);

  const [isPolicySheetOpen, setPolicySheetOpen] = React.useState(false);
  const [isSupportSheetOpen, setSupportSheetOpen] = React.useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "", last_name: "", country_code: "+91",
      contact_number: "", date_of_birth: "", city: "", state: "", country: "",
    },
    mode: "onChange",
  });

  const fetchData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const profile = await authService.getTravellerProfile();
      setUserProfile(profile);
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        country_code: profile.country_code || "+91",
        contact_number: profile.contact_number || "",
        date_of_birth: profile.date_of_birth || "",
        gender: profile.gender || undefined,
        city: profile.city || "",
        state: profile.state || "",
        country: profile.country || "",
      });
      const types = await profileService.getDocumentTypes();
      setDocumentTypes(types);
    } catch {
      toast.error("Failed to load profile.");
    } finally {
      setIsLoading(false);
    }
  }, [form]);

  React.useEffect(() => { fetchData(); }, [fetchData]);

  async function onSubmit(data: ProfileFormValues) {
    const profile_data: TravellerProfileUpdate = {
      first_name: data.first_name, last_name: data.last_name,
      country_code: data.country_code, contact_number: data.contact_number,
      date_of_birth: data.date_of_birth, gender: data.gender,
      city: data.city, state: data.state, country: data.country,
    };
    const document_files: File[] = [];
    const document_type_ids: string[] = [];
    if (data.aadhaarFile) {
      const t = documentTypes.find(dt => dt.document_name.toLowerCase().includes("aadhaar"));
      if (t) { document_files.push(data.aadhaarFile); document_type_ids.push(t.id); }
    }
    if (data.passportFile) {
      const t = documentTypes.find(dt => dt.document_name.toLowerCase().includes("passport"));
      if (t) { document_files.push(data.passportFile); document_type_ids.push(t.id); }
    }
    toast.promise(
      profileService.updateTravellerProfile({ profile_data, profile_image: data.profile_image, document_files, document_type_ids }),
      { loading: "Saving changes...", success: "Profile updated.", error: "Failed to update profile." }
    );
  }

  const handleLogout = () => {
    toast.promise(authService.logout(), {
      loading: "Logging out...", success: "Logged out.", error: "Failed to log out.",
    });
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0908] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm text-zinc-500 font-medium">Loading</span>
        </div>
      </div>
    );
  }

  const initials = `${userProfile?.first_name?.[0] ?? ""}${userProfile?.last_name?.[0] ?? ""}`;

  return (
    <div className="min-h-screen bg-[#0a0908] text-zinc-300 selection:bg-amber-500/20">

      {/* ── Ambient glow ── */}
      <div
        className="fixed top-0 left-0 right-0 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 lg:py-16">

        {/* ── Page header (mobile back button) ── */}
        <div className="flex items-center gap-4 mb-10 lg:hidden">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] text-zinc-400 hover:text-white hover:bg-white/[0.07] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold text-white">Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* ─────────────────────────────────────
              LEFT SIDEBAR
          ───────────────────────────────────── */}
          <aside className="lg:sticky lg:top-8 space-y-4">

            {/* Profile card */}
            <div
              className="rounded-2xl border border-white/[0.06] overflow-hidden"
              style={{ background: "linear-gradient(160deg, rgba(20,17,12,0.98) 0%, rgba(12,11,9,1) 100%)" }}
            >
              {/* Avatar area */}
              <div className="relative px-6 pt-8 pb-6 flex flex-col items-center text-center border-b border-white/[0.05]">
                {/* Subtle glow behind avatar */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                <div
                  className="relative group cursor-pointer"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <Avatar className="h-24 w-24 rounded-2xl ring-2 ring-white/[0.06]">
                    <AvatarImage
                      src={userProfile?.profile_image_url || "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?w=360"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-zinc-900 text-zinc-400 text-xl font-black rounded-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white w-5 h-5" />
                  </div>
                </div>

                <h2 className="mt-5 text-base font-bold text-white leading-tight">
                  {userProfile?.first_name} {userProfile?.last_name}
                </h2>
                <p className="text-xs text-zinc-600 mt-1 font-medium truncate max-w-full px-2">
                  {userProfile?.email}
                </p>
              </div>

              {/* Nav items */}
              <div className="p-3 space-y-0.5">
                {[
                  { icon: <Shield className="w-4 h-4" />, label: "Policy", onClick: () => setPolicySheetOpen(true) },
                  { icon: <LifeBuoy className="w-4 h-4" />, label: "Support", onClick: () => setSupportSheetOpen(true) },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-500 hover:text-white hover:bg-white/[0.04] transition-all"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}

                <div className="my-2 border-t border-white/[0.05]" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-900 hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Completeness hint */}
            
          </aside>

          {/* ─────────────────────────────────────
              RIGHT: FORM
          ───────────────────────────────────── */}
          <div className="space-y-6">

            {/* Page title (desktop) */}
            <div className="hidden lg:block mb-2">
              <h1 className="text-2xl font-black text-white tracking-tight">
                Your Profile
              </h1>
              <p className="text-sm text-zinc-600 mt-1">Manage your personal information and documents.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Hidden avatar input */}
                <FormField
                  control={form.control}
                  name="profile_image"
                  render={({ field }) => (
                    <Input
                      type="file"
                      ref={avatarInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  )}
                />

                {/* ── Personal Info ── */}
                <Section title="Personal Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                    <FormField control={form.control} name="first_name" render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel><FieldLabel>First Name</FieldLabel></FormLabel>
                        <FormControl>
                          <Input className={inputBase} {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="last_name" render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel><FieldLabel>Last Name</FieldLabel></FormLabel>
                        <FormControl>
                          <Input className={inputBase} {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )} />

                    {/* Email — read only */}
                    <FormItem className="space-y-2">
                      <FieldLabel>Email Address</FieldLabel>
                      <div className="flex items-center gap-3 h-11 px-4 rounded-xl border border-white/[0.05] bg-white/[0.02] text-sm text-zinc-500">
                        <Mail className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                        <span className="truncate">{userProfile?.email}</span>
                      </div>
                    </FormItem>

                    {/* Phone */}
                    <FormItem className="space-y-2">
                      <FieldLabel>Phone Number</FieldLabel>
                      <div className="flex">
                        <FormField
                          control={form.control}
                          name="country_code"
                          render={({ field }) => (
                            <CountryCodePicker
                              className="rounded-l-xl rounded-r-none border-white/[0.07] border-r-0 h-11 w-fit bg-[#0d0c0a] text-sm text-zinc-300"
                              {...field}
                            />
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contact_number"
                          render={({ field }) => (
                            <FormControl>
                              <div className="relative flex-1">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600" />
                                <Input
                                  {...field}
                                  className={cn(inputBase, "rounded-l-none rounded-r-xl pl-10 w-full")}
                                />
                              </div>
                            </FormControl>
                          )}
                        />
                      </div>
                    </FormItem>

                    <FormField control={form.control} name="date_of_birth" render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel><FieldLabel>Date of Birth</FieldLabel></FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className={cn(inputBase, "[color-scheme:dark]")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="gender" render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel><FieldLabel>Gender</FieldLabel></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={cn(inputBase, "w-full")}>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-950 border-white/[0.07] text-zinc-300 rounded-xl">
                            <SelectItem value={Gender.MALE}>Male</SelectItem>
                            <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                            <SelectItem value={Gender.OTHERS}>Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                  </div>

                  {/* Location sub-section */}
                  <div className="mt-8 pt-6 border-t border-white/[0.05]">
                    <p className="text-xs font-semibold text-zinc-600 mb-5">Location</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(["city", "state", "country"] as const).map((f) => (
                        <FormField key={f} control={form.control} name={f} render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>
                              <FieldLabel>{f.charAt(0).toUpperCase() + f.slice(1)}</FieldLabel>
                            </FormLabel>
                            <FormControl>
                              <Input className={inputBase} {...field} />
                            </FormControl>
                          </FormItem>
                        )} />
                      ))}
                    </div>
                  </div>
                </Section>

                {/* ── Documents ── */}
                <Section title="Identification Documents">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { name: "aadhaarFile" as const, label: "Aadhaar Card", profileKey: "aadhaar" },
                      { name: "passportFile" as const, label: "Passport", profileKey: "passport" },
                    ].map((doc) => (
                      <FormField
                        key={doc.name}
                        control={form.control}
                        name={doc.name}
                        render={({ field }) => {
                          const isUploaded = !!userProfile?.documents.find(
                            (d) => d.document_name.toLowerCase().includes(doc.profileKey)
                          );
                          const hasNewFile = !!field.value;
                          return (
                            <FormItem>
                              <FormControl>
                                <div
                                  onClick={() => document.getElementById(doc.name)?.click()}
                                  className={cn(
                                    "group relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200",
                                    hasNewFile
                                      ? "border-blue-500/40 bg-blue-500/5"
                                      : isUploaded
                                      ? "border-emerald-500/30 bg-emerald-500/5"
                                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]"
                                  )}
                                >
                                  <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                    hasNewFile ? "bg-blue-500/15" : isUploaded ? "bg-emerald-500/15" : "bg-white/[0.04] group-hover:bg-white/[0.07]"
                                  )}>
                                    {isUploaded && !hasNewFile
                                      ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                      : <Upload className={cn("w-5 h-5 transition-colors", hasNewFile ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400")} />
                                    }
                                  </div>

                                  <div>
                                    <p className="text-sm font-semibold text-zinc-200">
                                      {hasNewFile ? field.value?.name : doc.label}
                                    </p>
                                    <p className="text-xs text-zinc-600 mt-0.5">
                                      {isUploaded && !hasNewFile
                                        ? "Uploaded · Click to replace"
                                        : "PDF, PNG, JPG · Max 5MB"
                                      }
                                    </p>
                                  </div>

                                  {isUploaded && !hasNewFile && (
                                    <button
                                      type="button"
                                      className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
                                      onClick={(e) => { e.stopPropagation(); }}
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      View {doc.label}
                                    </button>
                                  )}

                                  <Input
                                    type="file"
                                    id={doc.name}
                                    className="hidden"
                                    accept="application/pdf,image/*"
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </Section>

                {/* ── Submit ── */}
                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-blue-500/20"
                  >
                    Save Changes
                  </Button>
                </div>

              </form>
            </Form>
          </div>
        </div>
      </main>

      <PolicySheet isOpen={isPolicySheetOpen} onClose={() => setPolicySheetOpen(false)} />
      <SupportSheet isOpen={isSupportSheetOpen} onClose={() => setSupportSheetOpen(false)} userProfile={null} />
    </div>
  );
}