// Estate Matrix - Luxury Mortgage & Investment Engine

class MortgageCalculator {
  constructor() {
    this.price = 245000000; // Default ₹24.5 Cr
    this.downPaymentPercent = 20; // 20%
    this.tenureYears = 20;
    this.interestRate = 8.5; // 8.5%
    this.currentCurrency = "INR";
    this.locationKey = "mumbai";
  }

  setValues({ price, downPaymentPercent, tenureYears, interestRate, currency, locationKey }) {
    if (price !== undefined) this.price = Number(price);
    if (downPaymentPercent !== undefined) this.downPaymentPercent = Number(downPaymentPercent);
    if (tenureYears !== undefined) this.tenureYears = Number(tenureYears);
    if (interestRate !== undefined) this.interestRate = Number(interestRate);
    if (currency !== undefined) this.currentCurrency = currency;
    if (locationKey !== undefined) this.locationKey = locationKey;
  }

  calculate() {
    const downPaymentAmount = (this.price * this.downPaymentPercent) / 100;
    const principal = this.price - downPaymentAmount;
    const monthlyRate = this.interestRate / (12 * 100);
    const totalMonths = this.tenureYears * 12;

    let emi = 0;
    if (monthlyRate > 0) {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      emi = principal / totalMonths;
    }

    const totalRepayment = emi * totalMonths;
    const totalInterest = totalRepayment - principal;

    // Stamp duty rates by location
    const stampDutyRates = {
      mumbai: 0.06,    // 6% (Maharashtra)
      dubai: 0.04,     // 4% (DLD Transfer fee)
      bangalore: 0.056,// 5.6% (Karnataka)
      goa: 0.05        // 5% (Goa)
    };
    const stampRate = stampDutyRates[this.locationKey] || 0.05;
    const stampDutyEstimate = this.price * stampRate;

    // First 5 years amortization summary
    const amortization = [];
    let balance = principal;
    for (let yr = 1; yr <= Math.min(5, this.tenureYears); yr++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      for (let m = 1; m <= 12; m++) {
        const mInterest = balance * monthlyRate;
        const mPrincipal = emi - mInterest;
        yearlyInterest += mInterest;
        yearlyPrincipal += mPrincipal;
        balance -= mPrincipal;
        if (balance < 0) balance = 0;
      }
      amortization.push({
        year: yr,
        yearlyPrincipal,
        yearlyInterest,
        endingBalance: balance
      });
    }

    return {
      price: this.price,
      downPaymentPercent: this.downPaymentPercent,
      downPaymentAmount,
      principal,
      tenureYears: this.tenureYears,
      totalMonths,
      interestRate: this.interestRate,
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalRepayment: Math.round(totalRepayment),
      stampDutyEstimate: Math.round(stampDutyEstimate),
      stampRatePercent: (stampRate * 100).toFixed(1),
      principalPercent: Math.round((principal / (principal + totalInterest)) * 100),
      interestPercent: Math.round((totalInterest / (principal + totalInterest)) * 100),
      amortization
    };
  }

  formatCurrency(value, currencyCode = this.currentCurrency) {
    const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.INR;
    return config.format(value);
  }
}

// Global singleton instance
window.mortgageCalculator = new MortgageCalculator();
