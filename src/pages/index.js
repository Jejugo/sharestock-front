import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Steps from "../components/Steps";
import Layout from "../skeleton/layout";
import Fonts from '../components/Fonts';

const steps = [
  {
    id: 1,
    show: false,
    title: "Análise Macroeconômica",
    description:
      "Indicadores macroeconômicos são muito importantes para avaliar as premissas de uma análise fundamentalista. É importante identificar quais setores no Brasil mais crescem e quais as perspectivas a longo prazo de cada um deles.",
  },
  {
    id: 2,
    show: true,
    title: "Análise Qualitativa",
    description:
      "Encontre uma empresa/ativo que você vê considera promissor e/ou que você admira e se identifica. Após isso faça uma pesquisa sobre a Goverança/Gerência dessa empresa.",
		explanation: "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A governança corporativa é essencial para que os interesses entre todos os envolvidos no negócios, incluindo gestores, sócios e acionistas majoritários e minoritários sejam ajustados. Benefícios da Governança Corporativa: <b>Aperfeiçoamento da Gestão</b>, <b>Melhores resultados</b>, </b>Melhora a imagem do negócio, <b>Desperta o interesse de novos investidores</b>, <b>Atrai e conserva talentos</b>, <b>Coordena conflitos e interesses</b> e <b>Evita Fraudes</b><br><br>Seus princípios são: <ol><li>Transparência</li><li>Equidade</li><li>Accountability</li><li>Responsabilidade Corporativa</li></ol><br>A classificação de empresas são feitas baseadas em 5 Níveis vistos com <b>bons olhos</b>: <br><ol><li>Novo Mercado</li><li>Nível 2</li><li>Nível 1</li><li>Bovespa Mais</li><li>Bovespa Mais Nível 2</li></ol><br>Além desses Níveis também existem indíces capazes de mostrar ainda mais:<br><ol><li>Índice de Governança Corporativa Diferenciada (IGCX)</li><li>Índice de ações com Tag Along diferenciado(ITAG)</li><li>Índice de Governança Corporativa Trade (IGCT)</li><li>Índice de Governança Corporativa - Novo Mercado (IGC-NM)</li></ol></p>"
		},
  {
    id: 3,
    show: false,
    title: "Análise Quatitaivas",
    description:
      "Esse é o momento de se avaliar o resultado financeiro da empresa: margens operacionais, rentabilidade e endividamento são alguns dos fatores avaliados.",
  },
  {
    id: 4,
    show: false,
    title: "Demonstrações Financeiras",
    explanation:
      "Deve haver um estudo sobre as demonstrações financeiras da empresa a ser aplicada como: <br><ul><li>Balanço Patrimonial</li><li>DRE: Demonstração de Resultado de Exercício.</li></ul><br>No Balanço Patrimonial podemos acompanhar a situação da empresa naquele determinado momento.<br>Já no DRE conseguimos ver: <ol><li>Retorno sobre ativos</li><li>Retorno sobre Patrimônio Líquido</li><li>Margem Líquida da Empresa</li><li>Alavancagem Financeira</li></ul>",
	},
];

export default class HowToStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
			steps,
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
            line-height: 20pt
          }
        `}</style>
      </>
    );
  }
}
