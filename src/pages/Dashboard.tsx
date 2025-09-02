import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  TrendingUp,
  Clock,
  Target,
  Zap,
  Upload,
  Plus,
  Crown,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/hooks/useSubscription";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscription, loading, createCheckout, openCustomerPortal } = useSubscription();

  const handleAskAI = () => {
    navigate("/chat");
  };

  const handleUploadMaterials = () => {
    toast({
      title: "Upload Materials",
      description: "File upload functionality coming soon!",
    });
  };

  const handleNewQuiz = () => {
    toast({
      title: "New Quiz",
      description: "Quiz creation functionality coming soon!",
    });
  };

  const handleTakeQuiz = () => {
    toast({
      title: "Take Quiz",
      description: "Quiz taking functionality coming soon!",
    });
  };

  // Mock data - would come from API/Supabase
  const stats = {
    questionsAsked: 12,
    dailyLimit: 15,
    quizzesCompleted: 8,
    streakDays: 7,
    totalScore: 850,
    weeklyGoal: 1000
  };

  const recentQuizzes = [
    { id: 1, title: "Biology Chapter 5", score: 85, date: "2 hours ago", subject: "Biology" },
    { id: 2, title: "Math Functions", score: 92, date: "1 day ago", subject: "Mathematics" },
    { id: 3, title: "History Quiz", score: 78, date: "3 days ago", subject: "History" }
  ];

  const achievements = [
    { id: 1, title: "Quick Learner", description: "Completed 5 quizzes in one day", icon: Zap, unlocked: true },
    { id: 2, title: "Streak Master", description: "7 days learning streak", icon: Target, unlocked: true },
    { id: 3, title: "Knowledge Seeker", description: "Asked 100 questions", icon: Brain, unlocked: false }
  ];

  return (
    <DashboardLayout userRole="student" userName="Alex Smith" isPremium={subscription.subscribed}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Your Learning Dashboard</h2>
            <p className="text-muted-foreground">
              Track your progress and continue your learning journey
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="gradient-bg" onClick={handleAskAI}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask AI Assistant
            </Button>
            <Button variant="outline" onClick={handleUploadMaterials}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Materials
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Questions</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.questionsAsked}/{stats.dailyLimit}</div>
              <Progress value={(stats.questionsAsked / stats.dailyLimit) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {stats.dailyLimit - stats.questionsAsked} questions remaining today
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.quizzesCompleted}</div>
              <p className="text-xs text-muted-foreground">
                +3 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streakDays} days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up! 🔥
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalScore}</div>
              <Progress value={(stats.totalScore / stats.weeklyGoal) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {stats.weeklyGoal - stats.totalScore} points to weekly goal
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Subscription Status */}
          <Card className="glass-card border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Subscription Status
                  </CardTitle>
                  <CardDescription>
                    Manage your StudyAI subscription
                  </CardDescription>
                </div>
                {subscription.subscribed && (
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    Premium
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscription.subscribed ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-success">Premium Active</h4>
                        <p className="text-sm text-muted-foreground">
                          {subscription.subscription_tier} Plan
                        </p>
                        {subscription.subscription_end && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Renews on {new Date(subscription.subscription_end).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Crown className="h-8 w-8 text-yellow-500" />
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={openCustomerPortal}
                    disabled={loading}
                    className="w-full"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {loading ? 'Loading...' : 'Manage Subscription'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-medium">Free Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      Limited features and daily usage
                    </p>
                  </div>
                  <Button 
                    className="w-full gradient-bg glow-primary" 
                    onClick={createCheckout}
                    disabled={loading}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    {loading ? 'Processing...' : 'Upgrade to Premium'}
                  </Button>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Unlimited AI questions</p>
                    <p>• Advanced study analytics</p>
                    <p>• Voice & image support</p>
                    <p>• Priority support</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Quizzes */}
          <Card className="glass-card border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Quizzes</CardTitle>
                  <CardDescription>
                    Your latest quiz attempts and scores
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleNewQuiz}>
                  <Plus className="h-4 w-4 mr-1" />
                  New Quiz
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentQuizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <h4 className="font-medium">{quiz.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {quiz.subject}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {quiz.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      quiz.score >= 90 ? 'text-success' : 
                      quiz.score >= 80 ? 'text-primary' : 
                      'text-muted-foreground'
                    }`}>
                      {quiz.score}%
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Your learning milestones and badges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.unlocked ? 'bg-success/10' : 'bg-muted/30'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked ? 'bg-success/20' : 'bg-muted'
                  }`}>
                    <achievement.icon className={`h-4 w-4 ${
                      achievement.unlocked ? 'text-success' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      Unlocked
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with your learning activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-20 flex-col space-y-2" onClick={handleAskAI}>
                <MessageSquare className="h-6 w-6" />
                <span>Ask AI Assistant</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2" onClick={handleTakeQuiz}>
                <BookOpen className="h-6 w-6" />
                <span>Take Quiz</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2" onClick={handleUploadMaterials}>
                <Upload className="h-6 w-6" />
                <span>Upload Materials</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;