import Image, { StaticImageData } from "next/image";
import { Link2, Globe, AtSign, Share2, LucideIcon } from "lucide-react";
import person from "@/public/blog/person.jpg";
const defaultAvatar = "/countries/russia/bg-map.png";

export interface AuthorSocials {
  linkedin?: string;
  github?: string;
  website?: string;
  email?: string;
}

export interface AuthorCardProps {
  name?: string;
  designation?: string;
  bio?: string;
  avatar?: string| StaticImageData;
  socials?: AuthorSocials;
  variant?: "sidebar" | "full";
}

interface SocialLinkItem {
  label: string;
  href: string;
  Icon: LucideIcon;
  bg: string;
}

export default function AuthorCard({
  name = "Luci Avetisyan",
  designation = "Senior Content Writer",
  bio = "Sed cras nec a nulla sapien adipiscing ut etiam. In sem viverra mollis metus quam adipiscing vel nascetur condimentum felis sapien. Pede consequat laoreet enim sit aliquet mollis semper.",
  avatar = person,
  socials = {},
  variant = "sidebar",
}: AuthorCardProps) {

  const socialLinks: SocialLinkItem[] = [
    {
      label: "LinkedIn",
      href: socials.linkedin ?? "#",
      Icon: Link2,
      bg: "#0A6B44",
    },
    {
      label: "GitHub",
      href: socials.github ?? "#",
      Icon: Share2,
      bg: "#12211C",
    },
    {
      label: "Website",
      href: socials.website ?? "#",
      Icon: Globe,
      bg: "#4A554F",
    },
    {
      label: "Email",
      href: socials.email ? `mailto:${socials.email}` : "#",
      Icon: AtSign,
      bg: "#072A21",
    },
  ];

  if (variant === "sidebar") {
    return (
      <div
        className="w-full rounded-3xl p-10 flex flex-col gap-6"
        style={{
          background:
            "linear-gradient(122.63deg, rgba(14,143,91,0.22) 12.7%, rgba(216,178,110,0.22) 87.17%)",
        }}
        aria-label={`Author: ${name}`}
      >
        <div className="flex flex-col gap-1">
          <p
            className="text-[#12211C] text-[13px] font-normal tracking-[2.5px] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            AUTHOR
          </p>
          <p
            className="text-[#12211C] text-[20px] font-bold leading-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {name}
          </p>
          <p
            className="text-[#12211C] text-[15px] font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {designation}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {socialLinks.map(({ label, href, Icon, bg }) => (
            <a
              key={label}
              href={href}
              aria-label={`${name} on ${label}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: bg }}
            >
              <Icon className="w-3 h-3 text-white" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col sm:flex-row gap-10 sm:gap-12 items-start"
      aria-label={`About the author: ${name}`}
    >
      <div className="relative flex-none w-22.5 h-22.5 sm:w-27.5 sm:h-27.5 rounded-full overflow-hidden">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
          sizes="110px"
          unoptimized
        />
      </div>

      <div className="flex flex-col gap-5 flex-1">
        <p
          className="text-[#12211C] text-[22px] sm:text-3xl  font-bold leading-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {name}
        </p>

        <p
          className="text-[#4A554F] text-[17px] sm:text-4.5 leading-[26.5px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {bio}
        </p>

        <div className="flex items-center gap-2.5">
          {socialLinks.map(({ label, href, Icon, bg }) => (
            <a
              key={label}
              href={href}
              aria-label={`${name} on ${label}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: bg }}
            >
              <Icon className="w-3 h-3 text-white" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
