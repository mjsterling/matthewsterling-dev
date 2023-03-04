import gsap from 'gsap';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Avatar } from '../components/Avatar';
import { BarChart } from '../components/BarChart';
import { DownArrow } from '../components/DownArrow';

export const Home = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLDivElement | null>(null);
  const text2Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const text3Ref = useRef<HTMLParagraphElement | null>(null);
  const t1 = useRef<gsap.core.Timeline | null>(null);
  const avatarRef = useRef<SVGGElement | null>(null);
  const [scrollPos, setScrollPos] = useState(0);
  useEffect(() => {
    window.onscroll = () => {
      setScrollPos(document.documentElement.scrollTop || 0);
    };
  }, []);
  console.log(scrollPos);

  useEffect(() => {
    t1.current = gsap.timeline({
      scrollTrigger: {
        pin: true,
        pinSpacing: true,
        scrub: 1,
        trigger: mainRef.current,
        start: 'top top',
        end: '+=5000',
      },
    });
    // t=0
    t1.current
      .to(text1Ref.current, { top: '8vh', duration: 2 })
      .to(avatarRef.current, { strokeDashoffset: 0, duration: 4 }, 2);
    text2Refs.current.forEach((ref, i) => {
      t1.current?.to(
        ref,
        { opacity: 1, duration: 2 / text2Refs.current.length },
        6 + (2 / text2Refs.current.length) * i
      );
    });
    t1.current.to(innerRef.current, { top: '-100vh', duration: 2 }, 10);

    // t=12
  }, [mainRef, innerRef, text1Ref, text2Refs, t1, avatarRef]);

  const SpecialtyCard = forwardRef<
    HTMLDivElement,
    {
      children?: React.ReactNode;
      style?: React.HTMLAttributes<HTMLDivElement>['style'];
      title?: string;
    }
  >(({ children, style, title }, ref) => (
    <div
      ref={ref}
      style={style}
      className="bg-[rgba(0,_0,_0,_0.25)] rounded-lg flex flex-col justify-center items-center px-5 py-10 h-full w-full absolute left-[120vw]"
    >
      <h2 className="text-secondary-500 font-bold text-[28px]">{title}</h2>
      <div className="h-full flex items-center">{children}</div>
    </div>
  ));

  return (
    <main
      ref={mainRef}
      className="gradient-background w-screen h-screen overflow-hidden fixed left-0 top-0"
    >
      <div
        ref={innerRef}
        className="z-10 absolute top-0 left-0"
        style={{ height: '300vh', width: '100vw' }}
      >
        <div
          ref={text1Ref}
          className="px-[30px] min-w-[100vw] absolute flex flex-col justify-center items-start gap-2 w-full h-[100px] max-h-[100px]"
          style={{ top: `calc(50vh - 50px)`, left: 0 }}
        >
          <p className="text-white text-xl">Hi, I'm</p>
          <h1 className="text-4xl font-bold text-secondary-500">
            Matthew Sterling.
          </h1>
        </div>

        <div
          id="avatar-container"
          className=" pointer-events-none absolute left-0 top-0 flex items-center justify-center"
          style={{
            padding: '30px',
            minHeight: 'calc(100vh - 60px)',
            minWidth: 'calc(100vw - 60px)',
          }}
        >
          <Avatar ref={avatarRef} />
        </div>
        <DownArrow show={scrollPos === 0} />
        <p className="text-white text-xl absolute top-[82vh] left-0 z-50 w-full px-[30px]">
          {'I’m a front-end web developer from Melbourne, Australia.'
            .split('')
            .map((char, i) => (
              <span
                className="opacity-0"
                ref={(el) => (text2Refs.current[i] = el)}
              >
                {char}
              </span>
            ))}
        </p>
        <div className="top-[100vh] p-[30px] left-0 absolute z-10 h-screen w-full flex flex-col justify-evenly">
          <p className="text-white text-xl w-full text-center" ref={text3Ref}>
            I specialise in:
          </p>
          <div className="h-[60%] w-full relative">
            <SpecialtyCard
              ref={(el) => (cardRefs.current[0] = el)}
              title="Dynamic SVG charts"
              style={{ left: 0 }}
            >
              <BarChart />
            </SpecialtyCard>
            <SpecialtyCard
              title="Web applications"
              ref={(el) => (cardRefs.current[1] = el)}
            ></SpecialtyCard>
            <SpecialtyCard
              title="Custom animation"
              ref={(el) => (cardRefs.current[2] = el)}
            ></SpecialtyCard>
          </div>
        </div>
      </div>
    </main>
  );
};
