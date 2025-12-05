'use client'

import { useEffect, useState } from 'react'
import { CenterBlock } from '../../../components/CenterBlock/CenterBlock'
import { getFavoriteTracks } from '../../../services/tracks/tracksApi'
import { setFavoriteTracks } from '../../../store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '../../../store/store'

export default function FavoritePage() {
    const dispatch = useAppDispatch()
    const { access } = useAppSelector(state => state.auth)
    const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
        state => state.tracks,
    )

    const [localError, setLocalError] = useState('')

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!access) {
                setLocalError('Чтобы просматривать избранные треки, войдите в аккаунт')
                dispatch(setFavoriteTracks([]))
                return
            }

            try {
                const data = await getFavoriteTracks(access)
                if (data.length === 0) {
                    setLocalError('У вас пока нет избранных треков')
                }
                dispatch(setFavoriteTracks(data))
            } catch {
                setLocalError('Ошибка при загрузке избранных треков')
            }
        }

        fetchFavorites()
    }, [access, dispatch])

    const error = localError || fetchError
    const isLoading = fetchIsLoading

    return (
        <CenterBlock
            tracks={favoriteTracks}
            title='Мои избранные треки'
            error={error}
            isLoading={isLoading}
        />
    )
}
