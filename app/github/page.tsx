import GithubSearch from "@/src/components/feature/github/GithubSearch";

export default function Page() {
  return (
    <section className="py-10 flex flex-col justify-center items-center gap-4">
      <header className="text-center mb-4">
        <h1 className="mb-2">GitHub User Search</h1>
        <p className="text-muted">
          Search any GitHub username to see their profile.
        </p>
      </header>
      <GithubSearch/>
    </section>
  );
}
