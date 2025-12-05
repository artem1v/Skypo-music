'use client'

import { Bar } from '@/components/Bar/Bar'
import { CenterBlock } from '@/components/CenterBlock/CenterBlock'
import { Nav } from '@/components/Nav/Nav'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Track } from '@/types/track'
import styles from './MusicTemplate.module.scss'

interface MusicTemplateProps {
	tracks: Track[]
	error: string
	isLoading: boolean
	categoryName: string
	title: string
}

export const MusicTemplate = ({
	tracks,
	error,
	isLoading,
	categoryName,
	title,
}: MusicTemplateProps) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<main className={styles.main}>
					<Nav />
					<CenterBlock
						tracks={tracks}
						error={error}
						isLoading={isLoading}
						categoryName={categoryName}
						title={title}
					/>
					<Sidebar />
				</main>
				<Bar />
				<footer className='footer'></footer>
			</div>
		</div>
	)
}
