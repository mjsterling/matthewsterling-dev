import gsap from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { BarChart } from '../components/BarChart';
import { Button } from '../components/Button';
import { DownArrow } from '../components/DownArrow';
import { Menu } from '../components/Menu';
import { MenuButton } from '../components/MenuButton';
import { Socials } from '../components/Socials';
import { CustomAnimation } from '../components/CustomAnimation';
import PhoneIcon from '../assets/PhoneIcon.svg';
import EmailIcon from '../assets/EmailIcon.svg';
import { Chart } from '../components/Chart';

export const Home = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLDivElement | null>(null);
  const text2Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const text3Ref = useRef<HTMLParagraphElement | null>(null);
  const t1 = useRef<gsap.core.Timeline | null>(null);
  const avatarRef = useRef<SVGGElement | null>(null);
  const [showArrow, setShowArrow] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement | null>(null);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const updateShowArrow = useCallback(() => {
    if (document.documentElement.scrollTop > 0 && showArrow) {
      setShowArrow(false);
      return;
    }
    if (document.documentElement.scrollTop === 0 && !showArrow) {
      setShowArrow(true);
    }
  }, [showArrow]);
  useEffect(() => {
    window.onscroll = updateShowArrow;
  }, [updateShowArrow]);

  useEffect(() => {
    t1.current = gsap.timeline({
      scrollTrigger: {
        pin: mainRef.current,
        pinSpacing: true,
        scrub: 1,
        trigger: mainRef.current,
        start: 'top top',
        end: '+=8000',
      },
    });
    // screen 1
    t1.current
      .to(text1Ref.current, { top: '10vh', duration: 2 })
      .to(avatarRef.current, { strokeDashoffset: 0, duration: 3 });
    text2Refs.current.forEach((ref, i) => {
      t1.current?.to(
        ref,
        { opacity: 1, duration: 2 / text2Refs.current.length },
        2 + (2 / text2Refs.current.length) * i
      );
    });
    t1.current.to(innerRef.current, { top: '-100vh', duration: 2 });

    // screen 2
    t1.current
      // .to(
      //   cardRefs.current[0],
      //   { left: '-100vw', opacity: 0, duration: 2 },
      //   '+=1'
      // )
      // .to(cardRefs.current[1], { left: '0', opacity: 1, duration: 2 }, '-=2')
      // .to(cardRefs.current[1], { left: '-100vw', opacity: 0, duration: 2 })
      // .to(cardRefs.current[2], { left: '0', opacity: 1, duration: 2 }, '-=2')
      .to(innerRef.current, { top: '-200vh', duration: 2 }, '+=1');
    // .to(
    //   menuButtonRef.current,
    //   { opacity: 0, pointerEvents: 'none', duration: 0.5 },
    //   '-=2'
    // );
  }, [mainRef, innerRef, text1Ref, text2Refs, cardRefs, t1, avatarRef]);

  return (
    <main
      ref={mainRef}
      id="viewport"
      className="w-screen overflow-hidden"
      style={{ height: window.innerHeight + 60 }}
    >
      {/* <div
        className="absolute left-7 top-7 transition-opacity z-50 "
        ref={menuButtonRef}
      >
        <MenuButton
          open={menuOpen}
          setOpen={setMenuOpen}
          visible={!showArrow}
        />
      </div> */}
      {/* <Menu open={menuOpen} /> */}
      <div
        ref={innerRef}
        className="w-screen absolute max-w-[800px] z-10"
        style={{
          height: '300vh',
          left: Math.max(0, window.innerWidth * 0.5 - 400),
          maxWidth: '800px',
        }}
      >
        <div
          ref={text1Ref}
          className="px-7 min-w-full] absolute flex flex-col justify-center items-start gap-2 w-full h-[100px] max-h-[100px]"
          style={{ top: `calc(50vh - 50px)`, left: 0 }}
        >
          <p className="text-white text-xl">Hi! I'm</p>
          <h1 className="text-4xl font-bold text-secondary-500">
            Matthew Sterling.
          </h1>
        </div>

        <div
          id="avatar-container"
          className="p-12 pointer-events-none absolute left-0 top-0 flex items-center justify-center"
          style={{
            minHeight: 'calc(100vh - 60px)',
            minWidth: 'calc(100% - 60px)',
          }}
        >
          <Avatar ref={avatarRef} />
        </div>
        <DownArrow show={showArrow} />
        <p className="text-white text-xl absolute top-[80vh] left-0 z-50 w-full px-7">
          {'I’m a front-end web developer from Melbourne, Australia.'
            .split('')
            .map((char, i) => (
              <span
                key={`charRef${i}`}
                className="opacity-0"
                ref={(el) => (text2Refs.current[i] = el)}
              >
                {char}
              </span>
            ))}
        </p>
        <div className="top-[100vh] p-7 left-0 absolute z-10 h-screen w-full flex flex-col justify-evenly">
          <p className="text-white text-xl w-full text-center" ref={text3Ref}>
            I specialise in{' '}
            <span className="text-secondary-500">custom app UIs</span> and{' '}
            <span className="text-secondary-500">dynamic SVGs</span>
          </p>
          <div className="h-[60%] w-full relative">
            <div
              ref={(el) => (cardRefs.current[0] = el)}
              style={{ left: 0, opacity: 1 }}
              className={styles.specialtyCard}
            >
              <Chart />
            </div>
            {/* <div
              ref={(el) => (cardRefs.current[1] = el)}
              className={styles.specialtyCard}
            >
              <h2 className="text-secondary-500 font-bold text-[26px]">
                Custom animation
                <CustomAnimation />
              </h2>
            </div> */}
          </div>
        </div>
        <div className="top-[200vh] w-full h-screen transition-all p-7 pt-[105px] left-0 absolute z-10 flex flex-col justify-between">
          <div className="h-full justify-center gap-4 flex flex-col w-full items-center">
            <h3
              className="text-secondary-500 text-xl w-full text-center pt-2"
              style={{ marginBottom: '24px' }}
            >
              Want to get in touch?
            </h3>
            <div className="text-white rounded-lg p-4 w-full flex gap-2 justify-center items-center">
              <img style={{ height: '24px' }} src={PhoneIcon} />
              {showPhoneNumber ? (
                <Link
                  className="text-xl text-white hover:opacity-80 transition-opacity underline"
                  to="tel:+61403121209"
                >
                  0403 121 209
                </Link>
              ) : (
                <button
                  className="underline text-white text-xl"
                  onClick={() => setShowPhoneNumber(true)}
                >
                  Click to show number
                </button>
              )}
            </div>
            <div className="text-white rounded-lg p-4 w-full flex gap-2 justify-center items-center">
              <img style={{ height: '24px' }} src={EmailIcon} />
              {showEmail ? (
                <Link
                  className="text-xl text-white hover:opacity-80 transition-opacity underline"
                  to="mailto:mjsterling93@gmail.com"
                >
                  mjsterling93@gmail.com
                </Link>
              ) : (
                <button
                  className="underline text-white text-xl"
                  onClick={() => setShowEmail(true)}
                >
                  Click to show email
                </button>
              )}
            </div>
          </div>
          <Socials />
        </div>
      </div>
    </main>
  );
};

const styles = {
  specialtyCard:
    'opacity-0 bg-[rgba(0,_0,_0,_0.25)] rounded-lg flex flex-col justify-between items-center px-5 py-10 h-full w-full absolute left-[100vw]',
};
