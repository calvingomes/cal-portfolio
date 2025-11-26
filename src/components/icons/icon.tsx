import {
  IconAppStore,
  IconBookmark,
  IconCodepen,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLoader,
  IconPlayStore,
  IconStar,
  IconTwitter,
} from "./index";

// All valid icon names
export type IconName =
  | "AppStore"
  | "Bookmark"
  | "Codepen"
  | "External"
  | "Folder"
  | "Fork"
  | "GitHub"
  | "Instagram"
  | "Linkedin"
  | "Loader"
  | "PlayStore"
  | "Star"
  | "Twitter";

const Icon = ({ name }: { name: IconName }) => {
  switch (name) {
    case "AppStore":
      return <IconAppStore />;
    case "Bookmark":
      return <IconBookmark />;
    case "Codepen":
      return <IconCodepen />;
    case "External":
      return <IconExternal />;
    case "Folder":
      return <IconFolder />;
    case "Fork":
      return <IconFork />;
    case "GitHub":
      return <IconGitHub />;
    case "Instagram":
      return <IconInstagram />;
    case "Linkedin":
      return <IconLinkedin />;
    case "Loader":
      return <IconLoader />;
    case "PlayStore":
      return <IconPlayStore />;
    case "Star":
      return <IconStar />;
    case "Twitter":
      return <IconTwitter />;
    default:
      return <IconExternal />;
  }
};

export default Icon;
