import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Hajj Guide AI" },
      { name: "description", content: "Sign in to your Hajj Guide AI account." },
    ],
  }),
  component: () => <Login />,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (!email || !password) {
        setError("Please fill in all fields");
      } else if (!email.includes("@")) {
        setError("Please enter a valid email");
      } else {
        // TODO: Replace with actual API call
        console.log("Login attempt:", { email, password });
        alert("Login functionality - Backend API to be connected");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-gradient-to-b from-primary/10 to-background">
      {/* Hero Section */}
      <section className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=900&q=70')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 flex h-full flex-col justify-center items-center text-center text-primary-foreground">
          <div className="text-4xl mb-2">🕋</div>
          <h1 className="text-2xl font-bold">Hajj Guide AI</h1>
          <p className="text-xs opacity-90 mt-1">Translation & Guidance for Pilgrims</p>
        </div>
      </section>

      {/* Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        <div className="rounded-2xl bg-card p-6 shadow-card">
          <h2 className="mb-2 text-xl font-bold text-foreground">Welcome Back</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign in to access your pilgrim profile and saved translations
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Guest Access */}
            <button
              type="button"
              className="w-full rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all active:scale-[0.98]"
            >
              Continue as Guest
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 space-y-3 border-t border-border pt-4 text-center text-xs text-muted-foreground">
            <p>
              Don't have an account?{" "}
              <span className="font-medium text-primary cursor-pointer hover:underline">Sign up</span>
            </p>
            <p>
              <span className="cursor-pointer hover:underline">Forgot password?</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
