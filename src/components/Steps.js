import React from "react";
import Arrows from "./Arrows"

export default function Steps(props) {
  const { steps, count, handleCountNext, handleCountPrev } = props;

  return (
    <div className="wrapper">
      <section className="steps">
        <h1 className="steps__title">{steps[count].title}</h1>
        <h1 className="steps__description">{steps[count].description}</h1>
        <div
          className="steps__explanation"
          dangerouslySetInnerHTML={{ __html: steps[count].explanation }}
        ></div>
      </section>
      <Arrows handleCountPrev={handleCountPrev} handleCountNext={handleCountNext}></Arrows>
      <style jsx>{`
        .wrapper {
          margin-top: 10%
        }
        .steps {
          margin: 0 auto;
          width: 80%;
          min-height: 50vh;
          max-height: 70vh;
          overflow-y:scroll;
          padding: 10px 0;
        }

        .steps__title {
          font-size: 40px;
          text-align: center;
          margin: 0
        }

        .steps__description {
          font-size: 20px;
          text-align: center;
        }

        .steps__explanation {
          font-size: 20px;
          text-align: justify;
        }
      `}</style>
    </div>
  );
}
