const definitionsList = [
  {
    id: 1,
    alias: "P/L",
    name: "Preço / Lucro",
    definition:
      "É um índice que revela o preço de mercado de uma ação naquele momento (sua cotação), dividido pelo seu lucro por ação nos últimos 12 meses (LPA). Na teoria, quanto menor o valor deste índice quando comparado a outras ações melhor as expectativas do mercado em relação à mesma. Porém, se este índice estiver muito baixo (geralmente menor que 3x), isto poderia indicar baixa expectativa de manter esse lucro no futuro",
    showDef: false,
  },
  {
    id: 2,
    alias: "DY",
    name: "Dividend Yield",
    definition:
      "um indicador que mede a performance da empresa de acordo com os proventos pagos aos seus acionistas. Ele mostra a relação entres os dividendos distribuídos e o preço atual da ação da empresa.",
    showDef: false,
  },
  {
    id: 3,
    alias: "EV/EBITDA",
    name: "Evaluation / EBITDA",
    definition:
      "Mede a relação entre Enterprise Value e EBITIDA (Lucros antes de juros, depreciação e amortização). Quanto maior o número, maior o Evaluation || menor o lucro. Quanto menor o número menor o Evaluation || maior o lucro. ",
    showDef: false,
  },
  {
    id: 4,
    alias: "P/EBITDA",
    name: "Preço / EBITDA",
    definition:
      "o analisar esse indicador, o investidor consegue identificar se o preço das ações da empresa está dentro do que ele espera ou não. Se o resultado da proporção for menor do que o estimado, isso indica que o preço da ação está barato em relação ao lucro gerado. Portanto, é o momento ideal para comprar. Já no caso onde a proporção encontrada for maior que o limite estabelecido, o preço de cada ação não está alinhado com o lucro gerado, logo, o ideal é vender.",
    showDef: false,
  },
  {
    id: 5,
    alias: "P/VP",
    name: "Preço / Valor Patrimonial",
    definition:
      "Indica quanto os acionistas topam pagar, no momento, pelo patrimônio líquido da companhia.",
    showDef: false,
  },
  {
    id: 6,
    alias: "ROE",
    name: "Return on Equity",
    definition:
      "Este indicador financeiro serve para medir o quanto que a empresa gera de lucro para cada real aplicado pelo acionista na empresa. Isto é, a capacidade da empresa de agregar valor (gerar retorno) para o capital próprio investido.",
    showDef: false,
  },
  {
    id: 7,
    alias: "ROIC",
    name: "Return on Invested Capital",
    definition:
      "ROIC é similar ao ROE, porém o segundo refere-se apenas ao retorno sobre o capital próprio, enquanto o ROIC refere-se ao retorno sobre o capital total investido – soma do capital próprio e do capital de terceiros.",
    showDef: false,
  },
  {
    id: 8,
    alias: "Div. Liq.",
    name: "Dívida Líquida",
    definition:
      "É a Dívida Bruta descontada das disponibilidades e aplicações da empresa. Em outras palavras, é a Dívida Total da companhia menos o caixa (do Balanço).",
    showDef: false,
  },
  {
    id: 9,
    alias: "DL/EBITDA",
    name: "Divída Líquida / EBITDA",
    definition:
      "Ela dá ao investidor a noção de quanto tempo levaria (anos) para uma empresa pagar a sua dívida, caso a Dívida Líquida e o EBITDA se mantenha constantes. E também, indica o grau de endividamento da companhia, sendo quanto menor o múltiplo, mais saudável e sustentável se encontra a relação da dívida com o EBITDA",
  },
  {
    id: 10,
    alias: "DL/PL",
    name: "Dívida Líquida / Patrimônio Líquido ",
    definition:
      "Este índice é definido como Dívida Líquida sobre Patrimônio Líquido e, resumidamente, serve para medir o quanto do patrimônio líquido da empresa equivale a sua dívida líquida.",
    showDef: false,
  },
  {
    id: 11,
    alias: "Marg. Brut.",
    name: "Margem Bruta",
    definition:
      "Retorna o valor de quanto a empresa está gerando resultado diante de sua atividade",
  },
  {
    id: 12,
    alias: "Marg. Líq.",
    name: "Margem Líquida",
    definition: "Mede a fração de cada real que resultou em lucro líquido",
  },
  {
    id: 13,
    alias: "Líq. Corr.",
    name: "Liquidez Corrente",
    definition:
      "A liquidez corrente é essencial para diagnosticar a saúde financeira de uma companhia. Mas, de forma mais pessoal, é de extrema valia para que o investidor possa mensurar a possibilidade de receber ou não proventos no futuro, se esse for o seu objetivo com o investimento. ",
    showDef: false,
  },
  {
    id: 14,
    alias: "EBITDA",
    name: "Earnings Before Interest, Taxes, Depreciation and Amortization",
    definition:
      "Lucro antes de pagar taxas, juros, depreciações e amortizações",
    showDef: false,
  },
];

module.exports = {
  definitionsList,
};
