"use client";

import Image from "next/image";
import Link from "next/link.js";
import jasonBenfrin from '../_assets/jason_benfrin.svg';
import { github } from "@/app/globals";
import githubSVG from '../_assets/github.svg';
import { usePathname } from "next/navigation";

interface IPathLinkWrapper {
  href: string,
  text: string,
  topdir: string | undefined,
}
function PathLinkWrapper({ href, text, topdir }: IPathLinkWrapper) {
  return <Link href={href}>
    <span className={topdir === href.split("/").at(1) ? "font-bold" : ""}>{text}</span>
    <span aria-hidden>/</span>
  </Link>
}

export default function Navbar() {
  const pathname = usePathname();
  const topdir = pathname.split("/").at(1)

  return <nav className="p-1">
    <div className="w-full px-2 py-1 font-display flex justify-between border-2">
      <div className="flex justify-start items-center">
        <Link href="/" className="w-4 mx-2" >
          <Image src={jasonBenfrin} alt="Logo of JasonBenfrin" />
        </Link>
        <span className="text-on-surface-variant font-extralight select-none">
          {":$ cd "}
          <Link href="/" className={topdir === "" ? "font-bold" : ""}>~</Link>
          /
        </span>
        <div className="flex gap-4 pl-4 lowercase font-extralight">
          <PathLinkWrapper href="/blog/" text="Blog" topdir={topdir} />
          <span className="text-on-surface-variant">More Soon&trade;</span>
        </div>
      </div>
      <div className="flex items-center">
        <a href={github} target="_blank">
          <Image src={githubSVG} alt="Github" className="w-3 mx-2"/>
        </a>
      </div>
    </div>
  </nav>
}