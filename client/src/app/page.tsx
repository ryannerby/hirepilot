'use client';

import { useSession } from 'next-auth/react';
import AuthButtons from '../../components/AuthButtons.jsx';
import JobForm from '../../components/JobForm';
import { useState } from 'react';

export default function Page() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  if (status === 'loading') {
    return <div className="text-center">Loading session...</div>;
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#f5f4f3] text-[#141414] px-6 py-20 flex justify-center font-sans antialiased">
        <div className="w-full max-w-3xl bg-white border border-[#dfdedb] rounded-[32px] shadow-sm px-12 py-16">
          <h1 className="text-3xl font-bold mb-6">You must be signed in</h1>
          <AuthButtons />
        </div>
      </main>
    );
  }

  const handleGenerate = async ({
    jobDesc,
    resumeText,
    jobTitle = '',
    company = '',
  }: {
    jobDesc: string;
    resumeText: string;
    jobTitle?: string;
    company?: string;
  }) => {
    setLoading(true);
    setCoverLetter('');

    const userId = session.user.id;

    try {
      const res = await fetch('http://localhost:5001/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDesc, resumeText, jobTitle, company, userId }),
      });

      const data = await res.json();
      setCoverLetter(data.coverLetter || 'No cover letter returned.');
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert('Something went wrong. Try again.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f4f3] text-[#141414] px-6 py-20 flex justify-center font-sans antialiased">
      <div className="w-full max-w-3xl bg-white border border-[#dfdedb] rounded-[32px] shadow-sm px-12 py-16">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#121212] tracking-tight">
            HirePilot
          </h1>
          <p className="mt-4 text-base text-[#4c4c4c] max-w-prose leading-relaxed">
            A smarter way to write cover letters. Paste your resume and the job description — we’ll handle the rest.
          </p>
        </header>

        <AuthButtons />
        <JobForm onGenerate={handleGenerate} />

        {loading && (
          <div className="mt-10 text-sm text-[#666] italic animate-pulse">
            Generating your letter…
          </div>
        )}

        {coverLetter && (
          <section className="mt-16">
            <label className="block text-sm font-medium text-[#2a2a2a] mb-3">
              Generated Cover Letter
            </label>
            <textarea
              rows={18}
              className="w-full p-6 border border-[#d1d1d1] rounded-xl bg-[#fbfbfa] text-[#1a1a1a] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#222] transition-all shadow-inner resize-none"
              value={coverLetter}
              readOnly
            />
          </section>
        )}
      </div>
    </main>
  );
}
