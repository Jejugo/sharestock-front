import React from 'react'
import Image from 'next/image'

interface ILandingPageLayout {
  children: React.ReactNode
}

export default function LandingPageLayout({ children }: ILandingPageLayout) {
  return (
    <section className="lendingPage">
      <section className="lendingPage__banner">
        <img
          src="https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg"
          alt="logo"
          width="100%"
          height="100%"
        />
        <section className="lendingPage__content">{children}</section>
      </section>
      <style>{`
                .lendingPage__banner{
                    position: relative;
                    background-color: black;
                    height: 99vh;
                    width: 100vw;
                }
                .lendingPage__content{
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: rgba(0, 0, 0, 0.2);
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                    width: 600px;
                    height: 100vh;
                    z-index: 999;
                }
            `}</style>
    </section>
  )
}
