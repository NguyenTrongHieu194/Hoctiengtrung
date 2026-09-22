import React, { useState } from "react";
import { 
  X, 
  Check, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  QrCode, 
  Gift, 
  ArrowRight,
  Star,
  CheckCircle2,
  Lock,
  Layers,
  Flame,
  Volume2
} from "lucide-react";
import { UserProfile, MembershipTier } from "../types";
import { 
  SUBSCRIPTION_PLANS, 
  COMPARISON_MATRIX, 
  PRICING_FAQS, 
  PricingPlan 
} from "../data/subscriptionPlans";
import { 
  getUserTier, 
  validatePromoCode, 
  activateSubscriptionTier 
} from "../services/subscriptionService";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (u: Partial<UserProfile>) => void;
  defaultPlanId?: MembershipTier;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  defaultPlanId = "pro_annual"
}) => {
  const currentTier = getUserTier(userProfile);
  const [selectedPlanId, setSelectedPlanId] = useState<MembershipTier>(
    currentTier === "free" ? defaultPlanId : currentTier
  );
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number; desc: string } | null>(null);
  const [promoFeedback, setPromoFeedback] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [showMatrix, setShowMatrix] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [paymentStep, setPaymentStep] = useState<"choose" | "checkout" | "success">("choose");
  const [paymentMethod, setPaymentMethod] = useState<"vietqr" | "momo" | "card">("vietqr");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[2];

  // Calculate final price with discount
  const discountMultiplier = appliedDiscount ? (1 - appliedDiscount.percent / 100) : 1;
  const finalPriceNumber = Math.round(selectedPlan.priceNumber * discountMultiplier);
  const finalPriceFormatted = finalPriceNumber === 0 
    ? "0 đ" 
    : new Intl.NumberFormat("vi-VN").format(finalPriceNumber) + " đ";

  const handleApplyPromo = () => {
    if (!promoCodeInput.trim()) return;
    const res = validatePromoCode(promoCodeInput);
    if (res.valid) {
      setAppliedDiscount({ code: promoCodeInput.trim().toUpperCase(), percent: res.discountPercent, desc: res.description });
      setPromoFeedback({ type: "success", message: res.message });
    } else {
      setAppliedDiscount(null);
      setPromoFeedback({ type: "error", message: res.message });
    }
  };

  const handleConfirmUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      activateSubscriptionTier(selectedPlanId, userProfile, onUpdateProfile);
      setIsProcessing(false);
      setPaymentStep("success");
    }, 1200);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative shrink-0 px-4 sm:px-8 pt-6 pb-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight">Nâng Cấp Gói Học Hello China</h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Ưu Đãi Đặc Biệt
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Mở khóa 100% tiềm năng tiếng Trung HSK 1-6 & Chuyên ngành thực chiến
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {paymentStep === "choose" && (
            <>
              {/* Value Proposition Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Mở 120+ bài HSK 1-6</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>AI Luyện nói 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Tiếng Trung Ngành May</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Hoàn tiền trong 7 ngày</span>
                </div>
              </div>

              {/* Plan Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SUBSCRIPTION_PLANS.filter(p => p.id !== "free" && p.id !== "garment_addon").map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`relative rounded-3xl p-5 cursor-pointer transition-all flex flex-col justify-between border-2 ${
                        isSelected 
                          ? `${plan.accentBorder} bg-gradient-to-b ${plan.colorGradient} shadow-xl scale-[1.02]` 
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                      }`}
                    >
                      {/* Popular Badge */}
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="px-3 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
                            ★ Phổ Biến Nhất ★
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
                              {plan.targetAudience}
                            </span>
                            <h3 className="text-base font-black text-slate-900">{plan.name}</h3>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="my-3 pb-3 border-b border-slate-200/60">
                          {plan.originalPriceFormatted && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400 line-through">
                                {plan.originalPriceFormatted}
                              </span>
                              {plan.savingsPercent && (
                                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-rose-100 text-rose-600">
                                  Tiết kiệm {plan.savingsPercent}%
                                </span>
                              )}
                            </div>
                          )}
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-2xl sm:text-3xl font-black text-slate-900">
                              {plan.priceFormatted}
                            </span>
                            <span className="text-xs font-bold text-slate-500">{plan.periodLabel}</span>
                          </div>
                          {plan.dailyPriceEquivalent && (
                            <p className="text-[11px] font-semibold text-emerald-600 mt-1">
                              {plan.dailyPriceEquivalent}
                            </p>
                          )}
                        </div>

                        {/* Key Features list */}
                        <ul className="space-y-2 text-xs">
                          {plan.features.slice(0, 5).map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-700">
                              <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${f.isHighlight ? "text-orange-500" : "text-emerald-500"}`} />
                              <span className={f.isHighlight ? "font-bold text-slate-900" : ""}>{f.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60">
                        <button
                          type="button"
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all ${
                            isSelected ? plan.buttonColor : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {isSelected ? "Đang chọn gói này" : "Chọn gói này"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add-on specialized Garment Pass banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">Bạn chỉ cần học Tiếng Trung Ngành May?</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-800">
                        Chỉ 199.000 đ
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Mở khóa trọn bộ 100% từ vựng xưởng may, rập mẫu, QC và 20 hội thoại xử lý sự cố chuyền may.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedPlanId("garment_addon");
                    setPaymentStep("checkout");
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
                >
                  Chọn Gói Ngành May
                </button>
              </div>

              {/* Promo Code Input Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Gift className="w-4 h-4 text-orange-500 shrink-0" />
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      placeholder="Nhập mã ưu đãi (Ví dụ: HELLOCHINA50)"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    Áp dụng mã
                  </button>
                </div>
                {promoFeedback.message && (
                  <p className={`text-xs mt-2 font-medium ${promoFeedback.type === "success" ? "text-emerald-600" : "text-rose-600"}`}>
                    {promoFeedback.message}
                  </p>
                )}
                {/* Suggestions pill */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-[11px] text-slate-400">Mã có thể dùng:</span>
                  <button 
                    onClick={() => { setPromoCodeInput("HELLOCHINA50"); }} 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    HELLOCHINA50 (-50%)
                  </button>
                  <button 
                    onClick={() => { setPromoCodeInput("HSKPRO30"); }} 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    HSKPRO30 (-30%)
                  </button>
                </div>
              </div>

              {/* Next Step Checkout Button */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div>
                  <span className="text-xs text-slate-500">Tổng thanh toán:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-blue-900">
                      {finalPriceFormatted}
                    </span>
                    {appliedDiscount && (
                      <span className="text-xs text-emerald-600 font-bold">
                        (Đã giảm {appliedDiscount.percent}%)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setPaymentStep("checkout")}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-black shadow-lg shadow-blue-500/25 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Tiếp Tục Thanh Toán</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Detailed Comparison Table Accordion */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setShowMatrix(!showMatrix)}
                  className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Xem Bảng So Sánh Chi Tiết Các Gói Cước
                  </span>
                  {showMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showMatrix && (
                  <div className="p-4 bg-white overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[550px]">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold">
                          <th className="py-2 px-3">Tính năng</th>
                          <th className="py-2 px-3">Miễn Phí</th>
                          <th className="py-2 px-3 text-blue-600">PRO Tháng</th>
                          <th className="py-2 px-3 text-orange-600 bg-orange-50/60 rounded-t-xl">PRO Năm (VIP)</th>
                          <th className="py-2 px-3 text-purple-600">Trọn Đời</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {COMPARISON_MATRIX.map((cat, ci) => (
                          <React.Fragment key={ci}>
                            <tr className="bg-slate-50/80 font-bold text-slate-700">
                              <td colSpan={5} className="py-2 px-3 text-[11px] uppercase tracking-wider text-slate-600">
                                {cat.category}
                              </td>
                            </tr>
                            {cat.rows.map((r, ri) => (
                              <tr key={ri} className="hover:bg-slate-50/50">
                                <td className="py-2 px-3 font-medium text-slate-700">{r.feature}</td>
                                <td className="py-2 px-3 text-slate-500">{r.free}</td>
                                <td className="py-2 px-3 text-blue-700 font-semibold">{r.proMonth}</td>
                                <td className="py-2 px-3 text-orange-700 font-bold bg-orange-50/40">{r.proYear}</td>
                                <td className="py-2 px-3 text-purple-700 font-bold">{r.lifetime}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* FAQs Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Câu Hỏi Thường Gặp
                </h4>
                <div className="space-y-2">
                  {PRICING_FAQS.map((faq, fi) => (
                    <div key={fi} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(fi)}
                        className="w-full text-left p-3 bg-slate-50/80 hover:bg-slate-100/80 text-xs font-bold text-slate-800 flex items-center justify-between transition-colors"
                      >
                        <span>{faq.q}</span>
                        {openFaqIndex === fi ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      {openFaqIndex === fi && (
                        <div className="p-3 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Checkout & VietQR / MoMo Payment Gateway */}
          {paymentStep === "checkout" && (
            <div className="space-y-6 max-w-xl mx-auto">
              <button
                onClick={() => setPaymentStep("choose")}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                ← Quay lại chọn gói cước
              </button>

              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-black text-slate-900 mb-3">Xác nhận thanh toán gói {selectedPlan.name}</h3>
                
                <div className="space-y-2 text-xs border-b border-slate-200 pb-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Gói dịch vụ:</span>
                    <span className="font-bold text-slate-800">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Thời hạn:</span>
                    <span className="font-bold text-slate-800">{selectedPlan.periodLabel}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Mã giảm giá ({appliedDiscount.code}):</span>
                      <span>-{appliedDiscount.percent}%</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2">
                    <span>Tổng cần thanh toán:</span>
                    <span className="text-blue-700 text-lg">{finalPriceFormatted}</span>
                  </div>
                </div>

                {/* Select Payment Method */}
                <div className="mt-4 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Phương thức thanh toán:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod("vietqr")}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === "vietqr" 
                          ? "border-blue-500 bg-blue-50/80 text-blue-800 ring-2 ring-blue-400/20" 
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-blue-600" />
                      <span>Quét VietQR</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("momo")}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === "momo" 
                          ? "border-pink-500 bg-pink-50/80 text-pink-800 ring-2 ring-pink-400/20" 
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <Zap className="w-5 h-5 text-pink-600" />
                      <span>Ví MoMo</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === "card" 
                          ? "border-purple-500 bg-purple-50/80 text-purple-800 ring-2 ring-purple-400/20" 
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-purple-600" />
                      <span>Thẻ / Banking</span>
                    </button>
                  </div>
                </div>

                {/* QR Code Demo Display */}
                <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-32 bg-slate-100 rounded-2xl flex flex-col items-center justify-center p-2 border border-slate-200 shrink-0">
                    <QrCode className="w-20 h-20 text-slate-800" />
                    <span className="text-[9px] font-mono text-slate-500 mt-1">Quét mã để kích hoạt</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="font-bold text-slate-800">Thông tin chuyển khoản:</p>
                    <p>Ngân hàng: <span className="font-semibold text-slate-800">MB Bank / Vietcombank</span></p>
                    <p>Số tài khoản: <span className="font-mono font-bold text-blue-700">8888 6666 9999</span></p>
                    <p>Nội dung: <span className="font-mono font-bold text-orange-600">HELLOCHINA {userProfile.email.split("@")[0]}</span></p>
                    <p className="text-[11px] text-emerald-600">✓ Kích hoạt tức thì sau 30 giây</p>
                  </div>
                </div>

                {/* Confirmation Button */}
                <div className="mt-6">
                  <button
                    disabled={isProcessing}
                    onClick={handleConfirmUpgrade}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-black shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Đang xác thực giao dịch...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>Xác Nhận & Kích Hoạt Gói Ngay</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success Screen */}
          {paymentStep === "success" && (
            <div className="text-center py-8 px-4 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Chúc Mừng Bạn Đã Nâng Cấp Thành Công!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tài khoản của bạn đã được nâng cấp lên <strong>{selectedPlan.name}</strong>. Giờ đây bạn có thể thoải mái học tập không giới hạn mọi cấp độ HSK và nhận hỗ trợ 1-1 từ Thầy Giáo AI.
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
                🎁 Tặng bạn thêm <strong>500 💎 Kim Cương</strong> để học tập và mua vật phẩm trong ứng dụng!
              </div>

              <button
                onClick={() => {
                  setPaymentStep("choose");
                  onClose();
                }}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-md"
              >
                Bắt Đầu Học Ngay Bây Giờ
              </button>
            </div>
          )}

        </div>

        {/* Footer Guarantee */}
        <div className="shrink-0 px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Bảo mật chuẩn mã hóa SSL 256-bit • Hoàn tiền 100% trong 7 ngày</span>
          </div>
          <span className="font-bold text-slate-700 hidden sm:inline">Hỗ trợ 24/7: support@hoctiengtrung.app</span>
        </div>
      </div>
    </div>
  );
};
