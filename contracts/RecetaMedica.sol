// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract RecetaMedica {
    // Dirección del médico
    address public doctor;

    // Dirección del paciente
    address public paciente;

    // Medicamento prescrito
    string public medicamento;

    // Fecha de prescripción
    uint256 public fechaPrescripcion;

    // Código aleatorio de 6 cifras
    uint256 public codigoAleatorio;

    // Constructor del contrato
    constructor(
        address _doctor,
        address _paciente,
        string memory _medicamento
    ) {
        doctor = _doctor;
        paciente = _paciente;
        medicamento = _medicamento;
        fechaPrescripcion = block.timestamp;

        // Genera un código aleatorio de 6 cifras y lo asigna al contrato
        codigoAleatorio = uint256(
            100000 +
                (uint256(
                    keccak256(abi.encodePacked(block.timestamp, msg.sender))
                ) % 900000)
        );
    }

    // Función para obtener el código aleatorio
    function obtenerCodigoAleatorio() public view returns (uint256) {
        return codigoAleatorio;
    }

    // Función para verificar la validez de la receta
    function esValida() public view returns (bool) {
        return msg.sender == doctor;
    }
}
