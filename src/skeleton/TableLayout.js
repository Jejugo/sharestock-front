const TableLayout = ({ children }) => (
    <>
      <section className="layout-container">
        {children}
      </section>
  
      <style jsx>{`
        .layout-container{
          width: 70%;
          background-color: black;
          margin: 5% auto;
        }
      `}</style>
    </>
  )
  
  export default TableLayout