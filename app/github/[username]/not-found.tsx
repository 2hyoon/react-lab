import Link from "next/link";

const NotFound = () => {
  return (
    <section className="py-10 flex flex-col justify-center items-center gap-4">
      <header className="text-center mb-4">
        <h1 className="mb-2">404</h1>
        <p className="text-muted">No user found with that username.</p>
      </header>
      <Link href="/github" className="text-primary hover:text-primary-hover">
        Back to search
      </Link>
    </section>
  );
};

export default NotFound;
