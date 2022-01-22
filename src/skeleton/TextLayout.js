const TextLayout = ({ children }) => (
  <>
    <section className="layout-container">
      {children}
    </section>

    <style jsx>{`
      .layout-container{
        width: 60%;
        height: 100vh;
        background-color: #222222;
        margin: 0 auto;
        overflow: auto;
      }
    `}</style>
  </>
)

export default TextLayout