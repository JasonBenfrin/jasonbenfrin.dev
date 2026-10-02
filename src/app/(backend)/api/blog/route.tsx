import { NextRequest, NextResponse } from "next/server";
import { BlogModel } from "../../mongoose";
import { customAlphabet } from "nanoid";
import { revalidateTag } from "next/cache";

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const smallId = customAlphabet(alphabet, 6)

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const pass = request.headers.get("Authorization")
    if (pass !== process.env.PASSWORD) return NextResponse.error()

    const res: Partial<{
      title: string,
      abstract: string,
      body: Record<string, unknown>,
      date: number,
      tags: string[]
    }> = await request.json()

    const newBlog = new BlogModel({
      title: (res.title as string).replaceAll(/\s/g, ' '),
      url: `${(res.title as string).replaceAll(/\s/g, '-')}_${smallId()}`,
      abstract: res.abstract,
      body: JSON.stringify(res.body),
      date: res.date ? new Date(res.date) : new Date(),
      tags: res.tags ? [...new Set(res.tags.map(v => v.toLowerCase().trim().replaceAll(/[^a-z]/gi, '')))] : undefined,
    })

    const doc = await newBlog.save()
    revalidateTag("total-blogs", "max")
    return NextResponse.json(doc)
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}