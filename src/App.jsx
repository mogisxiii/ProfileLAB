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
  mockup: "/ProfileLAB_mau.png",
  process: "/ProfileLAB_quytrinh.png",
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

function ImageSection({
  id,
  image,
  children,
  className = "",
  contentClassName = "mx-auto max-w-7xl px-5 md:px-8",
  imageSide = "right",
}) {
  const isLeft = imageSide === "left";

  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-[#071426] text-white ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-22"
        style={{ backgroundImage: `url('${image}')` }}
      />

      <div className="absolute inset-0 bg-[#071426]/78" />

      <div
        className={`absolute inset-0 ${
          isLeft
            ? "bg-gradient-to-r from-transparent via-[#071426]/84 to-[#071426]/98"
            : "bg-gradient-to-r from-[#071426]/98 via-[#071426]/84 to-transparent"
        }`}
      />

      <div
        className={`absolute inset-0 ${
          isLeft
            ? "bg-[radial-gradient(circle_at_18%_35%,rgba(255,204,75,0.24),transparent_34%)]"
            : "bg-[radial-gradient(circle_at_82%_35%,rgba(255,204,75,0.24),transparent_34%)]"
        }`}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f5c542]/50 to-transparent" />

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
    () => ["Bảng giá bao nhiêu?", "Landing Page là gì?", "Nên chọn gói nào?", "Bao lâu hoàn thành?"],
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
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffcc4b] to-[#f0a500] px-5 py-4 text-[#071426] shadow-2xl shadow-yellow-500/20 ring-1 ring-yellow-200/40"
      >
        <Bot size={20} />
        <span className="hidden text-sm font-black sm:inline">Hỏi nhanh</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-32px)] max-w-[380px] overflow-hidden rounded-3xl bg-[#081528] shadow-2xl ring-1 ring-yellow-300/20">
      <div className="flex items-center justify-between bg-[#071426] px-4 py-3 text-white">
        <div>
          <div className="font-bold">ProfileLAB Assistant</div>
          <div className="text-xs text-yellow-200/70">FAQ tư vấn nhanh</div>
        </div>
        <button onClick={() => setOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <div className="max-h-[340px] space-y-3 overflow-y-auto bg-[#0b1b33] p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
              msg.role === "bot"
                ? "mr-8 bg-white/10 text-slate-100 ring-1 ring-white/10"
                : "ml-8 bg-[#ffcc4b] font-medium text-[#071426]"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/10 bg-[#081528] p-3">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-200 hover:bg-[#ffcc4b] hover:text-[#071426]"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="flex gap-2 border-t border-white/10 bg-[#081528] p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập câu hỏi..."
          className="min-w-0 flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
        />
        <button
          onClick={() => sendMessage()}
          className="rounded-xl bg-[#ffcc4b] px-4 text-[#071426]"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#071426] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071426]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffcc4b] to-[#f0a500] text-[#071426] shadow-lg shadow-yellow-500/20">
              <Globe2 size={22} />
            </div>
            <div>
              <div className="text-xl font-black">
                Profile<span className="text-[#ffcc4b]">LAB</span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#ffcc4b]/80">
                Digital Profile Studio
              </div>
            </div>
          </div>

          <a
            href={ZALO_LINK}
            className="hidden rounded-full border border-[#ffcc4b]/40 bg-[#ffcc4b] px-5 py-3 text-sm font-black text-[#071426] md:inline-flex"
          >
            Liên hệ Mr Phước
          </a>
        </div>
      </header>

      <main>
        <ImageSection
          image={sectionImages.hero}
          imageSide="left"
          className="pb-16 pt-12 md:pb-20 md:pt-20"
          contentClassName="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffcc4b]/40 bg-[#ffcc4b]/10 px-4 py-2 text-sm font-semibold text-[#ffdf7a] shadow-sm">
              <Sparkles size={16} />
              Khuyến mãi ra mắt: Landing Page chỉ 999K
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.05em] md:text-7xl">
              Hồ sơ số đẹp giúp bạn{" "}
              <span className="bg-gradient-to-r from-[#ffdf7a] via-[#ffcc4b] to-[#f0a500] bg-clip-text text-transparent">
                tăng uy tín
              </span>{" "}
              và chốt cơ hội nhanh hơn.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              ProfileLAB giúp cá nhân, doanh nghiệp và dự án gọi vốn xây dựng hồ sơ số chuyên nghiệp — từ PDF,
              landing page đến chatbot FAQ — để gửi khách, đối tác và nhà đầu tư.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={ZALO_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ffcc4b] to-[#f0a500] px-6 py-4 font-black text-[#071426] shadow-xl shadow-yellow-500/20"
              >
                Tư vấn qua Zalo <ArrowRight size={19} />
              </a>

              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur hover:bg-white/15"
              >
                Xem quy trình
              </a>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              Gửi thông tin trước — xem hướng tư vấn — phù hợp mới làm.
            </p>

            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["72h", "bàn giao nhanh"],
                ["999K", "landing page"],
                ["3 nhóm", "cá nhân / doanh nghiệp / gọi vốn"],
              ].map(([num, label]) => (
                <div
                  key={num}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-sm backdrop-blur"
                >
                  <div className="text-2xl font-black text-[#ffcc4b]">{num}</div>
                  <div className="mt-1 text-xs text-slate-300">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,rgba(255,204,75,0.3),transparent_58%)] blur-2xl" />

            <div className="relative rounded-[2rem] border border-[#ffcc4b]/30 bg-[#081528]/88 p-3 shadow-2xl shadow-black/50 backdrop-blur">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#071426]">
                <img
                  src={sectionImages.mockup}
                  alt="Mẫu đầu ra ProfileLAB"
                  className="w-full object-cover"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Profile cá nhân", "Profile doanh nghiệp", "Pitch deck gọi vốn"].map((text) => (
                  <span
                    key={text}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                  >
                    {text}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#ffcc4b]/20 bg-[#ffcc4b]/10 px-4 py-3">
                <span className="text-sm font-semibold text-[#ffdf7a]">
                  Khách xem trước chất lượng đầu ra
                </span>
                <ArrowRight className="text-[#ffcc4b]" size={18} />
              </div>
            </div>
          </div>
        </ImageSection>

        <section className="border-y border-white/10 bg-[#081528] px-5 py-8 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
            {[
              ["01", "Báo giá rõ trước khi làm"],
              ["02", "Có duyệt nội dung/mẫu"],
              ["03", "Có chỉnh sửa theo phạm vi gói"],
              ["04", "Bàn giao file + link sử dụng"],
            ].map(([num, text]) => (
              <div
                key={num}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffcc4b] text-sm font-black text-[#071426]">
                  {num}
                </div>
                <div className="text-sm font-bold text-slate-100">{text}</div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="process"
          className="relative overflow-hidden bg-[#071426] px-5 py-20 text-white md:px-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,204,75,0.18),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.28em] text-[#ffcc4b]">
                  Quy trình triển khai
                </div>

                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl">
                  Từ thông tin rời rạc thành hồ sơ có thể gửi khách ngay.
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  ProfileLAB không chỉ dàn trang. Chúng tôi biên tập lại thông tin, sắp xếp thông điệp,
                  thiết kế đầu ra và giúp bạn có một bộ hồ sơ số dễ gửi, dễ hiểu và dễ tạo niềm tin.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Khách gửi thông tin thô",
                    "ProfileLAB biên tập chiến lược",
                    "Thiết kế hồ sơ số chuyên nghiệp",
                    "Gửi khách và tạo tương tác",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold backdrop-blur"
                    >
                      <CheckCircle2 className="mt-0.5 shrink-0 text-[#ffcc4b]" size={18} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#ffcc4b]/25 bg-white/10 p-3 shadow-2xl shadow-black/40 backdrop-blur">
                <img
                  src={sectionImages.process}
                  alt="Quy trình 4 bước ProfileLAB"
                  className="w-full rounded-[1.35rem] border border-white/10 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <ImageSection id="cases" image={sectionImages.cases} imageSide="right" className="py-20">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#ffcc4b]">
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
                className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur"
              >
                <div className="mb-5 inline-flex rounded-full bg-[#ffcc4b] px-3 py-1 text-xs font-bold text-[#071426]">
                  {item.type}
                </div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-red-300">
                      Trước
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {item.before}
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Sau
                    </div>
                    <p className="mt-2 text-sm font-medium leading-6 text-white">
                      {item.after}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ImageSection>

        <ImageSection id="services" image={sectionImages.services} imageSide="left" className="py-20">
          <div className="text-center">
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#ffcc4b]">
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
                className="rounded-3xl border border-white/10 bg-white/10 p-7 shadow-xl backdrop-blur"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffcc4b] text-[#071426]">
                  <item.icon size={27} />
                </div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-[#ffcc4b]/25 bg-white/10 p-6 backdrop-blur">
            <div className="text-sm font-black uppercase tracking-[0.22em] text-[#ffcc4b]">
              Khách nhận được gì?
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                "File PDF/ảnh preview để gửi Zalo",
                "Link landing page nếu chọn gói danh thiếp số",
                "Nội dung giới thiệu đã được biên tập lại",
                "CTA liên hệ rõ ràng",
                "Bố cục trình bày chuyên nghiệp",
                "Hướng dẫn sử dụng sau bàn giao",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-[#071426]/70 p-4 text-sm">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#ffcc4b]" size={17} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </ImageSection>

        <section className="bg-[#071426] px-5 py-20 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
  <div>
    <div className="text-sm font-black uppercase tracking-[0.28em] text-[#ffcc4b]">
      Niềm tin trước khi đặt làm
    </div>

    <blockquote className="mt-4 border-l-4 border-[#ffcc4b] bg-gradient-to-r from-white/95 via-[#ffdf7a] to-white/80 bg-clip-text pl-6 text-4xl font-medium italic leading-tight tracking-[-0.04em] text-transparent md:text-6xl">
      “Khách không cần nghe lời hứa. Khách cần thấy quy trình rõ ràng.”
    </blockquote>

    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
      Vì vậy ProfileLAB luôn trình bày rõ phạm vi công việc, đầu ra, quy trình và cách bàn giao trước khi khách quyết định đặt làm.
    </p>
  </div>

  <div className="rounded-[2rem] border border-[#ffcc4b]/25 bg-white/10 p-4 shadow-2xl shadow-black/30 backdrop-blur">
    <div className="rounded-[1.5rem] border border-white/10 bg-[#081528] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.22em] text-[#ffcc4b]">
            Trust Checklist
          </div>
          <div className="mt-1 text-2xl font-black">
            Trước khi khách chốt
          </div>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffcc4b] text-2xl font-black text-[#071426]">
          ✓
        </div>
      </div>

      <div className="space-y-3">
        {[
          "Có mẫu đầu ra để xem trước",
          "Có quy trình triển khai rõ ràng",
          "Có báo giá và phạm vi công việc",
          "Có kênh liên hệ trực tiếp Mr Phước",
        ].map((item) => (
          <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-semibold text-slate-100">
            <CheckCircle2 className="mt-0.5 shrink-0 text-[#ffcc4b]" size={18} />
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

            <div className="mt-12 grid gap-4 md:grid-cols-4">
              {[
                ["Minh bạch", "Giá, phạm vi công việc và thời gian được nói rõ trước khi bắt đầu."],
                ["Có mẫu duyệt", "Khách được xem hướng thiết kế/nội dung trước khi hoàn thiện."],
                ["Có chỉnh sửa", "Hỗ trợ chỉnh sửa theo phạm vi gói, tránh làm xong rồi bỏ mặc."],
                ["Dễ liên hệ", "Có SĐT/Zalo Mr Phước, không ẩn danh, không form vô chủ."],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur"
                >
                  <div className="mb-4 h-2 w-10 rounded-full bg-[#ffcc4b]" />
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ImageSection id="pricing" image={sectionImages.pricing} imageSide="right" className="py-20">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.28em] text-[#ffcc4b]">
                Bảng giá
              </div>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl">
                Bắt đầu nhỏ, nâng cấp dần.
              </h2>
              <p className="mt-6 leading-8 text-slate-300">
                Khách hàng có thể bắt đầu bằng PDF hoặc Landing Page. Khi cần tư vấn tự động, thu lead và chăm sóc khách,
                có thể nâng cấp lên AI Profile hoặc Automation.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-3xl p-6 shadow-xl ring-1 backdrop-blur ${
                    pkg.highlight
                      ? "bg-gradient-to-br from-[#ffcc4b] to-[#f0a500] text-[#071426] ring-[#ffcc4b]"
                      : "bg-white/10 text-white ring-white/15"
                  }`}
                >
                  {pkg.badge && (
                    <div className="mb-4 inline-flex rounded-full bg-[#071426] px-3 py-1 text-xs font-bold text-white">
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

        <section className="bg-[#071426] px-5 pb-20 text-white md:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-br from-[#ffcc4b] to-[#f0a500] p-8 text-[#071426] shadow-2xl shadow-yellow-500/20 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/35 px-4 py-2 text-sm font-bold">
                  <MessageCircle size={18} /> Tư vấn miễn phí
                </div>
                <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
                  Bạn đang gửi gì khi khách hỏi “bên mình làm gì?”
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[#071426]/75">
                  Nếu hiện tại bạn chỉ gửi vài dòng tin nhắn rời rạc, đã đến lúc có một bộ hồ sơ số chuyên nghiệp hơn.
                </p>
              </div>

              <a
                href={ZALO_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#071426] px-7 py-4 font-black text-white"
              >
                Liên hệ {PHONE_DISPLAY} <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#071426] px-5 py-8 text-center text-sm text-slate-400">
        <div className="font-bold text-white">
          ProfileLAB — Dịch vụ thiết kế Profile Số
        </div>
        <div className="mt-2">Liên hệ: {PHONE_DISPLAY} — Mr Phước</div>
      </footer>

      <ChatWidget />
    </div>
  );
}