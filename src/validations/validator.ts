export default {
  crescimento5Anos: {
    good: {
      lowerLimit: 0
    },
    alert: {
      lowerLimit: -1,
      upperLimit: 0
    },
    bad: {
      // from -1 to negative infinite
      upperLimit: -1
    }
  },
  dividendYield: {
    good: {
      lowerLimit: 0.05
    },
    alert: {
      lowerLimit: 0,
      upperLimit: 0.05
    },
    bad: {
      // from 0 to negative infinite
      upperLimit: 0
    }
  },
  'dividaBruta/pl': {
    good: {
      upperLimit: 1.15
    },
    alert: {
      lowerLimit: 1.15,
      upperLimit: 2
    },
    bad: {
      lowerLimit: 2
    }
  },
  liquidezCorrente: {
    // from 1 to infinite
    good: {
      lowerLimit: 1
    },
    // from 0 to 1
    alert: {
      lowerLimit: 0,
      upperLimit: 1
    },
    bad: {
      // from 0 to negative infinite
      upperLimit: 0
    }
  },
  margemLiquida: {
    good: {
      // from 0.1 to infinite
      lowerLimit: 0.1
    },
    alert: {
      // from 0 to 0.1
      lowerLimit: 0,
      upperLimit: 0.1
    },
    bad: {
      // from 0 to negative infinite
      upperLimit: 0
    }
  },
  roe: {
    good: {
      lowerLimit: 0.1
    },
    alert: {
      lowerLimit: 0,
      upperLimit: 0.1
    },
    bad: {
      upperLimit: 0
    }
  },
  'p/vp': {
    good: {
      // from 0 to 1
      upperLimit: 1.5,
      lowerLimit: 0
    },
    alert: {
      // from 1 to 3
      lowerLimit: 1.5,
      upperLimit: 3
    },
    bad: {
      // more than 3
      upperLimit: 3,
      lowerLimit: 0
    }
  },
  'p/l': {
    good: {
      // from 0 to 15
      lowerLimit: 0,
      upperLimit: 15
    },
    alert: {
      // from 15 to 20
      lowerLimit: 15,
      upperLimit: 20
    },
    bad: {
      // more than 20
      lowerLimit: 20,
      upperLimit: 0
    }
  }
}
