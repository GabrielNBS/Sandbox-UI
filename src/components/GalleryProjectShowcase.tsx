'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import GlareHover from './GlareHover';

// --- Custom Animated Flat Icons ---

const DentalIcon = ({ color }: { color: string }) => (
	<motion.svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
		<motion.path
			d="M12 2C9 2 7 4 7 7C7 10 9 12 12 22C15 12 17 10 17 7C17 4 15 2 12 2Z"
			stroke={color}
			strokeWidth="1.5"
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 2, repeat: Infinity }}
		/>
		<motion.circle
			cx="12"
			cy="7"
			r="2"
			fill={color}
			animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
			transition={{ duration: 1.5, repeat: Infinity }}
		/>
	</motion.svg>
);

const TodoIcon = ({ color }: { color: string }) => (
	<motion.svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
		<motion.rect x="3" y="3" width="18" height="18" rx="4" stroke={color} strokeWidth="1.5" />
		<motion.path
			d="M8 12L11 15L16 9"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
		/>
	</motion.svg>
);

const StockIcon = ({ color }: { color: string }) => (
	<motion.svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
		<motion.path
			d="M3 12L12 7L21 12L12 17L3 12Z"
			stroke={color}
			strokeWidth="1.5"
			animate={{ y: [0, -2, 0] }}
			transition={{ duration: 2, repeat: Infinity }}
		/>
		<motion.path
			d="M3 16L12 11L21 16L12 21L3 16Z"
			stroke={color}
			strokeWidth="1.5"
			animate={{ y: [0, 2, 0] }}
			transition={{ duration: 2, repeat: Infinity }}
		/>
	</motion.svg>
);

const WhatsappIcon = ({ color }: { color: string }) => (
	<motion.svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
		<motion.path
			d="M21 11.5C21 16.1944 17.1944 20 12.5 20C10.854 20 9.3245 19.531 8.0335 18.723L3 20L4.3125 15.111C3.486 13.7845 3 12.195 3 10.5C3 5.80558 6.80558 2 11.5 2C16.1944 2 20 5.80558 20 10.5"
			stroke={color}
			strokeWidth="1.5"
		/>
		<motion.path
			d="M8 10C8 10 9 10 10 12C11 14 12 14 12 14"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			animate={{ scale: [1, 1.1, 1] }}
			transition={{ duration: 1, repeat: Infinity }}
		/>
	</motion.svg>
);

const DisneyIcon = ({ color }: { color: string }) => (
	<motion.svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
		<motion.path
			d="M2 20C2 20 12 4 22 20"
			stroke={color}
			strokeWidth="1.5"
			strokeLinecap="round"
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 2, repeat: Infinity }}
		/>
		<motion.path
			d="M12 8L14 14L20 14L15 18L17 24L12 20L7 24L9 18L4 14L10 14L12 8Z"
			fill={color}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
		/>
	</motion.svg>
);

// --- Accordion Gallery Component ---

const AccordionGallery = ({ images, color }: { images: string[]; color: string }) => {
	const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

	return (
		<div className="flex gap-2 w-full h-full p-4">
			{images.map((src, idx) => (
				<motion.div
					key={`${src}-${idx}`}
					onMouseEnter={() => setHoveredIdx(idx)}
					onMouseLeave={() => setHoveredIdx(null)}
					animate={{
						width: hoveredIdx === idx ? '70%' : hoveredIdx === null ? '33%' : '15%',
					}}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					className="relative h-full rounded-4xl overflow-hidden border border-white/10 cursor-pointer bg-[#0a0a0a] shadow-2xl group"
				>
					<motion.img
						src={src}
						alt="Destaque"
						className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
						animate={{ scale: hoveredIdx === idx ? 1.05 : 1.2 }}
						transition={{ duration: 2 }}
					/>
					<div
						className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${hoveredIdx === idx ? 'opacity-0' : 'opacity-100'}`}
					/>

					<AnimatePresence>
						{hoveredIdx === idx && (
							<motion.div
								layoutId="accordion-border-active"
								className="absolute inset-0 border-2 pointer-events-none rounded-4xl z-20"
								style={{ borderColor: color }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							/>
						)}
					</AnimatePresence>
				</motion.div>
			))}
		</div>
	);
};

interface ProjectContent {
	apresentacao: string;
	objetivo: string;
	destaque: string;
}

interface Project {
	id: string;
	title: string;
	subtitle: string;
	image: string;
	techs: string[];
	content: ProjectContent;
	highlightImages: string[];
	color: string;
	IconComponent: any;
}

const PROJECTS: Project[] = [
	{
		id: '1',
		title: 'SMILE STUDIO',
		subtitle: 'LANDING PAGE ODONTOLÓGICA',
		image: '/projects/dental.png',
		highlightImages: ['/projects/dental_h1.png', '/projects/dental_h2.png', '/projects/dental.png'],
		techs: ['NEXT.JS', 'TAILWIND', 'FRAMER MOTION', 'SEO'],
		color: '#7dd3fc',
		IconComponent: DentalIcon,
		content: {
			apresentacao:
				'Uma landing page premium para um escritório odontológico de alto padrão. O design foca em transmitir confiança, limpeza e modernidade através de uma estética minimalista e transições suaves.',
			objetivo:
				'Capturar leads qualificados através de uma interface intuitiva e visualmente atraente, destacando os tratamentos e a infraestrutura tecnológica da clínica.',
			destaque:
				'Destaque para o agendamento interativo e a visualização 3D de procedimentos que educam o paciente antes da consulta.',
		},
	},
	{
		id: '2',
		title: 'TASKFLOW',
		subtitle: 'GESTÃO DE TAREFAS INTELIGENTE',
		image: '/projects/todo.png',
		highlightImages: ['/projects/todo_h1.png', '/projects/todo.png', '/projects/todo_h1.png'],
		techs: ['REACT', 'ZUSTAND', 'TYPESCRIPT', 'DND-KIT'],
		color: '#a78bfa',
		IconComponent: TodoIcon,
		content: {
			apresentacao:
				'Uma aplicação de lista de tarefas que vai além do básico, com suporte a drag-and-drop, categorias inteligentes e análise de produtividade semanal.',
			objetivo:
				'Criar uma ferramenta de organização pessoal que seja prazerosa de usar, utilizando micro-interações para gamificar a conclusão de tarefas.',
			destaque:
				'Sistema de sincronização offline-first que garante que o usuário nunca perca seus dados, mesmo sem conexão.',
		},
	},
	{
		id: '3',
		title: 'STOCKMASTER',
		subtitle: 'CONTROLE DE ESTOQUE INDUSTRIAL',
		image: '/projects/stock.png',
		highlightImages: ['/projects/stock_h1.png', '/projects/stock.png', '/projects/stock_h1.png'],
		techs: ['NEXT.JS', 'PRISMA', 'POSTGRES', 'CHART.JS'],
		color: '#fbbf24',
		IconComponent: StockIcon,
		content: {
			apresentacao:
				'Sistema robusto para gestão de inventário em larga escala, com monitoramento em tempo real de entradas e saídas e alertas de reposição automática.',
			objetivo:
				'Otimizar a logística interna de empresas, reduzindo perdas por validade ou falta de produtos através de algoritmos preditivos.',
			destaque:
				'Dashboard analítico que projeta a demanda futura baseada no histórico de vendas e sazonalidade.',
		},
	},
	{
		id: '4',
		title: 'WHATS BROADCAST',
		subtitle: 'LISTA DE TRANSMISSÃO EM ESCALA',
		image: '/projects/whatsapp.png',
		highlightImages: [
			'/projects/whatsapp_h1.png',
			'/projects/whatsapp.png',
			'/projects/whatsapp_h1.png',
		],
		techs: ['NODE.JS', 'SOCKET.IO', 'WHATSAPP-WEB.JS', 'REDIS'],
		color: '#22c55e',
		IconComponent: WhatsappIcon,
		content: {
			apresentacao:
				'Plataforma de automação para envio de mensagens em massa e gestão de listas de transmissão, focada em marketing de relacionamento.',
			objetivo:
				'Facilitar a comunicação entre marcas e clientes, permitindo disparos segmentados e acompanhamento de taxas de abertura e resposta.',
			destaque:
				'Motor de envios inteligentes que simula o comportamento humano para evitar bloqueios e garantir a entrega.',
		},
	},
	{
		id: '5',
		title: 'DISNEY+ CLONE',
		subtitle: 'STREAMING EXPERIENCE CLONE',
		image: '/projects/disney.png',
		highlightImages: ['/projects/disney_h1.png', '/projects/disney.png', '/projects/disney_h1.png'],
		techs: ['REACT', 'FIREBASE', 'STYLED COMPONENTS', 'TMDB API'],
		color: '#3b82f6',
		IconComponent: DisneyIcon,
		content: {
			apresentacao:
				'Recriação da interface imersiva do Disney Plus, com foco nos sliders dinâmicos e na categorização por marcas (Marvel, Pixar, Star Wars).',
			objetivo:
				'Estudar padrões de UX em plataformas de streaming e implementar um sistema de autenticação e persistência de favoritos robusto.',
			destaque:
				'Efeito de hover dinâmico nos cards de categorias com vídeos em background, idêntico à plataforma original.',
		},
	},
];

type ContentTab = keyof ProjectContent;

export default function GalleryProjectShowcase() {
	const [activeProjectIdx, setActiveProjectIdx] = useState(0);
	const [activeTab, setActiveTab] = useState<ContentTab>('apresentacao');

	const project = PROJECTS[activeProjectIdx];

	const handleProjectChange = (idx: number) => {
		setActiveProjectIdx(idx);
		setActiveTab('apresentacao');
	};

	return (
		<div className="w-full h-full flex flex-col items-center justify-center font-sans relative overflow-hidden bg-[#050505]">
			{/* Dynamic Background Glow */}
			<div className="fixed inset-0 pointer-events-none -z-10">
				<motion.div
					key={`glow-${project.id}`}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						backgroundColor: project.color,
					}}
					transition={{ duration: 1.5 }}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] blur-[250px] rounded-full opacity-[0.05]"
				/>
			</div>

			<div className="flex flex-col lg:flex-row gap-8 lg:gap-24 w-full h-full items-center px-8 lg:px-24">
				{/* Left: Main Display */}
				<div className="relative flex-1 flex items-center justify-center w-full">
					{/* Vertical Tech Labels */}
					<div className="absolute -left-6 lg:-left-16 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
						{project.techs.map((tech, i) => (
							<motion.div
								key={`${project.id}-${tech}`}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 80 }}
								transition={{ delay: i * 0.1 }}
							>
								<GlareHover
									width="auto"
									height="auto"
									borderRadius="12px"
									glareColor={project.color}
									glareOpacity={0.4}
									glareSize={200}
									borderColor={`${project.color}40`}
									background="transparent"
									className="backdrop-blur-xl bg-black/40 shadow-2xl"
								>
									<div
										className="px-5 py-2.5 text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap"
										style={{ color: project.color }}
									>
										{tech}
									</div>
								</GlareHover>
							</motion.div>
						))}
					</div>

					{/* Image Container Card */}
					<motion.div className="relative w-full aspect-video rounded-4xl overflow-hidden border border-white/10 shadow-[0_50px_120px_rgba(0,0,0,0.8)] bg-[#0a0a0a]">
						<AnimatePresence mode="wait">
							{activeTab === 'destaque' ? (
								<motion.div
									key="accordion"
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 1.05 }}
									transition={{ duration: 0.6 }}
									className="absolute inset-0 w-full h-full flex items-center justify-center pt-24" // pt-24 to avoid overlap with navbar
								>
									<AccordionGallery images={project.highlightImages} color={project.color} />
								</motion.div>
							) : (
								<motion.img
									key={project.id}
									src={project.image}
									alt={project.title}
									initial={{ opacity: 0, scale: 1.15 }}
									animate={{ opacity: 0.6, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
									className="absolute inset-0 w-full h-full object-cover"
								/>
							)}
						</AnimatePresence>

						{/* Navbar inside the image area */}
						<div className="absolute top-10 left-10 right-10 flex items-center justify-start z-30">
							<div className="flex items-center gap-4 bg-black/40 backdrop-blur-3xl p-2 rounded-full border border-white/10 shadow-2xl overflow-hidden">
								<div className="flex items-center gap-2 px-1">
									{PROJECTS.map((project, index) => {
										const isActive = activeProjectIdx === index;

										return (
											<motion.button
												key={project.id}
												layout
												onClick={() => handleProjectChange(index)}
												transition={{
													layout: {
														type: 'spring',
														stiffness: 350,
														damping: 30,
														mass: 0.8,
													},
												}}
												style={{ minWidth: 44 }}
												className="relative h-11 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
											>
												{isActive && (
													<motion.div
														layoutId="project-nav-bg"
														className="absolute inset-0 bg-white rounded-full shadow-[0_8px_20px_rgba(255,255,255,0.2)]"
														transition={{
															type: 'spring',
															stiffness: 350,
															damping: 30,
															mass: 0.8,
														}}
													/>
												)}

												<motion.div
													layout
													className="relative z-10 flex items-center justify-center h-full px-4"
												>
													<motion.span
														layout="position"
														className={`text-[11px] font-black leading-none transition-colors duration-300 ${
															isActive
																? 'text-black'
																: 'text-white/40 group-hover:text-white hover:text-white'
														}`}
													>
														{index + 1}
													</motion.span>

													<AnimatePresence>
														{isActive && (
															<motion.div
																initial={{
																	opacity: 0,
																	width: 0,
																	marginLeft: 0,
																	filter: 'blur(4px)',
																}}
																animate={{
																	opacity: 1,
																	width: 'auto',
																	marginLeft: 10,
																	filter: 'blur(0px)',
																}}
																exit={{ opacity: 0, width: 0, marginLeft: 0, filter: 'blur(4px)' }}
																transition={{
																	type: 'spring',
																	stiffness: 350,
																	damping: 30,
																	mass: 0.8,
																}}
																className="overflow-hidden whitespace-nowrap flex items-center h-full"
															>
																<span className="text-[10px] font-bold uppercase tracking-wider text-black leading-none">
																	{project.title}
																</span>
															</motion.div>
														)}
													</AnimatePresence>
												</motion.div>
											</motion.button>
										);
									})}
								</div>

								<div className="h-8 w-px bg-white/10 mx-1" />

								<div className="flex items-center gap-2 pr-1">
									<button className="px-6 h-11 rounded-full bg-white/5 border border-white/5 text-xs font-bold tracking-widest text-white/70 uppercase flex items-center gap-2 group transition-all hover:bg-white/10 hover:text-white hover:border-white/10">
										CODE
										<ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
									</button>

									<button
										className="px-6 h-11 rounded-full text-xs font-bold tracking-widest text-black uppercase flex items-center gap-2 group transition-all hover:scale-105 active:scale-95"
										style={{ backgroundColor: project.color }}
									>
										LIVE DEMO
										<ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all" />
									</button>
								</div>
							</div>
						</div>

						{/* Visual Polish Overlay */}
						<div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent pointer-events-none opacity-80" />
						<div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
					</motion.div>
				</div>

				{/* Right: Info Section */}
				<div className="w-full lg:w-[550px] flex flex-col justify-center py-8">
					<AnimatePresence mode="wait">
						<motion.div
							key={project.id}
							initial={{ opacity: 0, x: 60 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -60 }}
							transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
							className="space-y-14"
						>
							{/* Header with Animated Flat Icon */}
							<div className="space-y-6">
								<motion.div
									initial={{ scale: 0, rotate: -45 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
									className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden"
									style={{
										backgroundColor: `${project.color}15`,
										border: `1px solid ${project.color}30`,
									}}
								>
									<project.IconComponent color={project.color} />
									<motion.div
										animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
										transition={{ duration: 2, repeat: Infinity }}
										className="absolute inset-0 rounded-3xl blur-xl -z-10"
										style={{ backgroundColor: project.color }}
									/>
								</motion.div>

								<div className="space-y-3">
									<motion.h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] flex flex-col uppercase">
										<span style={{ color: project.color }}>{project.title}</span>
										<span className="text-2xl md:text-3xl text-white/20 mt-4 tracking-normal normal-case font-medium italic">
											{project.subtitle}
										</span>
									</motion.h2>
								</div>
							</div>

							{/* Dynamic Content Area */}
							<div className="min-h-[220px] flex flex-col justify-start">
								<AnimatePresence mode="wait">
									<motion.div
										key={activeTab}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.5, ease: 'easeOut' }}
										className="space-y-8"
									>
										<div className="flex items-center gap-4">
											<div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
											<h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20">
												{activeTab === 'apresentacao'
													? 'apresentação'
													: activeTab === 'objetivo'
														? 'sobre o projeto'
														: 'destaque criativo'}
											</h4>
											<div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
										</div>
										<p className="text-white/50 text-xl leading-relaxed font-medium italic">
											"{project.content[activeTab]}"
										</p>
									</motion.div>
								</AnimatePresence>
							</div>

							{/* Tabs Navigation (Bottom) */}
							<div className="flex flex-wrap gap-4">
								{(Object.keys(project.content) as ContentTab[]).map((tab) => (
									<button
										key={tab}
										onClick={() => setActiveTab(tab)}
										className={`group relative px-7 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
											activeTab === tab
												? 'text-black border-transparent scale-105'
												: 'text-white/20 border-white/5 hover:border-white/10 hover:text-white/40'
										}`}
									>
										<span className="relative z-10">
											{tab === 'apresentacao'
												? 'intro'
												: tab === 'objetivo'
													? 'projeto'
													: 'destaque'}
										</span>
										{activeTab === tab && (
											<motion.div
												layoutId="active-tab-bg"
												className="absolute inset-0 bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
												transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
											/>
										)}
									</button>
								))}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
