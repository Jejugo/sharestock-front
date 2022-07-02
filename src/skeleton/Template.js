import Head from 'next/head'
import Navbar from "../components/Navbar";

function Template({ tabTitle, children }) {
  return (
    <section className="template">
    <Navbar></Navbar>
    <div className="container">
      <Head>
        <title>{tabTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="main">
        { children }
      </main>
      <style>{`
        .container{
          width: 80%;
          float: right;
          height: 100vh;
        }
        .main{
          width: 90%;
          margin: 80px auto 0 auto;
          height: 100vh;
        }
      `}</style>
    </div>
    </section>
  )
}

export default Template
