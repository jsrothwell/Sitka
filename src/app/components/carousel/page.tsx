import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PropsTable } from "@/components/docs/PropsTable";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Carousel" };

const CAROUSEL_PROPS = [
  { name: "items", type: "ReactNode[]", required: true, description: "Array of items to display in carousel." },
  { name: "interval", type: "number", default: "5000", description: "Auto-advance interval in milliseconds. 0 disables auto-advance." },
  { name: "showControls", type: "boolean", default: "true", description: "Whether to show next/prev buttons." },
  { name: "showIndicators", type: "boolean", default: "true", description: "Whether to show dot indicators." },
  { name: "className", type: "string", description: "Additional CSS classes for carousel container." },
];

const CODE = {
  react: {
    filename: "Carousel.tsx",
    code: `"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type CarouselProps = {
  items: React.ReactNode[];
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
};

export function Carousel({
  items,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    if (interval <= 0 || isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Carousel"
    >
      {/* Slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: \`translateX(-\${currentIndex * 100}%)\` }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={\`\${i + 1} of \${items.length}\`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Previous button */}
      {showControls && items.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-[rgb(var(--text-primary))]" />
        </button>
      )}

      {/* Next button */}
      {showControls && items.length > 1 && (
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-[rgb(var(--text-primary))]" />
        </button>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === currentIndex
                  ? "bg-white w-6" 
                  : "bg-white/50 hover:bg-white/70"
              )}
              aria-label={\`Go to slide \${i + 1}\`}
              aria-current={i === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
`,
  },
  html: {
    filename: "carousel.html",
    code: `<div class="carousel" data-carousel>
  <div class="carousel-track">
    <div class="carousel-slide active">
      <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" class="carousel-image">
      <div class="carousel-caption">
        <h3>Beautiful Landscapes</h3>
        <p>Discover the world's most stunning natural wonders</p>
      </div>
    </div>
    <div class="carousel-slide">
      <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" class="carousel-image">
      <div class="carousel-caption">
        <h3>Urban Architecture</h3>
        <p>Modern design meets timeless elegance</p>
      </div>
    </div>
    <div class="carousel-slide">
      <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" class="carousel-image">
      <div class="carousel-caption">
        <h3>Coastal Retreats</h3>
        <p>Where the sea meets serenity</p>
      </div>
    </div>
  </div>
  
  <button class="carousel-btn carousel-prev" aria-label="Previous slide">‹</button>
  <button class="carousel-btn carousel-next" aria-label="Next slide">›</button>
  
  <div class="carousel-indicators"></div>
</div>

<style>
.carousel {
  position: relative; overflow: hidden; border-radius: 12px;
}
.carousel-track {
  display: flex; transition: transform 0.5s ease-in-out;
}
.carousel-slide {
  min-width: 100%; position: relative;
}
.carousel-image {
  width: 100%; height: 400px; object-fit: cover;
}
.carousel-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white; padding: 48px 24px 24px;
}
.carousel-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: white/80; border: none; padding: 12px;
  border-radius: 50%; cursor: pointer; font-size: 18px;
  transition: background 0.2s;
}
.carousel-btn:hover { background: white; }
.carousel-prev { left: 12px; }
.carousel-next { right: 12px; }
.carousel-indicators {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 8px;
}
.carousel-indicator {
  width: 8px; height: 8px; border-radius: 50%;
  background: white/50; border: none; cursor: pointer;
}
.carousel-indicator.active { background: white; width: 24px; border-radius: 4px; }
</style>

<script>
const carousel = document.querySelector('[data-carousel]');
const track = carousel.querySelector('.carousel-track');
const slides = track.querySelectorAll('.carousel-slide');
const indicators = carousel.querySelector('.carousel-indicators');
const prevBtn = carousel.querySelector('.carousel-prev');
const nextBtn = carousel.querySelector('.carousel-next');

// Create indicators
slides.forEach((_, i) => {
  const btn = document.createElement('button');
  btn.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
  btn.setAttribute('aria-label', \`Go to slide \${i + 1}\`);
  btn.addEventListener('click', () => goTo(i));
  indicators.appendChild(btn);
});

const indicatorBtns = indicators.querySelectorAll('.carousel-indicator');
let current = 0;

function updateSlides() {
  track.style.transform = \`translateX(-\${current * 100}%)\`;
  slides.forEach((s, i) => s.classList.toggle('active', i === current));
  indicatorBtns.forEach((b, i) => b.classList.toggle('active', i === current));
}

function goTo(index) {
  current = index;
  updateSlides();
}

function next() {
  current = (current + 1) % slides.length;
  updateSlides();
}

function prev() {
  current = (current - 1 + slides.length) % slides.length;
  updateSlides();
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

// Auto-advance
setInterval(next, 5000);
</script>`,
  },
  swift: {
    filename: "ContentView.swift",
    code: `import SwiftUI

struct CarouselView<Item: Identifiable, Content: View>: View {
    let items: [Item]
    let content: (Item) -> Content
    @State private var currentIndex = 0
    @State private var timer: Timer?
    
    var body: some View {
        ZStack {
            TabView(selection: $currentIndex) {
                ForEach(items) { item in
                    content(item)
                        .tag(items.firstIndex(where: { $0.id == item.id }) ?? 0)
                }
            }
            .tabViewStyle(.page(indexDisplayMode: .never))
            
            // Gradient overlay at bottom for text readability
            LinearGradient(
                gradient: Gradient(colors: [.clear, .black.opacity(0.3)]),
                startPoint: .center,
                endPoint: .bottom
            )
            .frame(height: 60)
            .offset(y: 60)
            
            // Page indicators
            HStack {
                ForEach(Array(items.enumerated()), id: \.offset) { index, _ in
                    Circle()
                        .fill(index == currentIndex ? Color.white : Color.white.opacity(0.5))
                        .frame(width: 8, height: 8)
                }
            }
            .offset(y: 70)
        }
        .onAppear {
            startTimer()
        }
        .onDisappear {
            timer?.invalidate()
        }
    }
    
    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 5, repeats: true) { _ in
            withAnimation(.easeInOut(duration: 0.5)) {
                currentIndex = (currentIndex + 1) % items.count
            }
        }
    }
}

// Example usage
struct ProductCarousel: View {
    let products = [
        ("Mountains", "#4A90D9"),
        ("Ocean", "#17B8A3"),
        ("Forest", "#3DA852"),
        ("Desert", "#E2A03A"),
    ]
    
    var body: some View {
        CarouselView(items: products.enumerated().map { index, item in
            (id: index, item: item)
        }) { item in
            ZStack {
                Color(hex: item.item.1)
                    .ignoresSafeArea()
                VStack {
                    Text(item.item.0)
                        .font(.largeTitle.bold())
                        .foregroundColor(.white)
                    Text("Beautiful \(item.item.0)")
                        .font(.title3)
                        .foregroundColor(.white.opacity(0.8))
                }
            }
        }
    }
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 1, 1, 1)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

#Preview {
    CarouselView(items: [1, 2, 3, 4]) { item in
        ZStack {
            Color.blue.gradient
            Text("Slide \(item)")
                .font(.largeTitle.bold())
                .foregroundColor(.white)
        }
        .ignoresSafeArea()
    }
}`,
  },
};

const USE_CASES = [
  { type: "Hero banner", desc: "Full-width promotional sections at the top of pages" },
  { type: "Product showcase", desc: "Display multiple products or features in limited space" },
  { type: "Image gallery", desc: "Browse through a collection of images or screenshots" },
  { type: "Testimonials", desc: "Rotate customer quotes and success stories" },
];

export default function CarouselPage() {
  const [items] = useState([
    { id: 1, title: "Mountain Adventure", color: "bg-gradient-to-r from-blue-500 to-indigo-600" },
    { id: 2, title: "Ocean Exploration", color: "bg-gradient-to-r from-teal-400 to-cyan-500" },
    { id: 3, title: "Forest Journey", color: "bg-gradient-to-r from-green-400 to-emerald-600" },
  ]);

  return (
    <div>
      <PageHeader
        title="Carousel"
        description="Display content in a horizontally scrolling container with automatic or manual navigation. Supports autoplay, keyboard controls, and touch gestures for mobile."
      />

      {/* Basic carousel */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Basic carousel</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          A simple content slider with automatic advancement and manual controls. Pauses on hover to allow reading.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-2xl mx-auto">
            <CarouselDemo items={items} />
          </div>
        </ComponentPreview>
      </section>

      {/* Use cases */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Use cases</h2>
        <div className="grid grid-cols-2 gap-4">
          {USE_CASES.map((ex) => (
            <div key={ex.type} className="rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1">{ex.type}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))]">{ex.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center">
          <svg viewBox="0 0 400 200" width="400" height="200" className="max-w-full">
            {/* Carousel container */}
            <rect x="20" y="20" width="360" height="160" rx="12" fill="rgb(var(--surface))" stroke="rgb(var(--border))" strokeWidth="1" />
            {/* Current slide */}
            <rect x="24" y="24" width="352" height="152" rx="8" fill="rgb(var(--accent-subtle))" />
            <text x="200" y="90" textAnchor="middle" fontSize="16" fontWeight="600" fill="rgb(var(--accent))">Slide Content</text>
            {/* Prev button */}
            <circle cx="48" cy="100" r="20" fill="white" fillOpacity="0.8" />
            <text x="42" y="106" textAnchor="middle" fontSize="16">‹</text>
            {/* Next button */}
            <circle cx="352" cy="100" r="20" fill="white" fillOpacity="0.8" />
            <text x="346" y="106" textAnchor="middle" fontSize="16">›</text>
            {/* Indicators */}
            <g transform="translate(200, 172)">
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={(i - 1) * 12} cy="0" r="4" fill={i === 1 ? "white" : "white"} fillOpacity={i === 1 ? "1" : "0.5"} />
              ))}
            </g>
            {/* Labels */}
            <text x="68" y="36" fontSize="9" fill="rgb(var(--text-tertiary))">CONTROLS</text>
            <text x="200" y="188" fontSize="9" fill="rgb(var(--text-tertiary))" textAnchor="middle">INDICATORS</text>
          </svg>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Interaction states</h2>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["State", "Appearance", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { state: "Idle", appearance: "Auto-advances after interval", notes: "Default state; timer running" },
                { state: "Hover", appearance: "Auto-advance paused", notes: "Allows reading content without rushing" },
                { state: "Manual navigation", appearance: "Slide transitions with animation", notes: "User clicks prev/next or indicators" },
                { state: "Keyboard active", appearance: "Arrow keys navigate slides", notes: "Focus must be within carousel region" },
              ].map((s, i) => (
                <tr key={s.state} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{s.state}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{s.appearance}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage guidelines</h2>
        <div className="grid grid-cols-2 gap-4">
          {[n            { type: "do", items: ["Provide manual controls in addition to autoplay", "Pause on hover to allow reading content", "Include visible indicators showing current position", "Make controls large enough for touch targets (44px minimum)"] },
            { type: "dont", items: ["Don't use carousels for critical content (users may miss it)", "Avoid auto-rotating too quickly (minimum 5s per slide)", "Don't rely on autoplay alone — always provide manual navigation", "Avoid excessive slides (3-5 is usually optimal)"] },
          ].map(({ type, items }) => (
            <div key={type} className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
              <div className={`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${
                type === "do" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" : "text-red-500 bg-red-50 dark:bg-red-950/20"
              }`}>
                {type === "do" ? "✓ Do" : "✗ Don't"}
              </div>
              <ul className="p-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-[12px] text-[rgb(var(--text-secondary))] flex gap-2">
                    <span className={type === "do" ? "text-emerald-500" : "text-red-400"}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={CAROUSEL_PROPS} />
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[n            "Carousel region must have aria-label describing its purpose.",
            "Each slide must have aria-roledescription='slide' and aria-label indicating position.",
            "Auto-rotation must pause on hover and focus for accessibility.",
            "Controls must have clear aria-labels (e.g., 'Previous slide', 'Next slide').",
            "Indicators must indicate current slide with aria-current='true'.",
            "Provide a stop/play button for auto-advancing carousels when the timer is less than 5 seconds.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function CarouselDemo({ items }: { items: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: \`translateX(-\${currentIndex * 100}%)\` }}
      >
        {items.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0">
            <div className={cn("h-64 flex items-center justify-center", item.color)}>
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-white/80">Slide content here</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-[rgb(var(--text-primary))]" />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-[rgb(var(--text-primary))]" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={\`Go to slide \${i + 1}\`}
            aria-current={i === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}
