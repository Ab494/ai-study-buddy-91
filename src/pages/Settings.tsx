import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { subscription, createCheckout, openCustomerPortal, loading } = useSubscription();
  const [userName, setUserName] = useState<string>("User");
  const [userEmail, setUserEmail] = useState<string>("");

  // Basic SEO for this page
  useEffect(() => {
    document.title = "Settings | StudyAI";

    const desc =
      "Manage your StudyAI account settings, profile, and subscription.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    if (canonical) canonical.href = `${window.location.origin}/settings`;
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (user) {
        const fullName = (user.user_metadata as any)?.full_name || user.email || "User";
        setUserName(fullName);
        setUserEmail(user.email || "");
      }
    };
    loadUser();
  }, []);

  return (
    <DashboardLayout userName={userName} isPremium={!!subscription.subscribed} userRole="student">
      <main className="mx-auto w-full max-w-4xl space-y-6">
        {/* Page Title */}
        <section>
          <p className="text-2xl font-semibold tracking-tight">Account Settings</p>
          <p className="text-sm text-muted-foreground mt-1">
            Update your profile and manage your subscription.
          </p>
        </section>

        {/* Subscription */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Current plan</p>
                  <p className="text-sm text-muted-foreground">
                    {subscription.subscribed ? `${subscription.subscription_tier || "Premium"}` : "Free"}
                  </p>
                </div>
                {subscription.subscribed ? (
                  <Button onClick={openCustomerPortal} disabled={loading} variant="secondary">
                    {loading ? "Loading..." : "Manage Subscription"}
                  </Button>
                ) : (
                  <Button onClick={createCheckout} disabled={loading}>
                    {loading ? "Processing..." : "Upgrade to Premium"}
                  </Button>
                )}
              </div>
              {subscription.subscribed && subscription.subscription_end && (
                <p className="text-xs text-muted-foreground">
                  Renews before {new Date(subscription.subscription_end).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Profile (read-only for now) */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{userName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{userEmail}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Editing profile coming soon.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Settings;
