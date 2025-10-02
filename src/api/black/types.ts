type Person = {
	id: string
	cnpjCpf: string
	situacaoCadastral: number
	dataAbertura: string
	tipo: number
	associacaos: any[]
	porte: number
	recuperacaoJudicial: boolean
	nomeFantasia: string | null
	capitalSocial: number
	inscricaoEstadual: string | null
	inscricaoMunicipal: string | null
	atividadePrincipal: string
	website: string | null
	observacoesGerais: string | null
	tipoPessoa: number
	tipoEnriquecimento: any | null
	dataNascimento: string | null
	sexo: string | null
	estadoCivil: number | null
	nome: string
	tipoDocumentoPf: number
	numeroDocumentoPf: string | null
	orgaoEmissor: string | null
	estadoEmissor: string | null
	origem: any | null
	dateCreated: string
	userIdCreated: string
	enderecos: any[]
	contatos: any[]
	qsas: any[]
	representantes: any[]
	fornecedores: any[]
	testemunhas: any[]
	gestoras: any[]
	custodiantes: any[]
	administradoras: any[]
	consultoras: any[]
	cedentes: any[]
	sacados: any[]
	investidores: any[]
	fidcs: any[]
	users: any[]
	consultas: any[]
	agentes: any[]
	emitentes: any[]
}

type OperationList = {
	id: string
	cedenteId: string
	operacao: string
	dateCreated: string
	dataOperacao: string
	dataFechamento: string | null
	cedenteNome: string
	cedenteCnpjCpf: string
	cedenteStatus: number
	cedenteSituacao: number
	cedenteClassificacao: {
		id: string
		nome: string
		cor: string
		descricao: string
		dateCreated: string
		tipoClassificacao: number
	}
	valor: number
	valorAPagar: number
	status: 'ABERTA' | 'FECHADA'
	qtdDoc: number
	qtdNotas: number
	qtdSacados: number
	nomeArquivoOriginal: string | null
	numeroAditivoLegado: string | null
	consulta: {
		id: string
		consultaId: string
		dateCreated: string
		nome: string
		cnpjCpf: string
		status: number
		fonte: number
		retorno: string | null
		usuario: string | null
		associacaos: unknown
		consultaSerasa: unknown
		consultaCreditHub: {
			cnpjCpf: string
			processosQtd: string
			protestosQtd: string
			ccfQtd: string
			dividasPublicasQtd: string | null
			protestosValor: string
			dividasPublicasValor: string | null
			aprovado: boolean
		}
		consultaNeoway: unknown
		consultaVadu: unknown
		ccf: unknown
		protestos: unknown
		dividas: unknown
	}
	consultaConsolidada: {
		id: string
		cnpjCpf: string
		processosQtd: number | null
		protestosQtd: number | null
		protestosValor: number | null
		protestosDetalhes: string | null
		ccfQtd: number | null
		ccfDetalhes: string | null
		dividasPublicasQtd: number | null
		dividasPublicasValor: number | null
		dividasPublicasDetalhes: string | null
		requisicaoCreditHub: string | null
		respostaCreditHub: string | null
		tipo: number
		resultado: string
		dadosSerasa: string
		httpStatus: string
		requisicaoSerasa: string
		respostaSerasa: string
		dataInicio: string
		dataFim: string
		dateUpdated: string
		pessoa: Person
		consultaSerasa: unknown
		consultaCredithub: unknown
		userIdUpdated: string
		fidc: {
			id: string
			status: number
			fidcParametrizacoes: unknown
			monitoramento: unknown
			fidcEnriquecimento: unknown
			complemento: unknown
			fidcRegulamentosAba: unknown
			dateCreated: string
			pessoa: string | null
			certificadoraId: string
			fidcConsultaExternas: unknown
			fidcDocumentoComplementares: unknown
			fidcRazaoSocial: string | null
			administradoraRazaoSocial: string | null
			gestoraRazaoSocial: string | null
			consultoraRazaoSocial: string | null
			administradoraNome: string | null
			consultoriaNome: string | null
			gestoraNome: string | null
			fidcNome: string | null
		}
		ccf: unknown
		protestos: unknown
		dividas: unknown
	}
	tiposRecebiveis: number[]
	modalidade: number
	desagio: number
	debitos: number
	creditos: number
	recompra: number
	prazoMedio: number
	taxa: number
	despesaOperacao: number
	despesaRecebivel: number
	despesaSacado: number
	statusAdministradora: number
	statusPagamentoAdministradoraLabel: string
	dataConsultaPagamentoAdministradora: string
	dataConsultaAssinaturaDigital: string | null
	certificadora: string | null
	assinaturaFinalizada: boolean
	cedenteTemPendencia: boolean
	operacaoClassificacao: string | null
	layout: string
	origem: string
}

type OperationUnique = {
	id: string
	status: number
	userIdCreated: string
	dateCreated: string
	dataMovimento: string
	remessa: number
	recompra: number
	reembolso: number
	valorFace: number
	valorTotal: number | null
	qtdDoc: number
	qtdNotas: number
	qtdSacados: number
	numeroAditivo: number
	abertoPor: string
	fechadoPor: string
	nomeArquivo: string | null
	comercial: string
	quantidadePagamento: number
	modalidade: number
	agente: string
	segmentoEmpresa: number
	abatimento: number
	aditivoImportacaoId: string
	aditivoImportacao: {
		id: string
		cedenteId: string
		operacao: string | null
		dateCreated: string
		cedente: string | null
		modalidade: string
		valor: number | null
		status: number | null
		qtdDoc: number
		qtdNotas: number
		qtdSacados: number
		nomeArquivoOriginal: string
		nomeArquivo: string
		origem: string
		tipoBanco: string | null
		tipoCnab: string | null
		tipoAditivoImportacao: number
	}
	aditivoDocumentos: {
		id: string
		lastroId: string | null
		numeroNota: string
		numeroDocumento: string
		valorPago: number
		valorFace: number
		valorAPagar: number
		dataEmissao: string
		vencimento: string
		dateVencimentoAtualizado: string
		nfeKey: string
		tipoRecebivel: number
		status: number
		cnpjCpf: string
		modalidade: string
		aditivoId: string
		sacado: string | null
		sacadoId: string | null
		sacadoStatus: number
		classificacaoSacado: string | null
		classificacaoRecebivel: string | null
		prazo: string
		floatt: number
		emissao: string | null
		nossoNumero: string | null
		digitoVerificador: string | null
		meiosRecebimento: number
		contaId: string
		consulta: string | null
		consultaConsolidada: string | null
		documentoLastroUploadedId: string | null
		statusChecagem: string | null
		rastreioChecagem: string | null
		recomprado: boolean
		codBancoDeCustodia: string | null
		cmC7: string | null
		banco: string | null
		agencia: string | null
		contaCheque: string | null
		numeroCheque: string | null
		compensacao: string | null
		encargoTaxa: number
		multaTaxa: number
		chaveCliente: string | null
		notaCancelada: boolean
		desconto: number
		dataLimiteDesconto: string | null
		contaSecundariaId: string | null
		dataPrevisaoOperacao: string | null
		observacao: string | null
		abatimento: number
		contaAgencia: string | null
		numeroConta: string | null
		notaCartaCorrecao: boolean
		numeroDocumentoIdentityLegado: string | null
		cteKey: string | null
		endosso: boolean
		valorBrutoLCC: number | null
		isDsNonCTE: boolean | null
		isLastroForcado: boolean
		esquemaOk: boolean | null
		assinaturaDigitalOk: boolean | null
		cedenteEndossanteNome: string | null
		cedenteEndossanteCnpjCpf: string | null
	}[]
	cedenteId: string
	cedente: {
		id: string
		status: number
		dateCreated: string
		pessoa: Person
		bloqueado: boolean
		cedenteParametrizacoes: {
			fator: number
			tranche: number
			limite: number
			float: number
			feeTerceiros: number
			habilitado: boolean
			modalidade: number
			encargoBaixa: number
			multaBaixa: number
			encargoBaixaCheque: number
			multaBaixaCheque: number
			isBoletoNormal: boolean
			isBoletoEspecial: boolean
			isContaEscrow: boolean
			isDeposito: boolean
			isChequeCustodia: boolean
			isCartaoCredito: boolean
			encargoRecompra: number
			multaRecompra: number
			prorrogacao: number
			tarifaProrrogacao: number
			antecipacao: number
			tarifaAntecipacao: number
			tarifaRecompra: number | null
			prazoMinimo: number
			prazoMaximo: number
			taxaMinima: number
			taxaMaxima: number
			limiteMaximoSacado: number | null
			limiteMinimoSacado: number | null
			isDuplicata: boolean
			isNotaPromissoria: boolean
			isNotaDeSeguro: boolean
			isCobrancaSeriada: boolean
			isPedidoDeVenda: boolean
			isNotaPromissoriaFisica: boolean
			isNotaComercial: boolean
			isLetrasCombio: boolean
			isNotaDebito: boolean
			isDuplicataServico: boolean
			isPrecatorios: boolean
			isDuplicataServicoFisico: boolean
			isDuplicataTransporteDigital: boolean
			isDuplicataTransporteFisica: boolean
			isRenegociacaoDivida: boolean
			isCcbDigital: boolean
			isCheque: boolean
			isChequeManual: boolean
			isCedulaProdutoRural: boolean
			isContratoNormal: boolean
			isContrato: boolean
			isConfissaoDivida: boolean
			isAssuncaoDivida: boolean
			isOperacaoCartaoCredito: boolean
			isCcbPreDigital: boolean
			isCcbPreBalcao: boolean
			isCcbPreCetip: boolean
			isOutros: boolean
			isCcbFormalizacaoFonada: boolean
			isNotaComercial2: boolean
			isCheque2: boolean
			isNotaComercial3: boolean
			isCcb2: boolean
			isCedulaProdutoRuralFinanceira: boolean
			isCreditosJudiciais: boolean
			tipoCalculoOperacao: string | null
			contaCobrancaPadraoId: string | null
			meioRecebimentoPadrao: string | null
			tipoBanco: string | null
		}[]
		cedenteContratos: any[]
		cedenteDespesas: any[]
		contatoAdicional: string | null
		cedenteComplemento: any
		ultimaOperacao: string | null
		contratoMaeAssinado: string | null
		contratoMaeDataAssinado: string | null
		certificadoId: string | null
		fidcId: string
		urlArquivo: string | null
		primeiraOperacao: string | null
		ultimaConsulta: string | null
		dadosTotais: string | null
		fidc: any
		blacklist: any
		pendencias: any[]
		temObservacao: boolean
	}
	recompras: any[]
	numeroAditivoLegado: string | null
	cnabTaxa: string | null
	certificadora: {
		nome: string | null
		url: string | null
		comunicacao: number
	}
	aditivoDocumentoRecusados: any[]
	suportarMultiplosTiposRecebiveis: boolean
	tipoCalculo: number
	pendenciasDebitoCredito: boolean
	tipoRecebivel: number
	aptaParaRegistrar: boolean
	fidcNome: string
	registradoraNome: string | null
	registradoraCnpj: string | null
	isIpocValid: boolean
	isCodigoContratoValid: boolean
	isTaxaAnualValid: boolean
	totalCCbs: number
}

type OperationExtra = {
	dadosOperacao: {
		id: string
		valorFace: number
		desconto: number
		abatimento: number
		desagio: number
		despesas: number
		recompras: number
		debitos: number
		creditos: number
		feeTerceiros: number
		feeCalculado: number | null
		valorAPagar: number
		valorIOF: number
		fator: string
		float: string
		prazoMedio: number
		roa: number
		cet: number
	}
	dadosCedente: {
		id: string
		nome: string
		cnpj: string
		grupo: string
		limite: number
		limiteUtilizado: number
		limiteDisponivel: number
		tranche: number
		fator: number
		float: string
		primeiraOperacao: string
		ultimaOperacao: string
		valoresAberto: number
		agencia: string
		conta: string
		banco: string
		pessoaId: string
		contaId: string
		agente: {
			id: string
			status: number
			dateCreated: string
			fidcId: string
			pessoa: {
				id: string
				cnpjCpf: string
				situacaoCadastral: number
				dataAbertura: string
				tipo: number
				associacaos: any[]
				porte: number
				recuperacaoJudicial: boolean
				nomeFantasia: string
				capitalSocial: number
				inscricaoEstadual: string
				inscricaoMunicipal: string
				atividadePrincipal: string
				website: string
				observacoesGerais: string
				tipoPessoa: number
				tipoEnriquecimento: any
				dataNascimento: any
				sexo: any
				estadoCivil: any
				nome: string
				tipoDocumentoPf: number
				numeroDocumentoPf: string
				orgaoEmissor: string
				estadoEmissor: string
				origem: any
				dateCreated: string
				userIdCreated: string
				enderecos: any[]
				contatos: any[]
				qsas: any[]
				representantes: any[]
				fornecedores: any[]
				testemunhas: any[]
				gestoras: any[]
				custodiantes: any[]
				administradoras: any[]
				consultoras: any[]
				cedentes: any[]
				sacados: any[]
				investidores: any[]
				fidcs: any[]
				users: any[]
				consultas: any[]
				agentes: {
					id: string
					status: number
					dateCreated: string
					fidcId: string
				}[]
				emitentes: any[]
			}
		}
		caracteristicas: string
		situacaoCedente: number
		classificacao: {
			id: string
			nome: string
			cor: string
			descricao: string
			dateCreated: string
			tipoClassificacao: number
		}
		trancheTomado: number
	}
	dadosValidacao: {
		validacao: number
		status: number
	}[]
}

type ClientUnique = {
	id: string
	status: number
	dateCreated: string
	pessoa: Person
	bloqueado: boolean
	cedenteComplemento: {
		id: string
		faturamentoAnual: string
		ramoAtividade: number
		classificacaoRisco: number
		tipodeSociedade: number
		agente: {
			id: string
			status: number
			dateCreated: string
			fidcId: string
			pessoa: Person
		}
		grupoEconomico: {
			id: string
			nome: string | null
			observacao: string | null
			isActive: boolean
			dateCreated: string
			limite: number
			cedenteComplementos: any | null
			sacadoComplementos: any | null
		}
		situacaoCedente: number
		classificacao: {
			id: string
			nome: string
			cor: string
			descricao: string
			dateCreated: string
			tipoClassificacao: number
		}
		codigoEnvioCedenteAdministradora: string
		statusEnvioCedenteAdministradora: number
		coobrigacao: number
		enviaCartaCobranca: boolean
		enviaCartaCessaoCredito: boolean
		enviaCartaConfirmacao: boolean
		enviaCartaCobrancaEmailCedente: boolean
		enviaCartaCessaoCreditoEmailCedente: boolean
		enviaCartaConfirmacaoEmailCedente: boolean
		enviaBorderoFimDoDia: boolean
		termoCessaoComCoobrigacao: string | null
		termoCessaoSemCoobrigacao: string | null
		termoCessaoComCoobrigacaoRecompra: string | null
		termoCessaoSemCoobrigacaoRecompra: string | null
		limiteTotalModalidades: number
		enviaCartaCobrancaWhatsAppCedente: boolean
		enviaCartaCessaoCreditoWhatsAppCedente: boolean
		planoContaId: string | null
		planoConta: any | null
		cedenteParametrizacaoIPOCId: string
		desabilitarAcoesConsultorAposCedenteAtivo: boolean
	}
	cedenteParametrizacoes: {
		fator: number
		tranche: number
		limite: number
		float: number
		feeTerceiros: number
		habilitado: boolean
		modalidade: number
		encargoBaixa: number
		multaBaixa: number
		encargoBaixaCheque: number
		multaBaixaCheque: number
		isBoletoNormal: boolean
		isBoletoEspecial: boolean
		isContaEscrow: boolean
		isDeposito: boolean
		isChequeCustodia: boolean
		isCartaoCredito: boolean
		encargoRecompra: number
		multaRecompra: number
		prorrogacao: number
		tarifaProrrogacao: number
		antecipacao: number
		tarifaAntecipacao: number
		tarifaRecompra: number | null
		prazoMinimo: number
		prazoMaximo: number
		taxaMinima: number
		taxaMaxima: number
		limiteMaximoSacado: number | null
		limiteMinimoSacado: number | null
		isDuplicata: boolean
		isNotaPromissoria: boolean
		isNotaDeSeguro: boolean
		isCobrancaSeriada: boolean
		isPedidoDeVenda: boolean
		isNotaPromissoriaFisica: boolean
		isNotaComercial: boolean
		isLetrasCombio: boolean
		isNotaDebito: boolean
		isDuplicataServico: boolean
		isPrecatorios: boolean
		isDuplicataServicoFisico: boolean
		isDuplicataTransporteDigital: boolean
		isDuplicataTransporteFisica: boolean
		isRenegociacaoDivida: boolean
		isCcbDigital: boolean
		isCheque: boolean
		isChequeManual: boolean
		isCedulaProdutoRural: boolean
		isContratoNormal: boolean
		isContrato: boolean
		isConfissaoDivida: boolean
		isAssuncaoDivida: boolean
		isOperacaoCartaoCredito: boolean
		isCcbPreDigital: boolean
		isCcbPreBalcao: boolean
		isCcbPreCetip: boolean
		isOutros: boolean
		isCcbFormalizacaoFonada: boolean
		isNotaComercial2: boolean
		isCheque2: boolean
		isNotaComercial3: boolean
		isCcb2: boolean
		isCedulaProdutoRuralFinanceira: boolean
		isCreditosJudiciais: boolean
		tipoCalculoOperacao: string | null
		contaCobrancaPadraoId: string | null
		meioRecebimentoPadrao: string | null
		tipoBanco: string | null
	}[]
	cedenteId: string
	cedente: {
		id: string
		status: number
		dateCreated: string
		pessoa: Person
		bloqueado: boolean
		cedenteParametrizacoes: {
			fator: number
			tranche: number
			limite: number
			float: number
			feeTerceiros: number
			habilitado: boolean
			modalidade: number
			encargoBaixa: number
			multaBaixa: number
			encargoBaixaCheque: number
			multaBaixaCheque: number
			isBoletoNormal: boolean
			isBoletoEspecial: boolean
			isContaEscrow: boolean
			isDeposito: boolean
			isChequeCustodia: boolean
			isCartaoCredito: boolean
			encargoRecompra: number
			multaRecompra: number
			prorrogacao: number
			tarifaProrrogacao: number
			antecipacao: number
			tarifaAntecipacao: number
			tarifaRecompra: number | null
			prazoMinimo: number
			prazoMaximo: number
			taxaMinima: number
			taxaMaxima: number
			limiteMaximoSacado: number | null
			limiteMinimoSacado: number | null
			isDuplicata: boolean
			isNotaPromissoria: boolean
			isNotaDeSeguro: boolean
			isCobrancaSeriada: boolean
			isPedidoDeVenda: boolean
			isNotaPromissoriaFisica: boolean
			isNotaComercial: boolean
			isLetrasCombio: boolean
			isNotaDebito: boolean
			isDuplicataServico: boolean
			isPrecatorios: boolean
			isDuplicataServicoFisico: boolean
			isDuplicataTransporteDigital: boolean
			isDuplicataTransporteFisica: boolean
			isRenegociacaoDivida: boolean
			isCcbDigital: boolean
			isCheque: boolean
			isChequeManual: boolean
			isCedulaProdutoRural: boolean
			isContratoNormal: boolean
			isContrato: boolean
			isConfissaoDivida: boolean
			isAssuncaoDivida: boolean
			isOperacaoCartaoCredito: boolean
			isCcbPreDigital: boolean
			isCcbPreBalcao: boolean
			isCcbPreCetip: boolean
			isOutros: boolean
			isCcbFormalizacaoFonada: boolean
			isNotaComercial2: boolean
			isCheque2: boolean
			isNotaComercial3: boolean
			isCcb2: boolean
			isCedulaProdutoRuralFinanceira: boolean
			isCreditosJudiciais: boolean
			tipoCalculoOperacao: string | null
			contaCobrancaPadraoId: string | null
			meioRecebimentoPadrao: string | null
			tipoBanco: string | null
		}[]
		cedenteContratos: {
			id: string
			numeroContrato: number
			tipoContrato: number
			dataContrato: string
			vencimento: string
			statusAssinatura: number
			contratoDataAssinado: string
			certificadoId: string
			contratoAssinado: string
			observacao: string | null
			numeroContratoCertificadora: string
			userIdCreated: string
			dateCreated: string
			aditivoId: string | null
			aditivo: string | null
			templateId: string
			template: {
				id: string
				nome: string
				tipo: number
				status: number
				dateCreated: string
				fidcDocumentoComplementar: string | null
			}
			cedenteId: string
			documentoId: string | null
			documento: string | null
			certificadoraAssociacaoId: string
			certificadoraAssociacao: {
				id: string
				certificadoraId: string
				associacaoId: string
				tipoAssociacao: number
				isPrincipal: boolean
				comunicacao: number
				finalidade: number
				dateCreated: string
				userIdCreated: string
				token: string
				usuario: string | null
				senha: string | null
				certificadora: {
					id: string
					status: number
					nome: string
					observacoes: string | null
					url: string | null
					cnpjCpf: string
					dateCreated: string
				}
			}
		}[]
		cedenteDespesas: {
			id: string
			valor: string
			despesaId: string
			despesa: string | null
			cedenteId: string
			userIdCreated: string
			dateCreated: string
		}[]
		contatoAdicional: string | null
		cedenteComplemento: {
			id: string
			faturamentoAnual: string
			ramoAtividade: number
			classificacaoRisco: number
			tipodeSociedade: number
			agente: {
				id: string
				status: number
				dateCreated: string
				fidcId: string
				pessoa: Person
			}
			grupoEconomico: {
				id: string
				nome: string | null
				observacao: string | null
				isActive: boolean
				dateCreated: string
				limite: number
				cedenteComplementos: string | null
				sacadoComplementos: string | null
			}
			situacaoCedente: number
			classificacao: {
				id: string
				nome: string
				cor: string
				descricao: string
				dateCreated: string
				tipoClassificacao: number
			}
			codigoEnvioCedenteAdministradora: string
			statusEnvioCedenteAdministradora: number
			coobrigacao: number
			enviaCartaCobranca: boolean
			enviaCartaCessaoCredito: boolean
			enviaCartaConfirmacao: boolean
			enviaCartaCobrancaEmailCedente: boolean
			enviaCartaCessaoCreditoEmailCedente: boolean
			enviaCartaConfirmacaoEmailCedente: boolean
			enviaBorderoFimDoDia: boolean
			termoCessaoComCoobrigacao: string | null
			termoCessaoSemCoobrigacao: string | null
			termoCessaoComCoobrigacaoRecompra: string | null
			termoCessaoSemCoobrigacaoRecompra: string | null
			limiteTotalModalidades: number
			enviaCartaCobrancaWhatsAppCedente: boolean
			enviaCartaCessaoCreditoWhatsAppCedente: boolean
			planoContaId: string | null
			planoConta: string | null
			cedenteParametrizacaoIPOCId: string | null
			desabilitarAcoesConsultorAposCedenteAtivo: boolean
		}
	}
	ultimaOperacao: {
		id: string
		status: number
		userIdCreated: string
		dateCreated: string
		dataMovimento: string
		remessa: number
		recompra: number
		reembolso: number
		valorFace: number
		valorTotal: number | null
		qtdDoc: number
		qtdNotas: number
		qtdSacados: number
		numeroAditivo: number
		abertoPor: string | null
		fechadoPor: string | null
		nomeArquivo: string | null
		comercial: string | null
		quantidadePagamento: number
		modalidade: number
		agente: string | null
		segmentoEmpresa: number
		abatimento: number
		aditivoImportacaoId: string
		aditivoImportacao: string | null
		aditivoDocumentos: {
			id: string
			lastroId: string | null
			numeroNota: string
			numeroDocumento: string
			valorPago: number
			valorFace: number
			valorAPagar: number
			dataEmissao: string
			vencimento: string
			dateVencimentoAtualizado: string
			nfeKey: string
			tipoRecebivel: number
			status: number
			cnpjCpf: string
			modalidade: string
			aditivoId: string
			sacado: string | null
			sacadoId: string | null
			sacadoStatus: number
			classificacaoSacado: string | null
			classificacaoRecebivel: string | null
			prazo: string
			floatt: number
			emissao: string | null
			nossoNumero: string | null
			digitoVerificador: string | null
			meiosRecebimento: number
			contaId: string
			consulta: string | null
			consultaConsolidada: string | null
			documentoLastroUploadedId: string | null
			statusChecagem: string | null
			rastreioChecagem: string | null
			recomprado: boolean
			codBancoDeCustodia: string | null
			cmC7: string | null
			banco: string | null
			agencia: string | null
			contaCheque: string | null
			numeroCheque: string | null
			compensacao: string | null
			encargoTaxa: number
			multaTaxa: number
			chaveCliente: string | null
			notaCancelada: boolean
			desconto: number
			dataLimiteDesconto: string | null
			contaSecundariaId: string | null
			dataPrevisaoOperacao: string | null
			observacao: string | null
			abatimento: number
			contaAgencia: string | null
			numeroConta: string | null
			notaCartaCorrecao: boolean
			numeroDocumentoIdentityLegado: string | null
			cteKey: string | null
			endosso: boolean
			valorBrutoLCC: number | null
			isDsNonCTE: boolean | null
			isLastroForcado: boolean
			esquemaOk: boolean | null
			assinaturaDigitalOk: boolean | null
			cedenteEndossanteNome: string | null
			cedenteEndossanteCnpjCpf: string | null
		}[]
		cedenteId: string
		recompras: any[]
		numeroAditivoLegado: string | null
		cnabTaxa: string | null
		certificadora: {
			nome: string | null
			url: string | null
			comunicacao: string | null
		}
		aditivoDocumentoRecusados: any[]
		suportarMultiplosTiposRecebiveis: boolean
		tipoCalculo: number
		pendenciasDebitoCredito: boolean
		tipoRecebivel: string | null
		aptaParaRegistrar: boolean
		fidcNome: string | null
		registradoraNome: string | null
		registradoraCnpj: string | null
		isIpocValid: boolean
		isCodigoContratoValid: boolean
		isTaxaAnualValid: boolean
		totalCCbs: number
	}
	contratoMaeAssinado: string | null
	contratoMaeDataAssinado: string | null
	certificadoId: string | null
	fidcId: string
	urlArquivo: string | null
	primeiraOperacao: string | null
	certificadoraId: string
	fidcConsultaExternas: any[]
	fidcDocumentoComplementares: any[]
	fidcRazaoSocial: string | null
	administradoraRazaoSocial: string | null
	gestoraRazaoSocial: string | null
	consultoraRazaoSocial: string | null
	administradoraNome: string | null
	consultoriaNome: string | null
	gestoraNome: string | null
	fidcNome: string | null
	blacklist: any | null
	pendencias: any[]
	temObservacao: boolean
	recompras: any[]
	numeroAditivoLegado: any | null
	cnabTaxa: any | null
	certificadora: {
		nome: string | null
		url: string | null
		comunicacao: number
	}
	aditivoDocumentoRecusados: any[]
	suportarMultiplosTiposRecebiveis: boolean
	tipoCalculo: number
	pendenciasDebitoCredito: boolean
	tipoRecebivel: any | null
	aptaParaRegistrar: boolean
	registradoraNome: any | null
	registradoraCnpj: any | null
	isIpocValid: boolean
	isCodigoContratoValid: boolean
	isTaxaAnualValid: boolean
	totalCCbs: number
	ultimaConsulta: {
		id: string
		consultaId: string
		dateCreated: string
		nome: string
		cnpjCpf: string
		status: number
		fonte: number
		retorno: any | null
		usuario: any | null
		associacaos: any | null
		consultaSerasa: {
			cnpjCpf: string
			tipo: number
			resultado: string
			dataInicio: string
			dataFim: string
		}
		consultaCreditHub: any | null
		consultaNeoway: any | null
		consultaVadu: any | null
		ccf: any | null
		protestos: any | null
		dividas: any | null
	}
	dadosTotais: {
		total: number
		aberto: number
		liquidado: number
		pago: number
	}
	fidc: {
		id: string
		status: number
		fidcParametrizacoes: any[]
		monitoramento: any | null
		fidcEnriquecimento: any[]
		complemento: {
			custodianteId: string | null
			administradoraId: string | null
			gestoraId: string | null
			consultoraId: string | null
			registradoraId: string | null
			registradoraConsultoriaId: string | null
			administradora: any
			custodiante: any | null
			gestora: any
			consultora: any
			registradora: any | null
			segmentoEmpresa: number
			emails: string
			titulo: string
			templateEmailId: string | null
			nomeFIDCAdministradora: string
			analiseCredito: boolean
			autoAprovacaoCedente: boolean
			validaDocumentosCedente: boolean
			nomeApresentacao: string
			checagem: boolean
			gerarMovimentoBaixa: boolean
			enviaRemessaAutomatica: boolean
			enviaRemessaAutomaticaAcessoGestorFTP: boolean
			dashboardDeCarteira: boolean
			dashboardDeFundos: boolean
			habilitarConfirmacaoConcentracaoElegibilidadeCessao: boolean
			deixarMarcadoPorDefaultConfirmacaoConcentracaoElegibilidadeCessao: boolean
			tipoDeAmbiente: number
			validacaoFromtis: boolean
			enviaRemessaAutomaticaAcessoGestor: boolean
			gerarBorderoGerencial: boolean
			ignorarValidacaoArquivoRetornoRepetido: boolean
			gerarTermoNoXmlDeRemessaVortx: boolean
			pagadores: any | null
			statusBaixas: any | null
			codigoConsultoriaRemessaFidc: string
			fonteEnriquecimentoPF: number
			fonteEnriquecimentoPJ: number
			propostaParecerFinalEntidades: any | null
			numeroBanco: string
			nomeBanco: string
			contaGraficaAbatimento: boolean
			contaGraficaDesconto: boolean
			contaGraficaDivergencia: boolean
			contaGraficaDivergenciaCartorio: boolean
			contaGraficaHabilitaTaxaRecompra: boolean
			gestoraLastroObrigatorio: boolean
			integraComAdministradora: boolean
			fidcRecuperacaoNfeXml: any[]
			tipoConsultaSerasaPJ: number
			tipoConsultaSerasaPF: number
			boletoNormalBeneficiario: number
			boletoEspecialBeneficiario: number
			horarioOperacaoCedenteInicio: string
			horarioOperacaoCedenteFim: string
			tipoUsuariosClassificacao: any | null
			fidcComplementoAprovacaoAutomaticaOperacoesAdministradora: any | null
			fidcComplementoAprovacaoAutomaticaLastrosAdministradoraXmlPdf: any[]
			chequeCustordiaDiasCompensacao: any | null
			envioOperacaoGestor: boolean
			tokenAdministradoraID: any | null
			envioAutomaticoCedenteAdministradora: boolean
			solicitarContratoMaeCedente: boolean
			ajustarVencimentoRecebiveis: boolean
			enriquecimentoSacadoIsCria: boolean
			enriquecimentoSacadoIsAtualiza: boolean
			enriquecimentoSacadoIsIgnora: boolean
			idVeiculo: any | null
			idVeiculoConsultoria: any | null
			idVeiculoCcb: any | null
			idVeiculoCcbConsultoria: any | null
			travaRetornoCriticoRegistradora: boolean
			realizarRegistroAutomaticoRegistradoraAprovacaoGestor: boolean
			fidcRelatorioPLs: any[]
			classificacaoChecagens: any | null
			usarNumeroControleParticipante: boolean
			desabilitaValidacaoOperacaoDia: boolean
			habilitarEnvioEmailConfirmacao: boolean
			habilitarEditarCedente: boolean
			habilitarEnvioRemessaFidcSingulare: boolean
			tipoConsultaBoaVistaPJ: number
			tipoConsultaBoaVistaPF: number
			desabilitaInfoBloqueioLimite: boolean
			notificarDiaVencimentoRevisao: number
			habilitarEnvioValidacaoDesacordoOperacao: boolean
			operacaoPadraoSingulareHifen: boolean
			esconderStatusAdministradoraEGestora: boolean
			envioCedenteOutroAmbiente: boolean
			realizarBaixaAutomaticaSistema: boolean
			realizarBaixaAutomaticaRegistradora: boolean
			realizarRegistroAutomaticoRegistradoraOperacaoLiquidada: boolean
			apenasDiasUteisNoCalculoVencimento: boolean
			listagemSacadoOperacaoTabela: boolean
			endossarOperacao: boolean
			habilitaNumeroRecebivelZeroEsquerda: boolean
			fidcChecagemRecebiveis: any[]
			bloquearReaberturaOPAposEnvioGestora: boolean
			habilitarOpPlRevisado: boolean
			tiposRecebiveisAprovaReprova: any | null
			buscaIpocPeloCnab: boolean
			suportarMultiplosTiposRecebiveis: boolean
			enviaLastroAdministradora: boolean
			cnpjAgenteRegistro: any | null
			habilitarNotificacaoCepSacadoInvalidoRemessaBancaria: boolean
			segueFluxoCVM175: boolean
			habilitarMonitoramentoAutomatico: boolean
			vincularLastroDSFContratoChequeAoImportarOperacao: boolean
			habilitaDataVencimentoDocumento: number
			habilitarEnvioLancamentoCreditoParaFundo: boolean
			contaCreditoFundoId: any | null
			configuraParametrizacaoCedenteAoEnviarParaAprovacaoGestora: boolean
			desabilitarAcoesConsultorAposCedenteAtivo: boolean
			diasDefasagemRelatorioPL: number
			diasDefasagemRelatorioEstoque: number
			habilitarNotificacaoAcoesConsultor: boolean
			enviarRegistroAdministradoraViaCnab: boolean
			carteiraId: any | null
			habilitarAdicionarGrupoEconomicoNaFilialCedente: boolean
			habilitarAdicionarGrupoEconomicoNaFilialSacado: boolean
			diasVencimentoXml: number
			lancarMovimentoFinanceiroBaixadoPosFechamentoOperacao: boolean
			lancarEstornoPosReaberturaOperacao: boolean
			parametrizacoesCartaCessao: any[]
			baixarTitulosDaConsultoriaAutomaticamenteNaGestora: boolean
			envioAutomaticoInstrucao: boolean
			refletirBaixaAutomicamente: boolean
			habilitarRegulamentoFundo: boolean
			enderecoServidor: any | null
			areaConexao: any | null
			repositorioDocumentos: any | null
			identificarRecebiveisRegistradosCNABOperacao: boolean
			dataInicialEnquadramento: any | null
			dataFinalEnquadramento: any | null
		}
		fidcRegulamentosAba: any[]
		dateCreated: string
	}
}

type DebtorList = {
	id: string
	status: number
	dateCreated: string
	pessoa: {
		id: string
		cnpjCpf: string
		situacaoCadastral: number
		dataAbertura: string
		tipo: number
		associacaos: any[]
		porte: number
		recuperacaoJudicial: boolean
		nomeFantasia: string
		capitalSocial: number
		inscricaoEstadual: string | null
		inscricaoMunicipal: string | null
		atividadePrincipal: string
		website: string | null
		observacoesGerais: string | null
		tipoPessoa: number
		tipoEnriquecimento: any | null
		dataNascimento: string | null
		sexo: string | null
		estadoCivil: string | null
		nome: string
		tipoDocumentoPf: number
		numeroDocumentoPf: string | null
		orgaoEmissor: string | null
		estadoEmissor: string | null
		origem: string | null
		dateCreated: string
		userIdCreated: string
		enderecos: {
			cep: string
			logradouro: string
			numero: number
			complemento: string
			bairro: string
			tipoPrincipal: boolean
			tipoCobranca: boolean
			cidade: string
			estado: string
		}[]
		contatos: any[]
		qsas: any[]
		representantes: any[]
		fornecedores: any[]
		testemunhas: any[]
		gestoras: any[]
		custodiantes: any[]
		administradoras: any[]
		consultoras: any[]
		cedentes: any[]
		sacados: {
			id: string
			status: number
			dateCreated: string
			urlArquivo: string | null
			sacadoComplemento: string | null
			contatoAdicional: string | null
			listContatoAdicional: any | null
			fidc: {
				id: string
				status: number
				fidcParametrizacoes: any[]
				monitoramento: any | null
				fidcEnriquecimento: any[]
				complemento: {
					custodianteId: string
					administradoraId: string
					gestoraId: string
					consultoraId: string
					registradoraId: string | null
					registradoraConsultoriaId: string | null
					administradora: any | null
					custodiante: any | null
					gestora: any | null
					consultora: any | null
					registradora: any | null
					segmentoEmpresa: number
					emails: string
					titulo: string
					templateEmailId: string | null
					nomeFIDCAdministradora: string
					analiseCredito: boolean
					autoAprovacaoCedente: boolean
					validaDocumentosCedente: boolean
					nomeApresentacao: string
					checagem: boolean
					gerarMovimentoBaixa: boolean
					enviaRemessaAutomatica: boolean
					enviaRemessaAutomaticaAcessoGestorFTP: boolean
					dashboardDeCarteira: boolean
					dashboardDeFundos: boolean
					habilitarConfirmacaoConcentracaoElegibilidadeCessao: boolean
					deixarMarcadoPorDefaultConfirmacaoConcentracaoElegibilidadeCessao: boolean
					tipoDeAmbiente: number
					validacaoFromtis: boolean
					enviaRemessaAutomaticaAcessoGestor: boolean
					gerarBorderoGerencial: boolean
					ignorarValidacaoArquivoRetornoRepetido: boolean
					gerarTermoNoXmlDeRemessaVortx: boolean
					pagadores: any | null
					statusBaixas: any | null
					codigoConsultoriaRemessaFidc: string
					fonteEnriquecimentoPF: number
					fonteEnriquecimentoPJ: number
					propostaParecerFinalEntidades: any | null
					numeroBanco: string
					nomeBanco: string
					contaGraficaAbatimento: boolean
					contaGraficaDesconto: boolean
					contaGraficaDivergencia: boolean
					contaGraficaDivergenciaCartorio: boolean
					contaGraficaHabilitaTaxaRecompra: boolean
					gestoraLastroObrigatorio: boolean
					integraComAdministradora: boolean
					fidcRecuperacaoNfeXml: any[]
					tipoConsultaSerasaPJ: number
					tipoConsultaSerasaPF: number
					boletoNormalBeneficiario: number
					boletoEspecialBeneficiario: number
					horarioOperacaoCedenteInicio: string
					horarioOperacaoCedenteFim: string
					tipoUsuariosClassificacao: any | null
					fidcComplementoAprovacaoAutomaticaOperacoesAdministradora: any | null
					fidcComplementoAprovacaoAutomaticaLastrosAdministradoraXmlPdf: any[]
					chequeCustordiaDiasCompensacao: any | null
					envioOperacaoGestor: boolean
					tokenAdministradoraID: string | null
					envioAutomaticoCedenteAdministradora: boolean
					solicitarContratoMaeCedente: boolean
					ajustarVencimentoRecebiveis: boolean
					enriquecimentoSacadoIsCria: boolean
					enriquecimentoSacadoIsAtualiza: boolean
					enriquecimentoSacadoIsIgnora: boolean
					idVeiculo: string | null
					idVeiculoConsultoria: string | null
					idVeiculoCcb: string | null
					idVeiculoCcbConsultoria: string | null
					travaRetornoCriticoRegistradora: boolean
					realizarRegistroAutomaticoRegistradoraAprovacaoGestor: boolean
					fidcRelatorioPLs: any[]
					classificacaoChecagens: any | null
					usarNumeroControleParticipante: boolean
					desabilitaValidacaoOperacaoDia: boolean
					habilitarEnvioEmailConfirmacao: boolean
					habilitarEditarCedente: boolean
					habilitarEnvioRemessaFidcSingulare: boolean
					tipoConsultaBoaVistaPJ: number
					tipoConsultaBoaVistaPF: number
					desabilitaInfoBloqueioLimite: boolean
					notificarDiaVencimentoRevisao: number
					habilitarEnvioValidacaoDesacordoOperacao: boolean
					operacaoPadraoSingulareHifen: boolean
					esconderStatusAdministradoraEGestora: boolean
					envioCedenteOutroAmbiente: boolean
					realizarBaixaAutomaticaSistema: boolean
					realizarBaixaAutomaticaRegistradora: boolean
					realizarRegistroAutomaticoRegistradoraOperacaoLiquidada: boolean
					apenasDiasUteisNoCalculoVencimento: boolean
					listagemSacadoOperacaoTabela: boolean
					endossarOperacao: boolean
					habilitaNumeroRecebivelZeroEsquerda: boolean
					fidcChecagemRecebiveis: any[]
					bloquearReaberturaOPAposEnvioGestora: boolean
					habilitarOpPlRevisado: boolean
					tiposRecebiveisAprovaReprova: any | null
					buscaIpocPeloCnab: boolean
					suportarMultiplosTiposRecebiveis: boolean
					enviaLastroAdministradora: boolean
					cnpjAgenteRegistro: string | null
					habilitarNotificacaoCepSacadoInvalidoRemessaBancaria: boolean
					segueFluxoCVM175: boolean
					habilitarMonitoramentoAutomatico: boolean
					vincularLastroDSFContratoChequeAoImportarOperacao: boolean
					habilitaDataVencimentoDocumento: number
					habilitarEnvioLancamentoCreditoParaFundo: boolean
					contaCreditoFundoId: string | null
					configuraParametrizacaoCedenteAoEnviarParaAprovacaoGestora: boolean
					desabilitarAcoesConsultorAposCedenteAtivo: boolean
					diasDefasagemRelatorioPL: number
					diasDefasagemRelatorioEstoque: number
					habilitarNotificacaoAcoesConsultor: boolean
					enviarRegistroAdministradoraViaCnab: boolean
					carteiraId: string | null
					habilitarAdicionarGrupoEconomicoNaFilialCedente: boolean
					habilitarAdicionarGrupoEconomicoNaFilialSacado: boolean
					diasVencimentoXml: number
					lancarMovimentoFinanceiroBaixadoPosFechamentoOperacao: boolean
					lancarEstornoPosReaberturaOperacao: boolean
					parametrizacoesCartaCessao: any[]
					baixarTitulosDaConsultoriaAutomaticamenteNaGestora: boolean
					envioAutomaticoInstrucao: boolean
					refletirBaixaAutomaticamente: boolean
					habilitarRegulamentoFundo: boolean
					enderecoServidor: string | null
					areaConexao: string | null
					repositorioDocumentos: string | null
					identificarRecebiveisRegistradosCNABOperacao: boolean
					dataInicialEnquadramento: string | null
					dataFinalEnquadramento: string | null
				}
				fidcRegulamentosAba: any[]
				dateCreated: string
				pessoa: {
					id: string
					cnpjCpf: string | null
					situacaoCadastral: number
					dataAbertura: string | null
					tipo: number | null
					associacaos: any | null
					porte: number | null
					recuperacaoJudicial: boolean | null
					nomeFantasia: string | null
					capitalSocial: number | null
					inscricaoEstadual: string | null
					inscricaoMunicipal: string | null
					atividadePrincipal: string | null
					website: string | null
					observacoesGerais: string | null
					tipoPessoa: number | null
					tipoEnriquecimento: any | null
					dataNascimento: string | null
					sexo: string | null
					estadoCivil: string | null
					nome: string | null
					tipoDocumentoPf: number | null
					numeroDocumentoPf: string | null
					orgaoEmissor: string | null
					estadoEmissor: string | null
					origem: string | null
					dateCreated: string
					userIdCreated: string
					enderecos: any | null
					contatos: any | null
					qsas: any | null
					representantes: any | null
					fornecedores: any | null
					testemunhas: any | null
					gestoras: any | null
					custodiantes: any | null
					administradoras: any | null
					consultoras: any | null
					cedentes: any | null
					sacados: any | null
					investidores: any | null
					fidcs: any | null
					users: any | null
					consultas: any | null
					agentes: any | null
					emitentes: any | null
				}
				certificadoraId: string
				fidcConsultaExternas: any[]
				fidcDocumentoComplementares: any[]
				fidcRazaoSocial: string | null
				administradoraRazaoSocial: string | null
				gestoraRazaoSocial: string | null
				consultoraRazaoSocial: string | null
				administradoraNome: string | null
				consultoriaNome: string | null
				gestoraNome: string | null
				fidcNome: string | null
			}
			blacklist: boolean
		}[]
		investidores: any[]
		fidcs: any[]
		users: any[]
		consultas: {
			id: string
			consultaId: string
			dateCreated: string
			nome: string
			cnpjCpf: string
			status: number
			fonte: number
			retorno: any | null
			usuario: any | null
			associacaos: any | null
			consultaSerasa: any | null
			consultaCreditHub: any | null
			consultaNeoway: any | null
			consultaVadu: any | null
			ccf: any | null
			protestos: any | null
			dividas: any | null
		}[]
		agentes: any[]
		emitentes: any[]
	}
	urlArquivo: string | null
	sacadoComplemento: string | null
	contatoAdicional: string | null
	listContatoAdicional: any | null
	fidc: {
		id: string
		status: number
		fidcParametrizacoes: any[]
		monitoramento: any | null
		fidcEnriquecimento: any[]
		complemento: any
		fidcRegulamentosAba: any[]
		dateCreated: string
		pessoa: Person
		certificadoraId: string
		fidcConsultaExternas: any[]
		fidcDocumentoComplementares: any[]
		fidcRazaoSocial: string | null
		administradoraRazaoSocial: string | null
		gestoraRazaoSocial: string | null
		consultoraRazaoSocial: string | null
		administradoraNome: string | null
		consultoriaNome: string | null
		gestoraNome: string | null
		fidcNome: string | null
	}
	blacklist: boolean
}

type ReceivableList = {
	id: string
}

type OperationDebtorList = {
	id: string
	sacadoNome: string
	sacadoCnpj: string
	sacadoStatus: number
	porcentagemOperacao: number
	documentosNotas: string
	documentosQtd: string
	operacao: number
	valorAPagar: number
	sacadoEmail: string
	valoresTotal: number
	valoresLiquidado: number
	valoresBaixado: number
	valoresAberto: number
	pddFaixa: string
	pddValor: number
	vencimentoVencidos: number
	vencimentoVencer: number
	ultimaOperacao: string
	ultimaOperacaoValor: number
	ultimaOperacaoData: string
	ultimaOperacaoId: string
	analise: string
	consultas: {
		id: string
		consultaId: string
		dateCreated: string
		nome: string
		cnpjCpf: string
		status: number
		fonte: number
		retorno: string | null
		usuario: string | null
		associacaos: string | null
		consultaSerasa: {
			cnpjCpf: string
			tipo: number
			resultado: string
			dataInicio: string
			dataFim: string
		} | null
		consultaCreditHub: {
			cnpjCpf: string
			processosQtd: string
			protestosQtd: string
			ccfQtd: string
			dividasPublicasQtd: string | null
			protestosValor: string
			dividasPublicasValor: string | null
			aprovado: boolean
		} | null
		consultaNeoway: unknown | null
		consultaVadu: unknown | null
		ccf: unknown | null
		protestos: unknown | null
		dividas: unknown | null
	}[]
	classificacao: string | null
	contatosAdicionais: {
		id: string
		nome: string
		email: string
		telefone1: string
		telefone2: string | null
		observacoes: string | null
		associacaoId: string
		tipoRelacao: number
		dateCreated: string
		tipoContato: number
	}[]
}

type Status = 'ABERTA' | 'FECHADA'

export type GetOperationsParams = {
	id?: string
	ids?: string[]
	associacao?: string
	page: number
	pageSize: number
	keyword?: string
	sort?: string
	start?: string
	end?: string
	orderby?: string
	status?: Status
	bloqueado?: boolean
	situacaoCedente?: string
	fidcIds?: string[]
	fidcId?: string
}

export type GetDebtorsParams = {
	id?: string
	ids?: string[]
	associacao?: string
	page: number
	pageSize: number
	keyword?: string
	sort?: string
	start?: string
	end?: string
	orderby?: string
	status?: Status
	fidcIds?: string[]
	cedenteCnpjCpf?: string
}

export type GetReceivablesParams = {
	id?: string
	ids?: string[]
	associacao?: string
	page: number
	pageSize: number
	keyword?: string
	sort?: string
	start?: string
	end?: string
	orderby?: string
	status?: Status
	bloqueado?: boolean
	situacaoCedente?: string
	fidcIds?: string[]
	fidcId?: string
}

export type GetOperationDebtorsParams = {
	operationId: string
	page: number
	pageSize: number
}

type PaginationParams = {
	page: number
	pageSize: number
	totalItems: number
}

export type GetOperationsResponse = {
	model: {
		items: OperationList[]
	} & PaginationParams
}

export type GetOperationResponse = {
	model: OperationUnique
}

export type GetOperationExtraResponse = {
	model: OperationExtra
}

export type GetClientResponse = {
	model: ClientUnique
}

export type GetDebtorsResponse = {
	model: {
		items: DebtorList[]
	} & PaginationParams
}

export type GetReceivablesResponse = {
	model: {
		items: ReceivableList[]
	} & PaginationParams
}

export type GetOperationDebtorsResponse = {
	model: {
		items: OperationDebtorList[]
	} & PaginationParams
}
