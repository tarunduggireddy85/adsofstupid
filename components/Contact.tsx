"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, Fragment, useState } from "react";
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

const STEPS = ["Goals", "Budget", "Details"] as const;

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: -dir * 48, opacity: 0 })
};

export function Contact({
  formState,
  errorMessage,
  handleSubmit
}: ContactProps) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [stepError, setStepError] = useState("");

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [rawPainPoint, setRawPainPoint] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");

  const toggleGoal = (label: string) => {
    setStepError("");
    setSelectedGoals((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  const combinedPainPoint = `Goals: [${
    selectedGoals.join(", ") || "None selected"
  }] | Budget: [${selectedBudget || "None selected"}] | Message: ${rawPainPoint}`;

  function validateStep(current: number) {
    if (current === 0 && selectedGoals.length === 0) {
      setStepError("Pick at least one goal to continue.");
      return false;
    }
    if (current === 1 && !selectedBudget) {
      setStepError("Select a budget range to continue.");
      return false;
    }
    setStepError("");
    return true;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setDir(1);
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  function goBack() {
    setStepError("");
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  }

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
          className="w-full max-w-3xl mx-auto mt-12 p-6 md:p-10 lg:p-12 rounded-[2.5rem] border border-[#5c43fd]/10 bg-white shadow-[0_24px_60px_rgba(92,67,253,0.06)] relative overflow-hidden isolate"
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
              maskImage: "radial-gradient(circle at 50% 50%, black, transparent 95%)"
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
                  We will review your details and email you within 24 hours to schedule a call.
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

                {/* ===== STEP INDICATOR ===== */}
                <div className="flex items-center justify-center">
                  {STEPS.map((label, i) => {
                    const done = i < step;
                    const active = i === step;
                    return (
                      <Fragment key={label}>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-[0.9rem] font-bold transition-all duration-300 ${
                              done || active
                                ? "bg-gradient-to-br from-[#8c76ff] to-[#5c43fd] text-white shadow-[0_6px_16px_rgba(92,67,253,0.28)]"
                                : "bg-zinc-100 text-zinc-400 border border-zinc-200"
                            } ${active ? "scale-110" : ""}`}
                          >
                            {done ? <Check className="h-4 w-4 stroke-[3]" /> : i + 1}
                          </div>
                          <span
                            className={`text-[0.78rem] font-semibold transition-colors ${
                              done || active ? "text-[#5c43fd]" : "text-zinc-400"
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className="flex-1 mx-2 sm:mx-3 h-[2px] -mt-6 rounded-full bg-zinc-200 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-[#8c76ff] to-[#5c43fd]"
                              initial={false}
                              animate={{ width: done ? "100%" : "0%" }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                            />
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </div>

                {/* ===== STEP PANELS ===== */}
                <div className="relative min-h-[260px] overflow-hidden">
                  <AnimatePresence mode="wait" custom={dir} initial={false}>
                    <motion.div
                      key={step}
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-4"
                    >
                      {step === 0 && (
                        <div className="flex flex-col gap-3">
                          <p className="text-[0.95rem] font-semibold text-zinc-800">
                            Primary growth goals
                            <span className="text-zinc-400 text-[0.78rem] font-normal"> — select all that apply</span>
                          </p>
                          <div className="grid grid-cols-2 gap-3">
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
                                        isSelected ? "bg-[#5c43fd] border-[#5c43fd] text-white" : "border-zinc-300"
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
                      )}

                      {step === 1 && (
                        <div className="flex flex-col gap-3">
                          <p className="text-[0.95rem] font-semibold text-zinc-800">
                            Monthly advertising budget
                            <span className="text-zinc-400 text-[0.78rem] font-normal"> — in INR</span>
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {BUDGET_OPTIONS.map((budget) => {
                              const isSelected = selectedBudget === budget.label;
                              return (
                                <button
                                  key={budget.id}
                                  className={`py-4 px-4 rounded-xl border text-center font-bold text-[0.9rem] transition-all duration-300 cursor-pointer ${
                                    isSelected
                                      ? "bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] text-white border-transparent shadow-[0_6px_20px_rgba(92,67,253,0.22)] scale-[1.03]"
                                      : "bg-zinc-50/40 hover:bg-zinc-50 border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:scale-[1.01]"
                                  }`}
                                  onClick={() => {
                                    setStepError("");
                                    setSelectedBudget(budget.label);
                                  }}
                                  type="button"
                                >
                                  {budget.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[0.8rem] font-semibold text-zinc-500">Full name</span>
                              <input
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/40 focus:bg-white text-[0.93rem] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5c43fd] focus:ring-4 focus:ring-[#5c43fd]/8 shadow-sm transition-all duration-200"
                                name="name"
                                placeholder="Rahul Sharma"
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[0.8rem] font-semibold text-zinc-500">Email address</span>
                              <input
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/40 focus:bg-white text-[0.93rem] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5c43fd] focus:ring-4 focus:ring-[#5c43fd]/8 shadow-sm transition-all duration-200"
                                name="email"
                                placeholder="you@yourbrand.com"
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[0.8rem] font-semibold text-zinc-500">Brand / Website <span className="text-zinc-400 font-normal">(optional)</span></span>
                            <input
                              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/40 focus:bg-white text-[0.93rem] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5c43fd] focus:ring-4 focus:ring-[#5c43fd]/8 shadow-sm transition-all duration-200"
                              name="brand"
                              placeholder="yourbrand.com"
                              type="text"
                              value={brand}
                              onChange={(e) => setBrand(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[0.8rem] font-semibold text-zinc-500">Where are you stuck?</span>
                            <textarea
                              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/40 focus:bg-white text-[0.93rem] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5c43fd] focus:ring-4 focus:ring-[#5c43fd]/8 shadow-sm transition-all duration-200 resize-none min-h-[120px]"
                              placeholder='Describe your current bottleneck — e.g. "Just launched on Shopify, no sales" or "Spending 50k/mo on ads, no profit."'
                              required
                              value={rawPainPoint}
                              onChange={(e) => setRawPainPoint(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {stepError && (
                  <p className="-mt-3 text-[0.85rem] text-rose-600 font-medium">{stepError}</p>
                )}

                {/* ===== NAV ===== */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-1.5 px-5 min-h-[3rem] rounded-full text-[0.95rem] font-semibold text-zinc-600 border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-colors duration-200"
                    >
                      <span aria-hidden>←</span> Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex items-center gap-1.5 px-7 min-h-[3rem] rounded-full text-[0.95rem] font-semibold bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] text-white shadow-[0_8px_24px_rgba(92,67,253,0.2)] hover:shadow-[0_12px_32px_rgba(92,67,253,0.28)] hover:-translate-y-px transition-all duration-200"
                    >
                      Continue <span aria-hidden>→</span>
                    </button>
                  ) : (
                    <button
                      className="inline-flex items-center justify-center min-h-[3rem] px-8 rounded-full text-[0.95rem] font-semibold bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] text-white shadow-[0_8px_24px_rgba(92,67,253,0.2)] hover:shadow-[0_12px_32px_rgba(92,67,253,0.28)] hover:-translate-y-px active:scale-98 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.78rem] text-zinc-400 font-medium pt-2 border-t border-zinc-100">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                    We reply by email within 24 hours
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300 hidden sm:inline-block" />
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    No obligation. No sales pressure.
                  </span>
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
