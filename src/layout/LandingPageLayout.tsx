import React from 'react'

interface ILandingPageLayout {
  children: React.ReactNode
}

export default function LandingPageLayout({ children }: ILandingPageLayout) {
  return (
    <section className="lendingPage">
      <section className="lendingPage__banner">
        <h1 className="lendingPage__banner_title">Sharestock App</h1>
      </section>
      <section className="lendingPage__content">{children}</section>
      <style>{`
                .lendingPage{
                    display:flex;
                }
                .lendingPage__banner{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: black;
                    height: 100vh;
                    width: 60vw;
                }
                .lendingPage__banner_title{
                    font-size: 50px;
                    text-align: center;
                    line-height: 50px;
                    width: 30%;
                }
                .lendingPage__content{
                    background-color: #262626;
                    width: 40vw;
                }
            `}</style>
    </section>
  )
}
