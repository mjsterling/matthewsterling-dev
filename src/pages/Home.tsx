import gsap from 'gsap';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { BarChart } from '../components/BarChart';
import { Button } from '../components/Button';
import { DownArrow } from '../components/DownArrow';
import { Menu } from '../components/Menu';
import { MenuButton } from '../components/MenuButton';
import { Socials } from '../components/Socials';

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
        pin: true,
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
      .to(avatarRef.current, { strokeDashoffset: 0, duration: 8 });
    text2Refs.current.forEach((ref, i) => {
      t1.current?.to(
        ref,
        { opacity: 1, duration: 2 / text2Refs.current.length },
        6 + (2 / text2Refs.current.length) * i
      );
    });
    t1.current.to(innerRef.current, { top: '-100vh', duration: 2 }, '+=2');

    // screen 2
    t1.current
      .to(
        cardRefs.current[0],
        { left: '-100vw', opacity: 0, duration: 2 },
        '+=2'
      )
      .to(cardRefs.current[1], { left: '0', opacity: 1, duration: 2 }, '-=2')
      .to(
        cardRefs.current[1],
        { left: '-100vw', opacity: 0, duration: 2 },
        '+=2'
      )
      .to(cardRefs.current[2], { left: '0', opacity: 1, duration: 2 }, '-=2')
      .to(innerRef.current, { top: '-200vh', duration: 2 }, '+=2')
      .to(menuButtonRef.current, { opacity: 0, pointerEvents: 'none' }, '-=2');
  }, [mainRef, innerRef, text1Ref, text2Refs, cardRefs, t1, avatarRef]);

  return (
    <main
      ref={mainRef}
      className="w-screen h-screen overflow-hidden fixed top-0"
    >
      <div
        className="absolute left-7 top-7 transition-opacity z-50 "
        ref={menuButtonRef}
      >
        <MenuButton
          open={menuOpen}
          setOpen={setMenuOpen}
          visible={!showArrow}
        />
      </div>
      <Menu open={menuOpen} />
      <div
        ref={innerRef}
        className="z-10 absolute top-0 w-screen max-w-[800px]"
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
          <p className="text-white text-xl">Hi, I'm</p>
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
            I specialise in:
          </p>
          <div className="h-[60%] w-full relative">
            <div
              ref={(el) => (cardRefs.current[0] = el)}
              style={{ left: 0, opacity: 1 }}
              className={styles.specialtyCard}
            >
              <h2 className="text-secondary-500 font-bold text-[26px]">
                Dynamic SVG charts
              </h2>
              <BarChart />
            </div>
            <div
              ref={(el) => (cardRefs.current[1] = el)}
              className={styles.specialtyCard}
            >
              <h2 className="text-secondary-500 font-bold text-[26px]">
                Web applications
                {/* some kind of UI layout? */}
              </h2>
              <div className="m-auto h-4/5 w-full"></div>
            </div>
            <div
              ref={(el) => (cardRefs.current[2] = el)}
              className={styles.specialtyCard}
            >
              <h2 className="text-secondary-500 font-bold text-[26px]">
                Custom animation
                {/* no idea what to do for this */}
              </h2>
            </div>
          </div>
        </div>
        <div className="top-[200vh] w-full h-screen transition-all p-7 pt-[105px] left-0 absolute z-10 flex flex-col justify-between">
          <p className="text-white text-xl w-full text-center">
            Want to know more?
          </p>
          <div className="h-1/2 justify-evenly flex flex-col w-full items-center">
            <Link
              className="text-xl text-white hover:opacity-80 transition-opacity"
              to="/cv"
            >
              <Button variant="primary">View my CV</Button>
            </Link>
            <Link
              className="text-xl text-white hover:opacity-80 transition-opacity"
              to="/projects"
            >
              <Button variant="secondary">Check out my projects</Button>
            </Link>
            <Link
              className="text-xl text-white hover:opacity-80 transition-opacity"
              to="/contact"
            >
              <Button variant="green">Send me a message</Button>
            </Link>
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
