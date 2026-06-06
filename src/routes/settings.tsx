import { createFileRoute } from "@tanstack/react-router";
import { Bell, Palette, Globe, Volume2, Lock, Smartphone, HelpCircle, LogOut } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Hajj Guide AI" },
      { name: "description", content: "Customize your Hajj Guide AI experience." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleClearCache = () => {
    // Clear local storage/cache
    localStorage.clear();
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 3000);
    alert("Cache cleared successfully!");
  };

  const handleResetDefaults = () => {
    setLanguage("en");
    setNotifications(true);
    setDarkMode(false);
    setSoundEnabled(true);
    alert("Settings reset to defaults!");
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Apply dark mode to document
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <MobileShell title="Settings">
      <div className="space-y-4 p-4 pb-24">
        {/* General Settings */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">General</h2>

          {/* Language Setting */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg bg-secondary px-3 py-2.5 text-sm text-secondary-foreground focus:ring-2 focus:ring-primary outline-none"
            >
              {["English", "Arabic", "Spanish", "French", "German"].map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Setting */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Dark Mode</span>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`w-11 h-6 rounded-full transition-colors ${
                darkMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notification & Sound */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Preferences</h2>

          {/* Notifications */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Notifications</p>
                <p className="text-xs text-muted-foreground">Prayer times & updates</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full transition-colors ${
                notifications ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Sound & Vibration</p>
                <p className="text-xs text-muted-foreground">Audio feedback</p>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-11 h-6 rounded-full transition-colors ${
                soundEnabled ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  soundEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Privacy & Security</h2>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Location Sharing</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-muted" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Data Privacy</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-success" />
          </div>
        </div>

        {/* App Info */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">App Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="font-semibold text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cache Size</span>
              <span className="font-semibold text-foreground">24 MB</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <button 
          onClick={handleClearCache}
          className="w-full rounded-lg bg-secondary/50 px-4 py-3 font-semibold text-foreground hover:bg-secondary transition-colors active:scale-[0.98]"
        >
          {cacheCleared ? "✓ Cache Cleared" : "Clear Cache"}
        </button>

        <button 
          onClick={handleResetDefaults}
          className="w-full rounded-lg bg-secondary/50 px-4 py-3 font-semibold text-foreground hover:bg-secondary transition-colors active:scale-[0.98]"
        >
          Reset to Defaults
        </button>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 font-semibold text-destructive hover:bg-destructive/20 transition-colors active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </MobileShell>
  );
}
