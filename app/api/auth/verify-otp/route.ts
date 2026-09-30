import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request: NextRequest) {
  const { email, token, type } = await request.json();
const allowedTypes = ['signup', 'recovery'] as const;

if (!allowedTypes.includes(type)) {
  return NextResponse.json(
    { data: null, error: 'Invalid verification type' },
    { status: 400, headers: corsHeaders }
  );
}
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type,
  });

  if (error) {
    console.error('Verify OTP error:', error.message);
    return NextResponse.json(
      { data: null, error: error.message },
      { status: error.status || 400, headers: corsHeaders }
    );
  }

  return NextResponse.json({ data, error }, { headers: corsHeaders });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}