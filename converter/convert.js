function traditionalToImperial(amount) {
    var result = amount * 3.6;
    return `${result} lbs in ${amount} peittha`;
}

function imperialToTraditional(amount) {
    var result = (amount / 3.6).toFixed(2).split('.');
    return `${result[0]} peittha and ${result[1]} kyattha in ${amount} lbs`;
}

module.exports = {
    traditionalToImperial,
    imperialToTraditional
}
