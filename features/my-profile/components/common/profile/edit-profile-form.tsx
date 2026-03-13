"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Lock, User as UserIcon, Mail, Loader2, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import apiClient from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const EditProfileForm = ({ user }: {
    user?: {
        name: string;
        email: string;
        image: string;
        coverImage: string;
    }
}) => {
    const { update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState({ avatar: false, cover: false });

    // State for Account Details
    const [accountData, setAccountData] = useState({
        fullName: user?.name || "",
        email: user?.email || "",
    });

    // State for Password Change
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleAccountUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiClient.patch(`${BaseURL}/v1/users/update-account`, {
                fullName: accountData.fullName,
                email: accountData.email
            });
            toast.success("Account details updated successfully");
            await update({ name: accountData.fullName, email: accountData.email });
            router.refresh();
        } catch (error) {
            toast.error("Failed to update account details.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await apiClient.post(`${BaseURL}/v1/users/change-password`, {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            });
            toast.success("Password changed successfully");
            setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
            router.refresh();
        } catch (error) {
            toast.error("Failed to update password.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        const fieldName = type === 'cover-image' ? 'coverImage' : 'avatar';
        formData.append(fieldName, file);

        setImageLoading(prev => ({ ...prev, [type]: true }));
        try {
            const response = await apiClient.patch(`${BaseURL}/v1/users/${type}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`);

            // Update session with new image URL
            if (type === 'avatar') {
                await update({ image: response.data.data.avatar });
            } else {
                await update({ coverImage: response.data.data.coverImage });
            }
            router.refresh();
        } catch (error) {
            toast.error("Failed to update profile image");
            console.error(error);
        } finally {
            setImageLoading(prev => ({ ...prev, [type]: false }));
        }
    };

    return (
        <div className="flex flex-col gap-8 pb-20">
            {/* Profile Images Section */}
            <Card className="bg-background/20 backdrop-blur-md border-muted-foreground/10 overflow-visible">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" /> Profile Appearance
                    </CardTitle>
                    <CardDescription>Update your profile and cover images.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 overflow-visible">
                    {/* Cover Image */}
                    <div className="relative group overflow-visible">
                        <div className="h-48 w-full rounded-xl bg-muted overflow-hidden relative border border-muted-foreground/10">
                            {imageLoading.cover ? (
                                <Skeleton className="w-full h-full rounded-xl" />
                            ) : user?.coverImage ? (
                                <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 italic">No cover image</div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Label htmlFor="cover-upload" className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
                                    {imageLoading.cover ? <Loader2 className="animate-spin w-4 h-4" /> : <Camera className="w-4 h-4" />}
                                    Change Cover
                                </Label>
                                <input id="cover-upload" type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'cover-image')} accept="image/*" />
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="absolute -bottom-10 left-8 group/avatar">
                            <div className="relative">
                                {imageLoading.avatar ? (
                                    <Skeleton className="h-24 w-24 rounded-full border-4 border-background" />
                                ) : (
                                    <Avatar className="h-24 w-24 border-4 border-background bg-background shadow-xl">
                                        <AvatarImage src={user?.image || ""} className="object-cover" />
                                    </Avatar>
                                )}
                                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                                    <Label htmlFor="avatar-upload" className="cursor-pointer text-white p-2">
                                        {imageLoading.avatar ? <Loader2 className="animate-spin w-5 h-5" /> : <Camera className="w-5 h-5" />}
                                    </Label>
                                    <input id="avatar-upload" type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'avatar')} accept="image/*" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                {/* Account Details */}
                <Card className="bg-background/20 flex flex-col backdrop-blur-md border-muted-foreground/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <UserIcon className="w-5 h-5" /> Account Details
                        </CardTitle>
                        <CardDescription>Keep your personal information up to date.</CardDescription>
                    </CardHeader>
                    <CardContent className=" grow ">
                        <form onSubmit={handleAccountUpdate} className="space-y-4 h-full flex flex-col">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold ml-1">Full Name</Label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={accountData.fullName}
                                        onChange={(e) => setAccountData({ ...accountData, fullName: e.target.value })}
                                        className="pl-10 bg-background/50"
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 grow">
                                <Label className="text-sm font-semibold ml-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={accountData.email}
                                        onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                                        className="pl-10 bg-background/50"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>
                            <Button type="submit" disabled={loading} className="w-fit ml-auto mt-auto  font-bold tracking-wider">
                                {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Password Change */}
                <Card className="bg-background/20 backdrop-blur-md border-muted-foreground/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Lock className="w-5 h-5" /> Change Password
                        </CardTitle>
                        <CardDescription>Secure your account by updating your password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-0">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold ml-1">Current Password</Label>
                                <Input
                                    type="password"
                                    value={passwordData.oldPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                    className="bg-background/50"
                                    placeholder="Enter current password"
                                />
                            </div>
                            <Separator className="bg-muted-foreground/5 my-2" />
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold ml-1">New Password</Label>
                                <Input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="bg-background/50"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="space-y-2 grow">
                                <Label className="text-sm font-semibold ml-1">Confirm New Password</Label>
                                <Input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="bg-background/50"
                                    placeholder="Repeat new password"
                                />
                            </div>
                            <Button type="submit" variant="secondary" disabled={loading} className="w-fit ml-auto mt-2 font-bold tracking-wider">
                                {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                                Update Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditProfileForm;
