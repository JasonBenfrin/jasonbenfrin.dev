"use client";

import Giscus from "@giscus/react";

export default function GiscusBlog() {
  return <Giscus
    repo="JasonBenfrin/jasonbenfrin.dev"
    repoId="R_kgDOUdL4ew"
    category="Blog"
    categoryId="DIC_kwDOUdL4e84DGi02"
    mapping="pathname"
    strict="0"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    theme="dark_protanopia"
    lang="en"
    loading="lazy"
  />
}