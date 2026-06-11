"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { signUpSchema, type SignUpInput } from "@/schemas/auth.schema";

export default function SignupPage() {
  const { register: authRegister } = useAuth();
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });

  const submitHandler = async (formData: SignUpInput) => {
    try {
      await authRegister(formData);
      toast.success("Registration successful");
      navigate.push("/sign-in");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4 py-10">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-violet-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              A
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>

            <p className="text-gray-300 mt-2 text-sm">
              Join us and start your journey today 🚀
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20 transition-all duration-300"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-500/20 transition-all duration-300"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
              />

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-gray-400 bg-transparent"
              />

              <p className="text-sm text-gray-300">
                I agree to the{" "}
                <span className="text-violet-400 hover:underline cursor-pointer">
                  Terms & Conditions
                </span>
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-linear-to-r from-violet-500 via-indigo-500 to-cyan-500 py-3 font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Creating Account…" : "Create Account"}
            </button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="rounded-xl border border-white/20 bg-white/10 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all"
              >
                Google
              </button>

              <button
                type="button"
                className="rounded-xl border border-white/20 bg-white/10 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all"
              >
                GitHub
              </button>
            </div>

            {/* Login */}
            <p className="text-center text-sm text-gray-400 pt-2">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
