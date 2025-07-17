import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "email is required")
    .email("Please enter a valid email address"),
  otp: z
    .string()
    .min(1, "otp is required")
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email ?? null
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    newPassword: false,
    confirmPassword: false,
  });

 useEffect(() => {
  if (!email) navigate(-1); // redirect if email missing
}, [email, navigate]);

// prevent error by using conditional render
if (!email) return null; // or a loader, or redirect fallback


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: email??"",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = (fieldName: "newPassword" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  async function onSubmit(data:any) {
    if (data?.newPassword !== data?.confirmPassword) {
      return toast.error(`password don't match`);
    }
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/user/reset-password",
        data
      );
      toast.success(response?.data?.message);
      form.reset();
      navigate("/sign-in");
    } catch (error:any) {
      toast.error(
        error?.response?.data?.message ||
          "There was an error submitting your form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex self-center items-center gap-3">
          {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div> */}
          <span className="text-xl font-normal text-gray-700">
           Lead Lens
          </span>
        </div>
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Forgot Password</CardTitle>
              <CardDescription>Enter Your Email To Get OTP</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>email *</FormLabel>
                            <FormControl>
                              <Input
                                disabled
                                type="email"
                                placeholder="Enter email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>otp *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter otp"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>new password *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={
                                    passwordVisibility.newPassword
                                      ? "text"
                                      : "password"
                                  }
                                  placeholder="Enter new password"
                                  {...field}
                                  className="pr-10"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    togglePasswordVisibility("newPassword")
                                  }
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-transparent"
                                >
                                  {passwordVisibility.newPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>confirm password *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={
                                    passwordVisibility.confirmPassword
                                      ? "text"
                                      : "password"
                                  }
                                  placeholder="Enter confirm password"
                                  {...field}
                                  className="pr-10"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    togglePasswordVisibility("confirmPassword")
                                  }
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-transparent"
                                >
                                  {passwordVisibility.confirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? "Reset Password..." : "Reset Password"}
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="underline underline-offset-4"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
