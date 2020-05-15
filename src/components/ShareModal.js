import React from "react";

export default function ShareModal({ data, hideModal }) {
  return (
    <>
      <div className="modal">
	  <div className="close" onClick={hideModal}> X </div>
				<section className="modal__container">
					<div className="modal__share_container">
						<h1 className="modal__share">{data["Papel"]}</h1>
					</div>
					<h3 className="modal__share_calc">Cálculo de Evaluation</h3>
				</section>
			</div>
			<style jsx>{`
				.modal{
					opacity: 1;
					height: 50%;
					width: 30%;
					bottom: 10%;
					top: 20%;
					left: 35%;
					background-color: black;
					position: fixed;
					border: 1px solid #ccc;
				}

				.modal__share{
					font-size: 25px;
					text-align: center;
				}

				.modal__share_container{
					margin-bottom: 85px;
				}

				.modal__share_calc:hover{
					border: 1px solid #ccc;
					background-color: blue;
					height: auto;
					width: auto;
					transition: 0.5s ease;
				}

				.modal__share_calc{
					padding: 10px
				}

				.modal__container{
					width: 80%;
					padding: 2% 0;
					margin: 0 auto;
				}

				.close{
					float: right;
					cursor: pointer;
					margin: 30px;
				}
			`}</style>
    </>
  );
}
