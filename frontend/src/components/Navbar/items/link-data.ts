interface navLink {
  name: string;
  path: string;
}

const navLinks: navLink[] = [
  { name: "about", path: "/about" },
  { name: "community", path: "/therapist-list" },
  { name: "contact", path: "/contact" },
];

export { navLinks };
