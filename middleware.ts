import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  debug: true,
  publicRoutes: [
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/categories",
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/billboards/c116c37a-3727-462a-952b-1e7bfa6331b5",
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/products",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
