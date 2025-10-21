import { Head, useForm } from "@inertiajs/react";
import EmpLayout from "@/layouts/emp-layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export default function CompleteProfile() {
    const { data, setData, post, processing, errors, reset } = useForm({
        profile_image: '',
        address: '',
        date_of_birth: '',
        card_no: '',
        passport_no: '',
        driving_license_no: '',
        gender: '',
        marital_status: '',
        no_of_kids: '',
        blood_group: '',
        religion: '',
        ethnic_group: '',
        account_no: '',
        ifsc_code: '',
        bank_name: '',
        branch_name: '',
        tax_identification_no: '',
        documents: '',
    });

    function updateSubmit(e) {
        e.preventDefault();
        post(route('employee.complete-profile'), {
            onSuccess: () => {
                setIsUpdateDialogOpen(false);
                toast({
                    title: "Profile Updated",
                    description: "Your profile has been successfully updated.",
                });
            }
        });
    }
    return (
        <EmpLayout>
            <Head title="Complete Profile" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Update Profile</h1>
                        <p className="text-muted-foreground">Complete Profile And Get Access To All Features</p>
                    </div>
                </div>

                <Form>
                    <form onSubmit={updateSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block font-medium">Address</label>
                            <Input
                                placeholder="Full Address"
                                value={data.address}
                                onChange={(e) => setData("address", e.target.value)}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>

                        <div>
                            <label className="block font-medium">Profile Image</label>
                            <Input
                                type="file"
                                placeholder="Profile Image"
                                // value={data.profile_image}
                                onChange={(e) => setData("profile_image", e.target.files[0])}
                            />
                            {errors.profile_image && <p className="text-red-500 text-sm">{errors.profile_image}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Employee Code */}
                            <div>
                                <label className="block font-medium">Birth Date</label>
                                <Input
                                    type="date"
                                    value={data.date_of_birth}
                                    onChange={(e) => setData("date_of_birth", e.target.value)}
                                />
                                {errors.date_of_birth && <p className="text-red-500 text-sm">{errors.date_of_birth}</p>}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold">Documents Number</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Aadhar Card No.</label>
                                <Input
                                    placeholder="Enter Aadhar Card No."
                                    value={data.card_no}
                                    onChange={(e) => setData("card_no", e.target.value)}
                                />
                                {errors.card_no && <p className="text-red-500 text-sm">{errors.card_no}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Passport No.</label>
                                <Input
                                    placeholder="Enter Passport No."
                                    value={data.passport_no}
                                    onChange={(e) => setData("passport_no", e.target.value)}
                                />
                                {errors.passport_no && <p className="text-red-500 text-sm">{errors.passport_no}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Driving License No.</label>
                                <Input
                                    placeholder="Enter Driving License No."
                                    value={data.driving_license_no}
                                    onChange={(e) => setData("driving_license_no", e.target.value)}
                                />
                                {errors.driving_license_no && <p className="text-red-500 text-sm">{errors.driving_license_no}</p>}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold">Basic Info</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Gender</label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(v) => setData("gender", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Marital Status</label>
                                <Select
                                    value={data.marital_status}
                                    onValueChange={(v) => setData("marital_status", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select marital status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Single">Single</SelectItem>
                                        <SelectItem value="Married">Married</SelectItem>
                                        <SelectItem value="Widowed">Widowed</SelectItem>
                                        <SelectItem value="Divorced">Divorced</SelectItem>
                                        <SelectItem value="Separated">Separated</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.marital_status && <p className="text-red-500 text-sm">{errors.marital_status}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">No of Kids</label>
                                <Input
                                    placeholder="Enter No of Kids"
                                    value={data.no_of_kids}
                                    onChange={(e) => setData("no_of_kids", e.target.value)}
                                />
                                {errors.no_of_kids && <p className="text-red-500 text-sm">{errors.no_of_kids}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Blood Group</label>
                                <Select
                                    value={data.blood_group}
                                    onValueChange={(v) => setData("blood_group", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A+">A+</SelectItem>
                                        <SelectItem value="A-">A-</SelectItem>
                                        <SelectItem value="B+">B+</SelectItem>
                                        <SelectItem value="B-">B-</SelectItem>
                                        <SelectItem value="AB+">AB+</SelectItem>
                                        <SelectItem value="AB-">AB-</SelectItem>
                                        <SelectItem value="O+">O+</SelectItem>
                                        <SelectItem value="O-">O-</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.blood_group && <p className="text-red-500 text-sm">{errors.blood_group}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Religion</label>
                                <Select
                                    value={data.religion}
                                    onValueChange={(v) => setData("religion", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select religion" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Islam">Islam</SelectItem>
                                        <SelectItem value="Christianity">Christianity</SelectItem>
                                        <SelectItem value="Hinduism">Hinduism</SelectItem>
                                        <SelectItem value="Buddhism">Buddhism</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.religion && <p className="text-red-500 text-sm">{errors.religion}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Ethnic Group</label>
                                <Select
                                    value={data.ethnic_group}
                                    onValueChange={(v) => setData("ethnic_group", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ethnic group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Indian">Indian</SelectItem>
                                        <SelectItem value="Pakistani">Pakistani</SelectItem>
                                        <SelectItem value="Bangladeshi">Bangladeshi</SelectItem>
                                        <SelectItem value="Nepali">Nepali</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.ethnic_group && <p className="text-red-500 text-sm">{errors.ethnic_group}</p>}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold">Bank Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Account No</label>
                                <Input
                                    placeholder="Enter Account No"
                                    value={data.account_no}
                                    onChange={(e) => setData("account_no", e.target.value)}
                                />
                                {errors.account_no && <p className="text-red-500 text-sm">{errors.account_no}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Ifsc Code</label>
                                <Input
                                    placeholder="Enter Ifsc Code"
                                    value={data.ifsc_code}
                                    onChange={(e) => setData("ifsc_code", e.target.value)}
                                />
                                {errors.ifsc_code && <p className="text-red-500 text-sm">{errors.ifsc_code}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Bank Name</label>
                                <Input
                                    placeholder="Enter Bank Name"
                                    value={data.bank_name}
                                    onChange={(e) => setData("bank_name", e.target.value)}
                                />
                                {errors.bank_name && <p className="text-red-500 text-sm">{errors.bank_name}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Branch Name</label>
                                <Input
                                    placeholder="Enter Branch Name"
                                    value={data.branch_name}
                                    onChange={(e) => setData("branch_name", e.target.value)}
                                />
                                {errors.branch_name && <p className="text-red-500 text-sm">{errors.branch_name}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Tax Identification No</label>
                                <Input
                                    placeholder="Enter Tax Identification No"
                                    value={data.tax_identification_no}
                                    onChange={(e) => setData("tax_identification_no", e.target.value)}
                                />
                                {errors.tax_identification_no && <p className="text-red-500 text-sm">{errors.tax_identification_no}</p>}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold">Upload Documents</h3>
                        <p className="mt-0 text-sm">Upload All Documents In Single PDF (Aadhar, Passport, Driving License, Pan Card etc.)</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">PDF</label>
                                <Input
                                    type="file"
                                    accept=".pdf"
                                    placeholder="Upload PDF"
                                    onChange={(e) => setData("documents", e.target.files[0])}
                                />  
                                {errors.documents && <p className="text-red-500 text-sm">{errors.documents}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    reset();
                                    setIsUpdateDialogOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Updating..." : "Update Profile"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </EmpLayout>
    )
}
