'use client'
import React from 'react';
import dynamic from "next/dynamic";
import LoadingSpinner from '../../../../public/animations/LoginLottie.json';

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const LoginLottie = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: LoadingSpinner,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie options={options} height={600} width={600} />
    </div>
  );
};

export default LoginLottie;
