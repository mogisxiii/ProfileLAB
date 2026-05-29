import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe2,
  MessageCircle,
  Send,
  Sparkles,
  Target,
  X,
} from "lucide-react";

const PHONE_DISPLAY = "0903 362 399";
const ZALO_LINK = "https://zalo.me/0903362399";

const sectionImages = {
  hero: "/1.png",
  cases: "/2.png",
  services: "/3.png",
  pricing: "/4.png",
};

const packages = [
  {
    name: "Profile PDF",
    price: "499K",
    desc: "Bộ hồ sơ PDF chuyên nghiệp để gửi khách, đối tác hoặc nhà tuyển dụng.",
    bestFor: "Cá nhân / chuyên gia / sale",
    features: [
      "4–6 trang",
      "Viết lại nội dung cơ bản",
      "Thiết kế theo template premium",
      "Xuất PDF + ảnh preview",
    ],
  },
  {
    name: "Danh thiếp số Landing Page",
    price: "999K",
    oldPrice: "1.5 triệu",
    badge: "Gói nên chọn",
    desc: "Một trang giới thiệu năng lực có link riêng, gửi Zalo/Facebook đẹp và chuyên nghiệp hơn.",
    bestFor: "Founder / SME / dự án mới",
    features: [
      "Giao diện responsive",
      "CTA gọi/Zalo",
      "Preview đẹp khi gửi link",
      "Phù hợp chạy ads",
    ],
    highlight: true,
  },
  {
    name: "AI Profile",
    price: "3–5 triệu",
    desc: "Website profile có chatbot FAQ giúp khách tự hỏi về năng lực, dịch vụ, bảng giá và quy trình.",
    bestFor: "Doanh nghiệp muốn khác biệt",
    features: [
      "Chatbot FAQ",
      "Kịch bản tư vấn",
      "Thu lead cơ bản",
      "Nâng cấp được sang AI thật",
    ],
  },
  {
    name: "Automation",
    price: "10 triệu+",
    desc: "Kết nối profile, chatbot, form, Google Sheet/CRM và thông báo lead thành quy trình tự động.",
    bestFor: "Đội sale / vận hành",
    features: [
      "Lưu lead",
      "Thông báo quản lý",
      "Google Sheet/CRM",
      "Tự động chăm sóc",
    ],
  },
];

const cases = [
  {
    type: "Cá nhân",
    title: "Chuyên gia / Freelancer",
    before: "Giới thiệu bản thân bằng vài dòng rời rạc trên Zalo hoặc Facebook.",
    after: "Có hồ sơ cá nhân rõ năng lực, dịch vụ, thành tựu và nút liên hệ.",
  },
  {
    type: "Doanh nghiệp",
    title: "SME / Công ty dịch vụ",
    before: "Gửi khách ảnh chụp bảng giá, catalogue cũ hoặc tin nhắn dài khó đọc.",
    after: "Có profile số chuyên nghiệp để gửi khách, đối tác và đại lý.",
  },
  {
    type: "Gọi vốn",
    title: "Startup / Dự án kinh doanh",
    before: "Ý tưởng hay nhưng trình bày thiếu cấu trúc, nhà đầu tư khó nắm nhanh.",
    after: "Có pitch deck rõ vấn đề, giải pháp, mô hình doanh thu và kế hoạch triển khai.",
  },
];

const services = [
  {
    icon: FileText,
    title: "Profile cá nhân",
    desc: "Dành cho chuyên gia, sales, freelancer, founder hoặc người cần xây dựng hình ảnh chuyên nghiệp.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Profile doanh nghiệp",
    desc: "Dành cho SME cần hồ sơ năng lực rõ ràng để gửi khách, đối tác, đại lý hoặc nhà cung cấp.",
  },
  {
    icon: Target,
    title: "Profile dự án gọi vốn",
    desc: "Dành cho startup, mô hình nhượng quyền hoặc dự án cần pitch deck thuyết phục.",
  },
];

const steps = [
  "Bạn gửi thông tin cơ bản",
  "ProfileLAB phân tích điểm mạnh và mục tiêu sử dụng",
  "Biên tập lại nội dung theo hướng bán hàng",
  "Thiết kế profile số / landing page / AI FAQ",
  "Bàn giao và hỗ trợ chỉnh sửa",
];

function ImageSection({
  id,
  image,
  children,
  dark = false,
  className = "",
  contentClassName = "mx-auto max-w-7xl px-5 md:px-8",
}) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
          dark ? "opacity-20" : "opacity-10"
        }`}
        style={{ backgroundImage: `url('${image}')` }}
      />

      <div
        className={`absolute inset-0 ${
          dark ? "bg-[#0b1220]/94" : "bg-[#f8f3ea]/92"
        }`}
      />

      <div
        className={`absolute inset-0 ${
          dark
            ? "bg-[radial-gradient(circle_at_72%_18%,rgba(214,166,58,0.18),transparent_32%)]"
            : "bg-[radial-gradient(circle_at_78%_12%,rgba(214,166,58,0.16),transparent_30%)]"
        }`}
      />

      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </section>
  );
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đ]/g, "d")
    .trim();
}

function getBotReply(rawText) {
  const text = normalizeText(rawText);

  if (
    text.includes("gia") ||
    text.includes("bao nhieu") ||
    text.includes("chi phi") ||
    text.includes("bang gia")
  ) {
    return `Dạ bảng giá hiện tại:\n\n• Profile PDF: từ 499K\n• Danh thiếp số Landing Page: còn 999K, giá gốc 1.5 triệu\n• AI Profile: từ 3–5 triệu\n• Automation: từ 10 triệu+\n\nNếu mới bắt đầu, gói Landing Page 999K là dễ dùng nhất ạ.`;
  }

  if (
    text.includes("landing") ||
    text.includes("danh thiep") ||
    text.includes("website") ||
    text.includes("web")
  ) {
    return "Dạ Landing Page là một trang giới thiệu năng lực có link riêng. Anh/chị có thể gửi qua Zalo, Facebook, email hoặc gắn vào bio cá nhân để khách xem nhanh và liên hệ dễ hơn.";
  }

  if (
    text.includes("goi nao") ||
    text.includes("phu hop") ||
    text.includes("nen chon")
  ) {
    return "Dạ nếu cần gửi file thì chọn Profile PDF 499K. Nếu muốn có link đẹp để gửi khách thì chọn Landing Page 999K. Nếu muốn khách tự hỏi đáp về năng lực/dịch vụ thì chọn AI Profile 3–5 triệu ạ.";
  }

  if (
    text.includes("bao lau") ||
    text.includes("thoi gian") ||
    text.includes("may ngay")
  ) {
    return "Dạ thời gian triển khai thường từ 2–5 ngày tùy gói. Nếu anh/chị cung cấp đủ thông tin, gói PDF hoặc Landing Page có thể làm nhanh hơn.";
  }

  if (
    text.includes("can gi") ||
    text.includes("gui gi") ||
    text.includes("chuan bi")
  ) {
    return "Dạ anh/chị cần chuẩn bị: tên cá nhân/doanh nghiệp, lĩnh vực, dịch vụ chính, điểm mạnh, hình ảnh/logo nếu có, số điện thoại/Zalo và mục tiêu dùng profile.";
  }

  if (
    text.includes("goi von") ||
    text.includes("startup") ||
    text.includes("pitch") ||
    text.includes("du an")
  ) {
    return "Dạ với dự án gọi vốn, ProfileLAB hỗ trợ làm pitch deck gồm: vấn đề, giải pháp, mô hình kinh doanh, kế hoạch triển khai, lợi thế cạnh tranh và lời kêu gọi hợp tác/gọi vốn.";
  }

  return `Dạ để tư vấn chính xác hơn, anh/chị nhắn Zalo Mr Phước qua số ${PHONE_DISPLAY}. Bên em sẽ xem nhu cầu và đề xuất gói phù hợp ạ.`;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Xin chào, em là trợ lý tư vấn ProfileLAB. Anh/chị muốn hỏi về bảng giá, landing page hay profile gọi vốn ạ?",
    },
  ]);

  const quickQuestions = useMemo(
    () => [
      "Bảng giá bao nhiêu?",
      "Landing Page là gì?",
      "Nên chọn gói nào?",
      "Bao lâu hoàn thành?",
    ],
    []
  );

  function sendMessage(value) {
    const userText = value || input;
    if (!userText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      { role: "bot", text: getBotReply(userText) },
    ]);

    setInput("");
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#101828] px-5 py-4 text-white shadow-2xl ring-1 ring-black/10"
      >
        <Bot size={20} />
        <span className="hidden text-sm font-semibold sm:inline">Hỏi nhanh</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-32px)] max-w-[380px] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
      <div className="flex items-center justify-between bg-[#101828] px-4 py-3 text-white">
        <div>
          <div className="font-bold">ProfileLAB Assistant</div>
          <div className="text-xs text-white/60">FAQ tư vấn nhanh</div>
        </div>
        <button onClick={() => setOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <div className="max-h-[340px] space-y-3 overflow-y-auto bg-[#f6f1e8] p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
              msg.role === "bot"
                ? "mr-8 bg-white text-slate-800"
                : "ml-8 bg-[#d6a63a] font-medium text-[#101828]"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 border-t bg-white p-3">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700 hover:bg-[#d6a63a] hover:text-[#101828]"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="flex gap-2 border-t bg-white p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập câu hỏi..."
          className="min-w-0 flex-1 rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={() => sendMessage()}
          className="rounded-xl bg-[#101828] px-4 text-white"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#101828]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#101828] text-[#d6a63a]">
            <Globe2 size={22} />
          </div>
          <div>
            <div className="text-xl font-black">
              Profile<span className="text-[#d6a63a]">LAB</span>
            </div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
              Digital Profile Studio
            </div>
          </div>
        </div>

        <a
          href={ZALO_LINK}
          className="hidden rounded-full bg-[#101828] px-5 py-3 text-sm font-bold text-white md:inline-flex"
        >
          Liên hệ Mr Phước
        </a>
      </header>

      <main>
        <ImageSection
          image={sectionImages.hero}
          className="pb-20 pt-10 md:pt-16"
          contentClassName="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1.05fr_0.95fr] md:px-8"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5">
              <Sparkles size={16} className="text-[#d6a63a]" />
              Khuyến mãi ra mắt: Landing Page chỉ 999K
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.05em] md:text-7xl">
              Khách hàng đánh giá năng lực của bạn trong 5 giây đầu tiên.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              ProfileLAB giúp cá nhân, doanh nghiệp và dự án gọi vốn xây dựng hồ
              sơ số chuyên nghiệp — từ PDF, landing page đến chatbot FAQ — để gửi
              khách, đối tác và nhà đầu tư.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={ZALO_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#101828] px-6 py-4 font-bold text-white"
              >
                Tư vấn qua Zalo <ArrowRight size={19} />
              </a>
              <a
                href="#cases"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-[#101828] ring-1 ring-black/10"
              >
                Xem cách chúng tôi làm
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["72h", "bàn giao nhanh"],
                ["999K", "landing page"],
                ["3 nhóm", "cá nhân / doanh nghiệp / gọi vốn"],
              ].map(([num, label]) => (
                <div
                  key={num}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
                >
                  <div className="text-2xl font-black text-[#d6a63a]">{num}</div>
                  <div className="mt-1 text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-[#101828] p-6 text-white shadow-2xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                <div className="text-sm uppercase tracking-[0.24em] text-[#d6a63a]">
                  Profile sample
                </div>
                <h2 className="mt-4 text-4xl font-black leading-tight">
                  Từ thông tin rời rạc thành hồ sơ đáng tin.
                </h2>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl bg-white p-5 text-[#101828]">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Before
                    </div>
                    <p className="mt-2 text-sm leading-6">
                      “Bên em có làm dịch vụ A, B, C. Anh cần thì em gửi thêm
                      thông tin.”
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#d6a63a] p-5 text-[#101828]">
                    <div className="text-xs font-bold uppercase tracking-widest opacity-70">
                      After
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6">
                      Hồ sơ có định vị, năng lực, dịch vụ, quy trình, case mẫu,
                      CTA liên hệ và link gửi khách chuyên nghiệp.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-sm text-white/70">
                    Profile PDF → Landing Page → AI Profile
                  </span>
                  <ChevronRight className="text-[#d6a63a]" />
                </div>
              </div>
            </div>
          </div>
        </ImageSection>

        <ImageSection
          id="cases"
          image={sectionImages.cases}
          className="py-20"
          contentClassName="mx-auto max-w-7xl px-5 md:px-8"
        >
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#d6a63a]">
              Before / After
            </div>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Không chỉ làm đẹp. Chúng tôi làm cho hồ sơ dễ hiểu và dễ tin hơn.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {cases.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white/92 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur"
              >
                <div className="mb-5 inline-flex rounded-full bg-[#f6f1e8] px-3 py-1 text-xs font-bold text-slate-600">
                  {item.type}
                </div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-red-500">
                      Trước
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.before}
                    </p>
                  </div>
                  <div className="border-t border-black/10 pt-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      Sau
                    </div>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-800">
                      {item.after}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ImageSection>

        <ImageSection
          id="services"
          image={sectionImages.services}
          className="py-20"
          contentClassName="mx-auto max-w-7xl px-5 md:px-8"
        >
          <div className="text-center">
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#d6a63a]">
              Dịch vụ
            </div>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              3 loại hồ sơ cần thiết nhất
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white/94 p-7 shadow-sm ring-1 ring-black/5 backdrop-blur"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#101828] text-[#d6a63a]">
                  <item.icon size={27} />
                </div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </ImageSection>

        <ImageSection
          id="pricing"
          image={sectionImages.pricing}
          dark
          className="py-20 text-white"
          contentClassName="mx-auto max-w-7xl px-5 md:px-8"
        >
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.28em] text-[#d6a63a]">
                Bảng giá
              </div>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl">
                Bắt đầu nhỏ, nâng cấp dần.
              </h2>
              <p className="mt-6 leading-8 text-white/75">
                Khách hàng có thể bắt đầu bằng PDF hoặc Landing Page. Khi cần tư
                vấn tự động, thu lead và chăm sóc khách, có thể nâng cấp lên AI
                Profile hoặc Automation.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-3xl p-6 shadow-xl ring-1 backdrop-blur ${
                    pkg.highlight
                      ? "bg-[#d6a63a] text-[#101828] ring-[#d6a63a]"
                      : "bg-white/10 ring-white/15"
                  }`}
                >
                  {pkg.badge && (
                    <div className="mb-4 inline-flex rounded-full bg-[#101828] px-3 py-1 text-xs font-bold text-white">
                      {pkg.badge}
                    </div>
                  )}
                  <h3 className="text-2xl font-black">{pkg.name}</h3>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-black">{pkg.price}</span>
                    {pkg.oldPrice && (
                      <span className="mb-1 text-sm line-through opacity-60">
                        {pkg.oldPrice}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 min-h-[72px] text-sm leading-6 opacity-85">
                    {pkg.desc}
                  </p>
                  <div className="mt-4 rounded-2xl bg-black/10 p-3 text-sm font-semibold">
                    {pkg.bestFor}
                  </div>
                  <div className="mt-5 space-y-2">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex gap-2 text-sm">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ImageSection>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-10 rounded-[2rem] bg-white p-8 ring-1 ring-black/5 md:grid-cols-[0.8fr_1.2fr] md:p-12">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.28em] text-[#d6a63a]">
                Quy trình
              </div>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                Làm nhanh nhưng vẫn có chiến lược.
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                Mỗi hồ sơ được xử lý theo mục tiêu sử dụng: bán hàng, hợp tác,
                tuyển dụng, gọi vốn hoặc xây dựng uy tín cá nhân.
              </p>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl bg-[#f6f1e8] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#101828] font-black text-white">
                    {index + 1}
                  </div>
                  <div className="pt-2 font-semibold">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="rounded-[2rem] bg-[#d6a63a] p-8 text-[#101828] md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/40 px-4 py-2 text-sm font-bold">
                  <MessageCircle size={18} /> Tư vấn miễn phí
                </div>
                <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
                  Bạn đang gửi gì khi khách hỏi “bên mình làm gì?”
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[#101828]/75">
                  Nếu hiện tại bạn chỉ gửi vài dòng tin nhắn rời rạc, đã đến lúc
                  có một bộ hồ sơ số chuyên nghiệp hơn.
                </p>
              </div>

              <a
                href={ZALO_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#101828] px-7 py-4 font-black text-white"
              >
                Liên hệ {PHONE_DISPLAY} <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 px-5 py-8 text-center text-sm text-slate-500">
        <div className="font-bold text-[#101828]">
          ProfileLAB — Dịch vụ thiết kế Profile Số
        </div>
        <div className="mt-2">Liên hệ: {PHONE_DISPLAY} — Mr Phước</div>
      </footer>

      <ChatWidget />
    </div>
  );
}