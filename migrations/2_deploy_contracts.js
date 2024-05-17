const RecetaMedica = artifacts.require("RecetaMedica");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(RecetaMedica, "0x99b17360F0D53D2a12B031619123C6139AaD5399", "0x3640798D6286Ab55f4860a331f6c76335421Dea5", "InitialMedicamento");
};