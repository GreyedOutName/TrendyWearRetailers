import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

type Props = {
  title: string;
  href: string;
};

export default function CategoryLink({ title, href }: Props) {
  return (
    <Link
      href={href}
      className="group flex-1 flex flex-col px-4"
    >
      {/* Row: Title + Arrow */}
      <div className="flex items-center justify-between px-2">
        <span className="text-lg font-semibold text-slate-800 group-hover:text-black transition">
          {title}
        </span>

        <MdArrowOutward
          size={20}
          className="text-slate-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
        />
      </div>

      {/* Bottom line */}
      <div className="w-full h-px bg-gray-300 group-hover:bg-black transition py-0.25" />
    </Link>
  );
}
