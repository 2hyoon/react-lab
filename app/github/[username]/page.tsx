import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProfileCard from "@/src/components/feature/github/ProfileCard";
import { GitHubUser } from "@/src/types/interface";

type Params = { username: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { username } = await params;
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    return { title: username };
  }

  const user: GitHubUser = await response.json();

  return { title: user.name ?? user.login };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { username } = await params;
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    switch (response.status) {
      case 403:
        throw new Error(
          "You've hit GitHub's rate limit. Try again in an hour.",
        );
      case 404:
        return notFound();
      default:
        throw new Error(`GitHub responded with ${response.status}.`);
    }
  }

  const user: GitHubUser = await response.json();

  return (
    <section className="py-10 flex flex-col justify-center items-center gap-4">
      <header className="text-center mb-4">
        <h1 className="mb-2">GitHub Profile</h1>
      </header>
      <ProfileCard user={user} className="w-full max-w-md" />
    </section>
  );
}
