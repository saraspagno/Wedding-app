import React, { useEffect, useRef } from 'react';
import envelopeBackNamed from '../assets/animation/envelope_back.png';
import envelopeBackground from '../assets/animation/envelope_background.png';
import envelopeFront from '../assets/animation/envelope_front.png';
import invitationImg from '../assets/animation/invitation.png';
import lidClosed from '../assets/animation/lid_closed.png';
import lidOpen from '../assets/animation/lid_open.png';
import lidShadow from '../assets/animation/lid_shadow.png';

interface EnvelopeAnimationProps {
  guestName: string;
}

const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({ guestName }) => {
  const [imageReady, setImageReady] = React.useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const invitationRef = useRef<HTMLImageElement>(null);
  const lidRef = useRef<HTMLImageElement>(null);
  const lidShadowRef = useRef<HTMLImageElement>(null);
  const envelopeBackRef = useRef<HTMLImageElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const envelope = envelopeRef.current;
    const lid = lidRef.current;
    const lidShadow = lidShadowRef.current;
    const invitation = invitationRef.current;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const baseImage = new Image();
      baseImage.src = envelopeBackNamed;

      baseImage.onload = () => {
        if (!ctx) return;
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.font = '40px Georgia';
        ctx.fillStyle = '#3a2b1a';
        ctx.textAlign = 'center';
        ctx.fillText(`${guestName}`, canvas.width / 2, 400);
        envelopeBackRef.current!.src = canvas.toDataURL('image/png');
        setImageReady(true);

        setTimeout(() => {
          envelope!.style.transform = 'rotateY(180deg)';
        }, 1000);
    
        setTimeout(() => {
          lid!.style.transform = 'rotateX(-160deg)';
          lidShadow!.style.opacity = '1';
          lidShadow!.style.transform = 'rotateX(-180deg)';
          invitation!.style.opacity = '1';
        }, 4000);
    
        setTimeout(() => {
          lid!.src = lidOpen;
        }, 4600);
    
        setTimeout(() => {
          lidShadow!.style.opacity = '0';
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
      };
    }
  }, [guestName]);

  useEffect(() => {
    const envelope = envelopeRef.current;
    const container = document.querySelector('.animation-container') as HTMLElement;
  
    if (!envelope || !container) return;
  
    const resizeObserver = new ResizeObserver(() => {
      const rect = envelope.getBoundingClientRect();
      const envelopeHeight = rect.height;
      const containerHeight = envelopeHeight * 2.5;
  
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
      <canvas ref={canvasRef} width={1200} height={800} style={{ display: 'none' }}/>
      <div className="animation-wrapper">
      <div className="scene" style={{ visibility: imageReady ? 'visible' : 'hidden' }}>
        <div className="envelope" id="envelope" ref={envelopeRef}>
          <img ref={envelopeBackRef} className="envelope-back" alt="envelope back" style={{ display: imageReady ? 'block' : 'none' }}/>
          <div className="front-envelope">
            <img src={envelopeBackground} className="envelope-background" alt="bg" />
            <img src={invitationImg} ref={invitationRef} className="invitation" id="invitation" alt="invitation" />
            <img src={lidShadow} ref={lidShadowRef} className="lid-shadow" alt="lid shadow" />
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
