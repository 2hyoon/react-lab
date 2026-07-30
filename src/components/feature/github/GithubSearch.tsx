"use client";

import {
  useId,
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from "react";
import Link from "next/link";
import useFetch from "@/src/hooks/useFetch";
import Button from "@/src/components/ui/Button";
import ProfileCard from "@/src/components/feature/github/ProfileCard";
import { GitHubUser } from "@/src/types/interface";
import { FetchError } from "@/src/types/type";

const getErrorMessage = (err: FetchError) => {
  if (err.type === "network") {
    return "Couldn't connect. Check your internet and try again.";
  }

  switch (err.status) {
    case 403:
      return "You've hit the rate limit. Try again in an hour.";
    case 404:
      return "No user found with that username.";
    default:
      return `Something went wrong (${err.status}).`;
  }
};

const GithubSearch = () => {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const { data, isLoading, error, fetchData } = useFetch<GitHubUser>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery === "") return;

    const url = `https://api.github.com/users/${encodeURIComponent(trimmedQuery)}`;

    fetchData(url);
  };

  const profileCard = data && (
    <Link
      href={`/github/${data.login}`}
      className="block rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
    >
      <ProfileCard
        user={data}
        className="hover:bg-surface-hover transition-colors duration-200"
      />
    </Link>
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
        {error && <p className="text-danger">{getErrorMessage(error)}</p>}
        {profileCard}
      </div>
    </>
  );
};

export default GithubSearch;
