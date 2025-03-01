import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface SocialContact {
  name: string;
  link: string;
  icon: React.ElementType;
}

interface EmailContact {
  name: string;
  address: string;
}

const socialContact: SocialContact[] = [
  {
    name: "facebook",
    link: "https://www.facebook.com/ayjuyas",
    icon: FaFacebook,
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/sayuzya._/",
    icon: FaInstagram,
  },
  {
    name: "x",
    link: "https://x.com/AyjuYaas",
    icon: FaXTwitter,
  },
  {
    name: "linked in",
    link: "https://www.linkedin.com/in/sayujya-satyal-3452b5217/",
    icon: FaLinkedin,
  },
  {
    name: "github",
    link: "https://github.com/AyjuYaas",
    icon: FaGithub,
  },
];

const emailContacts: EmailContact[] = [
  {
    name: "primary email",
    address: "sayujya57@gmail.com",
  },
  {
    name: "college email",
    address: "021bim054@sxc.edu.np",
  },
];

export { socialContact, emailContacts };
