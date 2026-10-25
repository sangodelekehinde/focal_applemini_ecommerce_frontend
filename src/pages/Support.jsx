// Support.jsx
// Support page with a simple FAQ (click a question to open its answer)

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// The questions and answers live in one array, so they are easy to edit
const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Orders are delivered within 3 to 7 working days.",
  },
  {
    question: "Can I return my glasses?",
    answer: "Yes. You can return unused glasses within 14 days of delivery.",
  },
  {
    question: "How do I check my frame size?",
    answer:
      "Each product page shows the lens width, bridge width and arm length.",
  },
  {
    question: "Which payment methods do you accept?",
    answer: "We accept card payments through Paystack.",
  },
];

function Support() {
  // Remembers which question is open (null means none are open)
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  // Open a question, or close it if it is already open
  function toggleQuestion(index) {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Support</h1>
        <p className="mt-2 text-gray-600">
          Find quick answers to common questions below.
        </p>

        <div className="mt-8 divide-y divide-gray-200 border border-gray-200 rounded-lg">
          {faqs.map((faq, index) => (
            <div key={index}>
              {/* The question (click to open or close) */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex justify-between items-center px-5 py-4
                         text-left font-medium text-gray-800 hover:bg-gray-50"
              >
                {faq.question}
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* The answer (only shows when this question is open) */}
              {openIndex === index && (
                <p className="px-5 pb-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Support;
