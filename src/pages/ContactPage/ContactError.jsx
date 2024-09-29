import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
export default function ContactError() {
  const contactForm = useSelector((state) => state.contactForm);
  const navigate = useNavigate();

  useEffect(() => {
    if (contactForm.isFormFilled === false) {
      navigate('/contact');
    }
  }, [contactForm]);
  return (
    <div
    className='response-main'
    >
      <h4>Something went wrong. </h4>
      <p>
        We are unable to process your message at this time. If assistance is
        needed please reach us{' '}
        <a href="https://github.com/Step-henC/heron-redux/issues/new/choose">
          at our github site here.
        </a>
      </p>
    </div>
  );
}
