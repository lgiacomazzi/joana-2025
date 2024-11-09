import Link from "next/link";
import JoanaBrum from "@/public/joana_brum_brasil.svg";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-zinc-800 border-t px-4 py-10 text-xs text-white md:hidden">
      <div className="flex flex-col items-center text-center">
        <JoanaBrum className="mb-8 w-28" />
        <p>
          © {new Date().getFullYear()} Joana Brum Brasil. All rights reserved.
        </p>
        <p>
          Developed by{" "}
          <Link className="border-b" href="https://www.instagram.com/lg.zzz">
            lgiacomazzi
          </Link>
        </p>
      </div>
    </footer>
  );
}
