import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Calendar, Trophy, Heart, Edit2, LogOut, X, Save } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Hajj Guide AI" },
      { name: "description", content: "View and manage your pilgrim profile." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [user, setUser] = useState({
    name: "Abdullah Ahmed",
    email: "abdullah@example.com",
    phone: "+966 50 123 4567",
    location: "Jeddah, Saudi Arabia",
    joinDate: "March 2024",
    avatar: "AA",
    pilgrimage: {
      type: "Umrah",
      totalVisits: 3,
      lastVisit: "February 2024",
    },
  });

  const [editForm, setEditForm] = useState(user);

  const stats = [
    { label: "Translations", value: "247", icon: "📝" },
    { label: "Signs Scanned", value: "89", icon: "📸" },
    { label: "Distance Walked", value: "42 km", icon: "🚶" },
  ];

  const achievements = [
    { title: "First Steps", description: "Completed your first translation", icon: "🎯" },
    { title: "Quick Learner", description: "Translated 50+ texts", icon: "⚡" },
    { title: "Explorer", description: "Scanned 30+ signs", icon: "🗺️" },
  ];

  const handleEditSave = () => {
    setUser(editForm);
    setIsEditingMode(false);
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditingMode(false);
  };

  const handleLogout = () => {
    // Clear user data and redirect to login
    window.location.href = "/login";
  };

  if (isEditingMode) {
    return (
      <MobileShell title="Edit Profile">
        <div className="space-y-4 p-4 pb-24">
          <div className="rounded-2xl bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold mb-4 text-foreground">Edit Your Information</h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleEditSave}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 font-semibold text-foreground hover:bg-secondary/80 transition-colors active:scale-[0.98]"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell title="Profile">
      <div className="space-y-4 p-4 pb-24">
        {/* Profile Header */}
        <div className="rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-elegant">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-4">
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {user.avatar}
              </div>
              <div>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-sm opacity-90">{user.pilgrimage.type} Pilgrim</p>
              </div>
            </div>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Edit2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-2 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-card p-4 text-center shadow-card">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Pilgrimage Info */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Pilgrimage</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="font-semibold text-foreground">{user.pilgrimage.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Visits</span>
              <span className="font-semibold text-foreground">{user.pilgrimage.totalVisits}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Last Visit</span>
              <span className="font-semibold text-foreground">{user.pilgrimage.lastVisit}</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Achievements</h2>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div key={achievement.title} className="flex gap-3 p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile Button */}
        <button 
          onClick={() => {
            setEditForm(user);
            setIsEditingMode(true);
          }}
          className="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-foreground hover:bg-accent/80 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </button>

        {/* Logout Button */}
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
