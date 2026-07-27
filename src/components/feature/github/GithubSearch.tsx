"use client";

import {
  useId,
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from "react";
import Button from "@/src/components/ui/Button";
import { GitHubUser } from "@/src/types/interface";

const GithubSearch = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery === "") return;

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${trimmedQuery}`,
      );
      if (response.ok) {
        const user: GitHubUser = await response.json();
        setData(user);
      } else {
        switch (response.status) {
          case 403:
            setError("You've hit the rate limit. Try again in an hour.");
            break;
          case 404:
            setError("No user found with that username.");
            break;
          default:
            setError(`Something went wrong (${response.status}).`);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const profileCard = data && (
    <article className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border">
      <img
        src={data.avatar_url}
        alt={`${data.login}'s profile picture`}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full shrink-0"
      />
      <div className="min-w-0">
        <h2 className="truncate">{data.login}</h2>
        {data.bio && <p className="text-muted wrap-break-word">{data.bio}</p>}
      </div>
    </article>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <label htmlFor={inputId} className="sr-only">
          GitHub username
        </label>
        <input
          onChange={handleChange}
          value={query}
          id={inputId}
          type="text"
          placeholder="e.g. vercel"
          className="flex-1 min-w-0 px-4 py-2 rounded-lg bg-surface text-foreground border border-border placeholder:text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        />
        <Button type="submit" disabled={isLoading}>
          Search
        </Button>
      </form>
      <div aria-live="polite" className="w-full max-w-md">
        {isLoading && <p className="text-muted">Searching…</p>}
        {error && <p className="text-danger">{error}</p>}
        {profileCard}
      </div>
    </>
  );
};

export default GithubSearch;
