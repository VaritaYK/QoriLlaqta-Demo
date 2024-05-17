document.addEventListener("DOMContentLoaded", async function () {
  const web3 = new Web3("http://127.0.0.1:7545"); // Conecta a Ganache localmente

  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_doctor",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_paciente",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_medicamento",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "codigoAleatorio",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "doctor",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "fechaPrescripcion",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "medicamento",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "paciente",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "obtenerCodigoAleatorio",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "esValida",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

  const bytecode = '0x608060405234801562000010575f80fd5b5060405162000ca438038062000ca4833981810160405281019062000036919062000310565b825f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060029081620000c69190620005bf565b5042600381905550620dbba04233604051602001620000e792919062000714565b604051602081830303815290604052805190602001205f1c6200010b919062000770565b620186a06200011b9190620007d4565b6004819055505050506200080e565b5f604051905090565b5f80fd5b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f62000166826200013b565b9050919050565b62000178816200015a565b811462000183575f80fd5b50565b5f8151905062000196816200016d565b92915050565b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b620001ec82620001a4565b810181811067ffffffffffffffff821117156200020e576200020d620001b4565b5b80604052505050565b5f620002226200012a565b9050620002308282620001e1565b919050565b5f67ffffffffffffffff821115620002525762000251620001b4565b5b6200025d82620001a4565b9050602081019050919050565b5f5b83811015620002895780820151818401526020810190506200026c565b5f8484015250505050565b5f620002aa620002a48462000235565b62000217565b905082815260208101848484011115620002c957620002c8620001a0565b5b620002d68482856200026a565b509392505050565b5f82601f830112620002f557620002f46200019c565b5b81516200030784826020860162000294565b91505092915050565b5f805f606084860312156200032a576200032962000133565b5b5f620003398682870162000186565b93505060206200034c8682870162000186565b925050604084015167ffffffffffffffff81111562000370576200036f62000137565b5b6200037e86828701620002de565b9150509250925092565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680620003d757607f821691505b602082108103620003ed57620003ec62000392565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302620004517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000414565b6200045d868362000414565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f620004a7620004a16200049b8462000475565b6200047e565b62000475565b9050919050565b5f819050919050565b620004c28362000487565b620004da620004d182620004ae565b84845462000420565b825550505050565b5f90565b620004f0620004e2565b620004fd818484620004b7565b505050565b5b818110156200052457620005185f82620004e6565b60018101905062000503565b5050565b601f82111562000573576200053d81620003f3565b620005488462000405565b8101602085101562000558578190505b62000570620005678562000405565b83018262000502565b50505b505050565b5f82821c905092915050565b5f620005955f198460080262000578565b1980831691505092915050565b5f620005af838362000584565b9150826002028217905092915050565b620005ca8262000388565b67ffffffffffffffff811115620005e657620005e5620001b4565b5b620005f28254620003bf565b620005ff82828562000528565b5f60209050601f83116001811462000635575f841562000620578287015190505b6200062c8582620005a2565b8655506200069b565b601f1984166200064586620003f3565b5f5b828110156200066e5784890151825560018201915060208501945060208101905062000647565b868310156200068e57848901516200068a601f89168262000584565b8355505b6001600288020188555050505b505050505050565b5f819050919050565b620006c1620006bb8262000475565b620006a3565b82525050565b5f8160601b9050919050565b5f620006df82620006c7565b9050919050565b5f620006f282620006d3565b9050919050565b6200070e62000708826200015a565b620006e6565b82525050565b5f620007218285620006ac565b602082019150620007338284620006f9565b6014820191508190509392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f6200077c8262000475565b9150620007898362000475565b9250826200079c576200079b62000743565b5b828206905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f620007e08262000475565b9150620007ed8362000475565b9250828201905080821115620008085762000807620007a7565b5b92915050565b610488806200081c5f395ff3fe608060405234801561000f575f80fd5b506004361061007b575f3560e01c8063d522ef5311610059578063d522ef53146100d9578063ea8b3c6a146100f7578063ecccaf2114610115578063f1077be9146101335761007b565b80630887aa701461007f57806308a9b8271461009d5780637ea7118c146100bb575b5f80fd5b610087610151565b60405161009491906102a9565b60405180910390f35b6100a56101a6565b6040516100b2919061034c565b60405180910390f35b6100c3610232565b6040516100d091906103ab565b60405180910390f35b6100e1610255565b6040516100ee91906103dc565b60405180910390f35b6100ff61025e565b60405161010c91906103dc565b60405180910390f35b61011d610264565b60405161012a91906103dc565b60405180910390f35b61013b61026a565b60405161014891906103ab565b60405180910390f35b5f805f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b600280546101b390610422565b80601f01602080910402602001604051908101604052809291908181526020018280546101df90610422565b801561022a5780601f106102015761010080835404028352916020019161022a565b820191905f5260205f20905b81548152906001019060200180831161020d57829003601f168201915b505050505081565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f600454905090565b60035481565b60045481565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f8115159050919050565b6102a38161028f565b82525050565b5f6020820190506102bc5f83018461029a565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b838110156102f95780820151818401526020810190506102de565b5f8484015250505050565b5f601f19601f8301169050919050565b5f61031e826102c2565b61032881856102cc565b93506103388185602086016102dc565b61034181610304565b840191505092915050565b5f6020820190508181035f8301526103648184610314565b905092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6103958261036c565b9050919050565b6103a58161038b565b82525050565b5f6020820190506103be5f83018461039c565b92915050565b5f819050919050565b6103d6816103c4565b82525050565b5f6020820190506103ef5f8301846103cd565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061043957607f821691505b60208210810361044c5761044b6103f5565b5b5091905056fea2646970667358221220c157f3d1fed9aff75fb69f5682bafbfc50dd6a195075c865536d058d8f87792264736f6c63430008150033'; // Bytecode completo aquí

  const contract = new web3.eth.Contract(contractABI);

  document.getElementById('prescriptionForm').onsubmit = async function (event) {
      event.preventDefault();

      const doctorNombre = document.getElementById('doctorName').value;
      const pacienteNombre = document.getElementById('pacienteName').value;
      const medicamento = document.getElementById('medicamento').value;

      console.log('Doctor Nombre:', doctorNombre);
      console.log('Paciente Nombre:', pacienteNombre);
      console.log('Medicamento:', medicamento);
      
      const direccionPorNombre = {
          "Marcos Soto": "0x99b17360F0D53D2a12B031619123C6139AaD5399",
          "Kenyi Yaranga":"0x3640798D6286Ab55f4860a331f6c76335421Dea5",
      };

      const doctorDireccion = direccionPorNombre[doctorNombre];
      const pacienteDireccion = direccionPorNombre[pacienteNombre];

      if (!doctorDireccion || !pacienteDireccion) {
          alert('Por favor, ingresa nombres válidos.');
          return;
      }

      try {
          const accounts = await web3.eth.getAccounts();
          const sender = accounts[0];

          console.log('Sender Account:', sender);

          const newContractInstance = await contract.deploy({
              data: bytecode,
              arguments: [doctorDireccion, pacienteDireccion, medicamento]
          }).send({ from: sender, gas: '5000000' });

          console.log('Receta creada:', newContractInstance.options.address);

          const storedDoctorNombre = doctorNombre;
          const storedPacienteNombre = pacienteNombre;

          const medicamentoDetails = obtenerDetallesMedicamento(medicamento);

          const fechaPrescripcionBigInt = await newContractInstance.methods.fechaPrescripcion().call();
          const fechaPrescripcion = Number(fechaPrescripcionBigInt); // Convertir BigInt a Number
          const storedCodigoAleatorio = await newContractInstance.methods.codigoAleatorio().call();

          document.getElementById('doctorNameDisplay').innerText = storedDoctorNombre;
          document.getElementById('pacienteNameDisplay').innerText = storedPacienteNombre;
          document.getElementById('medicamentoDetails').innerText = medicamentoDetails;
          document.getElementById('prescriptionDate').innerText = new Date(fechaPrescripcion * 1000).toLocaleString();
          document.getElementById('codigoAleatorio').innerText = storedCodigoAleatorio;
      } catch (error) {
          console.error('Error al crear la receta:', error);
      }
  };

  function obtenerDetallesMedicamento(codigo) {
      const medicamentosPorCodigo = {
          "183GDJD218": `
              Cipramil® (Citalopram) 20 mg
              Dosis: 1 comprimido al día
              Duración: 30 días

              Clomipramina 25 mg
              Dosis: 1 comprimido 3 veces al día
              Duración: 30 días

              Levorfanol
              Dosis: Según indicación específica del especialista (dosis a determinar en consulta)
              Duración: Según necesidad y revisión periódica

              Isquelium 4 mg
              Dosis: 1 comprimido al día
              Duración: 30 días
          `
      };
      return medicamentosPorCodigo[codigo] || "Código de medicamento no reconocido.";
  }
});