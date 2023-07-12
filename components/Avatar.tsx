import Image from "next/image";
import React from "react";

type Props = {
  url: string;
};

const Avatar: React.FC<Props> = ({ url }) => {
  return (
    <Image
      height={64}
      width={64}
      quality={100}
      className="inline-block rounded-full mx-auto"
      src={url}
      alt="Avatar"
    />
  );
};

export default Avatar;
