import htmlToFormattedText from "html-to-formatted-text";

export async function localPrepareWikicfp(url: string) {
  const res = await fetch(url);
  const content = await res.text();
  const parsedContent = htmlToFormattedText(content);
  const start = parsedContent.indexOf("[hide]") + 6;
  const end = parsedContent.lastIndexOf("Related Resources");
  if (end === -1) {
    return parsedContent.substring(start).trim();
  }
  return removeRedundantWhitespace(parsedContent.substring(start, end).trim());
}

function removeRedundantWhitespace(str: string) {
  // Replace multiple spaces with a single space
  str = str.replace(/ +/g, " ");

  // Remove spaces at the beginning and end of each line
  str = str.replace(/^ +| +$/gm, "");

  // Remove tabs at the beginning of lines or in empty lines
  str = str.replace(/^[\t ]+|^[\t ]+$/gm, "");

  // Replace more than two consecutive newlines with two newlines
  str = str.replace(/\n{3,}/g, "\n\n");

  // Trim the entire string
  return str.trim();
}
