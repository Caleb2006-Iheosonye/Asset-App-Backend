import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // TODO: call supabase.auth.exchangeCodeForSession(code)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    // destructure { error } from the result
if (!error) {
      return NextResponse.redirect(new URL("/", request.url));
    // TODO: if there's no error, redirect the user somewhere useful (e.g. "/")
  }
 // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  // TODO: if there's no code, or an error occurred, redirect to an error page
}}