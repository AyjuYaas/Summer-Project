interface navLink {
  name: string;
  path: string;
}

const navLinks: navLink[] = [
  { name: "about", path: "/about" },
  { name: "reviews", path: "/reviews" },
  { name: "therapists", path: "/therapist-list" },
  { name: "contact", path: "/contact" },
];

export { navLinks };
