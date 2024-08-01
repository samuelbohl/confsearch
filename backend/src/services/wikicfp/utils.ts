// "\nA-MOST - Advances in Model-Based Software Testing  " -> Advances in Model-Based Software Testing
export function cleanUpConferenceName(name: string | null | undefined): string | null {
  if (!name) {
    return null;
  }

  // remove everything before " - "
  name = name.replace(/^\s*\S*\s*- /, "");

  // remove trailing spaces
  return name.trim();
}

export function completeURL(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  if (!url.startsWith("http")) {
    return `http://www.wikicfp.com${url}`;
  }

  return url;
}

export function cleanUpEventName(name: string | null | undefined): string | null {
  if (!name) {
    return null;
  }

  // remove everything before and including "\n" 2x
  name = name.replace(/.*\n/, "");
  name = name.replace(/.*\n/, "");

  // remove trailing spaces
  return name.trim();
}
