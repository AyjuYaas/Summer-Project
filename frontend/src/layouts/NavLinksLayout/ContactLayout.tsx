import { JSX } from "react";
import myImage from "../../assets/images/me.jpg";
import { MdEmail } from "react-icons/md";
import Footer from "../../components/Footer";
import { emailContacts, socialContact } from "./data/contactData";

export default function ContactLayout(): JSX.Element {
  return (
    <div>
      <div className="max-h-full py-15 px-5 flex items-center justify-center">
        <div className="p-10 md:p-15 flex flex-col bg-[var(--cbg-one)] w-max sm:w-150 md:w-200 mx-auto rounded-4xl">
          <div className="text-5xl xl:text-6xl font-bold text-[var(--text)] mb-15 flex flex-col items-end">
            <span className="font-light">Contact</span>
            <span className="font-fancy tracking-wider">Details</span>
          </div>
          <div className="text-xl">
            {/* Image and Name  */}
            <div className="flex justify-center items-center gap-7 mb-20 ">
              <div className="rounded-[4rem] bg-[var(--cbg-three)]">
                <img
                  src={myImage}
                  alt="sayujya-picture"
                  className="h-25 w-25 md:h-40 md:w-40 rounded-4xl rounded-tr-[5rem] rounded-bl-[5rem]"
                />
              </div>

              <div className="text-xl md:text-3xl xl:text-4xl font-bold mb-5 text-[var(--text)] font-fancy tracking-widest flex flex-col">
                <span>Sayujya</span>
                <span>Satyal</span>
              </div>
            </div>

            {/* Social Media Links  */}
            <div className="flex flex-col justify-center items-center mb-20">
              <h2 className="text-xl md:text-3xl xl:text-4xl font-bold text-[var(--text)] mb-5 font-fancy tracking-wider">
                Find me on:
              </h2>

              <ul className="text-3xl flex flex-wrap justify-center items-center gap-7 md:text-4xl text-[var(--text)]">
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
            <div className="flex flex-col justify-center items-center mt-15">
              <h2 className="text-xl md:text-3xl xl:text-4xl font-bold text-[var(--text)] mb-5 font-fancy tracking-wider">
                Email At:
              </h2>

              <div className="text-lg md:text-xl flex flex-col gap-4">
                {emailContacts.map((email, index: number) => (
                  <a
                    key={index}
                    href={`mailto:${email.address}`}
                    className="flex justify-center items-center gap-2 hover:font-bold hover:text-green-600"
                  >
                    <MdEmail /> {email.address}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
