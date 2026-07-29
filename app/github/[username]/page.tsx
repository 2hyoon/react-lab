import { GitHubUser } from "@/src/types/interface";
import { notFound } from "next/navigation";

type Params = { username: string };

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
      <article className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s profile picture`}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full shrink-0"
        />
        <div className="min-w-0">
          <h2 className="truncate">{user.login}</h2>
          {user.bio && <p className="text-muted wrap-break-word">{user.bio}</p>}
        </div>
      </article>
    </section>
  );
}
