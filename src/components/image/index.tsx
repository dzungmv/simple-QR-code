import Image from 'next/image';

type ImageProps = {
    src: string;
    alt?: string;
    priority?: boolean;
};

const ImageCustom: React.FC<ImageProps> = ({
    src,
    alt = 'Image',
    priority = false,
}) => {
    return (
        <Image
            className='w-full h-full object-contain'
            src={src}
            alt={alt}
            width='0'
            height='0'
            sizes='100vw'
            priority={priority}
        />
    );
};

export default ImageCustom;
