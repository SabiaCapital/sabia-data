export function MainPage() {
	return (
		<div className='flex flex-col gap-8'>
			<h1 className='max-w-92 text-2xl'>
				Bem-vindo à{' '}
				<span className='block font-bold'>
					Plataforma de Verificação de Dados da Sabia Capital.
				</span>
			</h1>

			<h2 className='max-w-152 text-lg'>
				Esta plataforma foi desenvolvida para facilitar a consulta e validação de
				informações relacionadas a empresas e operações financeiras.
			</h2>

			<div className='flex flex-col gap-2'>
				<p>No menu à esquerda, você pode navegar entre as seguintes funcionalidades:</p>

				<p className='text-sm'>
					<span className='font-semibold'>Operações:</span> consulte e analise dados
					detalhados relacionados a operações específicas, incluindo informações
					operacionais e de verificação.
				</p>

				<p className='text-sm'>
					<span className='font-semibold'>Pesquisar CNPJ:</span> realize a busca manual de
					empresas por meio do CNPJ para acessar dados cadastrais e informações
					relevantes.
				</p>
			</div>
		</div>
	)
}
