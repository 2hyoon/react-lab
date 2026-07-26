"use client";

import {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from "react";
import Button from "@/src/components/ui/Button";
import { GitHubUser } from "@/src/types/interface";

const GithubSearch = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<GitHubUser | null>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (query.trim() === "") return;

    try {
      const response = await fetch(`https://api.github.com/users/${query}`);
      if (response.ok) {
        const user: GitHubUser = await response.json();
        setData(user);
      } else {
        throw new Error("Fetch response error");
      }
    } catch {
      console.log("Error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <input
          onChange={handleChange}
          value={query}
          type="text"
          placeholder="GitHub username"
          className="flex-1 min-w-0 px-4 py-2 rounded-lg bg-surface text-foreground border border-border placeholder:text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        />
        <Button type="submit">Search</Button>
      </form>
      {data && (
        <article className="w-full max-w-md flex items-center gap-4 p-4 rounded-lg bg-surface border border-border">
          <img
            src={data.avatar_url}
            alt=""
            width={64}
            height={64}
            className="w-16 h-16 rounded-full shrink-0"
          />
          <div className="min-w-0">
            <h2 className="truncate">{data.login}</h2>
            {data.bio && <p className="text-muted wrap-break-word">{data.bio}</p>}
          </div>
        </article>
      )}
    </>
  );
};

export default GithubSearch;
