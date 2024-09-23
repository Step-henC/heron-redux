import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL_PATTERN } from "../../utils/acceptablefileformat";
import emailjs from "@emailjs/browser";
import "./contact.css";

export default function ContactPage() {
  
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const [subject, setSubject] = useState("");
  const [subjValid, setSubjValid] = useState(true); //subject does not match \s regex (white spaces)

  const [message, setMessage] = useState("");
  const [messageValid, setMessageValid] = useState(true);

  const formRef = useRef();

  let navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //emailjs stuff here

    if (
      subject.match(/^\S/g) &&
      subject.length > 0 &&
      message.length >= 5 &&
      message.match(/^\S/g) &&
      email.match(EMAIL_PATTERN)
    ) {
      //emailjs stuff here
console.log('hey')
      emailjs
        .sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, formRef.current, {
          publicKey: process.env.REACT_APP_PUBLIC_KEY,
        })
        .then(() => navigate("/contact/success"))
        .catch((err) => {console.log(err); navigate("/contact/error")});
    } else {
      setSubjValid(subject.match(/^\S/g) && subject.length > 0);
      setMessageValid(message.length >= 5 && message.match(/^\S/g));
      setEmailValid(email.match(EMAIL_PATTERN));
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        id="csv-elem"
        aria-label="form to contact us"
      >
        <ul className="wrapper">
          <li className="form-row-title">
            <h2>Contact Us</h2>
          </li>
          <li className="form-row">
            <label htmlFor="email-input">Your Email: (*)</label>
            <input
              name="from_email"
              placeholder="example@example.com"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
            />
          </li>
          {!emailValid && (
            <li className="form-col">
              <p
                aria-label="Please provide a valid email"
                style={{ color: "red" }}
              >
                Error: Please provide a valid email
              </p>
            </li>
          )}

          <li className="form-row">
            <label aria-label="enter subject" htmlFor="message-subject">
              Subject of Message (*)
            </label>
            <input
              name="subject"
              minLength={1}
              maxLength={200}
              value={subject}
              type="text"
              onChange={(e) => setSubject(e.target.value)}
              id="message-subject"
            />
          </li>

          {!subjValid && (
            <li className="form-col">
              <p
              data-testid='subject-err'
                aria-label="Please provide a valid subject"
                style={{ color: "red" }}
              >
                Error: Please provide a valid subject. Must be at least 1
                characters and begin with a non-whitespace character
              </p>
            </li>
          )}
          <br />

          <li className="form-col">
            <label aria-label="message of to Heron Data" htmlFor="message">
              Your Message (*)
            </label>

            <textarea
              onKeyDown={(e) => setMessage(e.target.value)}
              name="message"
              className={
                messageValid
                  ? "message-input-class"
                  : "message-input-class-error"
              }
              maxLength={1000}
              minLength={5}
              required
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
            ></textarea>
          </li>
          {!messageValid && (
            <li className="form-col">
              <p
              data-testid='message-err'
                aria-label="Please provide a valid message. Must be at least 5 chararcters and begin with non-whitespace character"
                style={{ color: "red" }}
              >
                Error: Please provide a valid message. Must be at least 5
                characters and begin with a non-whitespace character
              </p>
            </li>
          )}

          <li className="form-row-spacer">
            <button
                        data-testid='contact-cancel'

              className="button-button-cancel"
              aria-label="cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
            data-testid='contact-submit'
              className="button-button-submit"
              aria-label="submit"
              onClick={handleSubmit}
              type="submit"
            >
              Send
            </button>
          </li>
        </ul>
      </form>
  );
}