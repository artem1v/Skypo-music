'use client'

import { useEffect, useState } from 'react'
import { CenterBlock } from '../../../components/CenterBlock/CenterBlock'
import { getFavoriteTracks } from '../../../services/tracks/tracksApi'
import { setFavoriteTracks, setFetchError, setFetchIsLoading, } from '../../../store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { withReauth } from '../../hooks/withReAuth'

export default function FavoritePage() {
  const dispatch = useAppDispatch()

  const { access, refresh } = useAppSelector((state) => state.auth)
  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector((state) => state.tracks)

  const [localError, setLocalError] = useState('')

  useEffect(() => {
    dispatch(setFetchIsLoading(true))
    if (!refresh) {
      setLocalError('Чтобы просматривать избранные треки, войдите в аккаунт')
      dispatch(setFetchIsLoading(false))
      return
    } else {
      setLocalError('')
    }

    const fetchFavorites = async () => {
      try {
        const data = await withReauth(
          async (token: string) => getFavoriteTracks(token),
          refresh,
          dispatch,
          access ?? undefined
        )

        if (data.length === 0) {
          setLocalError('У вас пока нет избранных треков')
        }

        dispatch(setFavoriteTracks(data))
      } catch {
        setLocalError('Ошибка при загрузке избранных треков')
        dispatch(setFavoriteTracks([]))
      } finally {
  dispatch(setFetchIsLoading(false))
      }
    }

    fetchFavorites()
  }, [refresh])

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