import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Globe,
  Database,
  Upload,
  Mail,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Plus,
  MoreVertical,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const sidebarLinks = [
  { icon: Home, label: "Overview", href: "#overview", active: true },
  { icon: Globe, label: "Websites", href: "#websites" },
  { icon: Database, label: "Databases", href: "#databases" },
  { icon: Upload, label: "File Manager", href: "#files" },
  { icon: Mail, label: "Email", href: "#email" },
  { icon: Shield, label: "Security", href: "#security" },
  { icon: CreditCard, label: "Billing", href: "#billing" },
  { icon: HelpCircle, label: "Support", href: "#support" },
  { icon: Settings, label: "Settings", href: "#settings" },
];

const hostingAccounts = [
  {
    id: 1,
    domain: "mybusiness.co.ke",
    type: "WordPress",
    status: "active",
    storage: "1.2 GB / 5 GB",
    bandwidth: "15 GB / 50 GB",
  },
  {
    id: 2,
    domain: "portfolio.vintechs.co.ke",
    type: "File Upload",
    status: "active",
    storage: "800 MB / 5 GB",
    bandwidth: "8 GB / 50 GB",
  },
];

interface UserProfile {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, email")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
      setLoadingProfile(false);
    };

    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return user?.email || "User";
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <Server className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-sidebar-foreground">
                Vintechs
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-sidebar-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  link.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </a>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                {loadingProfile ? (
                  <Loader2 className="w-4 h-4 animate-spin text-sidebar-foreground" />
                ) : (
                  <span className="text-sm font-semibold text-sidebar-foreground">
                    {getInitials()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {loadingProfile ? "Loading..." : getDisplayName()}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-display font-semibold text-lg">Dashboard</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Manage your hosting accounts
                </p>
              </div>
            </div>
            <Button variant="accent" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              New Website
            </Button>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
          {/* Welcome message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-accent/10 to-gold/10 rounded-2xl p-6 border border-accent/20"
          >
            <h2 className="font-display font-bold text-xl mb-2">
              Welcome{profile?.first_name ? `, ${profile.first_name}` : ""}! 👋
            </h2>
            <p className="text-muted-foreground">
              Your hosting dashboard is ready. Start by creating your first website or exploring our features.
            </p>
          </motion.div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Websites", value: "2", icon: Globe, color: "accent" },
              { label: "Storage Used", value: "2.0 GB", icon: Database, color: "gold" },
              { label: "Total Bandwidth", value: "23 GB", icon: Upload, color: "success" },
              { label: "Email Accounts", value: "5", icon: Mail, color: "primary" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-display font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Hosting accounts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg">
                Your Websites
              </h2>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {hostingAccounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border p-5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{account.domain}</h3>
                        <p className="text-sm text-muted-foreground">
                          {account.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium capitalize">
                        {account.status}
                      </span>
                      <button className="p-1 rounded hover:bg-secondary">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Storage</span>
                        <span>{account.storage}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: "24%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Bandwidth</span>
                        <span>{account.bandwidth}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full"
                          style={{ width: "30%" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1">
                      File Manager
                    </Button>
                    {account.type === "WordPress" && (
                      <Button variant="accent" size="sm" className="flex-1">
                        WordPress
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="font-display font-semibold text-lg mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Upload, label: "Upload Files", color: "accent" },
                { icon: Database, label: "Manage DB", color: "gold" },
                { icon: Mail, label: "Create Email", color: "success" },
                { icon: Shield, label: "SSL Status", color: "primary" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
