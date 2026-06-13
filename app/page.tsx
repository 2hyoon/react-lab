export default function Home() {
  return (
    <section className="pt-7">
      <h1 className="sr-only">REACT LAB</h1>
      <pre
        aria-hidden="true"
        className="text-primary text-[0.5rem] lg:text-[0.8rem] font-bold leading-tight pb-5 overflow-x-auto"
      >{` ____  _____    _    ____ _____   _        _    ____
|  _ \\| ____|  / \\  / ___|_   _| | |      / \\  | __ )
| |_) |  _|   / _ \\| |     | |   | |     / _ \\ |  _ \\
|  _ <| |___ / ___ \\ |___  | |   | |___ / ___ \\| |_) |
|_| \\_\\_____/_/   \\_\\____| |_|   |_____/_/   \\_\\____/`}</pre>
      <p className="text-muted">{"// a sandbox for modern React, TypeScript & Next.js"}</p>
    </section>
  );
}
