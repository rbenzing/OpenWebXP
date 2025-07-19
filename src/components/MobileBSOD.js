import React from 'react';

const MobileBSOD = () => {
  return (
    <div className="mobile-bsod">
      <h1>Windows XP Desktop Experience</h1>
      <p>
        A problem has been detected and Windows has been shut down to prevent damage
        to your computer.
      </p>
      <p>UNSUPPORTED_DEVICE</p>
      <p>
        This Windows XP desktop experience is designed for desktop and laptop computers only.
        Mobile and tablet devices are not supported.
      </p>
      <p>
        If this is the first time you've seen this Stop error screen,
        please visit this site on a desktop or laptop computer.
      </p>
      <p>
        If you have previously accessed this site successfully on a desktop,
        the system may be temporarily busy. Try again later.
      </p>
      <p>
        Technical information:
      </p>
      <p>
        *** STOP: 0x0000007E (0xC0000005, 0x00000000, 0x00000000, 0x00000000)
      </p>
      <p style={{ marginTop: '20px', fontSize: '12px' }}>
        Beginning dump of physical memory...
      </p>
      <p style={{ fontSize: '12px' }}>
        Physical memory dump complete.
      </p>
      <p style={{ marginTop: '20px', fontSize: '10px', opacity: 0.8 }}>
        Contact your system administrator or technical support group for further assistance.
      </p>
    </div>
  );
};

export default MobileBSOD;
