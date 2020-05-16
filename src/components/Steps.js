import React from "react";

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
      <section className="step-taker">
        <div className="step-taker__prev" onClick={handleCountPrev}>
          {`<-`}
        </div>
        <div className="step-taker__next" onClick={handleCountNext}>
          {`->`}
        </div>
      </section>
      <style jsx>{`
        .steps {
          margin: 5% auto;
          width: 50%;
          min-height: 50vh;
        }

        .steps__title {
          font-size: 40px;
          text-align: center;
          margin: 100px;
        }

        .steps__description {
          font-size: 20px;
          text-align: center;
        }

        .steps__explanation {
          font-size: 20px;
          text-align: justify;
        }

        .next {
          left: 0;
          top: 45%;
          margin: 20px;
          position: absolute;
          border: 1px solid #ccc;
          cursor: pointer;
        }

        .prev {
          right: 0;
          top: 45%;
          margin: 20px;
          position: absolute;
          border: 1px solid #ccc;
          cursor: pointer;
        }

        .step-taker {
          display: flex;
          justify-content: space-around;
          font-size: 30px;
        }

        .step-taker__next {
          cursor: pointer;
        }

        .step-taker__prev {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
