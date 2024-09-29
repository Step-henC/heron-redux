import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './contact.css';
export default function ContactSuccess() {
  const contactForm = useSelector((state) => state.contactForm);
  const navigate = useNavigate();

  useEffect(() => {
    if (contactForm.isFormFilled === false) {
      navigate('/contact');
    }
  }, [contactForm]);
  return (
    <div className="response-main">
      <h4>Success!</h4>
      <p>
        We have received your email and a representative will respond to you
        shortly.
      </p>
    </div>
  );
}
