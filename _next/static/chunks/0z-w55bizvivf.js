(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let t=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,t],89664)},8734,e=>{"use strict";let t=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,t],8734)},61939,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(89664),s=e.i(8734),i=e.i(46932),n=e.i(88653),l=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:o="tsx",filename:c,className:d}){let[x,u]=(0,r.useState)(!1),m=async()=>{await navigator.clipboard.writeText(e.trim()),u(!0),setTimeout(()=>u(!1),2e3)};return(0,t.jsxs)("div",{className:(0,l.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",d),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex gap-1.5",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),c&&(0,t.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:c})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:o}),(0,t.jsx)("button",{onClick:m,className:(0,l.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",x?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,t.jsx)(n.AnimatePresence,{mode:"wait",initial:!1,children:x?(0,t.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,t.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,t.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(61939),i=e.i(45060);let n={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},l={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:o}){let[c,d]=(0,r.useState)("react"),x=["react","html","swift",...e.macos?["macos"]:[]],u=e[c]??e.swift;return(0,t.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",o),children:[(0,t.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:x.map(e=>(0,t.jsxs)("button",{onClick:()=>d(e),className:(0,i.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",c===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[c===e&&(0,t.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),n[e]]},e))}),(0,t.jsx)(s.CodeBlock,{code:u.code,language:l[c],filename:u.filename,className:"rounded-none border-0"})]})}])},46017,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46513);let s=(0,e.i(56420).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var i=e.i(45060);e.s(["ComponentPreview",0,function({children:e,label:n,className:l,dark:o,grid:c}){let[d,x]=(0,r.useState)("desktop");return(0,t.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",l),children:[(0,t.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[n?(0,t.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:n}):(0,t.jsx)("span",{}),(0,t.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:a.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:r,ariaLabel:a})=>(0,t.jsx)("button",{onClick:()=>x(e),"aria-label":a,className:(0,i.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",d===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,t.jsx)(r,{className:"w-3.5 h-3.5"})},e))})]}),(0,t.jsx)("div",{className:(0,i.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===d?"p-6":"p-10",o?"bg-neutral-950":"bg-[rgb(var(--background))]",c&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,t.jsx)("div",{className:(0,i.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===d&&"max-w-[390px]"),children:e})})]})}],46017)},52953,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:i}){return(0,t.jsxs)("div",{className:(0,r.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",i),children:[s&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,t.jsx)("h1",{className:"mb-2.5",children:e}),(0,t.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},32610,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PropsTable",0,function({props:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("overflow-hidden rounded-xl border border-[rgb(var(--border))]",a),children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:["Prop","Type","Default","Description"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider",children:e},e))})}),(0,t.jsx)("tbody",{children:e.map((e,a)=>(0,t.jsxs)("tr",{className:(0,r.cn)("border-b border-[rgb(var(--border-subtle))] last:border-0",a%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"),children:[(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsxs)("code",{className:"text-[rgb(var(--accent))] font-mono text-[12px]",children:[e.name,e.required&&(0,t.jsx)("span",{className:"text-red-400 ml-0.5",children:"*"})]})}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)("code",{className:"text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded",children:e.type})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.default?(0,t.jsx)("code",{className:"font-mono text-[11px]",children:e.default}):(0,t.jsx)("span",{className:"opacity-40",children:"—"})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed",children:e.description})]},e.name))})]})})}])},24071,e=>{"use strict";let t=(0,e.i(56420).default)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);e.s(["ChevronLeft",0,t],24071)},83621,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(24071),s=e.i(67927),i=e.i(45060),n=e.i(52953),l=e.i(32610),o=e.i(46017),c=e.i(64147);let d=[{name:"items",type:"ReactNode[]",required:!0,description:"Array of items to display in carousel."},{name:"interval",type:"number",default:"5000",description:"Auto-advance interval in milliseconds. 0 disables auto-advance."},{name:"showControls",type:"boolean",default:"true",description:"Whether to show next/prev buttons."},{name:"showIndicators",type:"boolean",default:"true",description:"Whether to show dot indicators."},{name:"className",type:"string",description:"Additional CSS classes for carousel container."}],x={react:{filename:"Carousel.tsx",code:`"use client";

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

  useEffect(() => {
    if (interval <= 0 || isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, isPaused]);

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

      {showControls && items.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-[rgb(var(--text-primary))]" />
        </button>
      )}

      {showControls && items.length > 1 && (
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-[rgb(var(--text-primary))]" />
        </button>
      )}

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
`},html:{filename:"carousel.html",code:`<div class="carousel" data-carousel>
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
.carousel { position: relative; overflow: hidden; border-radius: 12px; }
.carousel-track { display: flex; transition: transform 0.5s ease-in-out; }
.carousel-slide { min-width: 100%; position: relative; }
.carousel-image { width: 100%; height: 400px; object-fit: cover; }
.carousel-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white; padding: 48px 24px 24px;
}
.carousel-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.8); border: none; padding: 12px;
  border-radius: 50%; cursor: pointer; font-size: 18px; transition: background 0.2s;
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
  background: rgba(255,255,255,0.5); border: none; cursor: pointer;
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
let current = 0;

slides.forEach((_, i) => {
  const btn = document.createElement('button');
  btn.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
  btn.setAttribute('aria-label', \`Go to slide \${i + 1}\`);
  btn.addEventListener('click', () => goTo(i));
  indicators.appendChild(btn);
});

const indicatorBtns = indicators.querySelectorAll('.carousel-indicator');

function updateSlides() {
  track.style.transform = \`translateX(-\${current * 100}%)\`;
  slides.forEach((s, i) => s.classList.toggle('active', i === current));
  indicatorBtns.forEach((b, i) => b.classList.toggle('active', i === current));
}

function goTo(index) { current = index; updateSlides(); }
function next() { current = (current + 1) % slides.length; updateSlides(); }
function prev() { current = (current - 1 + slides.length) % slides.length; updateSlides(); }

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
setInterval(next, 5000);
</script>`},swift:{filename:"ContentView.swift",code:`import SwiftUI

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

            HStack {
                ForEach(Array(items.enumerated()), id: \\.offset) { index, _ in
                    Circle()
                        .fill(index == currentIndex ? Color.white : Color.white.opacity(0.5))
                        .frame(width: 8, height: 8)
                }
            }
            .offset(y: 70)
        }
        .onAppear { startTimer() }
        .onDisappear { timer?.invalidate() }
    }

    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 5, repeats: true) { _ in
            withAnimation(.easeInOut(duration: 0.5)) {
                currentIndex = (currentIndex + 1) % items.count
            }
        }
    }
}

#Preview {
    CarouselView(items: [1, 2, 3, 4]) { item in
        ZStack {
            Color.blue.gradient
            Text("Slide \\(item)")
                .font(.largeTitle.bold())
                .foregroundColor(.white)
        }
        .ignoresSafeArea()
    }
}`}},u=[{type:"Hero banner",desc:"Full-width promotional sections at the top of pages"},{type:"Product showcase",desc:"Display multiple products or features in limited space"},{type:"Image gallery",desc:"Browse through a collection of images or screenshots"},{type:"Testimonials",desc:"Rotate customer quotes and success stories"}];function m({items:e}){let[n,l]=(0,r.useState)(0),[o,c]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{if(o)return;let t=setInterval(()=>{l(t=>(t+1)%e.length)},4e3);return()=>clearInterval(t)},[e.length,o]),(0,t.jsxs)("div",{className:"relative overflow-hidden rounded-xl",onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),children:[(0,t.jsx)("div",{className:"flex transition-transform duration-500 ease-in-out",style:{transform:`translateX(-${100*n}%)`},children:e.map(e=>(0,t.jsx)("div",{className:"w-full flex-shrink-0",children:(0,t.jsx)("div",{className:(0,i.cn)("h-64 flex items-center justify-center",e.color),children:(0,t.jsxs)("div",{className:"text-center text-white",children:[(0,t.jsx)("h3",{className:"text-2xl font-bold",children:e.title}),(0,t.jsx)("p",{className:"text-white/80",children:"Slide content here"})]})})},e.id))}),(0,t.jsx)("button",{onClick:()=>l(t=>(t-1+e.length)%e.length),className:"absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all","aria-label":"Previous slide",children:(0,t.jsx)(a.ChevronLeft,{className:"w-5 h-5 text-[rgb(var(--text-primary))]"})}),(0,t.jsx)("button",{onClick:()=>l(t=>(t+1)%e.length),className:"absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all","aria-label":"Next slide",children:(0,t.jsx)(s.ChevronRight,{className:"w-5 h-5 text-[rgb(var(--text-primary))]"})}),(0,t.jsx)("div",{className:"absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2",children:e.map((e,r)=>(0,t.jsx)("button",{onClick:()=>l(r),className:(0,i.cn)("w-2 h-2 rounded-full transition-all",r===n?"bg-white w-6":"bg-white/50 hover:bg-white/70"),"aria-label":`Go to slide ${r+1}`,"aria-current":r===n?"true":"false"},r))})]})}e.s(["default",0,function(){let[e]=(0,r.useState)([{id:1,title:"Mountain Adventure",color:"bg-gradient-to-r from-blue-500 to-indigo-600"},{id:2,title:"Ocean Exploration",color:"bg-gradient-to-r from-teal-400 to-cyan-500"},{id:3,title:"Forest Journey",color:"bg-gradient-to-r from-green-400 to-emerald-600"}]);return(0,t.jsxs)("div",{children:[(0,t.jsx)(n.PageHeader,{title:"Carousel",description:"Display content in a horizontally scrolling container with automatic or manual navigation. Supports autoplay, keyboard controls, and touch gestures for mobile."}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Basic carousel"}),(0,t.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"A simple content slider with automatic advancement and manual controls. Pauses on hover to allow reading."}),(0,t.jsx)(o.ComponentPreview,{children:(0,t.jsx)("div",{className:"w-full max-w-2xl mx-auto",children:(0,t.jsx)(m,{items:e})})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Use cases"}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-4",children:u.map(e=>(0,t.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]",children:[(0,t.jsx)("h3",{className:"text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1",children:e.type}),(0,t.jsx)("p",{className:"text-[12px] text-[rgb(var(--text-secondary))]",children:e.desc})]},e.type))})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6",children:"Anatomy"}),(0,t.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center",children:(0,t.jsxs)("svg",{viewBox:"0 0 400 200",width:"400",height:"200",className:"max-w-full",children:[(0,t.jsx)("rect",{x:"20",y:"20",width:"360",height:"160",rx:"12",fill:"rgb(var(--surface))",stroke:"rgb(var(--border))",strokeWidth:"1"}),(0,t.jsx)("rect",{x:"24",y:"24",width:"352",height:"152",rx:"8",fill:"rgb(var(--accent-subtle))"}),(0,t.jsx)("text",{x:"200",y:"90",textAnchor:"middle",fontSize:"16",fontWeight:"600",fill:"rgb(var(--accent))",children:"Slide Content"}),(0,t.jsx)("circle",{cx:"48",cy:"100",r:"20",fill:"white",fillOpacity:"0.8"}),(0,t.jsx)("text",{x:"42",y:"106",textAnchor:"middle",fontSize:"16",children:"‹"}),(0,t.jsx)("circle",{cx:"352",cy:"100",r:"20",fill:"white",fillOpacity:"0.8"}),(0,t.jsx)("text",{x:"346",y:"106",textAnchor:"middle",fontSize:"16",children:"›"}),(0,t.jsx)("g",{transform:"translate(200, 172)",children:[0,1,2].map(e=>(0,t.jsx)("circle",{cx:(e-1)*12,cy:"0",r:"4",fill:"white",fillOpacity:1===e?"1":"0.5"},e))}),(0,t.jsx)("text",{x:"68",y:"36",fontSize:"9",fill:"rgb(var(--text-tertiary))",children:"CONTROLS"}),(0,t.jsx)("text",{x:"200",y:"188",fontSize:"9",fill:"rgb(var(--text-tertiary))",textAnchor:"middle",children:"INDICATORS"})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Interaction states"}),(0,t.jsx)("div",{className:"overflow-hidden rounded-xl border border-[rgb(var(--border))]",children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["State","Appearance","Notes"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,t.jsx)("tbody",{children:[{state:"Idle",appearance:"Auto-advances after interval",notes:"Default state; timer running"},{state:"Hover",appearance:"Auto-advance paused",notes:"Allows reading content without rushing"},{state:"Manual navigation",appearance:"Slide transitions with animation",notes:"User clicks prev/next or indicators"},{state:"Keyboard active",appearance:"Arrow keys navigate slides",notes:"Focus must be within carousel region"}].map((e,r)=>(0,t.jsxs)("tr",{className:`border-b border-[rgb(var(--border-subtle))] last:border-0 ${r%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"}`,children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:e.state}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.appearance}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.notes})]},e.state))})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Usage guidelines"}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-4",children:[{type:"do",items:["Provide manual controls in addition to autoplay","Pause on hover to allow reading content","Include visible indicators showing current position","Make controls large enough for touch targets (44px minimum)"]},{type:"dont",items:["Don't use carousels for critical content (users may miss it)","Avoid auto-rotating too quickly (minimum 5s per slide)","Don't rely on autoplay alone — always provide manual navigation","Avoid excessive slides (3–5 is usually optimal)"]}].map(({type:e,items:r})=>(0,t.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:[(0,t.jsx)("div",{className:`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${"do"===e?"text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20":"text-red-500 bg-red-50 dark:bg-red-950/20"}`,children:"do"===e?"✓ Do":"✗ Don't"}),(0,t.jsx)("ul",{className:"p-4 space-y-2",children:r.map(r=>(0,t.jsxs)("li",{className:"text-[12px] text-[rgb(var(--text-secondary))] flex gap-2",children:[(0,t.jsx)("span",{className:"do"===e?"text-emerald-500":"text-red-400",children:"·"}),r]},r))})]},e))})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5",children:"Props"}),(0,t.jsx)(l.PropsTable,{props:d})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,t.jsx)(c.PlatformTabs,{code:x})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,t.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Carousel region must have aria-label describing its purpose.","Each slide must have aria-roledescription='slide' and aria-label indicating position.","Auto-rotation must pause on hover and focus for accessibility.","Controls must have clear aria-labels (e.g., 'Previous slide', 'Next slide').","Indicators must indicate current slide with aria-current='true'.","Provide a stop/play button for auto-advancing carousels when the timer is less than 5 seconds."].map(e=>(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}])}]);