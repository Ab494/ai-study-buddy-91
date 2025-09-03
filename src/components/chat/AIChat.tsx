import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  Mic, 
  Image, 
  Bot, 
  User, 
  Crown,
  Upload,
  Volume2,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  attachments?: string[];
}

const AIChat = () => {
  const { toast } = useToast();
  const { subscription, createCheckout, loading } = useSubscription();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm StudyAI, your direct and knowledgeable learning assistant. I provide clear, factual answers to help you understand any subject. Ask me anything about biology, math, history, science, or any topic you're studying!",
      sender: "ai",
      timestamp: new Date(),
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const dailyLimit = subscription.subscribed ? 1000 : 15;
  const isPremium = subscription.subscribed;
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get initial user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authSubscription.unsubscribe();
  }, []);

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "Guest";
    
    const fullName = user.user_metadata?.full_name;
    const firstName = user.user_metadata?.first_name;
    const lastName = user.user_metadata?.last_name;
    
    if (fullName) return fullName;
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    
    const emailName = user.email?.split('@')[0];
    return emailName || "User";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Check if user has reached daily limit (non-premium only)
    if (!isPremium && questionsUsed >= dailyLimit) {
      toast({
        title: "Daily Limit Reached",
        description: "Upgrade to Premium for unlimited questions",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      console.log('Sending message to AI:', inputValue);
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: inputValue }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('AI response received:', data);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I apologize, but I couldn't generate a response. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // Increment question count for non-premium users
      if (!isPremium) {
        setQuestionsUsed(prev => prev + 1);
      }

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    toast({
      title: "Voice Input",
      description: "Voice recognition feature coming soon!",
    });
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <DashboardLayout userRole="student" userName={getUserDisplayName()} isPremium={isPremium}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">AI Learning Assistant</h2>
            <p className="text-muted-foreground">
              Get instant help with your studies and homework
            </p>
          </div>
          {!isPremium && (
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                {questionsUsed}/{dailyLimit} questions used
              </Badge>
              <div className="text-sm text-muted-foreground">
                <Crown className="inline h-4 w-4 mr-1" />
                Upgrade for unlimited questions
              </div>
            </div>
          )}
        </div>

        {/* Chat Container */}
        <Card className="glass-card border-0 h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 bg-gradient-primary">
                <AvatarFallback>
                  <Bot className="h-5 w-5 text-white" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">StudyAI Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Always ready to help with your learning
                </p>
              </div>
              <div className="flex-1"></div>
              <Badge variant="secondary" className="bg-success/20 text-success">
                Online
              </Badge>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex-1 space-y-1 ${message.sender === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === "ai" && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            navigator.clipboard.writeText(message.text);
                            toast({ title: "Copied to clipboard!" });
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => toast({ title: "Text-to-speech coming soon!" })}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => toast({ title: "Thanks for the feedback!" })}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => toast({ title: "Thanks for the feedback!" })}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your studies..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleImageUpload}
                    className="h-8 w-8 p-0"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`h-8 w-8 p-0 ${isListening ? "text-red-500" : ""}`}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading || (!isPremium && questionsUsed >= dailyLimit)}
                className="gradient-bg"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {!isPremium && questionsUsed >= dailyLimit && (
              <div className="mt-2 p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  You've reached your daily limit of {dailyLimit} questions
                </p>
                <Button 
                  size="sm" 
                  className="gradient-bg"
                  onClick={createCheckout}
                  disabled={loading}
                >
                  <Crown className="h-4 w-4 mr-1" />
                  {loading ? 'Processing...' : 'Upgrade to Premium'}
                </Button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  toast({
                    title: "Image Upload",
                    description: "Image analysis feature coming soon!",
                  });
                }
              }}
            />
          </div>
        </Card>

        {/* Quick Suggestions */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg">Quick Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Explain photosynthesis",
                "Help with algebra problem", 
                "Create a history quiz",
                "Grammar check my essay",
                "Physics homework help",
                "Study tips for exams"
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start"
                  onClick={() => setInputValue(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIChat;