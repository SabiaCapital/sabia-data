type CreditHub = {
	rfb: {
		cnpj: string
		telefones: string
		capital_social: number
		data_situacao: string
		nome_fantasia: string
		razao_social: string
		situacao: string
		motivo_situacao_cadastral: string
		data_abertura: string
		data_consulta: string
		email: string
		natureza_juridica: string
		atividade_economica: string
		atividades_economicas_secundarias: {
			codigo: string
			descricao: string
		}[]
		enderecos: {
			logradouro: string
			numero: string
			complemento: string
			cep: string
			bairro: string
			municipio: string
			uf: string
		}[]
		socios: {
			nome: string
			qualificação: string
		}[]
	}
	cnpj: string
	capitalSocial: number
	razaoSocial: string
	nomeFantasia: string
	dataAbertura: string
	idadeEmpresa: number
	faixaIdade: number
	quantidadeFuncionarios: string
	faixaFuncionarios: string
	porteEmpresa: string
	receitaStatus: string
	dataReceitaStatus: string
	receitaMotivoStatus: string
	receitaEfr: string
	receitaSituacaoEspecial: string
	receitaDataSituacaoEspecial: string
	cnae: string
	cnaeDescricao: string
	cnaeGrupo: string
	cnaeSubgrupo: string
	tipoEmpresa: string
	naturezaJuridica: string
	nire: string
	site: string
	regimeTributario: string
	enderecos: {
		tipoLogradouro: string
		logradouro: string
		numero: string
		complemento: string
		bairro: string
		cidade: string
		uf: string
		cep: string
	}[]
	telefones: string[]
	emails: string[]
	cnaesSecundarios: {
		cnae: string
		descricao: string
	}[]
	quadroSocietario: {
		posicao: string
		documento: string
		nome: string
		participacao: string
		qualificacaoSocio: string
		dataEntrada: string
		dataSaida: string
		valorParticipacao: string
	}[]
	participacoesEmpresas: {
		posicao: string
		documento: string
		nome: string
		participacao: string
		qualificacaoSocio: string
		dataEntrada: string
		dataSaida: string
		valorParticipacao: string
	}[]
	quantidade_dividas: number
	valor_total_dividas: number
	dividas: any[]
	historico_consultas: {
		usuario: string
		ultimaConsulta: string
	}[]
	ccf: {
		bancos: {
			banco: string
			agencia: string
			qteOcorrencias: string
			ultimo: string
			motivo: string
		}[]
		qtdRegistros: number
		historico: {
			quantidade: number
			dataConsulta: string
		}[]
	}
	processos: {
		id: string
		numero_antigo: string | null
		numero_novo: string | null
		created_at: string | null
		updated_at: string | null
		tipo_envolvido: string | null
		diario_sigla: string | null
		diario_nome: string | null
		estado: string | null
		data_movimentacoes: string | null
		quantidade_movimentacoes: number | null
		classe_processual: string | null
		assuntos: string | null
		envolvidos_ultima_movimentacao: {
			nome: string
			nome_sem_filtro: string
			envolvido_tipo: string | null
			envolvido_extra_nome: string | null
			oab: string | null
			advogado_de: string | null
		}[]
	}[]
	refin?: {
		dadosCadastrais: {
			CpfCnpj: string
			Protocolo: string
			NomeRazao: string
			NomeFantasia: string
			NascimentoFundacao: string
			Idade: string
			Sexo: string
			Signo: string
			NomeMae: string
			NomePai: string
			Rg: string
			OrigemCpf: string
			DataSituacaoCadastral: string
			SituacaoCadastral: string
			CapitalSocial: number | null
			NaturezaJuridica: string
			AtividadeEconomicaPrincipal: string
			AtividadeEconomicaSecundaria: string | null
			Endereco: string | null
			Numero: string | null
			Complemento: string | null
			Bairro: string | null
			Cidade: string | null
			Uf: string | null
			Cep: string | null
			DataConsulta: string
		}[]
		spc: {
			NomeAssociado?: string
			Valor?: string
			DataDeInclusao?: string
			DataDoVencimento?: string
			Entidade?: string
			NumeroContrato?: string
			CompradorFiadorAvalista?: string
			TelefoneAssociado?: string
			CidadeAssociado?: string
			UfAssociado?: string
		}[][]
		consultaRealizada: any[]
	}
	pefin?: {
		msg: string
		status: string
		parametro: string
		informacoes: {
			user: {
				Razao_Social: string
				CNPJ: string
				Nire: string
				Data_da_Fundacao: string
				'Insc._Estadual': string
				Situacao_CNPJ: string
				Data: string
				Natureza_Juridica: string
				Ramo_de_Atividade_Primario: string
			}
			bello: any[]
			creditcard: any[]
			protestos: {
				valor_total: number
				quantidade_ocorrencia: number
				data_primeiro: string | null
				data_ultimo: string | null
				ocorrencias: any[]
			}
			home: any[]
			phone: any[]
			valorTotalPendencias: number
			total: number
			valorTotalPendenciasFinanceiras: number
			totalPendenciasFinanceiras: number
			valorTotalPendenciasRefin: number
			totalPendenciasRefin: number
			valorTotalPendenciasVencidas: number
			totalPendenciasVencidas: number
		}[]
	}
}

export type GetCreditHubResponse = {
	data: CreditHub
}
