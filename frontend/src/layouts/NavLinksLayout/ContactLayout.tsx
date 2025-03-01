import { JSX } from "react";
import myImage from "../../assets/images/me.jpg";
import { MdEmail } from "react-icons/md";
import Footer from "../../components/Footer";
import { emailContacts, socialContact } from "./data/contactData";

export default function ContactLayout(): JSX.Element {
  return (
    <div>
      <div className="p-10 md:p-20 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-10 md:text-5xl">
          <span className="text-[var(--highlight)]">Contact</span> Details
        </h1>
        <div className="text-xl">
          {/* Image and Name  */}
          <div className="flex justify-center items-center gap-5 mb-15">
            <img
              src={myImage}
              alt="sayujya-picture"
              className="h-25 w-25 rounded-full md:h-35 md:w-35"
            />

            <h1 className="md:text-3xl font-bold mb-5">
              Sayujya{" "}
              <span className="text-[var(--highlight-two)]">Satyal</span>
            </h1>
          </div>

          {/* Social Media Links  */}
          <div className="flex flex-col justify-center items-center mb-15">
            <h2 className="text-xl md:text-3xl font-bold text-[var(--text)] mb-5">
              Find Me On:
            </h2>

            <ul className="text-3xl flex justify-center items-center gap-7 md:text-4xl text-[var(--text)]">
              {socialContact.map((contact, index: number) => (
                <li key={index} className="hover:text-[var(--highlight)]">
                  <a href={contact.link} target="_blank">
                    <contact.icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emails  */}
          <div className="flex flex-col justify-center items-center">
            <h2 className="md:text-3xl font-bold text-[var(--text)] mb-5">
              You can <span className="text-[var(--highlight)]">Email</span> At:
            </h2>

            <div className="text-lg md:text-xl flex flex-col gap-4">
              {emailContacts.map((email, index: number) => (
                <a
                  key={index}
                  href={`mailto:${email.address}`}
                  className="flex justify-center items-center gap-2"
                >
                  <MdEmail /> {email.address}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
