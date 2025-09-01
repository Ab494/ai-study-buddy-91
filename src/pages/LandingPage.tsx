import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Brain, BookOpen, MessageSquare, Users, Star, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">StudyAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden sm:inline-flex" onClick={() => window.location.href = '/auth'}>Sign In</Button>
              <Button className="gradient-bg glow-primary" onClick={() => window.location.href = '/auth'}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  🚀 AI-Powered Learning Platform
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Master Any Subject with{" "}
                  <span className="gradient-text">AI-Powered</span>{" "}
                  Study Assistant
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform your learning experience with personalized quizzes, 
                  intelligent chatbot assistance, and adaptive study plans. 
                  Built for students, teachers, and lifelong learners.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gradient-bg text-lg px-8 glow-primary animate-pulse-glow" onClick={() => window.location.href = '/auth'}>
                  Start Learning Free
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => window.location.href = '/dashboard'}>
                  View Dashboard
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-success mr-2" />
                  Free to start
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-success mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-success mr-2" />
                  15 free questions daily
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 animate-float">
                <img 
                  src={heroImage} 
                  alt="AI-powered learning interface" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI-powered tools designed to accelerate your learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Quiz Generator",
                description: "Upload PDFs, notes, or textbooks and get personalized quizzes generated instantly",
                features: ["Smart question generation", "Multiple formats", "Difficulty adaptation"]
              },
              {
                icon: MessageSquare,
                title: "Learning Assistant Chat",
                description: "Get instant help with homework, explanations, and study guidance",
                features: ["24/7 availability", "Voice & image input", "Chat history saved"]
              },
              {
                icon: Users,
                title: "Teacher Dashboard",
                description: "Manage students, create assignments, and track progress effectively",
                features: ["Student analytics", "Grade management", "Progress tracking"]
              },
              {
                icon: BookOpen,
                title: "Study Materials",
                description: "Organize and access all your learning resources in one place",
                features: ["PDF uploads", "Note organization", "Search functionality"]
              },
              {
                icon: Star,
                title: "Progress Tracking",
                description: "Monitor your learning journey with detailed analytics and insights",
                features: ["Performance metrics", "Streak tracking", "Achievement badges"]
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is protected with enterprise-grade security measures",
                features: ["Data encryption", "Privacy controls", "GDPR compliant"]
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-card border-0 hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free and upgrade when you're ready for unlimited learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free Plan</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="text-4xl font-bold text-primary mt-4">$0</div>
                <div className="text-muted-foreground">Forever free</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "15 AI chatbot questions per day",
                    "5 quiz generations per month",
                    "Basic study materials",
                    "Progress tracking",
                    "Email support"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-success mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" variant="outline" onClick={() => window.location.href = '/auth'}>
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                Popular
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium Plan</CardTitle>
                <CardDescription>For serious learners</CardDescription>
                <div className="text-4xl font-bold text-primary mt-4">$9.99</div>
                <div className="text-muted-foreground">per month</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Unlimited AI chatbot questions",
                    "Unlimited quiz generations",
                    "Advanced study analytics",
                    "Voice & image input support",
                    "Priority support",
                    "Export study materials",
                    "Custom study plans"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-success mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 gradient-bg glow-primary" onClick={() => alert('Premium upgrade coming soon!')}>
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">StudyAI</span>
              </div>
              <p className="text-muted-foreground">
                Empowering learners worldwide with AI-powered education tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 StudyAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;