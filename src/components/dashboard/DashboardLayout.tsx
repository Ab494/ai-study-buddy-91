import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Brain, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Settings, 
  BarChart3,
  FileText,
  Trophy,
  Bell,
  Menu,
  LogOut,
  User,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSubscription } from "@/hooks/useSubscription";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: "student" | "teacher";
  userName?: string;
  isPremium?: boolean;
}

export const DashboardLayout = ({ 
  children, 
  userRole = "student", 
  userName = "Alex Smith",
  isPremium = false 
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const { createCheckout, openCustomerPortal, loading } = useSubscription();

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") {
      setActiveTab("overview");
    } else if (path === "/chat") {
      setActiveTab("chat");
    } else {
      setActiveTab("overview");
    }
  }, [location.pathname]);

  const handleNavigation = (itemId: string) => {
    setActiveTab(itemId);
    switch (itemId) {
      case "overview":
        navigate("/dashboard");
        break;
      case "chat":
        navigate("/chat");
        break;
        case "settings":
          navigate("/settings");
          break;
      case "quizzes":
      case "materials":
      case "achievements":
      case "students":
      case "analytics":
        // These routes don't exist yet, could be added later
        console.log(`Navigate to ${itemId} - feature coming soon`);
        break;
      default:
        navigate("/dashboard");
    }
  };

  const studentMenuItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "chat", label: "AI Assistant", icon: MessageSquare },
    { id: "quizzes", label: "My Quizzes", icon: BookOpen },
    { id: "materials", label: "Study Materials", icon: FileText },
    { id: "achievements", label: "Achievements", icon: Trophy },
  ];

  const teacherMenuItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "students", label: "Students", icon: Users },
    { id: "quizzes", label: "Quiz Manager", icon: BookOpen },
    { id: "materials", label: "Course Materials", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const menuItems = userRole === "student" ? studentMenuItems : teacherMenuItems;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-6">
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-8">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold gradient-text">StudyAI</span>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.id)}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </nav>

              {/* Premium Upgrade (for free users) */}
              {!isPremium && (
                <div className="mt-8 p-4 bg-gradient-primary rounded-lg text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Crown className="h-5 w-5" />
                    <span className="font-semibold">Upgrade to Premium</span>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Get unlimited AI questions and advanced features
                  </p>
                  <Button variant="secondary" size="sm" className="w-full" onClick={createCheckout} disabled={loading}>
                    {loading ? 'Processing...' : 'Upgrade Now'}
                  </Button>
                </div>
              )}

              {/* Settings */}
              <div className="mt-8 pt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation("settings")}
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-semibold">
                    Welcome back, {userName}! 👋
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {userRole === "student" ? "Ready to learn something new?" : "Manage your classes and students"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Premium Badge */}
                {isPremium && (
                  <Badge variant="secondary" className="bg-gradient-primary text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}

                {/* Notifications */}
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt={userName} />
                        <AvatarFallback>{userName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userRole === "student" ? "Student" : "Teacher"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    {!isPremium && (
                      <DropdownMenuItem onClick={createCheckout} disabled={loading}>
                        <Crown className="mr-2 h-4 w-4" />
                        <span>{loading ? 'Processing...' : 'Upgrade to Premium'}</span>
                      </DropdownMenuItem>
                    )}
                    {isPremium && (
                      <DropdownMenuItem onClick={openCustomerPortal} disabled={loading}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{loading ? 'Loading...' : 'Manage Subscription'}</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};