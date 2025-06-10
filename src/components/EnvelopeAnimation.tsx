import React, { useEffect, useRef } from 'react';
import envelopeBackNamed from '../assets/animation/envelope_back.png';
import envelopeBackground from '../assets/animation/envelope_background.png';
import envelopeFront from '../assets/animation/envelope_front.png';
import invitationImg from '../assets/animation/invitation.png';
import lidClosed from '../assets/animation/lid_closed.png';
import lidOpen from '../assets/animation/lid_open.png';

interface EnvelopeAnimationProps {
  guestName: string;
}

const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({ guestName }) => {
  const [imageReady, setImageReady] = React.useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const invitationRef = useRef<HTMLImageElement>(null);
  const lidRef = useRef<HTMLImageElement>(null);
  const envelopeBackRef = useRef<HTMLImageElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const hasRunAnimationRef = useRef(false);

  useEffect(() => {
    const isPhone = window.innerWidth <= 768;
    const envelope = envelopeRef.current;
    const lid = lidRef.current;
    const invitation = invitationRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !envelope || !lid || !invitation) return;

    const ctx = canvas.getContext('2d');
    const baseImage = new Image();

    const onloadHandler = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      ctx.font = '40px Georgia';
      ctx.fillStyle = '#3a2b1a';
      ctx.textAlign = 'center';
      ctx.fillText(`${guestName}`, canvas.width / 2, 400);
      envelopeBackRef.current!.src = canvas.toDataURL('image/png');
      setImageReady(true);

      if (!hasRunAnimationRef.current) {
        hasRunAnimationRef.current = true;
        if (isPhone) {
          runPhoneAnimation(envelope, lid, invitation);
        } else {
          runDesktopAnimation(envelope, lid, invitation);
        }
      }
    };

    baseImage.onload = onloadHandler;
    baseImage.src = envelopeBackNamed;

    return () => {
      baseImage.onload = null;
    };
  }, [guestName]);


  useEffect(() => {
    const envelope = envelopeRef.current;
    const container = document.querySelector('.animation-container') as HTMLElement;

    if (!envelope || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = envelope.getBoundingClientRect();
      const envelopeHeight = rect.height;
      const containerHeight = envelopeHeight * 2.7;

      container.style.height = `${containerHeight}px`;
      envelope.style.bottom = `${envelopeHeight * -0.4}px`;
    });

    resizeObserver.observe(envelope);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="animation-container flex items-center justify-center h-screen">
      <canvas ref={canvasRef} width={1200} height={800} style={{ display: 'none' }} />
      <div className="animation-wrapper">
        <div className="scene" style={{ visibility: imageReady ? 'visible' : 'hidden' }}>
          <div className="envelope" id="envelope" ref={envelopeRef}>
            <img ref={envelopeBackRef} className="envelope-back" alt="envelope back" style={{ display: imageReady ? 'block' : 'none' }} />
            <div className="front-envelope">
              <img src={envelopeBackground} className="envelope-background" alt="bg" />
              <img src={invitationImg} ref={invitationRef} className="invitation" id="invitation" alt="invitation" />
              <img src={envelopeFront} className="envelope-front" alt="envelope front" />
              <img src={lidClosed} ref={lidRef} className="lid" id="lid" alt="lid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeAnimation;


function runDesktopAnimation(
  envelope: HTMLDivElement,
  lid: HTMLImageElement,
  invitation: HTMLImageElement
) {
  setTimeout(() => {
    envelope!.style.transform = 'rotateY(180deg)';
  }, 1000);

  setTimeout(() => {
    lid!.style.transform = 'rotateX(-160deg)';
    // lidShadow!.style.opacity = '1';
    // lidShadow!.style.transform = 'rotateX(-180deg)';
    invitation!.style.opacity = '1';
  }, 4000);

  setTimeout(() => {
    lid!.src = lidOpen;
  }, 4600);

  setTimeout(() => {
    // lidShadow!.style.opacity = '0';
    lid!.style.zIndex = '2';
  }, 4800);

  setTimeout(() => {
    invitation!.style.top = '-55%';
    invitation!.style.transform = 'rotateZ(-90deg) scale(1)';
    invitation!.style.zIndex = '3';
  }, 6000);

  setTimeout(() => {
    invitation!.style.zIndex = '5';
    invitation!.style.transform = 'rotateZ(0deg) scale(1.3)';
    invitation!.style.top = '25%';
    invitation!.style.left = '50%';
  }, 7300);

  setTimeout(() => {
    invitation!.style.left = '100%';
  }, 9000);

  setTimeout(() => {
    window.scrollBy({
      top: window.innerHeight / 3,
      left: 0,
      behavior: 'smooth'
    });
  }, 11500);
}

function runPhoneAnimation(
  envelope: HTMLDivElement,
  lid: HTMLImageElement,
  invitation: HTMLImageElement
) {

  // Turn the Envelope around
  setTimeout(() => {
    envelope!.style.transform = 'rotateY(180deg)';
  }, 1000);

  // Open Lid first part.
  setTimeout(() => {
    lid!.style.transform = 'rotateX(-160deg)';
    invitation!.style.opacity = '1';
  }, 4000);

  // Open lid second part.
  setTimeout(() => {
    lid!.src = lidOpen;
  }, 4600);

  // Now lid is in the background.
  setTimeout(() => {
    lid!.style.zIndex = '2';
  }, 4800);

  // Starts coming out.
  setTimeout(() => {
    invitation!.style.top = '-55%';
    invitation!.style.transform = 'rotateZ(-90deg) scale(1)';
    invitation!.style.zIndex = '3';
  }, 6000);

  setTimeout(() => {
    invitation!.style.zIndex = '5';
    invitation!.style.transform = 'rotateZ(0deg) scale(1.3)';
    invitation!.style.top = '25%';
    invitation!.style.left = '50%';
  }, 7300);

  setTimeout(() => {
    invitation!.style.transform = 'rotateZ(0deg) scale(1.6)';
    invitation!.style.top = '38%';
    invitation!.style.left = '50%';
  }, 9000);
  setTimeout(() => {
    window.scrollBy({
      top: window.innerHeight / 3,
      left: 0,
      behavior: 'smooth'
    });
  }, 11500);
}
