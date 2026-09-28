import Image from "next/image";
import Link from "next/link.js";
import { github, mail } from "@/app/globals";
import jasonBenfrin from '../../../_assets/jason_benfrin.svg';

export default function Socials() {
  return <nav className="p-1 pb-0">
    <div className="w-full px-1 py-1 font-display flex justify-between border-2">
      <div className="flex justify-start items-center">
        <Link href="/" className="w-4 mx-1" >
          <Image src={jasonBenfrin} alt="Logo of JasonBenfrin" />
        </Link>
        <span className="hidden sm:block text-on-surface-variant font-extralight select-none">
          {"$ cat ~/socials.txt"}
        </span>
      </div>
      <div className="flex items-center *:hover:underline">
        [<a href={github} target="_blank">github</a>]
        [<a href={`mailto:${mail}`} target="_blank">email</a>]
      </div>
    </div>
  </nav>
}