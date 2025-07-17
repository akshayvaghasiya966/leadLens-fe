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
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "@/store/slices/user";
import type { RootState } from "@/store";

const FormSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z
    .string()
    .min(1, "email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmpassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state:RootState) => state.userData);
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmpassword: false,
  });
  useEffect(() => {
    if(profile?._id){navigate('/')}
  }, [profile])

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const togglePasswordVisibility = (fieldName:'password'|'confirmpassword') => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

    async function onSubmit(data:any) {
      try {
        if(data?.password!==data?.confirmpassword){
          return toast.error(`password don't match`)
        }
        setLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/user/register",
        data
      );
      toast.success(response?.data?.message);
      dispatch(setProfile(response.data.data))
      form.reset();
      navigate('/')
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
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login with your Apple or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                      <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                      >
                        <GoogleLogin
                          onSuccess={async (res) => {
                            const token = res.credential;
                            const response = await axios.post(
                              import.meta.env.VITE_API_URL +
                                "/user/social-login",
                              {
                                type: 1,
                                token,
                              }
                            );
                            toast.success(response?.data?.message);
                            dispatch(setProfile(response.data.data));
                            navigate("/");
                          }}
                          onError={() => console.error("Login Failed")}
                        />
                      </GoogleOAuthProvider>
                    </div>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                      </span>
                    </div>
                    <div className="grid gap-6">
                      <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name *</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>email *</FormLabel>
                            <FormControl>
                              <Input
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisibility.password ? "text" : "password"}
                      placeholder="Enter password"
                      {...field}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePasswordVisibility('password')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-transparent"
                    >
                      {passwordVisibility.password ? (
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
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirm password *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisibility.confirmpassword ? "text" : "password"}
                      placeholder="Enter confirm password"
                      {...field}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePasswordVisibility('confirmpassword')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-transparent"
                    >
                      {passwordVisibility.confirmpassword ? (
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
                        {loading ? "Register..." : "Register"}
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link to="/login" className="underline underline-offset-4">
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
