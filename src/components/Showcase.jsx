import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Cloud, 
  Database, 
  UserCheck, 
  ExternalLink, 
  Github, 
  Server, 
  Smartphone, 
  Zap, 
  CheckCircle,
  FileText,
  Key,
  ArrowLeft,
  Sun,
  Moon,
  Activity,
  Heart,
  Calendar,
  Layers,
  BrainCircuit,
  Globe,
  MessageSquare,
  Users,
  Search,
  UploadCloud,
  Settings,
  ShieldCheck,
  FileSearch,
  Stethoscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { flushSync } from 'react-dom';

// Asset Imports - Patient Side
import pDashboard from '../assets/aura_ss/patient_dashboard.jpg';
import pWellness from '../assets/aura_ss/patient_wellness_plan.jpg';
import pSymptom from '../assets/aura_ss/patient_ai_symtom_checker.jpg';
import pSymptomChat from '../assets/aura_ss/patient_aisymtom_checker_chat.jpg';
import pAccess from '../assets/aura_ss/patient_record_access_control.jpg';
import pIntegrity from '../assets/aura_ss/patient_integrity_checker.jpg';
import pProfile from '../assets/aura_ss/patient_profile.jpg';
import pProfileEdit from '../assets/aura_ss/patient_profile_edit.jpg';
import pAppointments from '../assets/aura_ss/patient_appointments.jpg';
import pApptSchedule from '../assets/aura_ss/patient_appointment_schedule.jpg';
import pChat from '../assets/aura_ss/patient_chat.jpg';
import pReportDisplay from '../assets/aura_ss/patient_medical_report_display.jpg';
import pReportAnalysis from '../assets/aura_ss/patient_report_analysis.jpg';
import pReportAnalyser from '../assets/aura_ss/patient_ai_report_analyser.jpg';
import pCarePlan from '../assets/aura_ss/patient_careplan_display.jpg';
import pLogin from '../assets/aura_ss/patient_login.jpg';

// Asset Imports - Provider Side
import vUpload from '../assets/aura_ss/provider_medical_report_upload.jpg';
import vAppts from '../assets/aura_ss/provider_appointment_display.jpg';
import vChat from '../assets/aura_ss/provider_chat.jpg';
import vProfileEdit from '../assets/aura_ss/provider_profile_edit.jpg';
import vPatientProfile from '../assets/aura_ss/provider_side_patient_profile.jpg';
import vLogin from '../assets/aura_ss/provider_login.jpg';

const Showcase = () => {
  const [userType, setUserType] = useState('patient');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  const [displayData, setDisplayData] = useState(null);

  // Preload Images
  useEffect(() => {
    const allImages = [
      pDashboard, pWellness, pSymptom, pSymptomChat, pAccess, pIntegrity, 
      pProfile, pProfileEdit, pAppointments, pApptSchedule, pChat, 
      pReportDisplay, pReportAnalysis, pReportAnalyser, pCarePlan, pLogin,
      vUpload, vAppts, vChat, vProfileEdit, vPatientProfile, vLogin
    ];
    
    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle tab and userType changes with a smooth fade
  useEffect(() => {
    setIsChanging(true);
    const timeout = setTimeout(() => {
      const currentTabs = userType === 'patient' ? patientTabs : providerTabs;
      const data = currentTabs.find(tab => tab.id === activeTab) || currentTabs[0];
      setDisplayData(data);
      setIsChanging(false);
    }, 250); // Match this with CSS transition duration
    return () => clearTimeout(timeout);
  }, [activeTab, userType]);

  const toggleTheme = async (e) => {
    if (!document.startViewTransition) {
      document.documentElement.classList.toggle('dark');
      setIsDark(!isDark);
      localStorage.theme = isDark ? 'light' : 'dark';
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        document.documentElement.classList.toggle('dark');
        setIsDark(!isDark);
        localStorage.theme = isDark ? 'light' : 'dark';
      });
    });

    await transition.ready;
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', pseudoElement: '::view-transition-new(root)' }
    );
  };

  const techStack = [
    { name: 'React', category: 'Frontend Framework', color: 'bg-blue-500', icon: <Smartphone size={20} /> },
    { name: 'Node.js', category: 'Backend Engine', color: 'bg-green-600', icon: <Server size={20} /> },
    { name: 'MongoDB', category: 'NoSQL Database', color: 'bg-emerald-500', icon: <Database size={20} /> },
    { name: 'Three.js', category: '3D Graphics', color: 'bg-slate-800', icon: <Layers size={20} /> },
    { name: 'Blockchain', category: 'Security & Trust', color: 'bg-aura', icon: <Shield size={20} /> },
    { name: 'AI/ML', category: 'Intelligent Analysis', color: 'bg-purple-600', icon: <BrainCircuit size={20} /> },
    { name: 'Web3', category: 'Decentralization', color: 'bg-orange-500', icon: <Globe size={20} /> },
    { name: 'Cloudinary', category: 'Secure Storage', color: 'bg-blue-400', icon: <Cloud size={20} /> },
  ];

  const patientTabs = [
    { id: 'dashboard', label: 'Dashboard', img: pDashboard, icon: <Activity size={18} />, desc: 'Comprehensive health overview with quick actions.' },
    { id: 'wellness', label: 'Wellness Coach', img: pWellness, icon: <Heart size={18} />, desc: 'AI-generated fitness and dietary recommendations.' },
    { id: 'symptom', label: 'Symptom Checker', img: pSymptom, icon: <Stethoscope size={18} />, desc: 'Initial AI diagnostic chat interface.' },
    { id: 'reports', label: 'Record Viewer', img: pReportDisplay, icon: <FileText size={18} />, desc: 'Secure viewing of decentralized medical records.' },
    { id: 'analysis', label: 'Report Analyser', img: pReportAnalyser, icon: <FileSearch size={18} />, desc: 'AI-powered breakdown of complex medical data.' },
    { id: 'access', label: 'Permission Control', img: pAccess, icon: <Key size={18} />, desc: 'Manage who can view your blockchain records.' },
    { id: 'integrity', label: 'Integrity Check', img: pIntegrity, icon: <ShieldCheck size={18} />, desc: 'Verify record authenticity on the Ethereum network.' },
    { id: 'appointments', label: 'Appointments', img: pAppointments, icon: <Calendar size={18} />, desc: 'Track and schedule provider visits.' },
    { id: 'chat', label: 'Patient Chat', img: pChat, icon: <MessageSquare size={18} />, desc: 'Secure communication with healthcare providers.' },
  ];

  const providerTabs = [
    { id: 'upload', label: 'Medical Upload', img: vUpload, icon: <UploadCloud size={18} />, desc: 'Securely upload and encrypt new patient records.' },
    { id: 'patient-view', label: 'Patient Lookup', img: vPatientProfile, icon: <Search size={18} />, desc: 'Access authorized patient history securely.' },
    { id: 'appointments', label: 'Schedule', img: vAppts, icon: <Calendar size={18} />, desc: 'Manage upcoming patient consultations.' },
    { id: 'chat', label: 'Provider Chat', img: vChat, icon: <MessageSquare size={18} />, desc: 'Multi-party communication with medical teams.' },
    { id: 'profile', label: 'Provider Profile', img: vProfileEdit, icon: <Settings size={18} />, desc: 'Manage professional credentials and settings.' },
  ];

  const currentTabs = userType === 'patient' ? patientTabs : providerTabs;
  const activeTabData = displayData || (currentTabs.find(tab => tab.id === activeTab) || currentTabs[0]);

  return (
    <div className="text-slate-900 dark:text-slate-100 font-sans selection:bg-aura/20 relative z-10 transition-colors duration-500">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-aura rounded-xl flex items-center justify-center text-white shadow-lg shadow-aura/30">
                <Shield size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Aura Health</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-aura dark:hover:text-aura/70 transition-colors">Features</a>
            <a href="#tech" className="hover:text-aura dark:hover:text-aura/70 transition-colors">Tech Stack</a>
            <a href="#demo" className="hover:text-aura dark:hover:text-aura/70 transition-colors">Interactive Preview</a>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={() => window.open('https://github.com/shubham4653/aurahealth101', '_blank')}
              className="bg-slate-900 dark:bg-aura text-white px-5 py-2 rounded-full hover:bg-slate-800 dark:hover:bg-aura/90 transition-all shadow-md"
            >
              GitHub Repo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-aura/70 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-aura/10 dark:bg-indigo-900/30 text-aura/90 dark:text-aura/40 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-aura/20 dark:border-indigo-800">
            <Zap size={14} /> Decentralized Healthcare Revolution
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight leading-tight text-slate-900 dark:text-white">
            Future of Healthcare <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aura to-blue-500">Secured with Blockchain</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed font-medium">
             Aura Health is a production-grade decentralized health ecosystem that utilizes 
             blockchain identity, AI-powered health analytics, and secure encryption 
             to return data ownership to patients.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button 
              onClick={() => window.open('https://github.com/shubham4653/aurahealth101', '_blank')}
              className="w-full sm:w-auto px-10 py-4 bg-aura text-white rounded-xl font-bold text-lg hover:bg-aura/90 transition-all shadow-xl shadow-aura/30 dark:shadow-indigo-900/40 flex items-center justify-center gap-2"
            >
              <Github size={20} /> View Source Code
            </button>
          </div>
        </div>
      </header>

      {/* Main UI Gallery Segment */}
      <section className="container mx-auto px-6 mb-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
         <div className="bg-slate-950 rounded-[2.5rem] p-3 lg:p-6 border border-slate-800 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-aura/20 to-transparent opacity-50 z-0"></div>
            <img 
               src={pLogin} 
               alt="Aura Health Landing" 
               className="w-full h-auto rounded-[1.5rem] shadow-2xl relative z-10 transform scale-[1.01] hover:scale-100 transition-transform duration-700"
            />
         </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-16 bg-white/60 dark:bg-slate-950/40 backdrop-blur-sm border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
               <div className="absolute -inset-4 bg-aura/10 rounded-[2rem] blur-xl group-hover:bg-aura/20 transition-all"></div>
               <img src={pDashboard} alt="Aura Features" className="relative rounded-[1.8rem] shadow-2xl border border-slate-200 dark:border-slate-800 transform group-hover:-rotate-1 transition-transform" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight">Powerful Features for <br/> <span className="text-aura text-3xl">Modern Healthcare</span></h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
                Experience the future of healthcare with our comprehensive suite of features designed 
                to enhance patient care and provider efficiency.
              </p>
              <div className="grid gap-6">
                {[
                  { title: "Blockchain Security", desc: "Immutable records secured by smart contracts on Ethereum Sepolia.", icon: <Shield className="text-aura" /> },
                  { title: "AI-Powered Analysis", desc: "Proprietary LLM integration for symptom checking and wellness plans.", icon: <BrainCircuit className="text-purple-600" /> },
                  { title: "Global Record Access", desc: "Instant, secure access to your entire medical history via Cloudinary.", icon: <Globe className="text-blue-600" /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 p-5 rounded-[1.5rem] hover:bg-white dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 shadow-none hover:shadow-xl group">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-aura/10 dark:group-hover:bg-indigo-900/40 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                       <h4 className="font-extrabold text-xl mb-1">{item.title}</h4>
                       <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white tracking-tight">Built with Modern Technology</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-xl mx-auto text-lg font-medium">Leveraging cutting-edge technologies to deliver a secure, scalable, and user-friendly healthcare platform.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, idx) => (
              <div key={idx} className="p-8 bg-white/80 dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group backdrop-blur-sm hover:-translate-y-1">
                <div className={`w-12 h-12 ${tech.color} rounded-xl mx-auto mb-6 flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg`}>
                  {tech.icon}
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">{tech.name}</h3>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Platform Preview */}
      <section id="demo" className="py-24 bg-slate-50/50 dark:bg-slate-950/20 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white tracking-tight">Interactive Platform Preview</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">Explore both sides of the Aura Health ecosystem</p>
          </div>

          {/* Role Toggle */}
          <div className="flex justify-center mb-10">
             <div className="p-1.5 bg-white dark:bg-slate-900 rounded-[1.8rem] border border-slate-200 dark:border-slate-800 flex gap-2 shadow-inner">
                <button 
                  onClick={() => setUserType('patient')}
                  className={`flex items-center gap-2 px-8 py-3 rounded-[1.2rem] font-extrabold text-base transition-all ${userType === 'patient' ? 'bg-aura text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <UserCheck size={20} /> Patient View
                </button>
                <button 
                  onClick={() => setUserType('provider')}
                  className={`flex items-center gap-2 px-8 py-3 rounded-[1.2rem] font-extrabold text-base transition-all ${userType === 'provider' ? 'bg-aura text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Server size={20} /> Provider View
                </button>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Tab Sidebar */}
            <div className="lg:w-72 flex flex-col gap-2.5 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
               {currentTabs.map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all border text-left group ${activeTab === tab.id 
                      ? 'bg-white dark:bg-slate-800 text-aura dark:text-aura/70 border-aura/30 dark:border-indigo-900 shadow-lg' 
                      : 'bg-transparent text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-700'}`}
                 >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${activeTab === tab.id ? 'bg-aura/10 dark:bg-indigo-900/30 text-aura' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                       {React.cloneElement(tab.icon, { size: 16 })}
                    </div>
                    <span className="flex-grow text-sm">{tab.label}</span>
                 </button>
               ))}
            </div>

            {/* Content Display */}
            <div className="flex-grow space-y-6">
               <div className="bg-white dark:bg-slate-900 p-3 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-4 left-4 z-10 hidden md:flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className={`rounded-[1.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 transition-all duration-300 ease-in-out ${isChanging ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                     <img 
                        src={activeTabData.img} 
                        alt={activeTabData.label} 
                        className="w-full h-auto"
                     />
                  </div>
               </div>
               
               <div className={`bg-aura/50 dark:bg-indigo-950/20 p-6 rounded-[1.8rem] border border-aura/20 dark:border-indigo-900/20 flex flex-col md:flex-row gap-6 items-center transition-all duration-300 ${isChanging ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  <div className="w-14 h-14 bg-aura rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shrink-0">
                     {activeTabData.icon}
                  </div>
                  <div className="flex-grow text-center md:text-left">
                     <h4 className="text-2xl font-extrabold mb-1 text-aura/90 dark:text-aura/40">{activeTabData.label}</h4>
                     <p className="text-slate-600 dark:text-slate-400 text-base font-medium">{activeTabData.desc}</p>
                  </div>
                  <button className="px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-extrabold text-sm hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-200 dark:shadow-none whitespace-nowrap">
                     Full Resolution
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="py-32 container mx-auto px-6">
         <div className="grid lg:grid-cols-3 gap-12">
            <div className="bg-slate-950 p-12 rounded-[3.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group col-span-1 lg:col-span-2">
               <div className="absolute top-0 right-0 w-80 h-80 bg-aura/10 rounded-full blur-3xl -mr-40 -mt-40"></div>
               <h3 className="text-4xl font-extrabold text-white mb-8 relative z-10"><span className="text-aura/10 font-mono">01.</span> Blockchain Integrity</h3>
               <p className="text-slate-400 text-xl leading-relaxed mb-10 font-medium italic">
                  "Each medical record is timestamped and cryptographically linked to a smart contract 
                  on the Sepolia network. The 'Integrity Checker' allows patients to verify that no entity—not even Aura Health—has modified their data."
               </p>
               <div className="p-6 bg-black/40 rounded-3xl border border-slate-800 font-mono text-aura/70 text-sm overflow-x-auto">
                  {`// RecordIntegrity.sol\ncontract Integrity {\n  mapping(bytes32 => bool) public recordHashes;\n  function verify(bytes32 hash) view returns (bool) {\n    return recordHashes[hash];\n  }\n}`}
               </div>
            </div>

            <div className="bg-aura p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mb-32"></div>
               <div>
                  <h3 className="text-4xl font-extrabold mb-6"><span className="text-aura/30 font-mono text-3xl">02.</span> AI Wellness</h3>
                  <p className="text-aura/20 text-lg font-medium leading-relaxed">
                     Our AI Wellness Coach doesn't just display data; it understands it. By analyzing 
                     vitals, chat history, and report insights, it provides personalized, dynamic 
                     care plans.
                  </p>
               </div>
               <div className="bg-indigo-800/50 p-6 rounded-3xl border border-aura/70/30 flex items-center gap-4 mt-10">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-aura">
                     <BrainCircuit />
                  </div>
                  <div>
                     <div className="font-bold">Neural Engine</div>
                     <div className="text-sm opacity-60">LLM Processing Active</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Stats/Metrics */}
      <section className="py-20 bg-white/40 dark:bg-slate-950/20 backdrop-blur-sm border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { val: "Trust", label: "Patient Centric", icon: <ShieldCheck className="mx-auto mb-4 text-aura" size={32} /> },
              { val: "99.9%", label: "Uptime Guaranteed", icon: <Zap className="mx-auto mb-4 text-yellow-500" size={32} /> },
              { val: "256-bit", label: "AES Encryption", icon: <Lock className="mx-auto mb-4 text-green-500" size={32} /> },
              { val: "24/7", label: "Automated Care", icon: <Globe className="mx-auto mb-4 text-blue-500" size={32} /> },
            ].map((stat, idx) => (
              <div key={idx} className="group">
                <div className="transform group-hover:scale-110 transition-transform duration-500 flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">{stat.val}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white/80 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-aura rounded-2xl flex items-center justify-center text-white shadow-xl">
                     <Shield size={26} />
                  </div>
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Aura Health</span>
               </div>
               <p className="text-slate-500 dark:text-slate-400 max-w-sm font-medium">Securing the world's most sensitive data through mathematical certainty and artificial intelligence.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-12 font-bold text-slate-500 dark:text-slate-400">
               <a href="/" className="hover:text-aura transition-colors tracking-widest uppercase text-sm">Main Portfolio</a>
               <a href="#" className="hover:text-aura transition-colors tracking-widest uppercase text-sm">Terms</a>
               <a href="#" className="hover:text-aura transition-colors tracking-widest uppercase text-sm">Privacy</a>
            </div>
            <div className="flex gap-8">
              <button 
                onClick={() => window.open('https://github.com/shubham4653/aurahealth101', '_blank')}
                className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-aura hover:scale-110 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <Github size={28} />
              </button>
              <button 
                onClick={() => window.open('https://github.com/shubham4653/aurahealth101', '_blank')}
                className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-aura hover:scale-110 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <ExternalLink size={28} />
              </button>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800/10 text-center text-slate-400 dark:text-slate-600 font-bold text-sm tracking-widest uppercase">
             &copy; 2025 Aura Health Ecosystem. Developed with Pride.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Showcase;
