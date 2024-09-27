import { useEffect, useRef } from 'react';
import PageCards from '../../components/PageCards/PageCards';
import './homepage.css';
import { persistor } from '../../store';
export default function HomePage() {
  const pageCardRef = useRef(null);

  const startScrollCardPage = () => {
    if (pageCardRef && pageCardRef.current) {
      pageCardRef.current.scrollIntoView();

    }
  };

  const resizeJumpToTop = () => {
    const landingDiv = document.getElementsByClassName('home-img')[0];
    // disable behavior on mobile devices
    if (landingDiv.offsetWidth < 990) {
      return;
    }
    landingDiv.scrollIntoView({
      behavior: 'instant',
      inline: 'start',
      block: 'start',
    });
  };

  useEffect(() => {
    window.addEventListener('resize', resizeJumpToTop);

    return () => {
      window.removeEventListener('resize', resizeJumpToTop);
    };
  }, []);

  useEffect(() => {
    return () => {
      persistor.purge();
    };
  }, []);

  return (
    <>
      <div className="home-img">
        <img
          id={'heron-main-logo'}
          aria-label="heron logo"
          width={300}
          height={300}
          alt="logo"
          src="/heronlogo.jpg"
        />
        <h4 className="tagline">
          Improve Rigor and Reproducibility of Biomedical Proteomics{' '}
        </h4>
        <h4 className="tagline">
          Save time analyzing proteomics data processed in Skyline
        </h4>
        <button onClick={startScrollCardPage} id="start-btn">
          Start Here
        </button>
      </div>
      <PageCards forwardedRef={pageCardRef} />
    </>
  );
}
