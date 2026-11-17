import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-6 px-4 bg-[#08070E]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-400">
        <p className="text-center sm:text-left font-medium text-zinc-300">
          Ye sirf mazaak hai. Paisa sochke dena.
        </p>

        <nav
          aria-label="Footer links"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium"
        >
          <Link
            to="/about"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            About
          </Link>
          <Link
            to="/privacy"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Terms
          </Link>
          <Link
            to="/refund"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Refunds
          </Link>
          <Link
            to="/contact"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
