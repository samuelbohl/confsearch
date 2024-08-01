import htmlToFormattedText from "html-to-formatted-text";
import { convert } from "html-to-text";

export async function prepareWikiCFPEventPage(url: string) {
  const res = await fetch(`https://r.jina.ai/${url}`, {
    headers: {
      // Authorization: "Bearer jina_1a4ae34bc57c414895c6c9ff62bc903eCdkOREo3BrwC3puJC9EU4s0IhX7J",
      "X-Return-Format": "text",
    },
  });
  const content = await res.text();

  const start = content.indexOf("[display]") + 9;
  const end = content.lastIndexOf("Related Resources");
  if (end === -1) {
    return content.substring(start).trimStart();
  }
  return content.substring(start, end).trimStart();
}

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

function removeRedundantWhitespace(str) {
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

export async function localPrepareWikicfp2(url: string) {
  const res = await fetch(url);
  const content = await res.text();
  const parsedContent = convert(content);
  const start = parsedContent.indexOf("[hide\n[javascript:display('more_users');display('more_button');]]") + 65;
  const end = parsedContent.lastIndexOf("RELATED RESOURCES");
  if (end === -1) {
    return cleanSocialLinks(
      parsedContent
        .substring(start)
        .trim()
        .replace(/\[.*?\]/g, ""),
    );
  }
  return cleanSocialLinks(
    parsedContent
      .substring(start, end)
      .trim()
      .replace(/\[.*?\]/g, ""),
  );
}

function cleanSocialLinks(content: string) {
  // remove lines that start with Facebook http://www.facebook.com/sharer.php
  let clean = content.replace(/^http:\/\/www\.facebook\.com\/sharer\.php.*$\n?/gm, "");
  // http://twitter.com/share
  clean = clean.replace(/^http:\/\/twitter\.com\/share.*$\n?/gm, "");

  return clean;
}
