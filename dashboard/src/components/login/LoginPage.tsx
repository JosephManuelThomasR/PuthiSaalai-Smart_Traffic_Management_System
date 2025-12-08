import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Lock, User } from "lucide-react";

interface LoginPageProps {
  isRegister?: boolean;
  isForgotPassword?: boolean;
  searchValue?: string;
  onSearch?: (value: string) => void;
}

const LoginPage = ({
  isRegister = false,
  isForgotPassword = false,
  searchValue = "",
  onSearch = () => {},
}: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validUsername = "admin"; // Set your desired username
  const validPassword = "123456"; // Set your desired password

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate login authentication
    setTimeout(() => {
      setIsLoading(false);

      if (username === validUsername && password === validPassword) {
        // Store authentication status
        localStorage.setItem("isAuthenticated", "true");
        navigate("/"); // Redirect to home on success
      } else {
        setError("Invalid username or password. Please try again.");
      }
    }, 1000); // Simulating authentication delay
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Background overlay with traffic image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=1200&q=80')",
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Tuticorin Police
          </h1>
          <p className="text-slate-400 text-lg">
            Smart Traffic Management System
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-900/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">
              {isForgotPassword
                ? "Reset Password"
                : isRegister
                  ? "Create Account"
                  : "Sign In"}
            </CardTitle>
            <CardDescription className="text-center text-slate-400">
              {isForgotPassword
                ? "Enter your email to reset your password"
                : isRegister
                  ? "Create a new account to access the dashboard"
                  : "Enter your credentials to access the dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isForgotPassword ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    navigate("/login");
                  }, 1500);
                }}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="officer@tuticorinpolice.gov.in"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending reset link...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>
              </form>
            ) : isRegister ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    navigate("/login");
                  }, 1500);
                }}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-300">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-300">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="officer@tuticorinpolice.gov.in"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-300">
                      Password
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-400">
                        <Lock className="h-4 w-4" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-slate-300">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-400">
                        <Lock className="h-4 w-4" />
                      </div>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-slate-300">
                      Username
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <Input
                        id="username"
                        placeholder="officer.username"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-300">
                        Password
                      </Label>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-400">
                        <Lock className="h-4 w-4" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-100/10 border border-red-200/20 rounded-md">
                      {error}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-slate-400 text-center">
              {isForgotPassword ? (
                <>
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Sign In
                  </Link>
                </>
              ) : isRegister ? (
                <>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
            <div className="text-xs text-slate-500 text-center">
              © 2023 Tuticorin Police Department. All rights reserved.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
