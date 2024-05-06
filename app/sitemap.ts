export default async function sitemap() {
  let routes = [
    "",
    "/changelog",
    "/releases",
    "/projects",
    "/work",
    "/tech-stack",
  ].map((route) => ({
    url: `https://ned.im${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
