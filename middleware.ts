import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isPublicAndIgnoredRoute = createRouteMatcher([
    '/',
    '/api/webhook/clerk',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/uploadthing(.*)',
    '/api/webhook/clerk(.*)'
]);


export default clerkMiddleware((auth, req) => {
  const isPublicRoute = isPublicAndIgnoredRoute(req);  
  if (!isPublicRoute) {
      auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};