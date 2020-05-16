import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Steps from "../components/Steps";
import Layout from "../skeleton/layout";
import Fonts from '../components/Fonts';

import { stockShareAnalysis } from '../const/definitions'

export default class HowToStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
			steps: stockShareAnalysis,
			count: 0
		};
		
		this.handleCountNext = this.handleCountNext.bind(this)
		this.handleCountPrev = this.handleCountPrev.bind(this)
	}
  
  componentDidMount(){
    Fonts()
  }
  
	handleCountNext(){
		const { count, steps } = this.state
		if (count < steps.length - 1)
			this.setState(previousState => ({
				count: previousState.count + 1
			}))
	}

	handleCountPrev(){
		const { count } = this.state
		if(count !== 0)
			this.setState(previousState => ({
				count: previousState.count - 1
			}))
		
	}

  render() {
    const { steps, count } = this.state;

    return (
      <>
        <section className="how-to-start">
          <Navbar />
          <Layout>
            <Steps steps={steps} count={count} handleCountNext={this.handleCountNext} handleCountPrev={this.handleCountPrev}></Steps>
          </Layout>
        </section>
        <style jsx global>{`
          body,
          html {
            margin: 0px;
            color: white;
            background-color: #000000;
            font-family: 'Baloo Bhaina 2', cursive;
            font-style: normal;
            font-display: swap;
            line-height: 22pt
          }
        `}</style>
      </>
    );
  }
}
