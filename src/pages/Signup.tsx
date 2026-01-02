import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Mail, Lock, Eye, EyeOff, User, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const benefits = [
    "Free SSL certificate included",
    "Instant account activation",
    "24/7 local support",
    "M-Pesa payment accepted",
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gold/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Server className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Vintechs</span>
          </Link>
          
          <div>
            <h1 className="font-display text-4xl font-bold mb-4">
              Start Hosting Today
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-md mb-8">
              Create your account and launch your website in minutes. Affordable
              hosting for Kenyan businesses and developers.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-primary-foreground/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Vintechs Hosting
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Server className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">Vintechs</span>
            </Link>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h2 className="font-display text-2xl font-bold mb-2">
            Create your account
          </h2>
          <p className="text-muted-foreground mb-8">
            Get started with your hosting account today
          </p>

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            </div>

            <Button variant="accent" size="lg" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:text-accent/80 font-medium">
              Log in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
