import React from "react";

// Define a type for link items
type LinkItem = {
  name: string;
  href: string;
  note?: string;
};

// Define a type for footer sections
type FooterSection = {
  title: string;
  links: LinkItem[];
};

// Define the footer sections data
const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Pricing", href: "#" },
      { name: "Changelog", href: "#" },
      { name: "Docs", href: "#" },
      { name: "Download", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#", note: "— We're hiring" },
      { name: "Customers", href: "#" },
      { name: "Newsroom", href: "#" },
      { name: "Sitemap", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Community", href: "#" },
      { name: "Help & Support", href: "#" },
      { name: "eBook", href: "#" },
      { name: "What's New", href: "#" },
      { name: "Status", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { name: "API", href: "#" },
      { name: "Status", href: "#" },
      { name: "GitHub", href: "#", note: "— New" },
    ],
  },
];

// Reusable LinkList component
const LinkList: React.FC<{ links: LinkItem[] }> = ({ links }) => (
  <div className="mt-3 grid space-y-3 text-sm">
    {links.map(({ name, href, note }) => (
      <p key={name}>
        <a
          className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
          href={href}
        >
          {name}
        </a>
        {note && (
          <span className="inline text-orange-600 dark:text-orange-500">
            {note}
          </span>
        )}
      </p>
    ))}
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="z-20 mt-auto w-full max-w-[100rem] pt-10 px-4 sm:px-6 lg:px-8 mx-auto">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
        {/* Brand Section */}
        <div className="col-span-full hidden lg:col-span-1 lg:block">
          <a
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
            href="#"
            aria-label="Brand"
          >
            ALEPHNULL
          </a>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
            © 2022 ALEPHNULL.
          </p>
        </div>

        {/* Dynamic Footer Sections */}
        {footerSections.map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
              {title}
            </h4>
            <LinkList links={links} />
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
