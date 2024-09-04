import { updateSession } from "@/lib/auth";

export async function middleware(request) {
  return await updateSession(request);
}

//TODO: figure out how to refresh JWT on requests
export const config = {
  matcher: "/rentals/:path*",
};
