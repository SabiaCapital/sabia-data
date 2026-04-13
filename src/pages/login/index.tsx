import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import cover from '@/assets/images/cover.jpg'
import { getEmailLocalPart } from '@/utils/text'
import { useUser } from '@/hooks/use-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Logo } from '@/components/logo'

const formSchema = z.object({
	email: z.email('O email deve possuir um formato válido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export function LoginPage() {
	const [isLoading, setIsLoading] = useState(false)
	const { login } = useUser()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		const result = await login(values.email, values.password)
		setIsLoading(false)

		if (!result.success) {
			if (result.error.code === 'invalid_credentials') {
				form.setError('email', {
					type: 'manual',
					message: 'Email ou senha incorretos',
				})

				form.setError('password', {
					type: 'manual',
					message: 'Email ou senha incorretos',
				})

				return
			}

			toast.error(result.error.message)
			return
		}

		toast.success(
			result.data.email
				? `Boas-vindas, ${getEmailLocalPart(result.data.email)}!`
				: 'Boas-vindas!'
		)
	}

	return (
		<div className='grid min-h-svh w-full lg:grid-cols-2'>
			<div className='relative flex flex-col gap-4 p-10'>
				<div className='absolute top-0 left-0 flex w-full justify-center p-10 lg:justify-start'>
					<Logo className='h-10 w-14' isSmall />
				</div>

				<div className='flex flex-1 items-center justify-center'>
					<div className='w-full max-w-xs'>
						<Form {...form}>
							<form
								className='flex flex-col gap-6'
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<div className='flex flex-col items-center gap-2 text-center'>
									<h1 className='text-2xl font-bold'>Acessar plataforma</h1>

									<p className='text-muted-foreground text-sm text-balance'>
										Preencha suas credenciais nos campos abaixo
									</p>
								</div>

								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>

											<FormControl>
												<Input
													placeholder='email@sabiacapital.com.br'
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Senha</FormLabel>

											<FormControl>
												<Input type='password' {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<Button className='w-full' disabled={isLoading}>
									Entrar
								</Button>

								<div className='text-center text-sm'>
									Caso precise de ajuda, entre em contato com o administrador da
									plataforma.
								</div>
							</form>
						</Form>
					</div>
				</div>
			</div>

			<div className='bg-muted hidden max-h-screen lg:block'>
				<img
					className='h-full w-full object-cover opacity-35 dark:opacity-15'
					src={cover}
					alt=''
				/>
			</div>
		</div>
	)
}
