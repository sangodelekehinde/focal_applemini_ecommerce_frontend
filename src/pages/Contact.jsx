// Contact.jsx
// Contact page with a simple form

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Contact() {
  // One object holds everything the user types
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Becomes true after the form is sent
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  // Runs every time the user types in any field
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Runs when the user clicks "Send Message"
  function handleSubmit(e) {
    e.preventDefault(); // stops the page from refreshing
    console.log(formData); // for now we only log it (no backend yet)
    setSent(true);
    setFormData({ name: "", email: "", message: "" }); // clear the form
  }

  return (
    <div className="wrapper">
      <button className="bg-[#151ec7] p-3 rounded-xl mt-7 ml-6 md:hidden hover:bg-black">
        <FaArrowLeft
          onClick={() => navigate("/")}
          className="text-[white] text-lg"
        />
      </button>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-2 text-gray-600">
          Have a question? Send us a message and we will reply soon.
        </p>

        {/* Thank-you message */}
        {sent && (
          <p className="mt-6 rounded-lg bg-green-100 px-4 py-3 text-green-700">
            Thank you! Your message has been sent.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="border border-gray-300 rounded-lg px-4 py-3
                     focus:outline-none focus:border-blue-600"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            className="border border-gray-300 rounded-lg px-4 py-3
                     focus:outline-none focus:border-blue-600"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows="5"
            required
            className="border border-gray-300 rounded-lg px-4 py-3
                     focus:outline-none focus:border-blue-600"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-3 rounded-lg
                     hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
