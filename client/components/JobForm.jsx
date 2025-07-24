'use client';

import { useState } from 'react';

export default function JobForm({ onGenerate }) {
  const [jobDesc, setJobDesc] = useState('');
  const [resumeText, setResumeText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ jobDesc, resumeText });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10"
      spellCheck="false"
      autoComplete="off"
    >
      <div>
        <label
          htmlFor="jobDesc"
          className="block text-sm font-medium text-[#4a4a4a] mb-3"
        >
          Job Description
        </label>
        <textarea
          id="jobDesc"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          rows={3}
          placeholder="Paste the job description here..."
          className="w-full rounded-2xl border border-[#d7d7d7] bg-[#fafafa] p-5 text-[#222] font-sans text-base leading-relaxed resize-none
            focus:outline-none focus:ring-2 focus:ring-[#3f3f3f] transition"
          required
        />
      </div>

      <div>
        <label
          htmlFor="resumeText"
          className="block text-sm font-medium text-[#4a4a4a] mb-3"
        >
          Resume (Plain text)
        </label>
        <textarea
          id="resumeText"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={3}
          placeholder="Paste your resume text here..."
          className="w-full rounded-2xl border border-[#d7d7d7] bg-[#fafafa] p-5 text-[#222] font-sans text-base leading-relaxed resize-none
            focus:outline-none focus:ring-2 focus:ring-[#3f3f3f] transition"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-3xl bg-[#4a4a4a] text-[#fafafa] font-semibold py-4 text-lg
          hover:bg-[#3c3c3c] active:bg-[#2f2f2f] transition"
      >
        Generate Cover Letter
      </button>
    </form>
  );
}
