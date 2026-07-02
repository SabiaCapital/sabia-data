import dayjs from 'dayjs'
import { formatCurrency } from '@/utils/number'
import { formatCnpj, formatCpf, isCnpj } from '@/utils/text'
import type { GetMantyzResponse, GetMantyzGeralResponse } from '@/api/mantyz/types'
import type { InfoCardItem } from '@/components/info-card/types'
import { ListDrawer } from '@/components/list-drawer'

export function getCompanyItems(
	mantyzData?: GetMantyzResponse['content'],
	geralData?: GetMantyzGeralResponse['content']
): InfoCardItem[] {
	// Prefer geral data (more complete) for identification fields, fall back to PesquisaDocumento
	const geralDg = geralData?.identificacao?.dados_gerais
	const mantyzDg = mantyzData?.pessoa_juridica?.identificacao.dados_gerais

	const dadosGerais = geralDg ?? mantyzDg

	const geralAddr = geralData?.identificacao?.dados_localizacao_contato?.endereco_principal
	const mantyzAddr = mantyzData?.pessoa_juridica?.identificacao.dados_localizacao_contato.endereco_principal
	const addressData = geralAddr ?? mantyzAddr

	const address = addressData
		? [
				addressData.logradouro,
				addressData.numero,
				addressData.bairro,
				addressData.municipio,
				addressData.uf,
			]
				.filter(Boolean)
				.join(', ')
				.toUpperCase()
		: '-'

	// cnae_principal and cnaes_secundarios come from geral when available
	const cnaePrincipal = geralDg?.cnae_principal ?? null
	const filteredCnaes = (geralDg?.cnaes_secundarios ?? []).filter((c) => c.id_cnae)

	// nome_fantasia from historico_cadastral (geral only)
	const historicoCadastral = geralDg?.historico_cadastral
	const nomeFantasia =
		historicoCadastral?.lista_historico_nome?.find((h) => h.nome_fantasia)?.nome_fantasia || '-'

	const fundacaoFormatted = (() => {
		if (!dadosGerais?.fundacao) return '-'
		const d = dayjs(dadosGerais.fundacao)
		return d.isValid() ? d.format('DD/MM/YYYY') : dadosGerais.fundacao
	})()

	return [
		{ label: 'Razão social', value: dadosGerais?.nome || '-' },
		{ label: 'Nome fantasia', value: nomeFantasia },
		{ label: 'CNPJ', value: formatCnpj(dadosGerais?.cnpj_cpf) || '-' },
		{ label: 'Fundação', value: fundacaoFormatted },
		{ label: 'Capital social', value: formatCurrency(dadosGerais?.capital_social) || '-' },
		{ label: 'Endereço', value: address },
		{
			label: 'CNAE',
			value: cnaePrincipal ? (
				<span>
					{`${cnaePrincipal.id_cnae} - ${cnaePrincipal.descricao_cnae} `}

					{filteredCnaes.length ? (
						<ListDrawer
							title='CNAEs secundárias'
							triggerLabel={`Ver ${filteredCnaes.length} ${filteredCnaes.length === 1 ? 'CNAE secundária' : 'CNAEs secundárias'}`}
							data={filteredCnaes}
							columns={[
								{ header: 'Código', render: (c) => c.id_cnae || '-' },
								{ header: 'Descrição', render: (c) => c.descricao_cnae || '-' },
							]}
						/>
					) : null}
				</span>
			) : (
				'-'
			),
		},
	]
}

export function getMantyzItems(data?: GetMantyzResponse['content']): InfoCardItem[] {
	const company = data?.pessoa_juridica
	const financialIssues = company?.pendencias_financeiras
	const marketRestrictions = financialIssues?.restritivo_mercado
	const identification = company?.identificacao
	const evolution = company?.evolucoes
	const legalActions = financialIssues?.acoes

	const pefinCount = marketRestrictions?.qtd_pefin
	const pefinValue = marketRestrictions?.valor_pefin

	const refinCount = marketRestrictions?.qtd_refin
	const refinValue = marketRestrictions?.valor_refin

	const protestsCount = marketRestrictions?.qtd_protestos
	const protestsValue = marketRestrictions?.valor_protestos

	const debtsCount = marketRestrictions?.qtd_dividas_vencidas
	const debtsValue = marketRestrictions?.valor_dividas_venciadas

	const paymentHistory = evolution?.evolucao_historico_pagamento

	return [
		{
			label: 'PEFIN',
			value: pefinCount
				? `${pefinCount} ${pefinCount === 1 ? 'registro' : 'registros'} - ${formatCurrency(pefinValue)}`
				: '-',
		},
		{
			label: 'REFIN',
			value: refinCount
				? `${refinCount} ${refinCount === 1 ? 'registro' : 'registros'} - ${formatCurrency(refinValue)}`
				: '-',
		},
		{
			label: 'Protestos',
			value: protestsCount
				? `${protestsCount} ${protestsCount === 1 ? 'registro' : 'registros'} - ${formatCurrency(protestsValue)}`
				: '-',
		},
		{
			label: 'PGFN',
			value: debtsCount
				? `${debtsCount} ${debtsCount === 1 ? 'registro' : 'registros'} - ${formatCurrency(debtsValue)}`
				: '-',
		},
		{
			label: 'Cheques sem fundo',
			value: financialIssues?.cheques_sem_fundo?.length ? (
				<ListDrawer
					title='Cheques sem fundo'
					triggerLabel={`Ver ${financialIssues.cheques_sem_fundo.length} ${financialIssues.cheques_sem_fundo.length === 1 ? 'registro' : 'registros'}`}
					data={financialIssues.cheques_sem_fundo}
					columns={[
						{ header: 'Banco', render: (c) => c.banco || '-' },
						{ header: 'Agência', render: (c) => c.agencia || '-' },
						{ header: 'Tipo', render: (c) => c.cheque || '-' },
						{ header: 'Quantidade', render: (c) => c.quantidade ?? '-' },
						{ header: 'Valor', render: (c) => formatCurrency(c.valor) || '-' },
						{
							header: 'Último',
							render: (c) => {
								const date = dayjs(c.data)
								return date.isValid() ? date.format('DD/MM/YYYY') : '-'
							},
						},
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Ações judiciais',
			value: legalActions?.acoes_judiciais?.length ? (
				<ListDrawer
					title='Ações judiciais'
					triggerLabel={`Ver ${legalActions.acoes_judiciais.length} ${legalActions.acoes_judiciais.length === 1 ? 'ação' : 'ações'}`}
					data={legalActions.acoes_judiciais}
					columns={[
						{ header: 'Natureza', render: (a) => a.natureza || '-' },
						{ header: 'Vara', render: (a) => (a.vara ? `${a.vara}ª` : '-') },
						{ header: 'UF', render: (a) => a.uf || '-' },
						{ header: 'Cidade', render: (a) => a.cidade || '-' },
						{ header: 'Valor', render: (a) => formatCurrency(a.valor) || '-' },
						{
							header: 'Data',
							render: (a) => {
								const date = dayjs(a.data)
								return date.isValid() ? date.format('DD/MM/YYYY') : '-'
							},
						},
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Ações trabalhistas',
			value: legalActions?.acoes_trabalhistas?.length ? (
				<ListDrawer
					title='Ações trabalhistas'
					triggerLabel={`Ver ${legalActions.acoes_trabalhistas.length} ${legalActions.acoes_trabalhistas.length === 1 ? 'ação' : 'ações'}`}
					data={legalActions.acoes_trabalhistas}
					columns={[
						{ header: 'Natureza', render: (a) => a.natureza || '-' },
						{ header: 'Vara', render: (a) => (a.vara ? `${a.vara}ª` : '-') },
						{ header: 'UF', render: (a) => a.uf || '-' },
						{ header: 'Cidade', render: (a) => a.cidade || '-' },
						{ header: 'Valor', render: (a) => formatCurrency(a.valor) || '-' },
						{
							header: 'Data',
							render: (a) => {
								const date = dayjs(a.data)
								return date.isValid() ? date.format('DD/MM/YYYY') : '-'
							},
						},
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Quadro societário',
			value: identification?.dados_socios?.length ? (
				<ListDrawer
					title='Quadro societário'
					triggerLabel={`Ver ${identification.dados_socios.length} ${identification.dados_socios.length === 1 ? 'sócio' : 'sócios'}`}
					data={identification.dados_socios}
					columns={[
						{ header: 'Nome', render: (s) => s.nome || '-' },
						{
							header: 'Documento',
							render: (s) => {
								const doc = s.documento
								return doc ? (isCnpj(doc) ? formatCnpj(doc) : formatCpf(doc)) : '-'
							},
						},
						{ header: 'Qualificação', render: (s) => s.cargo || '-' },
						{
							header: 'Entrada',
							render: (s) => {
								const date = dayjs(s.data_entrada)
								return date.isValid() ? date.format('DD/MM/YYYY') : '-'
							},
						},
						{
							header: 'Saída',
							render: (s) => {
								const date = dayjs(s.data_saida)
								return date.isValid() ? date.format('DD/MM/YYYY') : '-'
							},
						},
						{
							header: 'Restrição',
							render: (s) => (s.possui_apontamento ? 'Sim' : 'Não'),
						},
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Administradores',
			value: identification?.dados_administradores?.length ? (
				<ListDrawer
					title='Administradores'
					triggerLabel={`Ver ${identification.dados_administradores.length} ${identification.dados_administradores.length === 1 ? 'administrador' : 'administradores'}`}
					data={identification.dados_administradores}
					columns={[
						{ header: 'Nome', render: (a) => a.nome || '-' },
						{
							header: 'Documento',
							render: (a) => {
								const doc = a.cnpj_cpf
								return doc ? (isCnpj(doc) ? formatCnpj(doc) : formatCpf(doc)) : '-'
							},
						},
						{ header: 'Qualificação', render: (a) => a.cargo || '-' },
						{
							header: 'Entrada',
							render: (a) => {
								const date = dayjs(a.entrada)
								return date.isValid() ? date.format('DD/MM/YYYY') : '-'
							},
						},
						{ header: 'Mandato', render: (a) => a.mandato || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Empresas ligadas',
			value: identification?.participacoes_empresa?.length ? (
				<ListDrawer
					title='Empresas ligadas'
					triggerLabel={`Ver ${identification.participacoes_empresa.length} ${identification.participacoes_empresa.length === 1 ? 'empresa' : 'empresas'}`}
					data={identification.participacoes_empresa}
					columns={[
						{ header: 'Nome', render: (e) => e.nome || '-' },
						{ header: 'Documento', render: (e) => formatCnpj(e.cnpj_cpf) || '-' },
						{ header: 'Qualificação', render: (e) => e.cargo || '-' },
						{ header: 'Situação', render: (e) => e.situacao_cadastral || '-' },
						{
							header: 'Última atualização',
							render: (e) => {
								const date = dayjs(e.data_ultima_atualizacao)
								return date.isValid() ? date.format('DD/MM/YYYY') : '-'
							},
						},
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Hist. pagamento - Mercado',
			value: paymentHistory?.mercado?.length ? (
				<ListDrawer
					title='Hist. pagamento - Mercado'
					triggerLabel={`Ver ${paymentHistory.mercado.length} ${paymentHistory.mercado.length === 1 ? 'registro' : 'registros'}`}
					data={paymentHistory.mercado}
					columns={[
						{ header: 'Ano', render: (p) => (p.ano ? String(2000 + p.ano) : '-') },
						{
							header: 'Mês',
							render: (p) =>
								dayjs()
									.month(p.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Valor', render: (p) => formatCurrency(p.valor) || '-' },
						{ header: 'Descrição', render: (p) => p.descricao || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Hist. pagamento - Cedente',
			value: paymentHistory?.cedente?.length ? (
				<ListDrawer
					title='Hist. pagamento - Cedente'
					triggerLabel={`Ver ${paymentHistory.cedente.length} ${paymentHistory.cedente.length === 1 ? 'registro' : 'registros'}`}
					data={paymentHistory.cedente}
					columns={[
						{ header: 'Ano', render: (p) => (p.ano ? String(2000 + p.ano) : '-') },
						{
							header: 'Mês',
							render: (p) =>
								dayjs()
									.month(p.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Valor', render: (p) => formatCurrency(p.valor) || '-' },
						{ header: 'Descrição', render: (p) => p.descricao || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Hist. pagamento - Sacado',
			value: paymentHistory?.pagamento?.length ? (
				<ListDrawer
					title='Hist. pagamento - Sacado'
					triggerLabel={`Ver ${paymentHistory.pagamento.length} ${paymentHistory.pagamento.length === 1 ? 'registro' : 'registros'}`}
					data={paymentHistory.pagamento}
					columns={[
						{ header: 'Ano', render: (p) => (p.ano ? String(2000 + p.ano) : '-') },
						{
							header: 'Mês',
							render: (p) =>
								dayjs()
									.month(p.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Valor', render: (p) => formatCurrency(p.valor) || '-' },
						{ header: 'Descrição', render: (p) => p.descricao || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Hist. pagamento - Factoring',
			value: paymentHistory?.factoring?.length ? (
				<ListDrawer
					title='Hist. pagamento - Factoring'
					triggerLabel={`Ver ${paymentHistory.factoring.length} ${paymentHistory.factoring.length === 1 ? 'registro' : 'registros'}`}
					data={paymentHistory.factoring}
					columns={[
						{ header: 'Ano', render: (p) => (p.ano ? String(2000 + p.ano) : '-') },
						{
							header: 'Mês',
							render: (p) =>
								dayjs()
									.month(p.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Valor', render: (p) => formatCurrency(p.valor) || '-' },
						{ header: 'Descrição', render: (p) => p.descricao || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Evolução - PEFIN',
			value: evolution?.evolucao_pefin?.dados?.length ? (
				<ListDrawer
					title='Evolução - PEFIN'
					triggerLabel={`Ver ${evolution.evolucao_pefin.dados.length} ${evolution.evolucao_pefin.dados.length === 1 ? 'registro' : 'registros'}`}
					data={evolution.evolucao_pefin.dados}
					columns={[
						{ header: 'Ano', render: (e) => e.ano ?? '-' },
						{
							header: 'Mês',
							render: (e) =>
								dayjs()
									.month(e.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Quantidade', render: (e) => e.qtd || '-' },
						{ header: 'Valor', render: (e) => formatCurrency(e.valor) || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Evolução - REFIN',
			value: evolution?.evolucao_refin?.dados?.length ? (
				<ListDrawer
					title='Evolução - REFIN'
					triggerLabel={`Ver ${evolution.evolucao_refin.dados.length} ${evolution.evolucao_refin.dados.length === 1 ? 'registro' : 'registros'}`}
					data={evolution.evolucao_refin.dados}
					columns={[
						{ header: 'Ano', render: (e) => e.ano ?? '-' },
						{
							header: 'Mês',
							render: (e) =>
								dayjs()
									.month(e.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Quantidade', render: (e) => e.qtd || '-' },
						{ header: 'Valor', render: (e) => formatCurrency(e.valor) || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Evolução - Protestos',
			value: evolution?.evolucao_protesto?.dados?.length ? (
				<ListDrawer
					title='Evolução - Protestos'
					triggerLabel={`Ver ${evolution.evolucao_protesto.dados.length} ${evolution.evolucao_protesto.dados.length === 1 ? 'registro' : 'registros'}`}
					data={evolution.evolucao_protesto.dados}
					columns={[
						{ header: 'Ano', render: (e) => e.ano ?? '-' },
						{
							header: 'Mês',
							render: (e) =>
								dayjs()
									.month(e.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Quantidade', render: (e) => e.qtd || '-' },
						{ header: 'Valor', render: (e) => formatCurrency(e.valor) || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Evolução - Cheques sem fundo',
			value: evolution?.evolucao_cheque_sem_fundo?.dados?.length ? (
				<ListDrawer
					title='Evolução - Cheques sem fundo'
					triggerLabel={`Ver ${evolution.evolucao_cheque_sem_fundo.dados.length} ${evolution.evolucao_cheque_sem_fundo.dados.length === 1 ? 'registro' : 'registros'}`}
					data={evolution.evolucao_cheque_sem_fundo.dados}
					columns={[
						{ header: 'Ano', render: (e) => e.ano ?? '-' },
						{
							header: 'Mês',
							render: (e) =>
								dayjs()
									.month(e.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Quantidade', render: (e) => e.qtd || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Evolução - Ações judiciais',
			value: evolution?.evolucao_acoes_judiciais?.dados?.length ? (
				<ListDrawer
					title='Evolução - Ações judiciais'
					triggerLabel={`Ver ${evolution.evolucao_acoes_judiciais.dados.length} ${evolution.evolucao_acoes_judiciais.dados.length === 1 ? 'registro' : 'registros'}`}
					data={evolution.evolucao_acoes_judiciais.dados}
					columns={[
						{ header: 'Ano', render: (e) => e.ano ?? '-' },
						{
							header: 'Mês',
							render: (e) =>
								dayjs()
									.month(e.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Quantidade', render: (e) => e.qtd || '-' },
						{ header: 'Valor', render: (e) => formatCurrency(e.valor) || '-' },
						{ header: 'Polo', render: (e) => e.polo || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Evolução - Ações trabalhistas',
			value: evolution?.evolucao_acoes_trabalhistas?.dados?.length ? (
				<ListDrawer
					title='Evolução - Ações trabalhistas'
					triggerLabel={`Ver ${evolution.evolucao_acoes_trabalhistas.dados.length} ${evolution.evolucao_acoes_trabalhistas.dados.length === 1 ? 'registro' : 'registros'}`}
					data={evolution.evolucao_acoes_trabalhistas.dados}
					columns={[
						{ header: 'Ano', render: (e) => e.ano ?? '-' },
						{
							header: 'Mês',
							render: (e) =>
								dayjs()
									.month(e.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Quantidade', render: (e) => e.qtd || '-' },
						{ header: 'Valor', render: (e) => formatCurrency(e.valor) || '-' },
						{ header: 'Polo', render: (e) => e.polo || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Alterações - Capital social',
			value: evolution?.evolucao_capital_social?.dados?.length ? (
				<ListDrawer
					title='Alterações - Capital social'
					triggerLabel={`Ver ${evolution.evolucao_capital_social.dados.length} ${evolution.evolucao_capital_social.dados.length === 1 ? 'registro' : 'registros'}`}
					data={evolution.evolucao_capital_social.dados}
					columns={[
						{ header: 'Ano', render: (e) => e.ano ?? '-' },
						{
							header: 'Mês',
							render: (e) =>
								dayjs()
									.month(e.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Valor', render: (e) => formatCurrency(e.valor) || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Alterações - Sócios',
			value: (() => {
				const entries = evolution?.evolucao_entrada_saida_socios?.entrada || []
				const exits = evolution?.evolucao_entrada_saida_socios?.saida || []

				const combinedChanges = [
					...entries.map((e) => ({ ...e, tipo: 'Entrada' })),
					...exits.map((e) => ({ ...e, tipo: 'Saída' })),
				]

				return combinedChanges.length ? (
					<ListDrawer
						title='Alterações - Sócios'
						triggerLabel={`Ver ${combinedChanges.length} ${combinedChanges.length === 1 ? 'registro' : 'registros'}`}
						data={combinedChanges}
						columns={[
							{ header: 'Ano', render: (e) => e.ano ?? '-' },
							{
								header: 'Mês',
								render: (e) =>
									dayjs()
										.month(e.mes - 1)
										.format('MMMM')
										.replace(/^./, (l) => l.toUpperCase()),
							},
							{ header: 'Quantidade', render: (e) => e.qtd || '-' },
							{ header: 'Tipo', render: (e) => e.tipo || '-' },
						]}
					/>
				) : (
					'-'
				)
			})(),
		},
		{
			label: 'Alterações - Antecessoras',
			value: identification?.dados_gerais?.antecessoras?.length ? (
				<ListDrawer
					title='Alterações - Antecessoras'
					triggerLabel={`Ver ${identification.dados_gerais.antecessoras.length} ${identification.dados_gerais.antecessoras.length === 1 ? 'empresa' : 'empresas'}`}
					data={identification.dados_gerais.antecessoras}
					columns={[
						{ header: 'Nome', render: (a) => a.nome || '-' },
						{
							header: 'Data',
							render: (a) => {
								const date = dayjs(a.data)
								return date.isValid() ? date.format('DD/MM/YYYY') : '-'
							},
						},
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Consultas',
			value: evolution?.evolucao_historico_consulta?.dados?.length ? (
				<ListDrawer
					title='Consultas'
					triggerLabel={`Ver ${evolution.evolucao_historico_consulta.dados.length} ${evolution.evolucao_historico_consulta.dados.length === 1 ? 'registro' : 'registros'}`}
					data={evolution.evolucao_historico_consulta.dados}
					columns={[
						{ header: 'Ano', render: (c) => (c.ano ? String(2000 + c.ano) : '-') },
						{
							header: 'Mês',
							render: (c) =>
								dayjs()
									.month(c.mes - 1)
									.format('MMMM')
									.replace(/^./, (l) => l.toUpperCase()),
						},
						{ header: 'Quantidade', render: (c) => c.qtd || '-' },
					]}
				/>
			) : (
				'-'
			),
		},
	]
}
