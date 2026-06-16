"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Check, MessageSquare, ShieldCheck } from "lucide-react";
import { EyebrowBadge } from "./ui/EyebrowBadge";


interface ContactProps {
  formState: "idle" | "submitting" | "success" | "error";
  errorMessage: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const GOAL_OPTIONS = [
  {
    id: "ads",
    label: "Meta & Google Ads",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    )
  },
  {
    id: "cro",
    label: "Store & Funnel CRO",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    )
  },
  {
    id: "retention",
    label: "Retention & WhatsApp",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    id: "creative",
    label: "Ad Creatives & Design",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    )
  }
] as const;

const BUDGET_OPTIONS = [
  { id: "small", label: "Under 50k" },
  { id: "mid", label: "50k – 2 Lakhs" },
  { id: "large", label: "2L – 5 Lakhs" },
  { id: "enterprise", label: "5 Lakhs+" }
] as const;

export function Contact({
  formState,
  errorMessage,
  handleSubmit
}: ContactProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [rawPainPoint, setRawPainPoint] = useState<string>("");

  const toggleGoal = (label: string) => {
    setSelectedGoals((prev) =>
      prev.includes(label)
        ? prev.filter((g) => g !== label)
        : [...prev, label]
    );
  };

  const combinedPainPoint = `Goals: [${
    selectedGoals.join(", ") || "None selected"
  }] | Budget: [${selectedBudget || "None selected"}] | Message: ${rawPainPoint}`;

  return (
    <section className="py-16 scroll-mt-28" id="contact">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto">

        
        <div className="w-[min(840px,100%)] mx-auto text-center mb-12 flex flex-col items-center select-none">
          <EyebrowBadge animatePulse>Let&apos;s Talk</EyebrowBadge>


          <motion.h2
            className="font-sans font-semibold text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.1] text-zinc-950 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to transform <br className="hidden sm:inline" />
            your performance{" "}
            <span className="text-[#5c43fd] bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] bg-clip-text text-transparent">
              marketing?
            </span>
          </motion.h2>

          <motion.p
            className="text-zinc-500 max-w-[580px] mx-auto text-[1.05rem] leading-[1.7] mt-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            If something here clicked, book a call. We will look at your brand, audit what you have, and tell you exactly what we would do — even if we do not end up working together.
          </motion.p>
        </div>

        
        <motion.div
          className="w-full max-w-5xl mx-auto mt-12 p-6 md:p-12 lg:p-16 rounded-[2.5rem] border border-[#5c43fd]/10 bg-white shadow-[0_24px_60px_rgba(92,67,253,0.06)] relative overflow-hidden isolate"
          initial={{ opacity: 0, y: 26 }}
          transition={{ duration: 0.55 }}
          viewport={{ amount: 0.2, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              background: "radial-gradient(#5c43fd 1.2px, transparent 1.2px)",
              backgroundSize: "24px 24px",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, black, transparent 95%)",
              maskImage: "radial-gradient(circle at 50% 50%, black, transparent 95%)",
            }}
          />

          
          <div className="absolute top-[-25%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#5c43fd]/6 blur-[70px] pointer-events-none z-0" />
          <div className="absolute bottom-[-25%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#8c76ff]/5 blur-[70px] pointer-events-none z-0" />

          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-4 flex flex-col items-center justify-center relative z-10"
                exit={{ opacity: 0, scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.95 }}
                key="success"
                role="status"
              >
                <div className="w-16 h-16 bg-emerald-500/8 border border-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-emerald-500/10">
                  <Check className="w-8 h-8 stroke-[2]" />
                </div>
                <h3 className="text-[1.8rem] font-semibold text-zinc-900 tracking-tight">Submission received.</h3>
                <p className="text-zinc-500 text-[1rem] leading-[1.7] mt-3 max-w-[440px]">
                  We will review your details and follow up on WhatsApp within 24 hours to schedule a call.
                </p>
                <span className="mt-8 text-[0.82rem] font-semibold text-zinc-400 tracking-wider uppercase">
                  — Team Ads of Stupid
                </span>
              </motion.div>
            ) : (
              <motion.form
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 relative z-10"
                exit={{ opacity: 0, y: -12 }}
                initial={{ opacity: 0, y: 12 }}
                key="form"
                onSubmit={handleSubmit}
              >
                
                <input name="painPoint" type="hidden" value={combinedPainPoint} />

                
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-100">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5c43fd]/5 border border-[#5c43fd]/10 text-[#5c43fd] text-[0.8rem] font-semibold">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.42 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 6 6l.27-.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" />
                    </svg>
                    <span>Free 30-min strategy call</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-[0.8rem] text-zinc-400 font-medium">
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Response via WhatsApp within 3 hours</span>
                  </div>
                </div>

                
                <div className="flex flex-col gap-3">
                  <label className="text-[0.92rem] font-semibold text-zinc-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5c43fd]/8 text-[#5c43fd] flex items-center justify-center text-[0.7rem] font-bold border border-[#5c43fd]/15">1</span>
                    <span>Primary growth goals</span>
                    <span className="text-zinc-400 text-[0.78rem] font-normal">— select all that apply</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {GOAL_OPTIONS.map((goal) => {
                      const isSelected = selectedGoals.includes(goal.label);
                      return (
                        <button
                          key={goal.id}
                          className={`p-4 rounded-2xl border text-left flex flex-col gap-3 transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-br from-[#5c43fd]/[0.06] to-[#8c76ff]/[0.02] border-[#5c43fd]/40 shadow-[0_8px_24px_rgba(92,67,253,0.06)] scale-[1.02]"
                              : "bg-zinc-50/40 hover:bg-zinc-50 border-zinc-200/80 hover:border-zinc-300 hover:scale-[1.01]"
                          }`}
                          onClick={() => toggleGoal(goal.label)}
                          type="button"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={`transition-colors ${isSelected ? "text-[#5c43fd]" : "text-zinc-400"}`}>
                              {goal.icon}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-[#5c43fd] border-[#5c43fd] text-white"
                                  : "border-zinc-300"
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                          <span className="text-[0.82rem] md:text-[0.86rem] font-semibold text-zinc-800 leading-tight">
                            {goal.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                
                <div className="flex flex-col gap-3">
                  <label className="text-[0.92rem] font-semibold text-zinc-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5c43fd]/8 text-[#5c43fd] flex items-center justify-center text-[0.7rem] font-bold border border-[#5c43fd]/15">2</span>
                    <span>Monthly advertising budget</span>
                    <span className="text-zinc-400 text-[0.78rem] font-normal">— in INR</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {BUDGET_OPTIONS.map((budget) => {
                      const isSelected = selectedBudget === budget.label;
                      return (
                        <button
                          key={budget.id}
                          className={`py-3.5 px-4 rounded-xl border text-center font-bold text-[0.85rem] transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] text-white border-transparent shadow-[0_6px_20px_rgba(92,67,253,0.22)] scale-[1.03]"
                              : "bg-zinc-50/40 hover:bg-zinc-50 border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:scale-[1.01]"
                          }`}
                          onClick={() => setSelectedBudget(budget.label)}
                          type="button"
                        >
                          {budget.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                
                <div className="flex flex-col gap-5">
                  <label className="text-[0.92rem] font-semibold text-zinc-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5c43fd]/8 text-[#5c43fd] flex items-center justify-center text-[0.7rem] font-bold border border-[#5c43fd]/15">3</span>
                    <span>Your details</span>
                  </label>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[0.8rem] font-semibold text-zinc-500">Full name</span>
                        <input
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50/10 focus:bg-white text-[0.93rem] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5c43fd] focus:ring-4 focus:ring-[#5c43fd]/8 shadow-sm transition-all duration-200"
                          name="name"
                          placeholder="Rahul Sharma"
                          required
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[0.8rem] font-semibold text-zinc-500">WhatsApp number</span>
                        <input
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50/10 focus:bg-white text-[0.93rem] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5c43fd] focus:ring-4 focus:ring-[#5c43fd]/8 shadow-sm transition-all duration-200"
                          name="phone"
                          placeholder="+91 98765 43210"
                          required
                          type="tel"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[0.8rem] font-semibold text-zinc-500">Brand / Website</span>
                        <input
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50/10 focus:bg-white text-[0.93rem] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5c43fd] focus:ring-4 focus:ring-[#5c43fd]/8 shadow-sm transition-all duration-200"
                          name="brand"
                          placeholder="yourbrand.com"
                          type="text"
                        />
                      </div>
                    </div>

                    
                    <div className="flex flex-col gap-1.5 h-full">
                      <span className="text-[0.8rem] font-semibold text-zinc-500">Where are you stuck?</span>
                      <textarea
                        className="w-full flex-1 px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50/10 focus:bg-white text-[0.93rem] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5c43fd] focus:ring-4 focus:ring-[#5c43fd]/8 shadow-sm transition-all duration-200 resize-none min-h-[220px] lg:min-h-0"
                        placeholder="Describe your current bottleneck — traffic, CAC, conversion rate, retention, anything."
                        required
                        value={rawPainPoint}
                        onChange={(e) => setRawPainPoint(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                
                <div className="flex flex-col gap-4">
                  <button
                    className="w-full inline-flex items-center justify-center min-h-[3.25rem] px-8 rounded-full text-[1rem] font-semibold bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] text-white shadow-[0_8px_24px_rgba(92,67,253,0.2)] hover:shadow-[0_12px_32px_rgba(92,67,253,0.28)] hover:-translate-y-px active:scale-98 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={formState === "submitting"}
                    type="submit"
                  >
                    {formState === "submitting" ? (
                      <span className="flex items-center gap-2.5">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Book a free strategy call"
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-5 text-[0.78rem] text-zinc-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                      Your information is kept private
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                    <span>No obligation. No sales pressure.</span>
                  </div>
                </div>

                {formState === "error" && (
                  <p aria-live="polite" className="text-rose-600 text-[0.88rem] text-center font-medium bg-rose-50 border border-rose-100 py-3 px-4 rounded-xl">
                    {errorMessage}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
