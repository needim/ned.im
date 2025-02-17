import { IconTriangleFilled } from '@tabler/icons-react';

interface DeployButtonProps {
  url: string;
  platform: 'vercel' | 'railway' | 'netlify' | 'heroku' | 'zeabur' | 'sealos' | 'digitalocean' | 'huggingface';
  className?: string;
}

const platformConfig = {
  vercel: {
    image: 'https://vercel.com/button',
    alt: 'Deploy with Vercel'
  },
  railway: {
    image: 'https://railway.app/button.svg',
    alt: 'Deploy on Railway'
  },
  netlify: {
    image: 'https://www.netlify.com/img/deploy/button.svg',
    alt: 'Deploy to Netlify'
  },
  heroku: {
    image: 'https://www.herokucdn.com/deploy/button.svg',
    alt: 'Deploy to Heroku'
  },
  zeabur: {
    image: 'https://zeabur.com/button.svg',
    alt: 'Deploy on Zeabur'
  },
  sealos: {
    image: 'https://raw.githubusercontent.com/labring-actions/templates/main/Deploy-on-Sealos.svg',
    alt: 'Deploy on Sealos'
  },
  digitalocean: {
    image: 'https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg',
    alt: 'Deploy on DigitalOcean'
  },
  huggingface: {
    image: 'https://huggingface.co/datasets/huggingface/badges/raw/main/deploy-to-spaces-lg.svg',
    alt: 'Deploy to HF Spaces'
  }
};

export function DeployButton({ url, platform, className }: DeployButtonProps) {
  const config = platformConfig[platform];
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`!inline-flex !items-center hover:!opacity-80 transition-opacity !mr-2 !mb-2 ${className || ''}`}
    >
      <img
        src={config.image}
        alt={config.alt}
        style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
        className="!border-0 !m-0 !p-0 !shadow-none !ring-0"
      />
    </a>
  );
} 