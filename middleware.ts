import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  debug: true,
  publicRoutes: [
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/categories",
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/billboards/c116c37a-3727-462a-952b-1e7bfa6331b5",
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/products",
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/products/6971c893-4b83-4470-ab53-3c913c6c233a",
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/categories/4842bab0-3036-445f-821c-9203fd811a69",
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/colors",
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/sizes",
    "/api/a3de4c05-3ca9-4e42-bb9d-3c2e5ef3f698/checkout",
    "/api/webhook",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
