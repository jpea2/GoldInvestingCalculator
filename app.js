// Configure Decimal.js for higher precision
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

function calculatePremium() {
    const marketPrice = new Decimal(document.getElementById('marketPrice').value);
    const buyingPrice = new Decimal(document.getElementById('buyingPrice').value);
    const weightElement = document.getElementById('weight');
    const weightInGrams = new Decimal(weightElement.value);
    
    // Get the selected option's text to check if it's a fractional ounce
    const weightText = weightElement.options[weightElement.selectedIndex].text;
    
    console.log('Input Values:', {
        marketPrice: marketPrice.toString(),
        buyingPrice: buyingPrice.toString(),
        weight: weightText
    });

    if (marketPrice.isNaN() || buyingPrice.isNaN() || weightInGrams.isNaN() || weightInGrams.lte(0)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    // Calculate price per ounce based on whether it's a fractional ounce or gram weight
    let pricePerOunce;
    if (weightText.includes('oz')) {
        // For ounce measurements, directly calculate the multiplier
        const multiplier = weightText.includes('1/2') ? 2 :
                          weightText.includes('1/4') ? 4 : 1;
        pricePerOunce = buyingPrice.times(multiplier);
    } else {
        // For gram measurements, use the gram to troy ounce conversion
        pricePerOunce = buyingPrice.div(weightInGrams).times(new Decimal('31.1035'));
    }

    console.log('Price per ounce calculation:', {
        pricePerOunce: pricePerOunce.toString()
    });

    const dollarSpread = pricePerOunce.minus(marketPrice);
    console.log('Spread calculation:', {
        dollarSpread: dollarSpread.toString()
    });

    // If the spread is very small (less than 1 cent), consider it zero
    const finalDollarSpread = dollarSpread.abs().lessThan('0.01') ? new Decimal(0) : dollarSpread;
    const percentageDifference = finalDollarSpread.div(marketPrice).times(100);

    console.log('Final calculations:', {
        finalDollarSpread: finalDollarSpread.toString(),
        percentageDifference: percentageDifference.toString()
    });

    // Clear initial text
    document.getElementById('dollarSpread').textContent = '';
    document.getElementById('percentageDifference').textContent = '';

    // Display results with appropriate rounding
    // Only show 2 decimal places in display, but maintain precision in calculations
    document.getElementById('dollarSpread').textContent = `$${finalDollarSpread.toFixed(2)}`;
    
    // If the percentage is very close to zero (less than 0.001%), display as exactly 0.00%
    const percentageDisplay = percentageDifference.abs().lessThan('0.001') ? '0.00' : percentageDifference.toFixed(2);
    document.getElementById('percentageDifference').textContent = `${percentageDisplay}%`;
}

// Make the function globally accessible
window.calculatePremium = calculatePremium;