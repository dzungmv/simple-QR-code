/* eslint-disable @next/next/no-img-element */
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { fallbackImg } from '../../../public';

type ImageProps = {
    src?: string | StaticImageData;
    alt?: string;
    priority?: boolean;
    fallback?: string | StaticImageData;
};

const ImageCustom: React.FC<ImageProps> = ({
    src,
    alt = 'Image',
    priority = false,
}) => {
    const [imageSrc, setImageSrc] = useState<StaticImageData | string>(
        src || fallbackImg
    );
    return (
        <Image
            className='w-full h-full object-contain'
            src={imageSrc}
            onError={() => {
                setImageSrc(fallbackImg);
            }}
            alt={alt}
            width='0'
            height='0'
            sizes='100vw'
            priority={priority}
        />
    );
};

export default ImageCustom;
