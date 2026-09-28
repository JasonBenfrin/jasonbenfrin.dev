import { redirect } from "next/navigation";

export default function BlogPage() {
  return redirect("/blog/pinned")
}