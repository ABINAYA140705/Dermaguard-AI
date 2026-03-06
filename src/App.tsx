import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  LogOut, 
  Settings, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Upload, 
  Search,
  ChevronRight,
  ChevronLeft,
  Info,
  X,
  FileText,
  Camera,
  Sparkles
} from 'lucide-react';
import { skinTypeQuestions, ingredientDatabase, skinTypeRecommendations } from './data';
import { GoogleGenAI } from '@google/genai';

// --- Types ---
type SkinType = 'Dry' | 'Oily' | 'Sensitive' | 'Combination' | 'Acne-prone' | 'Normal' | null;

interface UserProfile {
  name: string;
  email: string;
  skinType: SkinType;
}

// --- Constants ---
const ADMIN_EMAIL = 'abinaya.140705@gmail.com';

// --- Components ---

const Navbar = ({ user, onSignOut, onRetakeTest, onOpenSettings, onOpenAdmin }: { user: UserProfile | null, onSignOut: () => void, onRetakeTest: () => void, onOpenSettings: () => void, onOpenAdmin: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-teal-50 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
          <ShieldCheck className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-slate-800 tracking-tight">Dermaguard</span>
      </div>

      {user && (
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors"
          >
            <div className="w-8 h-8 bg-teal-200 rounded-full flex items-center justify-center text-teal-700 font-semibold">
              {user.name[0]}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.name}</span>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
              >
                <button 
                  onClick={() => { onOpenSettings(); setIsDropdownOpen(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-teal-50 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> General Settings
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => { onOpenAdmin(); setIsDropdownOpen(false); }}
                    className="w-full px-4 py-2 text-left text-sm text-teal-600 hover:bg-teal-50 flex items-center gap-2 font-medium"
                  >
                    <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                  </button>
                )}
                <button 
                  onClick={() => { onRetakeTest(); setIsDropdownOpen(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-teal-50 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Retake Test
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button 
                  onClick={onSignOut}
                  className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  );
};

const AuthPage = ({ onAuth }: { onAuth: (user: UserProfile) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const usersStr = localStorage.getItem('dermaguard_users');
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (isLogin) {
      const existingUser = users.find((u: any) => u.email === email && u.password === password);
      if (existingUser) {
        onAuth({ name: existingUser.name, email: existingUser.email, skinType: existingUser.skinType });
      } else {
        setError('Invalid email or password. Please create an account first.');
      }
    } else {
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        setError('An account with this email already exists. Please sign in.');
      } else {
        const newUser = { name, email, password, skinType: null };
        users.push(newUser);
        localStorage.setItem('dermaguard_users', JSON.stringify(users));
        onAuth({ name, email, skinType: null });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-teal-100/50 p-8 border border-white"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Dermaguard</h1>
          <p className="text-slate-500 mt-2">Your AI-powered skin safety companion</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-200 transition-all transform hover:-translate-y-0.5"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-teal-600 font-semibold hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Questionnaire = ({ onComplete }: { onComplete: (type: SkinType) => void }) => {
  const [mode, setMode] = useState<'choice' | 'quiz' | 'selfie' | 'direct'>('choice');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const skinTypes: SkinType[] = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Acne-prone'];

  // Clean up camera on unmount or mode change
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [mode]);

  // Attach stream to video element once it renders
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraActive]);

  const handleAnswer = (category: string) => {
    const newAnswers = [...answers, category];
    if (currentStep < skinTypeQuestions.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      const counts: Record<string, number> = {};
      newAnswers.forEach(cat => counts[cat] = (counts[cat] || 0) + 1);
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      onComplete(sorted[0][0] as SkinType);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      setIsCameraActive(true); // This triggers the render of the video element
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please ensure you have granted permission.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      alert("Camera is still initializing. Please wait a moment and try again.");
      return;
    }

    // Scale down image to prevent API payload size errors
    const MAX_DIMENSION = 1024;
    let width = video.videoWidth;
    let height = video.videoHeight;

    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Draw current frame to canvas
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(video, 0, 0, width, height);
    
    // Get base64 image data (JPEG format)
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    const base64Data = imageDataUrl.split(',')[1];

    if (!base64Data || base64Data.length < 100) {
      alert("Failed to capture image. Please try again.");
      return;
    }

    setIsAnalyzing(true);
    stopCamera(); // Stop camera while analyzing

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: 'image/jpeg',
              },
            },
            {
              text: 'Analyze this selfie for skin type. Look for shine (oily), redness (sensitive), flakiness (dry), breakouts (acne-prone), or balanced/smooth (Normal). Return ONLY one of these exact words: Dry, Oily, Sensitive, Combination, Acne-prone, Normal.',
            },
          ],
        },
      });
      
      const result = response.text?.trim() as SkinType;
      if (['Dry', 'Oily', 'Sensitive', 'Combination', 'Acne-prone', 'Normal'].includes(result)) {
        onComplete(result);
      } else {
        // Fallback if AI is confused
        onComplete('Normal');
      }
    } catch (error) {
      console.error(error);
      alert("Selfie analysis failed. Please try the quiz instead.");
      setMode('quiz');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const progress = ((currentStep + 1) / skinTypeQuestions.length) * 100;

  if (mode === 'choice') {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center"
        >
          <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-teal-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">How should we find your skin type?</h2>
          <p className="text-slate-500 mb-8">Choose the method that works best for you.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setMode('selfie')}
              className="p-6 rounded-2xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all group text-left"
            >
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-100">
                <Camera className="text-teal-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">AI Selfie Scan</h3>
              <p className="text-sm text-slate-500">Fastest way! Just take a photo and let our AI analyze it.</p>
            </button>

            <button 
              onClick={() => setMode('quiz')}
              className="p-6 rounded-2xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all group text-left"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100">
                <FileText className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Quick Quiz</h3>
              <p className="text-sm text-slate-500">Answer 5 simple questions about your skin.</p>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-400 mb-4 uppercase tracking-wider font-bold">Already know your type?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {skinTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => onComplete(type)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all text-sm font-medium"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (mode === 'selfie') {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center"
        >
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="text-teal-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Live Selfie Scan</h2>
          <p className="text-slate-500 mb-8">Position your face in the camera frame in natural light for the best results.</p>
          
          <div className="relative w-full aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden mb-6 flex items-center justify-center shadow-inner">
            {isAnalyzing ? (
               <div className="flex flex-col items-center justify-center text-teal-600">
                 <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                 <span className="font-medium">Analyzing Skin...</span>
               </div>
            ) : isCameraActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover transform -scale-x-100" 
              />
            ) : (
              <div className="text-slate-400 flex flex-col items-center">
                <Camera className="w-12 h-12 mb-2 opacity-50" />
                <span>Camera off</span>
              </div>
            )}
            {/* Hidden canvas for capturing the frame */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {!isAnalyzing && (
            isCameraActive ? (
              <button 
                onClick={captureAndAnalyze}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all flex items-center justify-center gap-2 mb-4"
              >
                <Camera className="w-5 h-5" /> Capture & Analyze
              </button>
            ) : (
              <button 
                onClick={startCamera}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mb-4"
              >
                <Camera className="w-5 h-5" /> Start Camera
              </button>
            )
          )}

          <button 
            onClick={() => {
              stopCamera();
              setMode('choice');
            }}
            className="text-slate-500 font-medium hover:text-teal-600 transition-colors text-sm"
          >
            Cancel and go back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => setMode('choice')}
              className="flex items-center gap-2 text-slate-500 font-medium hover:text-teal-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-sm font-medium text-teal-600">Question {currentStep + 1} of {skinTypeQuestions.length}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-teal-500"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-8">{skinTypeQuestions[currentStep].question}</h3>
            <div className="space-y-3">
              {skinTypeQuestions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.category)}
                  className="w-full p-5 text-left rounded-2xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all group flex items-center justify-between"
                >
                  <span className="text-lg font-medium text-slate-700 group-hover:text-teal-700">{option.text}</span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {currentStep > 0 && (
          <button 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mt-6 flex items-center gap-2 text-slate-500 font-medium hover:text-teal-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to previous question
          </button>
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ user, onRetake }: { user: UserProfile, onRetake: () => void }) => {
  const [ingredients, setIngredients] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeIngredients = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, skinType: user.skinType })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured. Please add it to your environment variables.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: file.type,
                },
              },
              {
                text: 'Extract the list of ingredients from this image. Return ONLY a comma-separated list of ingredients, nothing else.',
              },
            ],
          },
        });
        
        if (response.text) {
          setIngredients(response.text.trim());
        }
        setIsExtracting(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error extracting text:", error);
      setIsExtracting(false);
      alert("Failed to extract ingredients from image. Please try again or type them manually.");
    }
  };

  const skinTypeColors: Record<string, string> = {
    'Dry': 'bg-blue-500',
    'Oily': 'bg-yellow-500',
    'Sensitive': 'bg-red-400',
    'Combination': 'bg-teal-500',
    'Acne-prone': 'bg-purple-500',
    'Normal': 'bg-emerald-500'
  };

  const recommendations = skinTypeRecommendations.find(r => r.SkinType === user.skinType);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Recommendations */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${skinTypeColors[user.skinType || 'Combination']}`}>
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{user.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${skinTypeColors[user.skinType || 'Combination']}`}>
                    {user.skinType} Skin
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onRetake}
              className="w-full py-2 text-sm font-semibold text-teal-600 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
            >
              Retake Assessment
            </button>
          </motion.div>

          {recommendations && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
            >
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-500" /> Safe for You
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recommended</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendations.RecommendedIngredients.map((ing, i) => (
                      <span key={i} className="text-xs font-medium bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-100">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Avoid</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendations.AvoidIngredients.map((ing, i) => (
                      <span key={i} className="text-xs font-medium bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-100">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Center/Right Column: Scanner & Results */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Ingredient Scanner</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isExtracting}
                  className="px-4 py-2 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 transition-all border border-teal-100 flex items-center gap-2 font-medium disabled:opacity-50"
                  title="Upload Image"
                >
                  {isExtracting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {isExtracting ? 'Extracting...' : 'Upload Label'}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>

            <div className="relative mb-6">
              <textarea 
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Paste product ingredients here or upload an image of the label..."
                className="w-full h-40 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none text-slate-700"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-slate-400 text-xs font-medium">
                <FileText className="w-3 h-3" /> Separate with commas
              </div>
            </div>

            <button 
              onClick={analyzeIngredients}
              disabled={!ingredients || isAnalyzing}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" /> Check for Allergens
                </>
              )}
            </button>
          </motion.div>

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Risk Meter */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-800">Risk Analysis</h3>
                    <div className={`px-4 py-1 rounded-full text-sm font-bold text-white ${
                      result.overallRisk === 'High' ? 'bg-red-500' : 
                      result.overallRisk === 'Medium' ? 'bg-yellow-500' : 'bg-teal-500'
                    }`}>
                      {result.overallRisk} Risk
                    </div>
                  </div>

                  <div className="relative h-4 bg-slate-100 rounded-full mb-12">
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 border-r border-white/50 bg-teal-400 rounded-l-full" />
                      <div className="flex-1 border-r border-white/50 bg-yellow-400" />
                      <div className="flex-1 bg-red-400 rounded-r-full" />
                    </div>
                    <motion.div 
                      initial={{ left: '0%' }}
                      animate={{ left: result.overallRisk === 'High' ? '85%' : result.overallRisk === 'Medium' ? '50%' : '15%' }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white border-4 border-slate-800 rounded-full shadow-lg z-10"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-700 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" /> Detected Ingredients
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.findings.map((item: any, i: number) => (
                        <div key={i} className={`p-4 rounded-2xl border ${item.isHarmfulForUser ? 'border-red-100 bg-red-50' : 'border-teal-100 bg-teal-50'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`font-bold ${item.isHarmfulForUser ? 'text-red-700' : 'text-teal-700'}`}>{item.Ingredient}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              item.RiskLevel === 'High' ? 'bg-red-200 text-red-800' : 
                              item.RiskLevel === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-teal-200 text-teal-800'
                            }`}>
                              {item.RiskLevel}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mb-2"><span className="font-semibold">Use:</span> {item.CommonUse}</p>
                          {item.isHarmfulForUser && (
                            <div className="mt-2 pt-2 border-t border-red-200">
                              <p className="text-xs text-red-600 font-medium mb-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> Avoid for {user.skinType} skin
                              </p>
                              <p className="text-xs text-slate-500 italic">Try: {item.SaferAlternative}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onBack }: { onBack: () => void }) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const usersStr = localStorage.getItem('dermaguard_users');
    if (usersStr) {
      setUsers(JSON.parse(usersStr));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-slate-500">Manage users and view login details</p>
          </div>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Skin Type</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.length > 0 ? users.map((u, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                          {u.name[0]}
                        </div>
                        <span className="font-medium text-slate-700">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-mono">{u.email}</td>
                    <td className="px-6 py-4">
                      {u.skinType ? (
                        <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-bold uppercase tracking-wider">
                          {u.skinType}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Not assessed</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold uppercase tracking-wider">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        Active
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                      No users found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [view, setView] = useState<'auth' | 'questionnaire' | 'dashboard' | 'admin'>('auth');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('dermaguard_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setView(parsed.skinType ? 'dashboard' : 'questionnaire');
    }
  }, []);

  const handleAuth = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('dermaguard_user', JSON.stringify(userData));
    setView('questionnaire');
  };

  const handleQuestionnaireComplete = (type: SkinType) => {
    if (user) {
      const updatedUser = { ...user, skinType: type };
      setUser(updatedUser);
      localStorage.setItem('dermaguard_user', JSON.stringify(updatedUser));
      
      // Update skin type in the users database
      const usersStr = localStorage.getItem('dermaguard_users');
      if (usersStr) {
        const users = JSON.parse(usersStr);
        const userIndex = users.findIndex((u: any) => u.email === user.email);
        if (userIndex !== -1) {
          users[userIndex].skinType = type;
          localStorage.setItem('dermaguard_users', JSON.stringify(users));
        }
      }
      
      setView('dashboard');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('dermaguard_user');
    setUser(null);
    setView('auth');
  };

  const handleRetake = () => {
    setView('questionnaire');
  };

  return (
    <div className="min-h-screen font-sans text-slate-900">
      <Navbar 
        user={user} 
        onSignOut={handleSignOut} 
        onRetakeTest={handleRetake} 
        onOpenSettings={() => setShowSettings(true)}
        onOpenAdmin={() => setView('admin')}
      />
      
      <main>
        {view === 'auth' && <AuthPage onAuth={handleAuth} />}
        {view === 'questionnaire' && <Questionnaire onComplete={handleQuestionnaireComplete} />}
        {view === 'dashboard' && user && <Dashboard user={user} onRetake={handleRetake} />}
        {view === 'admin' && <AdminDashboard onBack={() => setView('dashboard')} />}
      </main>

      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">General Settings</h2>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={user?.name || ''}
                    disabled
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Current Skin Type</label>
                  <div className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-medium">
                    {user?.skinType || 'Not assessed yet'}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 text-center">
                    Settings are currently in read-only mode for this demo.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 bg-white">
        <p>© 2026 Dermaguard AI. For educational purposes only.</p>
      </footer>
    </div>
  );
}
