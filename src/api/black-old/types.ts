type Client = {
	IDIDENTITYCEDENTE: number
	CEDENTEID: string
	STATUS: 'AGUARDANDO_APROVACAO' | 'ABERTO' | 'ATIVO' | 'INATIVO'
	DATECREATED: string
	USERCREATED: string
	CEDENTEPESSOAID: string
	FATOR: number
	BLOQUEADO: 'SIM' | 'NAO'
	EMPRESAID: string
	EMPRESANOME: string
	STATUSADMINISTRADORA: 'ABERTO'
	STATUSGESTORA: 'ABERTO'
	CEDENTECNPJCPF: string
	SITUACAOCADASTRAL: 'ATIVA'
	DATAABERTURA: string
	TIPO: 'MATRIZ'
	PORTE: string
	RECUPERACAOJUDICIAL: 'SIM'
	GRUPOECONOMICONOME: string | null
	GRUPOECONOMICOID: string | null
	NOMEFANTASIA: string | null
	CAPITALSOCIAL: number
	INSCRICAOMUNICIPAL: string | null
	ATIVIDADEPRINCIPAL: string
	WEBSITE: string | null
	OBSERVACOESGERAIS: string | null
	CEDENTENOME: string
	FATURAMENTOANUAL: string
	AGENTEID: string
	AGENTENOME: string
	AGENTECNPJCPF: string
	RAMOATIVIDADE: string
	CLASSIFICACAORISCO: string
	TIPOSOCIEDADE: string
	SITUACAOCEDENTE: 'N/A'
	COOBRIGACAO: 'NAO'
	LIMITETOTALMODALIDADES: number
	CEP: string
	LOGRADOURO: string
	BAIRRO: string
	CIDADE: string
	ESTADO: string
	CONTATO: string
	EMAIL: string
	TELEFONE1: string
	TELEFONE2: string | null
	CONTATOOBSERVACOES: string | null
	CLASSIFICACAONOME: string | null
}

type Operation = {
	ADITIVOID: string
	ADITIVOSTATUS: 'FECHADO'
	USERIDCREATED: string
	USERIDCLOSED: string | null
	DATECREATED: string
	DATEMOVIMENTO: string
	REMESSA: number
	REEMBOLSO: number
	VALORFACE: number
	VALORAPAGAR: number
	NUMEROADITIVO: number
	NUMEROADITIVOLEGADO: string
	QUANTIDADEPAGAMENTO: number
	NOMEARQUIVO: string
	DESAGIO: number
	DEBITOS: number
	CREDITOS: number
	ABATIMENTO: number | null
	FEETERCEIROS: number | null
	FEECALCUCLADO: number | null
	PRAZOMEDIO: number
	FATOR: number
	FLOATT: number
	CEDENTEID: string
	NOMECEDENTE: string
	CEDENTECNPJ: string
	TIPOOPERACAO:
		| 'N/A'
		| 'COM_COOBRIGACAO'
		| 'SEM_COOBRIGACAO'
		| 'COM_COOBRIGACAO_ENDOSSO'
		| 'SEM_COOBRIGACAO_ENDOSSO'
	RECOMPRA: number
	TIPORECOMPRA: 'N/A' | 'SEM_RECOMPRA'
	EMPRESAID: string
	EMPRESANOME: string
	EMPRESANOMEFANTASIA: string
	CERTIFICADORANOME: string | null
	CLASSIFICAO: string | null
	DATAFECHAMENTOOPERACAO: string
	DESPESASDOCUMENTOS: number | null
	DESPESASOPERACAO: number | null
	DESPESASSACADO: number | null
	MODALIDADES: 'DESCONTO' | 'DESCONTO_2' | 'COMISSARIA' | 'INTERCOMPANY' | 'CCB'
}

type Receivable = {
	ADITIVODOCUMENTOID: string
	FIDCID: string
	NUMERODOCUMENTOIDENTITY: number
	TIPORECEBIVEL: 'DUPLICATA'
	NUMERODOCUMENTO: string
	NUMERONOTA: string
	MODALIDADE: 'COMISSARIA' | 'DESCONTO'
	NFEKEY: string
	NOSSONUMERO: string
	DIGITOVERIFICADOR: string
	ADITIVOID: string
	DATAMOVIMENTO: string
	DATAOPERACAO: string
	NUMEROADITIVO: number
	NUMEROADITIVOLEGADO: string
	STATUSOPERACAO: 'FECHADO'
	CEDENTEID: string
	CEDENTEPESSOAID: string
	CEDENTESTATUS: 'ATIVO' | 'INATIVO'
	CEDENTEBLOQUEADO: 'SIM' | 'NAO'
	CEDENTECNPJCPF: string
	CEDENTENOME: string
	CEDENTENOMEFANTASIA: string
	SACADOID: string
	SACADOPESSOAID: string
	SACADOSTATUS: 'ATIVO' | 'INATIVO'
	SACADOCNPJCPF: string
	SACADONOME: string
	SACADONOMEFANTASIA: string
	MEIOSRECEBIMENTO: string
	CONTAID: string
	CONTAAGENCIA: string
	NUMEROCONTA: string
	BANCOCODIGO: number
	BANCONOME: string
	VALORFACE: number
	VALORABERTO: number
	VALORLIQUIDADO: number
	ABERTOVENCIDO: number
	ABERTOAVENCER: number
	VALORPAGO: number
	STATUSRECEBIVEL: 'FECHADO'
	STATUSBAIXA: number
	DATABAIXA: string
	VENCIMENTO: string
	DATEVENCIMENTOATUALIZADO: string
	DATACARTORIO: string | null
	DATAPROTESTO: string | null
	NUMERODOCUMENTOIDENTITYLEGADO: string | null
	VENCIMENTOATUALIZADOANTECIPACAO: string | null
	VENCIMENTOATUALIZADOPRORROGACAO: string | null
	ATRASO: number
	PRAZO: number
	NOTACARTACORRECAO: string | null
	NOTACANCELADA: boolean
	TIPOBAIXA: number
	VALORULTIMABAIXA: number
	CLASSIFICACAODOCUMENTONOME: string | null
	CLASSIFICACAOCEDENTENOME: 'REGULAR' | 'RUIM'
	CLASSIFICACAOSACADONOME: string | null
	ADITIVODOCUMENTOABATIMENTO: number
	DESAGIO: number
	VALORAPAGAR: number
	DESPESA: number
	LIQUIDO: number
	DESCONTO: number | null
	VALORVENCIDOATUALIZADO: number
	DATARECOMPRA: string | null
	STATUSRECOMPRA: string
	CARTEIRAID: string | null
}

type SortDirectionOptions = 'ASC' | 'DESC'

type PaginationParams = {
	totalRecords: number
	page: number
	pageSize: number
	totalPages: number
	sortField: string
	sortDirection: SortDirectionOptions
	filterField: string
	filterValue: string
}

export type QueryParams = {
	filter?: string
	filterValue?: string
	page?: number
	pageSize?: number
	sortField?: string
	sortDirection?: SortDirectionOptions
}

export type GetClientsResponse = {
	data: Client[]
} & PaginationParams

export type GetOperationsResponse = {
	data: Operation[]
} & PaginationParams

export type GetReceivablesResponse = {
	data: Receivable[]
} & PaginationParams
