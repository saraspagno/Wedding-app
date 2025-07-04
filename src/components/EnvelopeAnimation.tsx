import React, { useEffect, useRef } from 'react';
import envelopeBackNamed from '../assets/animation/envelope_back.png';
import envelopeBackground from '../assets/animation/envelope_background.png';
import envelopeFront from '../assets/animation/envelope_front.png';
import invitationImg from '../assets/animation/invitation.png';
import lidClosed from '../assets/animation/lid_closed.png';
import lidOpen from '../assets/animation/lid_open.png';

interface EnvelopeAnimationProps {
  guestName: string;
  onReady?: () => void;
  loadingComplete?: boolean;
}

const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({ guestName, onReady, loadingComplete = false }) => {
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
      ctx.font = '43px Georgia';
      ctx.fillStyle = '#3a2b1a';
      ctx.textAlign = 'center';
      ctx.fillText(`${guestName}`, canvas.width / 2, 400);
      envelopeBackRef.current!.src = canvas.toDataURL('image/png');
      setImageReady(true);
      onReady?.();

      if (!hasRunAnimationRef.current && loadingComplete) {
        hasRunAnimationRef.current = true;
        if (isPhone) {
          runCommonAnimation(envelope, lid, invitation, 'rotateZ(0deg) scale(1.6)', '38%', '50%');
        } else {
          runCommonAnimation(envelope, lid, invitation, 'rotateZ(0deg) scale(1.3)', '25%', '100%');
        }
      }
    };

    baseImage.onload = onloadHandler;
    baseImage.src = envelopeBackNamed;

    return () => {
      baseImage.onload = null;
    };
  }, [guestName, onReady, loadingComplete]);

  // Handle case where image is ready but loadingComplete becomes true later
  useEffect(() => {
    if (imageReady && loadingComplete && !hasRunAnimationRef.current) {
      const isPhone = window.innerWidth <= 768;
      const envelope = envelopeRef.current;
      const lid = lidRef.current;
      const invitation = invitationRef.current;

      if (!envelope || !lid || !invitation) return;

      hasRunAnimationRef.current = true;
      if (isPhone) {
        runCommonAnimation(envelope, lid, invitation, 'rotateZ(0deg) scale(1.6)', '38%', '50%');
      } else {
        runCommonAnimation(envelope, lid, invitation, 'rotateZ(0deg) scale(1.3)', '25%', '100%');
      }
    }
  }, [imageReady, loadingComplete]);

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
        <div className="scene">
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

function runCommonAnimation(
  envelope: HTMLDivElement,
  lid: HTMLImageElement,
  invitation: HTMLImageElement,
  finalTransform: string,
  finalTop: string,
  finalLeft: string,
  startDelay: number = 1000
) {
  let time = startDelay;

  setTimeout(() => {
    envelope!.style.transform = 'rotateY(180deg)';
  }, time);

  time += 3000;
  setTimeout(() => {
    lid!.style.transform = 'rotateX(-160deg)';
    invitation!.style.opacity = '1';
  }, time);

  time += 600;
  setTimeout(() => {
    lid!.src = lidOpen;
  }, time);

  time += 200;
  setTimeout(() => {
    lid!.style.zIndex = '2';
  }, time);

  time += 1200;
  setTimeout(() => {
    invitation!.style.top = '-55%';
    invitation!.style.transform = 'rotateZ(-90deg) scale(1)';
    invitation!.style.zIndex = '3';
  }, time);

  time += 1300;
  setTimeout(() => {
    invitation!.style.zIndex = '5';
    invitation!.style.transform = 'rotateZ(0deg) scale(1.3)';
    invitation!.style.top = '25%';
    invitation!.style.left = '50%';
  }, time);

  time += 2000;
  setTimeout(() => {
    invitation!.style.transform = finalTransform;
    invitation!.style.top = finalTop;
    invitation!.style.left = finalLeft;
  }, time);

  time += 3000;
  setTimeout(() => {
    window.scrollBy({
      top: window.innerHeight / 3,
      left: 0,
      behavior: 'smooth'
    });
  }, time);
}
