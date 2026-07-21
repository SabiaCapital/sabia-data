# Plano de Implementação — Tela Análise Cedente

> Baseado no Excel `Tela analise cedente_atualização.xlsx` vs. o sistema atual (`src/pages/cnpj-search`)
>
> **Legenda:**
> - ✅ **Sistema e Excel** — já implementado
> - ⚠️ **Sistema parcial** — existe mas incompleto
> - ❌ **Somente no Excel** — precisa ser adicionado ao sistema

---

## 1. DADOS GERAIS

| Campo | Status | Observação |
|---|---|---|
| Nome / Razão Social | ✅ Sistema e Excel | `dadosGerais.nome` |
| CNPJ | ✅ Sistema e Excel | `dadosGerais.cnpj_cpf` |
| Nome Fantasia | ✅ Sistema e Excel | via `historico_cadastral` |
| Fundação | ✅ Sistema e Excel | `dadosGerais.fundacao` |
| Capital Social | ✅ Sistema e Excel | `dadosGerais.capital_social` |
| Endereço Principal | ✅ Sistema e Excel | `dados_localizacao_contato.endereco_principal` |
| CNAE Principal | ✅ Sistema e Excel | `dadosGerais.cnae_principal` |
| CNAEs Secundários | ✅ Sistema e Excel | `dadosGerais.cnaes_secundarios` |
| **Email** | ❌ Somente Excel | `dados_localizacao_contato.emails` — dado existe na API |
| **Outros Emails** | ❌ Somente Excel | `dados_localizacao_contato.emails` (lista) |
| **Telefone** | ❌ Somente Excel | `dados_localizacao_contato.telefones` — dado existe na API |
| **Outros Telefones** | ❌ Somente Excel | `dados_localizacao_contato.telefones` (lista) |
| **Outros Endereços** | ❌ Somente Excel | `dados_localizacao_contato.outros_enderecos` — dado existe na API |
| **Filiais** | ❌ Somente Excel | `dadosGerais.filiais` — dado existe na API |
| **Porte Comercial** | ❌ Somente Excel | `dadosGerais.porte_comercial` — dado existe na API |
| **Tipo de Unidade** | ❌ Somente Excel | `dadosGerais.tipo_unidade` — dado existe na API |
| **Funcionários** | ❌ Somente Excel | `dadosGerais.funcionarios` — dado existe na API |
| **Porte Tributário** | ❌ Somente Excel | `dadosGerais.porte` — dado existe na API |
| **Regime Tributário** | ❌ Somente Excel | `dadosGerais.regime_tributario` — dado existe na API |
| **COMEX** | ❌ Somente Excel | `dadosGerais.comex` — dado existe na API |
| **Inscrição Estadual** | ❌ Somente Excel | `dadosGerais.inscricao_estadual` — dado existe na API |
| **Situação Receita** | ❌ Somente Excel | `dadosGerais.situacao_receita_descricao` + `situacao_receita_data` |
| **Situação Especial** | ❌ Somente Excel | `dadosGerais.situacao_especial` + `data_situacao_especial` |
| **Situação SINTEGRA** | ❌ Somente Excel | `dadosGerais.dados_sintegra.status` |
| **Faturamento** | ❌ Somente Excel | `dadosGerais.faturamento_presumido` — dado existe na API |
| **Natureza Jurídica** | ❌ Somente Excel | `dadosGerais.descricao_natureza` — dado existe na API |

---

## 2. SCORE MANTYZ / ANÁLISE

| Campo | Status | Observação |
|---|---|---|
| **Score Mantyz (valor numérico)** | ❌ Somente Excel | `geral.score.dados_gerais_score.score` |
| **BLOQUEADO (indicador)** | ❌ Somente Excel | `geral.score.dados_gerais_score.bloqueado` |
| **RESSALVAS** | ❌ Somente Excel | `geral.score.dados_gerais_score.ressalva` |
| **Pontos Positivos (lista)** | ❌ Somente Excel | `geral.score.pontos_positivos[]` |
| **Pontos de Atenção (lista)** | ❌ Somente Excel | `geral.score.pontos_atencao[]` |
| **Pontos Negativos (lista)** | ❌ Somente Excel | `geral.score.pontos_negativos[]` |
| **Notificações / Bloqueios** | ❌ Somente Excel | `geral.score.notificacoes[]` — inclui `descricao_evento: "Bloqueio"` |

---

## 3. SANÇÕES E RESTRIÇÕES

| Campo | Status | Observação |
|---|---|---|
| **Sanções Internacionais** | ❌ Somente Excel | `geral.identificacao.sancao.lista_historico_sancao` |
| **Sanções PEP** | ❌ Somente Excel | `geral.identificacao.sancao.lista_historico_pep_sancao` |
| **Doações Políticas** | ❌ Somente Excel | `geral.identificacao.sancao` (dados PEP/PPE) |
| **Mídias Negativas** | ❌ Somente Excel | `geral.identificacao.sancao.midias_negativas.possui_midias_negativas` + `resposta_ai` |
| **Possui Sócios com Mídias Negativas (BETA)** | ❌ Somente Excel | `geral.identificacao.sancao_proprietario` |

---

## 4. QUADRO SOCIETÁRIO

| Campo | Status | Observação |
|---|---|---|
| Quadro de Sócios — Receita Federal Atual | ✅ Sistema e Excel | `identificacao.dados_socios` — já renderizado |
| **Quadro de Sócios — Mantyz DataHub Atual** | ❌ Somente Excel | `geral.identificacao.datahub_qsa.dados_socios` — dado existe mas não renderizado |
| **Quadro de Sócios — Mantyz DataHub Anterior** | ❌ Somente Excel | dados históricos em `datahub_qsa` |
| Quadro de Administradores | ✅ Sistema e Excel | `identificacao.dados_administradores` — já renderizado |
| **Administradores — Mantyz DataHub** | ❌ Somente Excel | `geral.identificacao.datahub_qsa.dados_administradores` |
| Participações em Outras Empresas | ✅ Sistema e Excel | `identificacao.participacoes_empresa` — já renderizado |
| **Participações — Mantyz DataHub** | ❌ Somente Excel | `geral.identificacao.datahub_qsa.participacoes_empresa` |

---

## 5. RESTRITIVO DE MERCADO

| Campo | Status | Observação |
|---|---|---|
| PEFIN (qtd + valor, resumo) | ✅ Sistema e Excel | `restritivo_mercado.qtd_pefin` + `valor_pefin` |
| REFIN (qtd + valor, resumo) | ✅ Sistema e Excel | `restritivo_mercado.qtd_refin` + `valor_refin` |
| Protestos (qtd + valor, resumo) | ✅ Sistema e Excel | `restritivo_mercado.qtd_protestos` + `valor_protestos` |
| Cheques sem Fundo (tabela) | ✅ Sistema e Excel | `pendencias_financeiras.cheques_sem_fundo` |
| Ações Judiciais Serasa (tabela) | ✅ Sistema e Excel | `pendencias_financeiras.acoes.acoes_judiciais` |
| Ações Trabalhistas Serasa (tabela) | ✅ Sistema e Excel | `pendencias_financeiras.acoes.acoes_trabalhistas` |
| **Dívidas Vencidas (tabela — últimos 20)** | ❌ Somente Excel | `pendencias_financeiras.dividas_vencidas` — dado existe na API, só exibe qtd hoje |
| **PEFIN (tabela — últimos 20)** | ❌ Somente Excel | `pendencias_financeiras.pefin[]` — dado existe na API |
| **REFIN (tabela — últimos 20)** | ❌ Somente Excel | `pendencias_financeiras.refin[]` — dado existe na API |
| **Protestos (tabela — últimos 20)** | ❌ Somente Excel | `pendencias_financeiras.protestos.protestos` — dado existe na API |
| **Central de Protestos — CENPROT** | ❌ Somente Excel | `pendencias_financeiras.cenprot` (lista_protestos_cartorio, etc.) |
| **Outras Ocorrências (tabela)** | ❌ Somente Excel | `pendencias_financeiras.acoes.outras_ocorrencias` |
| **Situação Cadastral** | ❌ Somente Excel | `pendencias_financeiras.restritivo_mercado.situacao_cadastral` |
| **Ações Judiciais — Mantyz DataHub (resumo)** | ❌ Somente Excel | `pendencias_financeiras.acoes.acoes_judiciais_complementares` + resumo |
| **Ações Judiciais — Mantyz DataHub (tabela últimos 20)** | ❌ Somente Excel | `pendencias_financeiras.acoes.acoes_judiciais_complementares` |
| **Ações Trabalhistas — Mantyz DataHub (resumo)** | ❌ Somente Excel | `pendencias_financeiras.acoes.acoes_trabalhistas_complementares` |
| **Ações Trabalhistas — Mantyz DataHub (tabela últimos 20)** | ❌ Somente Excel | `pendencias_financeiras.acoes.acoes_trabalhistas_complementares` |

---

## 6. RESTRITIVOS FISCAIS

| Campo | Status | Observação |
|---|---|---|
| **PGFN** | ⚠️ Sistema parcial | Existe no tipo (`pgfn_debito_governo`) mas **não renderizado** na UI. O campo "PGFN" exibido hoje na UI está mapeado errado — usa `qtd_dividas_vencidas` |
| **CNDT** | ❌ Somente Excel | `pendencias_financeiras.cndt` — dado existe na API/tipos, não renderizado |
| **FGTS** | ❌ Somente Excel | `pendencias_financeiras.fgts` — dado existe na API/tipos, não renderizado |

---

## 7. INDICADORES DE PAGAMENTO — CIP

> Todos vêm de `geral.indicadores_pagamento` e `geral.pendencias_financeiras.acoes` (categorias)

| Campo | Status | Observação |
|---|---|---|
| **Liquidez 60 Dias** | ❌ Somente Excel | `indicadores_pagamento.indicador_liquidez.valor_nominal_liquidez_60` |
| **Boleto Pagamento Média Mensal (6 meses)** | ❌ Somente Excel | `indicadores_pagamento.indicador_valor_transacionado_pj.boleto_pagamento_valor_06` |
| **Boleto/Cartão TED Recebimento Média Mensal (6 meses)** | ❌ Somente Excel | `indicadores_pagamento.indicador_valor_transacionado_pj.boleto_cartao_ted_recebimento_06` |
| **Riscos Passivos (Qtd + Valor)** | ❌ Somente Excel | categorias de `acoes_judiciais_complementares` |
| **Criminal (Qtd + Valor)** | ❌ Somente Excel | categoria judicial |
| **RJ — Recuperação Judicial (Qtd + Valor)** | ❌ Somente Excel | categoria judicial |
| **RJ Hab. Crédito (Qtd + Valor)** | ❌ Somente Excel | categoria judicial |
| **Falências (Qtd + Valor)** | ❌ Somente Excel | categoria judicial |
| **Fiscal (Qtd + Valor)** | ❌ Somente Excel | categoria judicial |
| **Extrajudicial (Qtd + Valor)** | ❌ Somente Excel | categoria judicial |
| **Risco Liminar (Qtd + Valor)** | ❌ Somente Excel | categoria judicial |
| **Risco Bloqueio Judicial (Qtd + Valor)** | ❌ Somente Excel | categoria judicial |
| **Risco de Penhora (Qtd + Valor)** | ❌ Somente Excel | categoria judicial |
| **Riscos Passivos Trabalhistas (Qtd + Valor)** | ❌ Somente Excel | categorias de `acoes_trabalhistas_complementares` |

---

## Resumo Geral

| Categoria | Total | ✅ Já no sistema | ❌ Falta implementar |
|---|---|---|---|
| Dados Gerais | 24 | 8 | 16 |
| Score / Análise | 7 | 0 | 7 |
| Sanções e Restrições | 5 | 0 | 5 |
| Quadro Societário | 7 | 3 | 4 |
| Restritivo de Mercado | 18 | 6 | 12 |
| Restritivos Fiscais | 3 | 0 (1 mapeado errado) | 3 |
| Indicadores CIP | 14 | 0 | 14 |
| **TOTAL** | **78** | **17** | **61** |

---

## Próximos Passos Sugeridos (ordem de prioridade)

1. **Dados Gerais extras** — simples, dados já disponíveis na API, só adicionar campos ao `getCompanyItems`
2. **Score Mantyz + BLOQUEADO** — card de destaque no topo, dados em `geral.score`
3. **Indicadores CIP** — novo card com layout de grid (Qtd + Valor), dados em `geral.indicadores_pagamento` e categorias de `acoes`
4. **Tabelas de restritivos** (PEFIN, REFIN, Protestos, Dívidas, CENPROT) — expandir os resumos para tabelas com ListDrawer
5. **Restritivos Fiscais** (PGFN correto, CNDT, FGTS) — corrigir mapeamento e adicionar novos
6. **Sanções e Restrições** — novo card (dados em `geral.identificacao.sancao`)
7. **Quadro DataHub** — separar sócios/administradores/participações da Receita vs. DataHub
8. **Ações Judiciais DataHub** — complementares com resumo e tabela


---

### Observações
- `(lista)` — O campo é um array de objetos. Ex: emails não é só uma string, é `["email1@x.com", "email2@x.com"]`. Precisaria de um ListDrawer ou exibir só o primeiro.

- `dadosGerais.dados_sintegra.status` — Caminho direto na resposta JSON. `dados_sintegra` é um objeto dentro de dados_gerais, e dentro dele tem um campo `status` com a situação SINTEGRA (ex: "Ativo", "Irregular").

- `inclui descricao_evento: "Bloqueio"` — As notificações (`geral.score.notificacoes`) são uma lista de objetos. Cada um tem nome, `descricao_evento` e `descricao_faixa`. Quando `descricao_evento === "Bloqueio"` é o que aparece como "BLOQUEADO" no Excel.

- `(dados PEP/PPE) — PEP` = Pessoa Exposta Politicamente. PPE = Pessoa Politicamente Exposta (sigla em inglês). São os campos de sanções ligadas a políticos (`lista_historico_pep_sancao`). As "Doações Políticas" do Excel vêm desses dados.

- `já renderizado` — Já existe na tela atual. Não precisa fazer nada.

- `existe mas não renderizado` — O dado já chega da API e o tipo TypeScript já está definido, mas ninguém adicionou ao helper `getMantyzItems` ou `getCompanyItems` para exibir na tela.

- dados históricos em `datahub_qsa` — O `datahub_qs`a `tem dados_socios`, `dados_administradores` e participacoes_empresa. O "Atual" são os sócios ativos hoje. O "Anterior" são os históricos (saíram da empresa). Isso vem do mesmo objeto, separado por `data_saida !== null`.

- `dado existe na API, só exibe qtd hoje` — Ex: PEFIN. Hoje o sistema mostra "3 registros - R$ 1.500,00" (resumo). O Excel quer mostrar também a tabela completa dos 3 registros com detalhes (banco, data, valor de cada um). O dado detalhado já está em `pendencias_financeiras.pefin[]` na API.

- (`lista_protestos_cartorio, etc.`) — O CENPROT tem vários sub-campos: `situacao, registros`, `valor_total`, `lista_cartorio` (lista de cartórios), `lista_protestos_cartorio` (detalhes de cada protesto por cartório), `lista_resumo_classificacao`. A nota significa que esses sub-campos precisam ser decididos — quais mostrar e como.

- `+ resumo` — As ações judiciais DataHub precisam de dois componentes: (1) um resumo com totais/valores agregados e (2) uma tabela com os últimos 20 registros individualmente. São dois elementos de UI separados para a mesma fonte de dados.