import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function Arrows({ handleCountNext, handleCountPrev }){
  return (
    <section className="arrow-wrapper">
      <div className="arrow">
        <div className="arrow__prev" onClick={handleCountPrev}>
          <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        </div>
        <div className="arrow__next" onClick={handleCountNext}>
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </div>
      </div>
      <style jsx>{`
        .arrow-wrapper{
            position: absolute;
            top: 20%;
            width: 60%;
        }
        .arrow {
          display: flex;
          justify-content: space-around;
          font-size: 30px;
        }

        .arrow__next {
            padding: 25% 30px;
            position: absolute;
            cursor: pointer;
            right: 0;
        }

        .arrow__prev {
            padding: 25% 30px;
            position: absolute;
            cursor: pointer;
            left: 0;
        }

        .arrow__next:hover{
          background-color: #222;
          background-image: linear-gradient(90deg, #222 0%, #111 100%);
          //opacity: 0.1
        }

        .arrow__prev:hover{
          background-color: #222;
          background-image: linear-gradient(-90deg, #222 0%, #111 100%);
          //opacity: 0.1

        }
      `}</style>
    </section>
  );
};
