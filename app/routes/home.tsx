import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#f0f4ff] via-[#e3e6fa] to-[#fa7185cc]">
      {/* Animated SVG background blob */}
      <svg className="absolute top-[-120px] left-[-120px] w-[600px] h-[600px] opacity-60 z-0 animate-blob-move" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f)"><ellipse cx="300" cy="300" rx="300" ry="300" fill="#b3d1ff"/></g>
        <defs><filter id="filter0_f" x="0" y="0" width="600" height="600" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="80"/></filter></defs>
      </svg>
      <Navbar />
      <section className="main-section relative z-10">
        {/* HERO SECTION */}
        <div className="flex flex-col items-center justify-center gap-8 py-20">
          <div className="backdrop-blur-xl bg-blue-200/40 border border-blue-100/40 rounded-3xl shadow-2xl px-10 py-14 flex flex-col items-center gap-6 animate-in fade-in duration-1000 max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-extrabold text-gradient drop-shadow-lg text-center leading-tight animate-in slide-in-from-top duration-1000 transition-transform hover:scale-105 hover:-translate-y-1 cursor-pointer">
              Level Up Your Job Hunt
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 text-center max-w-xl animate-in fade-in duration-1000 delay-200 transition-transform hover:scale-105 hover:-translate-y-1 cursor-pointer">
              AI-powered resume feedback, beautiful analytics, and effortless tracking for your applications.
            </p>
            <Link to="/upload" className="primary-button w-fit text-2xl font-bold px-10 py-4 mt-4 shadow-xl hover:shadow-2xl animate-in fade-in duration-1000 delay-300 transition-transform hover:scale-105 hover:-translate-y-1">
              Get Started
            </Link>
          </div>
        </div>
        {/* RESUME SECTION */}
        <div className="page-heading py-8 animate-in fade-in duration-1000 delay-200">
          <h2 className="text-3xl md:text-4xl font-semibold text-gradient text-center">Your Resumes & Feedback</h2>
          {!loadingResumes && resumes?.length === 0 ? (
            <h3 className="text-xl text-gray-600 mt-2">No resumes found. Upload your first resume to get feedback.</h3>
          ) : (
            <h3 className="text-xl text-gray-600 mt-2">Review your submissions and check AI-powered feedback.</h3>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center animate-in fade-in duration-1000">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section animate-in slide-in-from-bottom duration-1000 delay-300">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4 animate-in fade-in duration-1000 delay-500">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
