/**
 * GitHub API helper utilities for Portfolio OS
 * Dynamically fetches releases, APK assets, previews, and metadata
 */

export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Detects device/CPU architecture from binary filename
 */
export function getArchitecture(filename = "") {
  const lower = filename.toLowerCase();
  if (lower.includes("universal")) return "Universal";
  if (lower.includes("arm64") || lower.includes("v8a")) return "ARM64 (v8a)";
  if (lower.includes("armeabi") || lower.includes("v7a")) return "ARMv7 (armeabi)";
  if (lower.includes("x86_64")) return "x86_64";
  if (lower.includes("x86")) return "x86 (32-bit)";
  if (lower.endsWith(".apk")) return "Android APK";
  if (lower.endsWith(".zip")) return "ZIP Archive";
  if (lower.endsWith(".tar.gz") || lower.endsWith(".tgz")) return "Tarball";
  if (lower.endsWith(".mp4")) return "Demo Video";
  if (lower.endsWith(".txt")) return "Checksums / Text";
  return "Release Asset";
}

/**
 * Cleanly extracts a readable version tag or build label
 */
export function formatVersionTag(rel) {
  if (!rel) return null;
  const tag = rel.tag_name || "";
  const name = rel.name || "";

  // If semantic version tag like v2.5.6 or v1.4.0
  if (/^v?\d+\.\d+/i.test(tag)) {
    return tag.startsWith("v") ? tag : `v${tag}`;
  }

  // If pre-build or custom release name
  if (name && name !== tag) {
    // If name contains a commit hash e.g. "Pre_Builds (71e3cd8)" -> "Pre_Build (71e3cd8)"
    return name;
  }

  if (tag === "Pre_Builds") return "Pre-Build (Latest)";
  if (tag === "latest") return "Latest Release";

  return tag || name || "v1.0.0";
}

/**
 * Enriches a repo with release data, APK assets, universal version variable, and previews
 */
export async function fetchReleaseAndPreviews(repo, fetchHeaders = {}) {
  const owner = repo.owner?.login || "Akshay-86";
  const name = repo.name;
  let releaseData = null;
  let previews = null;

  // 1. Fetch releases (fetching list of 5 to properly capture prereleases like Pre_Builds and tags like latest)
  try {
    const relRes = await fetch(
      `https://api.github.com/repos/${owner}/${name}/releases?per_page=5`,
      { headers: fetchHeaders, next: { revalidate: 3600 } }
    );

    if (relRes.ok) {
      const releases = await relRes.json();
      if (Array.isArray(releases) && releases.length > 0) {
        // Pick the most recent release that contains assets, or releases[0]
        const rel = releases.find((r) => Array.isArray(r.assets) && r.assets.length > 0) || releases[0];

        if (rel && Array.isArray(rel.assets)) {
          const assets = rel.assets.map((a) => {
            const isApk = a.name.toLowerCase().endsWith(".apk");
            return {
              name: a.name,
              downloadUrl: a.browser_download_url,
              sizeBytes: a.size,
              sizeFormatted: formatBytes(a.size),
              isApk,
              arch: getArchitecture(a.name),
              downloadCount: a.download_count || 0,
            };
          });

          // Prioritize: Universal APK > ARM64 APK > Any APK > First Asset
          const primaryAsset =
            assets.find((a) => a.isApk && a.name.toLowerCase().includes("universal")) ||
            assets.find((a) => a.isApk && (a.name.toLowerCase().includes("arm64") || a.name.toLowerCase().includes("v8a"))) ||
            assets.find((a) => a.isApk) ||
            assets[0] ||
            null;

          const versionStr = formatVersionTag(rel);

          releaseData = {
            tagName: rel.tag_name,
            version: versionStr,
            rawName: rel.name || rel.tag_name,
            publishedAt: rel.published_at,
            body: rel.body || "",
            htmlUrl: rel.html_url,
            isPrerelease: !!rel.prerelease,
            hasApk: assets.some((a) => a.isApk),
            primaryAsset,
            allAssets: assets,
          };
        }
      }
    }
  } catch (err) {
    // Silently ignore repos without releases
  }

  // 2. Fetch previews (screenshots) if available in previews/ directory
  try {
    const prevRes = await fetch(
      `https://api.github.com/repos/${owner}/${name}/contents/previews`,
      { headers: fetchHeaders, next: { revalidate: 3600 } }
    );
    if (prevRes.ok) {
      const files = await prevRes.json();
      if (Array.isArray(files)) {
        const imageFiles = files
          .filter((f) => /\.(jpe?g|png|webp|gif|svg)$/i.test(f.name))
          .map((f) => {
            const prettyTitle = f.name
              .replace(/\.(jpe?g|png|webp|gif|svg)$/i, "")
              .replace(/Screen$/i, "")
              .replace(/([A-Z])/g, " $1")
              .trim();
            return {
              fileName: f.name,
              title: prettyTitle.charAt(0).toUpperCase() + prettyTitle.slice(1),
              url: `https://raw.githubusercontent.com/${owner}/${name}/main/previews/${f.name}`,
            };
          });
        if (imageFiles.length > 0) {
          previews = imageFiles;
        }
      }
    }
  } catch (err) {
    // Silently ignore repos without previews
  }

  return {
    latestRelease: releaseData,
    version: releaseData?.version || null,
    previews,
  };
}
