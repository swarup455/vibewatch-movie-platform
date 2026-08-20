"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Info, Sparkles, Users, Zap, ShieldCheck, Clapperboard } from "lucide-react";
import { FaGithub as Github, FaXTwitter as Twitter, FaInstagram as Instagram, FaSpinner } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getMe } from "@/api/auth-client";

const trendingMovies = [
  { title: "Dune: Part Two", tag: "Sci-Fi", rating: "8.8", img: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&q=80" },
  { title: "Oppenheimer", tag: "Drama", rating: "8.9", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80" },
  { title: "The Batman", tag: "Action", rating: "8.4", img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80" },
  { title: "Interstellar", tag: "Sci-Fi", rating: "9.0", img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&q=80" },
  { title: "Parasite", tag: "Thriller", rating: "8.6", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80" },
  { title: "Whiplash", tag: "Drama", rating: "8.5", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80" },
];

const features = [
  {
    icon: Sparkles,
    title: "AI Recommendations",
    desc: "Tell us your mood, we'll find the perfect watch — no endless scrolling.",
  },
  {
    icon: Users,
    title: "Watch Together",
    desc: "Sync watchlists and get picks that work for the whole group.",
  },
  {
    icon: Zap,
    title: "Instant Discovery",
    desc: "Real-time suggestions across every major streaming platform.",
  },
  {
    icon: ShieldCheck,
    title: "No Spoilers, Ever",
    desc: "Smart filtering keeps plot details out of your recommendations.",
  },
];

const footerLinks = {
  Product: ["Features", "Pricing", "Discover", "Collections"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

export default function Home() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getMe().then((u) => {
      setUser(u);
      setChecked(true);
    });
  }, []);

  if (!checked) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <FaSpinner className="animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 flex justify-center px-4 pt-4">
        <div className="flex h-14 w-full max-w-6xl items-center justify-between rounded-2xl border border-zinc-200/60 bg-white/60 px-5 backdrop-blur-md dark:border-zinc-800/60 dark:bg-white/5">
          <Link href="/" className="flex items-center gap-2 group">
            <Clapperboard
              size={19}
              className="text-zinc-900 transition-transform duration-200 group-hover:scale-110 dark:text-white"
            />
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
              VibeWatch
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {user ?
              (
                <Link href="/discover">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link href="/auth"><Button variant="ghost">Sign in</Button></Link>
                  <Link href="/auth"><Button>Get started</Button></Link>
                </div>
              )
            }
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-20 text-center sm:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-zinc-300/40 blur-3xl dark:bg-zinc-800/40" />
        </div>

        <Badge
          variant="outline"
          className="mb-6 rounded-full border-zinc-300/60 bg-white/50 px-3 py-1 text-xs font-medium backdrop-blur-md dark:border-zinc-800 dark:bg-white/5"
        >
          <Sparkles size={12} className="mr-1.5" />
          Powered by AI
        </Badge>

        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
          Find your next favorite watch
        </h1>
        <p className="mt-5 max-w-lg text-balance text-base text-zinc-500 sm:text-lg dark:text-zinc-400">
          Describe a vibe, a mood, or a memory — VibeWatch matches you with
          the perfect movie or show in seconds.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <Button size="lg" className="gap-2 rounded-full px-6" asChild>
            <Link href="/auth">
              <Play size={16} /> Get Started
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 rounded-full border-zinc-300 px-6 backdrop-blur-md dark:border-zinc-800"
          >
            <Info size={16} /> Learn More
          </Button>
        </div>
      </section>

      {/* TRENDING CAROUSEL */}
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
                Trending this week
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Handpicked by our AI, loved by everyone.
              </p>
            </div>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[
              Autoplay({
                delay: 1000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {trendingMovies.map((movie) => (
                <CarouselItem
                  key={movie.title}
                  className="basis-1/2 pl-4 sm:basis-1/3 lg:basis-1/4"
                >
                  <Card className="group overflow-hidden rounded-2xl border-zinc-200/60 bg-white/60 p-0 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/60 dark:bg-white/5 dark:hover:border-zinc-700">
                    <CardContent className="p-0">
                      <div className="relative aspect-[2/3] w-full overflow-hidden">
                        <Image
                          src={movie.img}
                          alt={movie.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                        <Badge className="absolute right-2 top-2 gap-1 rounded-full border-0 bg-black/50 text-[11px] backdrop-blur-md">
                          ★ {movie.rating}
                        </Badge>
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <p className="truncate text-sm font-semibold text-white">
                            {movie.title}
                          </p>
                          <p className="text-xs text-zinc-300">{movie.tag}</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg">
                            <Play size={15} className="ml-0.5 fill-black text-black" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 rounded-full border-zinc-300 backdrop-blur-md dark:border-zinc-800" />
            <CarouselNext className="right-0 rounded-full border-zinc-300 backdrop-blur-md dark:border-zinc-800" />
          </Carousel>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
              Why VibeWatch
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              A smarter way to decide what to watch tonight.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="rounded-2xl border-zinc-200/60 bg-white/50 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-800/60 dark:bg-white/5"
              >
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900/5 dark:bg-white/10">
                    <feature.icon size={17} className="text-zinc-900 dark:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {feature.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 pt-8 text-center">
        <Card className="mx-auto max-w-3xl rounded-3xl border-zinc-200/60 bg-white/50 p-10 backdrop-blur-md dark:border-zinc-800/60 dark:bg-white/5">
          <CardContent className="flex flex-col items-center gap-4 p-0">
            <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Ready to stop scrolling?
            </h3>
            <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
              Join VibeWatch and let AI do the deciding.
            </p>
            <Button size="lg" className="mt-2 rounded-full px-8" asChild>
              <Link href="/auth">Get Started Free</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200/60 px-6 py-12 sm:px-10 lg:px-16 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <Clapperboard size={18} className="text-zinc-900 dark:text-white" />
                <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                  VibeWatch
                </span>
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                AI-powered picks for whatever you're in the mood for.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Link href="#" className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white">
                  <Twitter size={16} />
                </Link>
                <Link href="#" className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white">
                  <Instagram size={16} />
                </Link>
                <Link href="#" className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white">
                  <Github size={16} />
                </Link>
              </div>
            </div>

            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                  {heading}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-200/60 pt-6 text-xs text-zinc-500 sm:flex-row dark:border-zinc-800/60 dark:text-zinc-400">
            <p>© {new Date().getFullYear()} VibeWatch. All rights reserved.</p>
            <p>Made for movie nights everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}