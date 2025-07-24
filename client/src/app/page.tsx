import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl text-black font-bold mb-4">Welcome to HirePilot</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md text-center">
        Your AI assistant for generating tailored cover letters and tracking your job applications.
      </p>
      <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
        Go to Dashboard
      </Link>
    </main>
  );
}
