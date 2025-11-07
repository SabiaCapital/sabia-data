type CPF = {
	consulta_realizada: {
		id_template: number
		id_consulta_bigdata: number
		tipoConsulta: number
		data: string
	}
	identificacao: {
		dados_gerais: {
			id_entidade: number
			nome: string
			documento: string
			data_nascimento: string
			ano_obito: number | null
			data_obito: string | null
			sexo: string
			estado_civil: string | null
			data_situacao_cadastral: string
			situacao_cadastral: string
		}
		dados_localizacao_contato: {
			endereco_principal: {
				id_endereco: number
				logradouro: string
				numero: string
				bairro: string
				municipio: string
				uf: string
				cep: string
				complemento: string | null
				latitude: number | null
				longitude: number | null
			}
			telefones: string[]
			emails: string[]
			outros_enderecos: {
				id_endereco: number
				logradouro: string
				numero: string
				bairro: string
				municipio: string
				uf: string
				cep: string
				complemento: string | null
				latitude: number | null
				longitude: number | null
			}[]
		}
		participacoes_empresa: any[]
		relacionamento: any | null
		grafico_relacionamento: any | null
		beneficios_governo: any | null
		restituicao_imposto_renda: any | null
		vinculo_pessoal: any | null
		compliance_pf: any | null
	}
	pendencias_financeiras: {
		restritivo_mercado: {
			qtd_divida_vencida: number
			valor_divida_venciada: number | null
			qtd_refin: number
			valor_refin: number | null
			qtd_pefin: number
			valor_pefin: number | null
			situacao_cadastral: string
			qtd_protestos: number
			valor_protestos: number | null
			qtd_cheque_sem_fundo: number
			valor_cheque_sem_fundo: number | null
			qtd_acoes_judiciais: number
			valor_acoes_judiciais: number | null
		}
		protestos: any[]
		dividas_vencidas: any[]
		cheques_sem_fundo: any[]
		pefin: any[]
		refin: any[]
		acao_judicial: any[]
		processos_judiciais: any | null
		cenprot: any | null
	}
	evolucoes: {
		evolucao_protesto: { dados: any | null }
		evolucao_cheque_sem_fundo: { dados: any | null }
		evolucao_pefin: { dados: any | null }
		evolucao_refin: { dados: any | null }
	}
	bmp: any | null
	template: {
		id_template: number
		nome: string
		fontes: number[]
		datasets: {
			id_fonte_externa: number
			nome: string
		}[]
	}
	erros_fonte: any[]
	retorno_fontes: {
		id_fonte_externa: number
		retorno: string
	}[]
}

type CNPJ = {
	consulta_realizada: {
		id_template: number
		id_consulta_bigdata: number
		tipoConsulta: number
		data: string
	}
	identificacao: {
		dados_gerais: {
			id_entidade: number
			nome: string
			cnpj_cpf: string
			porte: string
			porte_comercial: string
			fundacao: string
			situacao_receita_data: string
			situacao_receita_descricao: string
			natureza_juridica: string | null
			capital_social: number
			faturamento_presumido: number
			tipo_unidade: string
			filiais: number
			funcionarios: number
			id_natureza: string
			descricao_natureza: string
			simples_nacional: boolean
			inscricao_estadual: string
			inscricao_municipal: string | null
			situacao_especial: string
			data_situacao_especial: string | null
			regime_tributario: string
			comex: string
			comex_ultima_atualizacao: string
			cnae_principal: {
				id_cnae: string
				descricao_cnae: string
			}
			cnaes_secundarios: {
				id_cnae: string
				descricao_cnae: string
			}[]
			historico_socio: any | null
			antecessoras: {
				nome: string
				data: string
			}[]
			historico_cadastral: any | null
			estabelecimentos: any | null
			dados_sintegra: {
				documento: string
				estado: string
				nome_oficial: string
				data_fundacao: string
				inscricao_estadual: number
				status_documento: string
				status: string
				tipo_registro_estadual: string
				cnae_principal: number
				regime_tributario: string
				informacoes_registro_estado_como_destinatario: string
				porte_empresa: string
				credito_presumido: string
				tipo_produtor: string
				arquivo_resultado: string
				lista_endereco: {
					rua: string
					numero: string | null
					complemento: string | null
					bairro: string
					cidade: string
					estado: string
					cep: string
				}[]
				lista_historico: {
					nsu: number
					documento: string
					status_documento: string
					estado: string
					numero_registro_estadual: number
					status_registro_estadual: string
					regra_icms: string
					razao: string
					data_status: string | null
					data_atualizacao: string
				}[]
				lista_dados_estados: {
					documento: string
					status_documento: string
					estado_endereco: string
					estado_registro: string
					numero_registro_estadual: number
					status_registro_estadual: string
					tipo_registro_estadual: string
				}[]
			} | null
			dominios: any | null
		}
		dados_localizacao_contato: {
			endereco_principal: {
				id_endereco: number
				logradouro: string
				numero: string
				bairro: string
				municipio: string
				uf: string
				cep: string
				complemento: string | null
				latitude: string | null
				longitude: string | null
			}
			telefones: string[]
			emails: string[]
			outros_enderecos: {
				id_endereco: number
				logradouro: string
				numero: string
				bairro: string
				municipio: string
				uf: string
				cep: string
				complemento: string | null
				latitude: string | null
				longitude: string | null
			}[]
		}
		dados_socios: {
			nome: string
			documento: string
			cargo: string
			participacao: number
			data_nascimento: string
			data_entrada: string
			data_saida: string | null
			possui_apontamento: boolean
			majoritario: boolean
			nivel_relacionamento: string | null
		}[]
		dados_administradores: {
			cnpj_cpf: string
			nome: string
			cargo: string
			nacionalidade: string
			estado_civil: string | null
			entrada: string
			mandato: string
		}[]
		participacoes_empresa: {
			nome: string
			cnpj_cpf: string
			situacao_cadastral: string
			cargo: string
			participacao: number | null
			municipio: string
			data_ultima_atualizacao: string
			nivel_relacionamento: string | null
			relacionamento_atual: string | null
		}[]
		relacionamento: any | null
		grafico_relacionamento: any | null
		identificacao_sintegra: any | null
		relacionamento_grupo_empresarial: any | null
		vinculo_familiar: {
			id_controle_consulta: number
			nome_entidade_relacao_nivel_anterior: string
			documento_entidade_relacao_nivel_anterior: string
			vinculo: {
				id_controle_consulta: number | null
				nome_entidade_relacao_nivel_anterior: string
				documento_entidade_relacao_nivel_anterior: string
				documento_entidade_relacao: string
				tipo_documento_entidade_relacao: string
				pais_entidade_relacao: string
				nome_entidade_relacao: string
				tipo_relacionamento: string
				nome_relacionamento: string
				nivel_relacionamento: string
				origem_dados_relacionamento: string
				relacionamento_historico: any | null
				relacionamento_atual: boolean
				data_criacao: string
				data_ultima_atualizacao: string
				data_inicio_relacionamento: string
				data_fim_relacionamento: string | null
			}[]
		}[]
		sancao: any | null
		sancao_proprietario: any | null
	}
	pendencias_financeiras: {
		restritivo_mercado: {
			qtd_dividas_vencidas: number | null
			valor_dividas_venciadas: number | null
			qtd_refin: number | null
			valor_refin: number | null
			qtd_pefin: number | null
			valor_pefin: number | null
			situacao_cadastral: string
			qtd_protestos: number | null
			valor_protestos: number | null
			qtd_acoes_judiciais: number | null
			valor_acoes_judiciais: number | null
			qtd_outras_ocorrencias: number | null
			valor_outras_ocorrencias: number | null
			qtd_cheques_sem_fundo: number | null
		}
		protestos: {
			ultima_data: string | null
			data_do_primeiro: string | null
			data_do_maior: string | null
			valor_total: number | null
			valor_do_primeiro: number | null
			valor_do_maior: number | null
			protestos: any | null
		}
		acoes: {
			ultima_data: string | null
			data_do_primeiro: string | null
			data_do_maior: string | null
			valor_total: number | null
			valor_do_primeiro: number | null
			valor_do_maior: number | null
			acoes_judiciais: any[]
			acoes_trabalhistas: any[]
			outras_ocorrencias: any[]
		}
		dividas_vencidas: any[]
		cheques_sem_fundo: any[]
		pefin: any[]
		refin: any[]
		cndt: {
			atual: {
				data_consulta: string
				numero_protocolo: string
				status: string
				em_debito: boolean
				texto_certificado: string
				expiracao: string
				base64_pdf: string | null
			}
			historico: any | null
		}
		fgts: {
			atual: {
				status: string
				validade_inicio: string
				validade_fim: string
				base64_pdf: string | null
			}
			historico: {
				status: string
				validade_inicio: string
				validade_fim: string
				base64_pdf: string | null
			}[]
		}
		pgfn_debito_governo: {
			nome: string | null
			valor_total_debito: number
			qtd_total_debito: number
			lista_debito_governo_origem: any[]
			lista_debito: any[]
		} | null
		processos_judiciais: any | null
		cenprot: any | null
	}
	evolucoes: {
		evolucao_capital_social: {
			dados: {
				ano: number
				mes: number
				valor: string
			}[]
		}
		evolucao_entrada_saida_socios: {
			entrada: {
				ano: number
				mes: number
				qtd: string
			}[]
			saida: {
				ano: number
				mes: number
				qtd: string
			}[]
		}
		evolucao_protesto: { dados: any | null }
		evolucao_cheque_sem_fundo: { dados: any | null }
		evolucao_pefin: {
			dados: {
				ano: number
				mes: number
				qtd: string
				valor: string
			}[]
		}
		evolucao_refin: { dados: any | null }
		evolucao_acoes_judiciais: {
			dados: {
				ano: number
				mes: number
				qtd: string
				valor: string
				polo: string
			}[]
		}
		evolucao_acoes_trabalhistas: { dados: any | null }
		evolucao_historico_consulta: {
			dados: {
				ano: number
				mes: number
				qtd: string
			}[]
		}
		evolucao_historico_pagamento: {
			mercado: {
				mes: number
				ano: number
				valor: string
				descricao: string
			}[]
			cedente: any | null
			factoring: {
				mes: number
				ano: number
				valor: string
				descricao: string
			}[]
			pagamento: {
				mes: number
				ano: number
				valor: string
				descricao: string
			}[]
		}
	}
	bmp: any | null
	template: {
		id_template: number
		nome: string
		fontes: number[]
		datasets: {
			id_fonte_externa: number
			nome: string
		}[]
	}
	erros_fonte: any[]
	retorno_fontes: {
		id_fonte_externa: number
		retorno: string
	}[]
}

export type GetMantyzResponse = {
	content: {
		pessoa_fisica?: CPF
		pessoa_juridica?: CNPJ
	}
}
