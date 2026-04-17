"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Breadcrumb from "../components/Breadcrumb";
import {
    MdOutlinePersonOutline,
    MdOutlineLocalShipping,
    MdOutlinePhone,
    MdOutlineEmail,
    MdOutlineLocationOn,
    MdOutlineHome,
    MdOutlineEditLocationAlt,
} from "react-icons/md";

type ProfileForm = {
    fullName: string;
    email: string;
    phone: string;
    recipientName: string;
    deliveryPhone: string;
    region: string;
    province: string;
    city: string;
    barangay: string;
    streetAddress: string;
    postalCode: string;
    landmark: string;
    addressLabel: string;
    deliveryNotes: string;
};

const defaultForm: ProfileForm = {
    fullName: "",
    email: "",
    phone: "",
    recipientName: "",
    deliveryPhone: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    streetAddress: "",
    postalCode: "",
    landmark: "",
    addressLabel: "Home",
    deliveryNotes: "",
};

export default function ProfilePage() {
    const supabase = useMemo(() => createClient(), []);
    const [form, setForm] = useState<ProfileForm>(defaultForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true);
            setMessage("");

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                setMessage("Please log in first.");
                return;
            }

            setUserId(user.id);

            const fallbackEmail = user.email ?? "";

            const { data, error } = await supabase
                .from("users")
                .select(`
          id,
          username,
          full_name,
          phone,
          recipient_name,
          delivery_phone,
          region,
          province,
          city,
          barangay,
          street_address,
          postal_code,
          landmark,
          address_label,
          delivery_notes
        `)
                .eq("id", user.id)
                .single();

            if (error) {
                setForm((prev) => ({
                    ...prev,
                    email: fallbackEmail,
                }));
                setLoading(false);
                return;
            }

            setForm({
                fullName: data?.full_name ?? "",
                email: data?.username ?? fallbackEmail,
                phone: data?.phone ?? "",
                recipientName: data?.recipient_name ?? data?.full_name ?? "",
                deliveryPhone: data?.delivery_phone ?? data?.phone ?? "",
                region: data?.region ?? "",
                province: data?.province ?? "",
                city: data?.city ?? "",
                barangay: data?.barangay ?? "",
                streetAddress: data?.street_address ?? "",
                postalCode: data?.postal_code ?? "",
                landmark: data?.landmark ?? "",
                addressLabel: data?.address_label ?? "Home",
                deliveryNotes: data?.delivery_notes ?? "",
            });

            setLoading(false);
        };

        loadProfile();
    }, [supabase]);

    const updateField = (field: keyof ProfileForm, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUsePersonalInfo = () => {
        setForm((prev) => ({
            ...prev,
            recipientName: prev.fullName,
            deliveryPhone: prev.phone,
        }));
    };

    const handleSave = async () => {
        if (!userId) {
            setMessage("Please log in first.");
            return;
        }

        setSaving(true);
        setMessage("");

        const payload = {
            id: userId,
            username: form.email,
            full_name: form.fullName,
            phone: form.phone,
            recipient_name: form.recipientName,
            delivery_phone: form.deliveryPhone,
            region: form.region,
            province: form.province,
            city: form.city,
            barangay: form.barangay,
            street_address: form.streetAddress,
            postal_code: form.postalCode,
            landmark: form.landmark,
            address_label: form.addressLabel,
            delivery_notes: form.deliveryNotes,
            updated_at: new Date().toISOString(),
        };

        const { error } = await supabase.from("users").upsert(payload);

        if (error) {
            setMessage(error.message);
            setSaving(false);
            return;
        }

        setMessage("Profile saved successfully.");
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] px-4 sm:px-8 lg:px-12 py-10">
                <div className="max-w-6xl mx-auto">
                    <div className="rounded-[32px] border border-gray-200 bg-white shadow-sm p-8">
                        <p className="text-[#003049] text-lg">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] px-4 sm:px-8 lg:px-12 py-10">
            <div className="max-w-6xl mx-auto">

                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Profile" },
                    ]}
                />

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#C1121F]">
                        My Profile
                    </h1>

                    <p className="mt-3 text-[#003049]/75 max-w-2xl leading-7">
                        Manage your personal and delivery information so checkout becomes
                        faster, smoother, and more accurate for your TrendyWear orders.
                    </p>
                </div>

                {/* Top Summary Card */}
                <div className="rounded-[32px] border border-gray-200 bg-white shadow-sm overflow-hidden mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className="lg:col-span-2 p-8 md:p-10">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-[#003049]/10 text-[#003049] flex items-center justify-center shrink-0">
                                    <MdOutlinePersonOutline className="w-8 h-8" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-[#003049]">
                                        Delivery-Ready Account
                                    </h2>
                                    <p className="mt-2 text-[#003049]/70 leading-7">
                                        Complete your profile once and reuse your delivery details
                                        for future orders. This keeps your checkout experience clean
                                        and consistent with your saved information.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t lg:border-t-0 lg:border-l border-gray-200 bg-[#fffaf9] p-8 md:p-10">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C1121F]/80">
                                Quick Tips
                            </p>
                            <div className="mt-4 space-y-3 text-sm text-[#003049]/75 leading-6">
                                <p>• Use a reachable mobile number for courier updates.</p>
                                <p>• Add a landmark to help riders find your address faster.</p>
                                <p>• Save your default address label as Home or Work.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left / Main Form */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Personal Information */}
                        <section className="rounded-[32px] border border-gray-200 bg-white shadow-sm p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-11 h-11 rounded-2xl bg-[#003049]/10 text-[#003049] flex items-center justify-center">
                                    <MdOutlinePersonOutline className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-[#003049]">
                                        Personal Information
                                    </h2>
                                    <p className="text-sm text-[#003049]/60">
                                        Basic details connected to your account
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Field
                                    label="Full Name"
                                    value={form.fullName}
                                    onChange={(value) => updateField("fullName", value)}
                                    placeholder="Enter your full name"
                                    icon={<MdOutlinePersonOutline className="w-5 h-5" />}
                                />

                                <Field
                                    label="Email Address"
                                    value={form.email}
                                    onChange={(value) => updateField("email", value)}
                                    placeholder="Enter your email"
                                    icon={<MdOutlineEmail className="w-5 h-5" />}
                                    type="email"
                                />

                                <Field
                                    label="Phone Number"
                                    value={form.phone}
                                    onChange={(value) => updateField("phone", value)}
                                    placeholder="Enter your mobile number"
                                    icon={<MdOutlinePhone className="w-5 h-5" />}
                                />
                            </div>
                        </section>

                        {/* Delivery Information */}
                        <section className="rounded-[32px] border border-gray-200 bg-white shadow-sm p-6 md:p-8">
                            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-2xl bg-[#003049]/10 text-[#003049] flex items-center justify-center">
                                        <MdOutlineLocalShipping className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-[#003049]">
                                            Delivery Information
                                        </h2>
                                        <p className="text-sm text-[#003049]/60">
                                            Shipping details used during checkout
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleUsePersonalInfo}
                                    className="rounded-full border border-[#003049] px-5 py-2.5 text-sm font-semibold text-[#003049] hover:bg-[#003049]/5 transition"
                                >
                                    Use Personal Info
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Field
                                    label="Recipient Name"
                                    value={form.recipientName}
                                    onChange={(value) => updateField("recipientName", value)}
                                    placeholder="Enter recipient name"
                                    icon={<MdOutlinePersonOutline className="w-5 h-5" />}
                                />

                                <Field
                                    label="Delivery Contact Number"
                                    value={form.deliveryPhone}
                                    onChange={(value) => updateField("deliveryPhone", value)}
                                    placeholder="Enter contact number"
                                    icon={<MdOutlinePhone className="w-5 h-5" />}
                                />

                                <Field
                                    label="Region"
                                    value={form.region}
                                    onChange={(value) => updateField("region", value)}
                                    placeholder="e.g. NCR"
                                    icon={<MdOutlineLocationOn className="w-5 h-5" />}
                                />

                                <Field
                                    label="Province"
                                    value={form.province}
                                    onChange={(value) => updateField("province", value)}
                                    placeholder="Enter province"
                                    icon={<MdOutlineLocationOn className="w-5 h-5" />}
                                />

                                <Field
                                    label="City / Municipality"
                                    value={form.city}
                                    onChange={(value) => updateField("city", value)}
                                    placeholder="Enter city or municipality"
                                    icon={<MdOutlineLocationOn className="w-5 h-5" />}
                                />

                                <Field
                                    label="Barangay"
                                    value={form.barangay}
                                    onChange={(value) => updateField("barangay", value)}
                                    placeholder="Enter barangay"
                                    icon={<MdOutlineLocationOn className="w-5 h-5" />}
                                />

                                <div className="md:col-span-2">
                                    <Field
                                        label="Street Address"
                                        value={form.streetAddress}
                                        onChange={(value) => updateField("streetAddress", value)}
                                        placeholder="House No., Street, Subdivision, Building, Unit"
                                        icon={<MdOutlineHome className="w-5 h-5" />}
                                    />
                                </div>

                                <Field
                                    label="Postal Code"
                                    value={form.postalCode}
                                    onChange={(value) => updateField("postalCode", value)}
                                    placeholder="Enter postal code"
                                    icon={<MdOutlineEditLocationAlt className="w-5 h-5" />}
                                />

                                <Field
                                    label="Landmark"
                                    value={form.landmark}
                                    onChange={(value) => updateField("landmark", value)}
                                    placeholder="Nearby store, gate, or notable place"
                                    icon={<MdOutlineLocationOn className="w-5 h-5" />}
                                />

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#003049]">
                                        Address Label
                                    </label>
                                    <select
                                        value={form.addressLabel}
                                        onChange={(e) => updateField("addressLabel", e.target.value)}
                                        className="w-full rounded-[20px] border border-gray-200 bg-white px-4 py-3.5 text-[#003049] outline-none focus:border-[#003049]"
                                    >
                                        <option value="Home">Home</option>
                                        <option value="Work">Work</option>
                                        <option value="Family">Family</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-[#003049]">
                                        Delivery Notes
                                    </label>
                                    <textarea
                                        value={form.deliveryNotes}
                                        onChange={(e) => updateField("deliveryNotes", e.target.value)}
                                        rows={4}
                                        placeholder="Optional instructions for delivery riders or couriers"
                                        className="w-full rounded-[20px] border border-gray-200 bg-white px-4 py-3.5 text-[#003049] outline-none resize-none focus:border-[#003049]"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right / Sticky Summary */}
                    <div className="xl:col-span-1">
                        <div className="xl:sticky xl:top-8 space-y-6">
                            <section className="rounded-[32px] border border-gray-200 bg-white shadow-sm p-6">
                                <h3 className="text-lg font-bold text-[#003049]">
                                    Delivery Summary
                                </h3>

                                <div className="mt-5 space-y-4 text-sm">
                                    <SummaryRow label="Recipient" value={form.recipientName || "Not set"} />
                                    <SummaryRow label="Phone" value={form.deliveryPhone || "Not set"} />
                                    <SummaryRow
                                        label="Address Label"
                                        value={form.addressLabel || "Not set"}
                                    />
                                    <SummaryRow
                                        label="City"
                                        value={form.city || "Not set"}
                                    />
                                    <SummaryRow
                                        label="Postal Code"
                                        value={form.postalCode || "Not set"}
                                    />
                                </div>

                                <div className="mt-6 rounded-2xl bg-[#f8f9fa] border border-gray-100 p-4">
                                    <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#C1121F]/80">
                                        Saved Address Preview
                                    </p>
                                    <p className="mt-3 text-sm leading-6 text-[#003049]/75">
                                        {[
                                            form.streetAddress,
                                            form.barangay,
                                            form.city,
                                            form.province,
                                            form.region,
                                            form.postalCode,
                                        ]
                                            .filter(Boolean)
                                            .join(", ") || "No delivery address saved yet."}
                                    </p>
                                </div>
                            </section>

                            <section className="rounded-[32px] border border-gray-200 bg-white shadow-sm p-6">
                                <h3 className="text-lg font-bold text-[#003049]">
                                    Save Changes
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-[#003049]/70">
                                    Make sure your recipient name, contact number, and address are
                                    correct before placing an order.
                                </p>

                                {message ? (
                                    <div className="mt-4 rounded-2xl border border-[#C1121F]/10 bg-[#fff7f5] px-4 py-3 text-sm text-[#003049]">
                                        {message}
                                    </div>
                                ) : null}

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="mt-5 w-full rounded-full bg-[#C1121F] px-6 py-3.5 text-white font-semibold shadow-sm hover:opacity-90 disabled:opacity-60 transition"
                                >
                                    {saving ? "Saving..." : "Save Profile"}
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    placeholder,
    icon,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    icon: React.ReactNode;
    type?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-[#003049]">
                {label}
            </label>
            <div className="flex items-center gap-3 rounded-[20px] border border-gray-200 bg-white px-4 py-3.5 focus-within:border-[#003049] transition">
                <span className="text-[#003049]/60 shrink-0">{icon}</span>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none text-[#003049] placeholder:text-[#003049]/35"
                />
            </div>
        </div>
    );
}

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
            <span className="text-[#003049]/55">{label}</span>
            <span className="text-right font-medium text-[#003049]">{value}</span>
        </div>
    );
}