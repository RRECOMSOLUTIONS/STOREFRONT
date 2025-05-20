import { NextRequest, NextResponse } from "next/server"
import { listProducts } from "@lib/data/products"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const q = searchParams.get("q") || ""
  const countryCode = searchParams.get("countryCode") || ""

  try {
    const result = await listProducts({
      pageParam: 1,
      countryCode: countryCode,
    })

    return NextResponse.json(result.response.products)
  } catch (err) {
    console.error("API Error:", err)
    return NextResponse.json([], { status: 500 })
  }
}
