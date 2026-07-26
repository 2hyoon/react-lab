import GithubSearch from "@/src/components/feature/github/GithubSearch";

export default function Page() {
  return (
    <section className="py-10 flex flex-col justify-center items-center gap-4">
      <h1 className="mb-4">Github</h1>  
      <GithubSearch/>
    </section>
  );
}
