"use client";

import { Flame, Headphones, Timer, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const features = [
  {
    icon: Headphones,
    title: "Ambient Sounds",
    description: "Immerse yourself with rain, cafe, and fireplace sounds",
  },
  {
    icon: Timer,
    title: "Focus Timer",
    description: "Stay productive with Pomodoro technique",
  },
  {
    icon: Sparkles,
    title: "Cozy Aesthetics",
    description: "Beautiful animated room that feels like home",
  },
];

export default function Home() {
  const { data: session } = useSession();
  const ctaHref = session ? "/room" : "/login";

  return (
    <main className="min-h-screen bg-stone-950 text-stone-50 overflow-auto">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.08)_0%,_transparent_70%)]" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-8 h-8 text-amber-500" />
            <span className="text-lg font-semibold font-[family-name:var(--font-heading)] text-stone-300">
              Komorebi
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)] leading-tight text-balance">
            Your Cozy Digital{" "}
            <span className="text-amber-500">Sanctuary</span>
          </h1>

          <p className="text-lg text-stone-400 max-w-md">
            Focus, relax, and stay productive in your virtual room
          </p>

          <Link
            href={ctaHref}
            className="mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold transition-colors glow-amber"
          >
            Enter Your Room
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-6 py-24 bg-stone-950">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-stone-900/50 border border-stone-800/50 text-center"
                >
                  <div className="p-3 rounded-xl bg-amber-500/10">
                    <Icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="font-semibold font-[family-name:var(--font-heading)] text-stone-200">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-stone-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center border-t border-stone-800/50">
        <p className="text-xs text-stone-600">
          Made with ♥ by Komorebi &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
