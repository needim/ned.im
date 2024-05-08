import Polaroid, { polaroidVariants } from "@/components/blocks/polaroid";

type TImage = {
  src: string;
  variant: keyof typeof polaroidVariants;
};

const PolaroidGallery = ({ images }: { images: Array<TImage> }) => {
  return (
    <div className="grid grid-cols-12 items-center -gap-10 mt-2">
      {images.map((image) => (
        <Polaroid key={image.src} variant={image.variant} src={image.src} />
      ))}
    </div>
  );
};

export default PolaroidGallery;
