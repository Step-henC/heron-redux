import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './headerstyle.css';
import Dropdown from '../Dropdown/Dropdown';

export default function Header() {
  const [showOffCanvasButton, setShowOffcanvasButton] = useState(false);
  const navigate = useNavigate();

  const dropdownItems = [
    {
      label: 'Protocol Publication',
      url: `${process.env.REACT_APP_PROTOCOL_LINK}`,
    },
    { label: 'Quantification Tutorial', url: '/quant-tutorial' },
    { label: 'Glycosylation Tutorial', url: '/glyco-tutorial' },
  ];

  const windowResizeAddCanvasButton = () => {
    const navLinksDiv = document.getElementsByClassName('nav-links')[0];
    if (navLinksDiv) {
      //navLinksDisplay.checkVisibility() is a more semantic function
      //but broke unit tests since jsdom does not have that function
      // getComputedStyle may be a bit slower, but it works the same
      const navLinksDisplay = window.getComputedStyle(
        navLinksDiv,
        null
      ).display;
      setShowOffcanvasButton(navLinksDisplay === 'none');
    }
  };
  useEffect(() => {
    window.addEventListener('resize', windowResizeAddCanvasButton);

    return () => {
      window.removeEventListener('resize', windowResizeAddCanvasButton);
    };
  }, []);

  useEffect(() => {
    // if window is small on page load, we need to show offcanvas button
    windowResizeAddCanvasButton();
  }, []);

  return (
    <nav className="principal-header">
      <div
        data-testid="logo-div-btn"
        role="button"
        className="logo-home-link"
        onClick={() => navigate('/')}
      >
        <img alt="heron logo" width="50" height="50" src="/heronlogomain.svg" />{' '}
        <h6 className="heron-suite">Heron Data Suite</h6>
      </div>
      <div data-testid="quant-link" id="nav-link-div" className="nav-links">
        <a data-testid="quant-link" className="quant-lk" href="/quant">
          Quantification
        </a>
        <a className="gly-lk" href="/glyco">
          Glycosylation
        </a>
        <a className="gly-lk" href="/contact">
          Contact
        </a>
        <Dropdown title={'Documentation'} items={dropdownItems} />
      </div>
      {showOffCanvasButton && (
        <div
          data-testid="offcanvas-btn"
          className="offcanvas-btn"
          data-bs-toggle="offcanvas"
          data-bs-target="#open-offc"
          tabIndex={1}
        >
          <span className="offcan-btn-icon">&#9776;</span>
        </div>
      )}
      <div id="open-offc" className="offcanvas offcanvas-end">
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul>
            <li className="list-link">
              <a href="/quant">Quantification</a>
            </li>
            <li className="list-link1">
              <a href="/glyco">Glycosylation</a>
            </li>
            <li className="list-link1">
              <a href="/contact">Contact</a>
            </li>
            <li>
              <Dropdown title={'Documentation'} items={dropdownItems} theme={'white'}/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
