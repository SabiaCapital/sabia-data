import dayjs from 'dayjs'
import { formatCurrency } from '@/utils/number'
import { formatCnpj, formatCpf, isCnpj } from '@/utils/text'
import type { GetMantyzResponse, GetMantyzCreditResponse } from '@/api/mantyz/types'
import type { InfoCardItem } from '@/components/info-card/types'
import { ListDrawer } from '@/components/list-drawer'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { calculateSabiaScore, type SabiaScoreCalculation } from '@/lib/sabia-score'

function formatPhone(raw: string): string {
	const n = raw.replace(/\D/g, '')
	if (n.length === 11) return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
	if (n.length === 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`
	return raw
}

export function getCompanyItems(
	mantyzData?: GetMantyzResponse['content'],
	geralData?: GetMantyzCreditResponse['content']
): InfoCardItem[] {
	const geralDg = geralData?.identificacao?.dados_gerais
	const mantyzDg = mantyzData?.pessoa_juridica?.identificacao.dados_gerais
	const dadosGerais = geralDg ?? mantyzDg

	const geralLoc = geralData?.identificacao?.dados_localizacao_contato
	const geralAddr = geralLoc?.endereco_principal
	const mantyzAddr = mantyzData?.pessoa_juridica?.identificacao.dados_localizacao_contato.endereco_principal
	const addressData = geralAddr ?? mantyzAddr

	const address = addressData
		? [addressData.logradouro, addressData.numero, addressData.bairro, addressData.municipio, addressData.uf]
				.filter(Boolean)
				.join(', ')
				.toUpperCase()
		: '-'

	const outrosEnderecos = geralLoc?.outros_enderecos ?? []

	const emails = geralLoc?.emails ?? []
	const emailPrimary = emails[0] ?? '-'
	const emailOthers = emails.slice(1)

	const phones = geralLoc?.telefones ?? []
	const phonePrimary = phones[0] ? formatPhone(phones[0]) : '-'
	const phoneOthers = phones.slice(1)

	const cnaePrincipal = geralDg?.cnae_principal ?? null
	const filteredCnaes = (geralDg?.cnaes_secundarios ?? []).filter((c) => c.id_cnae)

	const historicoCadastral = geralDg?.historico_cadastral
	const nomeFantasia =
		historicoCadastral?.lista_historico_nome?.find((h) => h.nome_fantasia)?.nome_fantasia || '-'

	const fundacaoFormatted = (() => {
		if (!dadosGerais?.fundacao) return '-'
		const d = dayjs(dadosGerais.fundacao)
		return d.isValid() ? d.format('DD/MM/YYYY') : dadosGerais.fundacao
	})()

	const situacaoReceitaFormatted = (() => {
		const desc = geralDg?.situacao_receita_descricao
		const date = geralDg?.situacao_receita_data
		if (!desc) return '-'
		if (date) {
			const d = dayjs(date)
			return `${desc} — ${d.isValid() ? d.format('DD/MM/YYYY') : date}`
		}
		return desc
	})()
	// Build ordered and grouped items for the Empresa card.
	const items: InfoCardItem[] = []

	// Primary top-line fields (ordered): Razão social, CNPJ, Endereço, Email/Telefone (same line)
	items.push({ label: 'Razão social', value: dadosGerais?.nome || '-' })
	items.push({ label: 'CNPJ', value: formatCnpj(dadosGerais?.cnpj_cpf) || '-' })
	items.push({
		label: 'Endereço',
		value:
			outrosEnderecos.length > 0 && address !== '-' ? (
				<span>
					{address}{' '}
					<ListDrawer
						title='Outros endereços'
						triggerLabel={`Ver ${outrosEnderecos.length} ${outrosEnderecos.length === 1 ? 'outro endereço' : 'outros endereços'}`}
						data={outrosEnderecos}
						columns={[
							{
								header: 'Logradouro',
								render: (e) => `${e.logradouro}, ${e.numero}`.toUpperCase(),
							},
							{ header: 'Bairro', render: (e) => e.bairro?.toUpperCase() || '-' },
							{
								header: 'Município',
								render: (e) => `${e.municipio} - ${e.uf}`.toUpperCase(),
							},
							{ header: 'CEP', render: (e) => e.cep || '-' },
						]}
					/>
				</span>
			) : (
				address
			),
	})

	items.push({
		label: 'Email',
		value: (
			<span>
				{emailPrimary}
				{emailOthers.length > 0 ? (
					<>
						{' '}
						<ListDrawer
							title='Outros emails'
							triggerLabel={`Ver ${emailOthers.length} ${emailOthers.length === 1 ? 'outro email' : 'outros emails'}`}
							data={emailOthers.map((e) => ({ email: e }))}
							columns={[{ header: 'Email', render: (e) => e.email }]}
						/>
					</>
				) : null}
			</span>
		),
	})

	items.push({
		label: 'Telefone',
		value: (
			<span>
				{phonePrimary}
				{phoneOthers.length > 0 ? (
					<>
						{' '}
						<ListDrawer
							title='Outros telefones'
							triggerLabel={`Ver ${phoneOthers.length} ${phoneOthers.length === 1 ? 'outro telefone' : 'outros telefones'}`}
							data={phoneOthers.map((p) => ({ telefone: formatPhone(p) }))}
							columns={[{ header: 'Telefone', render: (p) => p.telefone }]}
						/>
					</>
				) : null}
			</span>
		),
	})

	// Dados gerais subtitle with pairs on the same line
	items.push({
		label: '',
		value: (
			<div className='flex flex-col gap-2'>
				<Separator className='my-2' />
				<div className='text-lg font-semibold text-foreground'>Dados gerais</div>
				<div className='grid grid-cols-2 gap-4 mt-2'>
					<div>
						<div className='text-sm font-semibold text-foreground'>Fundação</div>
						<div>{fundacaoFormatted}</div>
					</div>
					<div>
						<div className='text-sm font-semibold text-foreground'>Tipo de Unidade</div>
						<div>{geralDg?.tipo_unidade || '-'}</div>
					</div>

					<div>
						<div className='text-sm font-semibold text-foreground'>Filiais</div>
						<div>{geralDg?.filiais != null ? String(geralDg.filiais) : '-'}</div>
					</div>
					<div>
						<div className='text-sm font-semibold text-foreground'>Funcionários</div>
						<div>{geralDg?.funcionarios != null ? String(geralDg.funcionarios) : '-'}</div>
					</div>

					<div>
						<div className='text-sm font-semibold text-foreground'>Porte comercial</div>
						<div>{geralDg?.porte_comercial || '-'}</div>
					</div>
					<div>
						<div className='text-sm font-semibold text-foreground'>Porte tributário</div>
						<div>{geralDg?.porte || '-'}</div>
					</div>

					<div>
						<div className='text-sm font-semibold text-foreground'>Regime tributário</div>
						<div>{geralDg?.regime_tributario || '-'}</div>
					</div>
					<div>
						<div className='text-sm font-semibold text-foreground'>COMEX</div>
						<div>{geralDg?.comex || '-'}</div>
					</div>

					<div>
						<div className='text-sm font-semibold text-foreground'>Inscrição estadual</div>
						<div>{geralDg?.inscricao_estadual || '-'}</div>
					</div>
					<div>
						<div className='text-sm font-semibold text-foreground'>Situação Receita Federal</div>
						<div>{situacaoReceitaFormatted}</div>
					</div>

					<div>
						<div className='text-sm font-semibold text-foreground'>Situação especial</div>
						<div>{geralDg?.situacao_especial || '-'}</div>
					</div>
					<div>
						<div className='text-sm font-semibold text-foreground'>Situação SINTEGRA</div>
						<div>{geralDg?.dados_sintegra?.status || '-'}</div>
					</div>

					<div>
						<div className='text-sm font-semibold text-foreground'>Capital social</div>
						<div>{formatCurrency(dadosGerais?.capital_social) || '-'}</div>
					</div>
					<div>
						<div className='text-sm font-semibold text-foreground'>Faturamento</div>
						<div>{formatCurrency(geralDg?.faturamento_presumido) || '-'}</div>
					</div>
				</div>

				<div className='mt-3'>
					<div className='text-sm font-semibold text-foreground'>Natureza jurídica</div>
					<div>{geralDg?.descricao_natureza || '-'}</div>
				</div>

				<div className='mt-2'>
					<div className='text-sm font-semibold text-foreground'>CNAE</div>
					<div className=''>
						{cnaePrincipal ? (
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
						)}
					</div>
				</div>
			</div>
		),
	})

	return items
}

export function getCompanyCadastroItems(
	geralData?: GetMantyzCreditResponse['content']
): InfoCardItem[] {
	const geralDg = geralData?.identificacao?.dados_gerais

	const situacaoReceita = (() => {
		const desc = geralDg?.situacao_receita_descricao
		const date = geralDg?.situacao_receita_data
		if (!desc) return '-'
		if (date) {
			const d = dayjs(date)
			return `${desc} — ${d.isValid() ? d.format('DD/MM/YYYY') : date}`
		}
		return desc
	})()

	const situacaoEspecial = (() => {
		const desc = geralDg?.situacao_especial
		const date = geralDg?.data_situacao_especial
		if (!desc) return '-'
		if (date) {
			const d = dayjs(date)
			return `${desc} — ${d.isValid() ? d.format('DD/MM/YYYY') : date}`
		}
		return desc
	})()

	return [
		{ label: 'Porte tributário', value: geralDg?.porte || '-' },
		{ label: 'Regime tributário', value: geralDg?.regime_tributario || '-' },
		{ label: 'COMEX', value: geralDg?.comex || '-' },
		{ label: 'Inscrição estadual', value: geralDg?.inscricao_estadual || '-' },
		{ label: 'Situação Receita Federal', value: situacaoReceita },
		{ label: 'Situação especial', value: situacaoEspecial },
		{ label: 'Situação SINTEGRA', value: geralDg?.dados_sintegra?.status || '-' },
	]
}

export function getScoreItems(
	geralData?: GetMantyzCreditResponse['content']
): InfoCardItem[] {
	const score = geralData?.score
	const dgs = score?.dados_gerais_score

	if (!dgs) return [{ label: 'Status', value: '-' }]

	const bloqueios = (score?.notificacoes ?? []).filter(
		(n) => n.descricao_evento === 'Bloqueio'
	)
	const notificacoes = (score?.notificacoes ?? []).filter(
		(n) => n.descricao_evento !== 'Bloqueio'
	)
	const pontosNegativos = score?.pontos_negativos ?? []
	const pontosAtencao = score?.pontos_atencao ?? []

	const statusBadge = dgs.bloqueado ? (
		<Badge variant='destructive'>BLOQUEADO</Badge>
	) : dgs.ressalva ? (
		<Badge variant='secondary'>RESSALVA</Badge>
	) : (
		<Badge style={{ backgroundColor: '#22c55e', color: 'white', border: 'none' }}>APROVADO</Badge>
	)

	const validadeFormatted = (() => {
		if (!dgs.validade) return '-'
		const d = dayjs(dgs.validade)
		return d.isValid() ? d.format('DD/MM/YYYY') : dgs.validade
	})()

	const items: InfoCardItem[] = [
		{ label: 'Status', value: statusBadge },
		{
			label: 'Limite sugerido',
			value: formatCurrency(dgs.limite_sugerido) || '-',
		},
		{
			label: 'Score',
			value: dgs.score != null ? String(dgs.score) : 'Não calculado',
		},
		{ label: 'Política de crédito', value: dgs.politica_credito?.trim() || '-' },
		{ label: 'Validade', value: validadeFormatted },
		{
			label: '',
			value: <Separator className='my-3' />,
		},
		{
			label: '',
			value: <div className='text-lg font-semibold text-foreground'>Alertas</div>,
		},
		{
			label: 'Bloqueios',
			value: bloqueios.length ? (
				<ListDrawer
					title='Bloqueios'
					triggerLabel={`Ver ${bloqueios.length} ${bloqueios.length === 1 ? 'bloqueio' : 'bloqueios'}`}
					data={bloqueios}
					columns={[
						{ header: 'Motivo', render: (n) => n.nome },
						{ header: 'Detalhe', render: (n) => n.descricao_faixa },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Ressalvas',
			value: notificacoes.length ? (
				<ListDrawer
					title='Ressalvas'
					triggerLabel={`Ver ${notificacoes.length} ${notificacoes.length === 1 ? 'ressalva' : 'ressalvas'}`}
					data={notificacoes}
					columns={[
						{ header: 'Tipo', render: (n) => n.nome },
						{ header: 'Detalhe', render: (n) => n.descricao_faixa },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Pontos negativos',
			value: pontosNegativos.length ? (
				<ListDrawer
					title='Pontos negativos'
					triggerLabel={`Ver ${pontosNegativos.length} ${pontosNegativos.length === 1 ? 'ponto' : 'pontos'}`}
					data={pontosNegativos}
					columns={[
						{ header: 'Critério', render: (p) => p.descricao },
						{ header: 'Valor', render: (p) => p.texto_exibido_nos_indicadores },
					]}
				/>
			) : (
				'-'
			),
		},
		{
			label: 'Pontos de atenção',
			value: pontosAtencao.length ? (
				<ListDrawer
					title='Pontos de atenção'
					triggerLabel={`Ver ${pontosAtencao.length} ${pontosAtencao.length === 1 ? 'ponto' : 'pontos'}`}
					data={pontosAtencao}
					columns={[
						{ header: 'Critério', render: (p) => p.descricao },
						{ header: 'Valor', render: (p) => p.texto_exibido_nos_indicadores },
					]}
				/>
			) : (
				'-'
			),
		},
	]

	return items
}

export function getRestitivosFiscaisItems(
	geralData?: GetMantyzCreditResponse['content']
): InfoCardItem[] {
	const pf = geralData?.pendencias_financeiras
	const pgfn = pf?.pgfn_debito_governo
	const cndt = pf?.cndt?.atual
	const fgts = pf?.fgts?.atual

	const cndtValidade = (() => {
		if (!cndt?.expiracao) return null
		const d = dayjs(cndt.expiracao)
		return d.isValid() ? d.format('DD/MM/YYYY') : cndt.expiracao
	})()

	const fgtsInicio = (() => {
		if (!fgts?.validade_inicio) return null
		const d = dayjs(fgts.validade_inicio)
		return d.isValid() ? d.format('DD/MM/YYYY') : fgts.validade_inicio
	})()

	const fgtsFim = (() => {
		if (!fgts?.validade_fim) return null
		const d = dayjs(fgts.validade_fim)
		return d.isValid() ? d.format('DD/MM/YYYY') : fgts.validade_fim
	})()

	return [
		{
			label: 'PGFN',
			value: pgfn ? (
				<span>
					{`${pgfn.qtd_total_debito} ${pgfn.qtd_total_debito === 1 ? 'débito' : 'débitos'} — ${formatCurrency(pgfn.valor_total_debito)}`}{' '}
					{pgfn.lista_debito?.length ? (
						<ListDrawer
							title='Débitos PGFN'
							triggerLabel={`Ver ${pgfn.lista_debito.length} ${pgfn.lista_debito.length === 1 ? 'débito' : 'débitos'}`}
							data={pgfn.lista_debito}
							columns={[
								{ header: 'Origem', render: (d) => d.origem || '-' },
								{ header: 'Valor', render: (d) => formatCurrency(d.valor_consolidado) || '-' },
								{ header: 'Situação', render: (d) => d.situacao_registro || '-' },
								{ header: 'UF', render: (d) => d.uf_unidade_responsavel || '-' },
							]}
						/>
					) : null}
				</span>
			) : '-',
		},
		{
			label: 'CNDT',
			value: cndt
				? `${cndt.status}${cndtValidade ? ` — válido até ${cndtValidade}` : ''}${cndt.em_debito ? ' — em débito' : ''}`
				: '-',
		},
		{
			label: 'FGTS',
			value: fgts
				? `${fgts.status}${fgtsInicio && fgtsFim ? ` — ${fgtsInicio} a ${fgtsFim}` : ''}`
				: '-',
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
			label: 'Dívidas vencidas',
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
	]
}

export function getMarketRestrictionsItems(data?: GetMantyzResponse['content']): InfoCardItem[] {
	const company = data?.pessoa_juridica
	const financialIssues = company?.pendencias_financeiras
	const marketRestrictions = financialIssues?.restritivo_mercado
	const legalActions = financialIssues?.acoes

	const pefinCount = marketRestrictions?.qtd_pefin
	const pefinValue = marketRestrictions?.valor_pefin

	const refinCount = marketRestrictions?.qtd_refin
	const refinValue = marketRestrictions?.valor_refin

	const protestsCount = marketRestrictions?.qtd_protestos
	const protestsValue = marketRestrictions?.valor_protestos

	const debtsCount = marketRestrictions?.qtd_dividas_vencidas
	const debtsValue = marketRestrictions?.valor_dividas_venciadas

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
			label: 'Dívidas vencidas',
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
	]
}

export function getSocietyStructureItems(data?: GetMantyzResponse['content']): InfoCardItem[] {
	const identification = data?.pessoa_juridica?.identificacao

	return [
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
	]
}

export function getPaymentHistoryItems(data?: GetMantyzResponse['content']): InfoCardItem[] {
	const paymentHistory = data?.pessoa_juridica?.evolucoes?.evolucao_historico_pagamento

	return [
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
	]
}

export function getEvolutionHistoryItems(data?: GetMantyzResponse['content']): InfoCardItem[] {
	const evolution = data?.pessoa_juridica?.evolucoes
	const identification = data?.pessoa_juridica?.identificacao

	return [
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
	]
}

export function getConsultationsItems(data?: GetMantyzResponse['content']): InfoCardItem[] {
	const evolution = data?.pessoa_juridica?.evolucoes

	return [
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

export function getSabiaScore(
	mantyzData?: GetMantyzResponse['content'],
	geralData?: GetMantyzCreditResponse['content']
): SabiaScoreCalculation {
	return calculateSabiaScore(mantyzData, geralData)
}
