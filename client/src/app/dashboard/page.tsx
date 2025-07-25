'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  if (!session || !session.user) return null; // Redirecting...

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
      {/* Your dashboard content */}
    </div>
  );
}
