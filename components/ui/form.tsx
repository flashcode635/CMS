import { Button } from "@/components/ui/Button";

export default function FormCard({ visible }: { visible: boolean }) {
    return (
        <>
            <div
                className={`w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 
                    xl:p-8 shadow-2xl border border-white/60 relative
                     z-20 anim-form${visible ? " visible" : ""}`}
                style={{
                    boxShadow: "0 24px 60px -12px color-mix(in srgb, black 35%, transparent)",
                }}
            >
                <div className="mb-4 sm:mb-5">
                    <h3
                        className="text-ink font-bold text-lg sm:text-xl"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Book Free Counselling
                    </h3>
                    <p className="text-muted text-xs sm:text-sm font-normal">
                        Fill in your details and our senior counsellor will reach out.
                    </p>
                </div>

                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col gap-3 sm:gap-3.5 w-full"
                >
                    {/* Name inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 w-full">
                        <div>
                            <input
                                type="text"
                                placeholder="First Name*"
                                className="w-full h-10 sm:h-11 px-3.5 rounded-lg border border-line-strong text-ink text-xs sm:text-sm font-medium outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all placeholder:text-muted bg-surface/50 hover:bg-white"
                                style={{ fontFamily: 'var(--font-body)' }}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Last Name*"
                                className="w-full h-10 sm:h-11 px-3.5 rounded-lg border border-line-strong text-ink text-xs sm:text-sm font-medium outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all placeholder:text-muted bg-surface/50 hover:bg-white"
                                style={{ fontFamily: 'var(--font-body)' }}
                            />
                        </div>
                    </div>

                    {/* Contact inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 w-full">
                        <input
                            type="tel"
                            placeholder="Phone Number*"
                            className="w-full h-10 sm:h-11 px-3.5 rounded-lg border border-line-strong text-ink text-xs sm:text-sm font-medium outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all placeholder:text-muted bg-surface/50 hover:bg-white"
                            style={{ fontFamily: 'var(--font-body)' }}
                        />
                        <input
                            type="email"
                            placeholder="Email Address*"
                            className="w-full h-10 sm:h-11 px-3.5 rounded-lg border border-line-strong text-ink text-xs sm:text-sm font-medium outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all placeholder:text-muted bg-surface/50 hover:bg-white"
                            style={{ fontFamily: 'var(--font-body)' }}
                        />
                    </div>

                    {/* Location inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 w-full">
                        <input
                            type="text"
                            placeholder="City*"
                            className="w-full h-10 sm:h-11 px-3.5 rounded-lg border border-line-strong text-ink text-xs sm:text-sm font-medium outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all placeholder:text-muted
                             bg-surface/50 hover:bg-white"
                            style={{ fontFamily: 'var(--font-body)' }}
                        />
                        <input
                            type="text"
                            placeholder="State*"
                            className="w-full h-10 sm:h-11 px-3.5 rounded-lg border border-line-strong text-ink text-xs sm:text-sm font-medium outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all placeholder:text-muted
                             bg-surface/50 hover:bg-white"
                            style={{ fontFamily: 'var(--font-body)' }}
                        />
                    </div>

                    {/* Nearest branch */}
                    <div>
                        <label
                            className="block text-body text-[11px] font-bold uppercase tracking-wider mb-1"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Nearest Branch
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Delhi, Mumbai, Hyderabad..."
                            className="w-full h-10 sm:h-11 px-3.5 rounded-lg border border-line-strong text-ink text-xs sm:text-sm font-medium outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all placeholder:text-muted bg-surface/50 hover:bg-white"
                            style={{ fontFamily: 'var(--font-body)' }}
                        />
                    </div>

                    {/* Message details */}
                    <div>
                        <label
                            className="block text-body text-[11px] font-bold uppercase tracking-wider mb-1"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Details / Message
                        </label>
                        <textarea
                            rows={2}
                            placeholder="Preferred country, course, or questions..."
                            className="w-full p-3 rounded-lg border border-line-strong text-ink text-xs sm:text-sm font-medium outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all resize-none placeholder:text-muted bg-surface/50 hover:bg-white"
                            style={{ fontFamily: 'var(--font-body)' }}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                    variant="brand"
                        type="submit"
                        fullWidth
                        className="h-11 sm:h-12 mt-1 rounded-xl text-brand-sky text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-95 active:scale-[0.99] cursor-pointer"
                        style={{
                            fontFamily: 'var(--font-body)',
                        }}
                        rightIcon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        }
                    >
                        <span>Submit Application</span>
                    </Button>
                </form>
            </div>

        </>
    )}